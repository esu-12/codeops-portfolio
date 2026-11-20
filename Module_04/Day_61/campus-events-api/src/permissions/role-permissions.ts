
import { UserRole } from '../users/types/user-role.enum.js';
import { Permission } from './permission.enum.js';

export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  [UserRole.STUDENT]: [
    Permission.EVENT_READ,
  ],

  [UserRole.ORGANIZER]: [
    Permission.EVENT_READ,
    Permission.EVENT_CREATE,
    Permission.EVENT_UPDATE,
    Permission.EVENT_DELETE,
    Permission.EVENT_PUBLISH,
  ],

  [UserRole.ADMIN]: [
    Permission.EVENT_READ,
    Permission.EVENT_CREATE,
    Permission.EVENT_UPDATE,
    Permission.EVENT_DELETE,
    Permission.EVENT_PUBLISH,
    Permission.USER_READ,
    Permission.USER_UPDATE_ROLE,
  ],
};