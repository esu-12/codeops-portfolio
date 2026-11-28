
import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { UsersService } from '../users/users.service.js';
import { RegisterDto } from './dto/register.dto.js';
import { LoginDto } from './dto/login.dto.js';
import { ChangePasswordDto } from './dto/change-password.dto.js';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async register(dto: RegisterDto) {
    const hashedPassword = await argon2.hash(dto.password);

    const user = this.usersService.create(
      dto.name,
      dto.email,
      hashedPassword,
    );

    const {
      password: _password,
      refreshHash: _refreshHash,
      ...safeUser
    } = user;

    return {
      message: 'Registration successful',
      user: safeUser,
    };
  }

  async login(dto: LoginDto) {
    const user = this.usersService.findByEmail(dto.email);

    if (!user || !(await argon2.verify(user.password, dto.password))) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const accessPayload = {
      sub: user.id,
      email: user.email,
      role: user.role,
      roles: [user.role],
    };

    const refreshPayload = {
      sub: user.id,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(accessPayload, {
        secret: this.configService.getOrThrow<string>('JWT_ACCESS_SECRET'),
        expiresIn: '15m',
        algorithm: 'HS256',
      }),
      this.jwtService.signAsync(refreshPayload, {
        secret: this.configService.getOrThrow<string>('JWT_REFRESH_SECRET'),
        expiresIn: '7d',
        algorithm: 'HS256',
      }),
    ]);

    const refreshHash = await argon2.hash(refreshToken);
    this.usersService.updateRefreshHash(user.id, refreshHash);

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
      token_type: 'Bearer',
      expires_in: 900,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        mustChangePassword: user.mustChangePassword,
      },
    };
  }

  async refresh(refreshToken: string) {
    try {
      const payload = await this.jwtService.verifyAsync<{ sub: string }>(
        refreshToken,
        {
          secret: this.configService.getOrThrow<string>('JWT_REFRESH_SECRET'),
          algorithms: ['HS256'],
        },
      );

      const user = this.usersService.findByRefreshHash(payload.sub);

      if (
        !user?.refreshHash ||
        !(await argon2.verify(user.refreshHash, refreshToken))
      ) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      const accessPayload = {
        sub: user.id,
        email: user.email,
        role: user.role,
        roles: [user.role],
      };

      const newRefreshPayload = {
        sub: user.id,
      };

      const [newAccessToken, newRefreshToken] = await Promise.all([
        this.jwtService.signAsync(accessPayload, {
          secret: this.configService.getOrThrow<string>('JWT_ACCESS_SECRET'),
          expiresIn: '15m',
          algorithm: 'HS256',
        }),
        this.jwtService.signAsync(newRefreshPayload, {
          secret: this.configService.getOrThrow<string>('JWT_REFRESH_SECRET'),
          expiresIn: '7d',
          algorithm: 'HS256',
        }),
      ]);

      const newRefreshHash = await argon2.hash(newRefreshToken);
      this.usersService.updateRefreshHash(user.id, newRefreshHash);

      return {
        access_token: newAccessToken,
        refresh_token: newRefreshToken,
        token_type: 'Bearer',
        expires_in: 900,
      };
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  logout(userId: string) {
    this.usersService.updateRefreshHash(userId, null);

    return {
      message: 'Logout successful',
    };
  }
  
  async changePassword(
    userId: string,
    dto: ChangePasswordDto,
  ) {
    const user = this.usersService.findById(userId);

    if (
      !user ||
      !(await argon2.verify(user.password, dto.currentPassword))
    ) {
      throw new UnauthorizedException('Current password is incorrect');
    }

    const hashedPassword = await argon2.hash(dto.newPassword);

    this.usersService.updatePassword(userId, hashedPassword);

    return {
      message: 'Password changed successfully',
      mustChangePassword: false,
    };
  }
}