import { IsEnum } from 'class-validator';
import { UserRole } from '../types/user-role.enum.js';

export class UpdateRoleDto {
  @IsEnum(UserRole)
  role!: UserRole;
}
