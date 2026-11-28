
import {
  Body,
  Controller,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import * as argon2 from 'argon2';
import { Roles } from '../common/decorators/roles.decorator.js';
import { RolesGuard } from '../common/guards/roles.guard.js';
import { CreateOrganizerDto } from './dto/create-organizer.dto.js';
import { UpdateRoleDto } from './dto/update-role.dto.js';
import { UserRole } from './types/user-role.enum.js';
import { UsersService } from './users.service.js';

@Controller('users')
@UseGuards(RolesGuard)
@Roles(UserRole.ADMIN)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('organizers')
  async createOrganizer(@Body() dto: CreateOrganizerDto) {
    const hashedPassword = await argon2.hash(dto.password);

    const user = this.usersService.create(
      dto.name,
      dto.email,
      hashedPassword,
      UserRole.ORGANIZER,
      true,
    );

    return {
      message: 'Organizer account created. Password change required at first login.',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        mustChangePassword: user.mustChangePassword,
      },
    };
  }

  @Patch(':id/role')
  updateRole(
    @Param('id') id: string,
    @Body() dto: UpdateRoleDto,
  ) {
    const user = this.usersService.updateRole(id, dto.role);

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
  }
}