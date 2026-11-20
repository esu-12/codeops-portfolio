import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import type { User } from './types/user.interface.js';
import { UserRole } from './types/user-role.enum.js';

@Injectable()
export class UsersService {
  private readonly users: User[] = [];

  findByEmail(email: string): User | undefined {
    return this.users.find(
      (user) => user.email === email.toLowerCase(),
    );
  }

  findById(id: string): User | undefined {
    return this.users.find((user) => user.id === id);
  }

  create(
    name: string,
    email: string,
    hashedPassword: string,
    role: UserRole = UserRole.STUDENT,
  ): User {
    const normalizedEmail = email.toLowerCase();

    if (this.findByEmail(normalizedEmail)) {
      throw new ConflictException('Email is already registered');
    }

    const user: User = {
      id: randomUUID(),
      name,
      email: normalizedEmail,
      password: hashedPassword,
      role,
      createdAt: new Date(),
    };

    this.users.push(user);
    return user;
  }

  findAll(): User[] {
    return [...this.users];
  }

  updateRole(id: string, role: UserRole): User {
  const user = this.findById(id);

  if (!user) {
    throw new NotFoundException('User not found');
  }

  user.role = role;
  return user;
}

  remove(id: string): void {
    const index = this.users.findIndex((user) => user.id === id);

    if (index === -1) {
      throw new NotFoundException('User not found');
    }

    this.users.splice(index, 1);
  }
}
