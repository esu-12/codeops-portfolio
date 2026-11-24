
import { ForbiddenException } from '@nestjs/common';
import { EventOwnershipPolicy } from './event-ownership.policy.js';
import { UserRole } from '../users/types/user-role.enum.js';
import type { Event } from '../events/types/event.interface.js';

describe('EventOwnershipPolicy', () => {
  let policy: EventOwnershipPolicy;

  const event: Event = {
    id: 'evt-101',
    title: 'Technology Innovation Day',
    description: 'Explore emerging technologies.',
    location: 'Main Campus',
    eventDate: '2026-12-04T09:00:00.000Z',
    category: 'technology',
    isPublished: true,
    createdBy: 'organizer-1',
  };

  beforeEach(() => {
    policy = new EventOwnershipPolicy();
  });

  it('allows an admin to manage any event', () => {
    expect(
      policy.canManage(
        { id: 'admin-1', role: UserRole.ADMIN },
        event,
      ),
    ).toBe(true);
  });

  it('allows an organizer to manage their own event', () => {
    expect(
      policy.canManage(
        { id: 'organizer-1', role: UserRole.ORGANIZER },
        event,
      ),
    ).toBe(true);
  });

  it('denies an organizer access to another organizer event', () => {
    expect(
      policy.canManage(
        { id: 'organizer-2', role: UserRole.ORGANIZER },
        event,
      ),
    ).toBe(false);
  });

  it('denies students from managing events', () => {
    expect(
      policy.canManage(
        { id: 'student-1', role: UserRole.STUDENT },
        event,
      ),
    ).toBe(false);
  });

  it('throws ForbiddenException when management is denied', () => {
    expect(() =>
      policy.assertCanManage(
        { id: 'organizer-2', role: UserRole.ORGANIZER },
        event,
      ),
    ).toThrow(ForbiddenException);
  });
});
