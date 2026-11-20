import {
  Injectable,
  InternalServerErrorException,
  Logger,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { UserRole } from './types/user-role.enum.js';
import { UsersService } from './users.service.js';

@Injectable()
export class AdminSeedService implements OnModuleInit {
  private readonly logger = new Logger(AdminSeedService.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
  ) {}

  async onModuleInit(): Promise<void> {
    const email = this.configService.get<string>('ADMIN_EMAIL');
    const password = this.configService.get<string>('ADMIN_PASSWORD');

    if (!email && !password) {
      this.logger.warn('Initial admin seeding skipped: credentials are not configured');
      return;
    }

    if (!email || !password) {
      throw new InternalServerErrorException(
        'Both ADMIN_EMAIL and ADMIN_PASSWORD must be configured',
      );
    }

    if (this.usersService.findByEmail(email)) {
      this.logger.log('Initial admin account already exists');
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    this.usersService.create(
      'Campus Events Admin',
      email,
      hashedPassword,
      UserRole.ADMIN,
    );

    this.logger.log('Initial admin account created');
  }
}
