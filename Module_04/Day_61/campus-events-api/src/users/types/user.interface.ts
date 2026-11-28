import type { UserRole } from './user-role.enum.js';

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  refreshHash?: string;
  role: UserRole;
  mustChangePassword: boolean;
  createdAt: Date;
}
