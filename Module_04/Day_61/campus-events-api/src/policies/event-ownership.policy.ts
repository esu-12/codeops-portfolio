
import { ForbiddenException, Injectable } from '@nestjs/common';
import type { Event } from '../events/types/event.interface.js';
import { UserRole } from '../users/types/user-role.enum.js';

export interface PolicyUser {
  id: string;
  role: UserRole;
}

@Injectable()
export class EventOwnershipPolicy {
  canManage(user: PolicyUser, event: Event): boolean {
    // Administrators can manage every event.
    if (user.role === UserRole.ADMIN) {
      return true;
    }

    // Organizers can manage only events they created.
    if (user.role === UserRole.ORGANIZER) {
      return event.createdBy === user.id;
    }

    return false;
  }

  assertCanManage(user: PolicyUser, event: Event): void {
    if (!this.canManage(user, event)) {
      throw new ForbiddenException(
        'You can only manage events that you own',
      );
    }
  }
}