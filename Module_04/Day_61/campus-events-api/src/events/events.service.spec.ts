
import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { EventsService } from './events.service';
import { UserRole } from '../users/types/user-role.enum.js';

describe('EventsService', () => {
  let service: EventsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventsService],
    }).compile();

    service = module.get<EventsService>(EventsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('event list visibility', () => {
    it('should exclude unpublished events from the public event list', () => {
      const result = service.findAll({});

      expect(result.items.some((event) => event.id === 'evt-104')).toBe(false);
    });

    it('should include unpublished events in the admin event list', () => {
      const admin = {
        id: 'admin-1',
        role: UserRole.ADMIN,
        mustChangePassword: false,
      };

      const result = service.findAll({}, admin);

      expect(result.items.some((event) => event.id === 'evt-104')).toBe(true);
    });

    it('should exclude unpublished events from the upcoming public list', () => {
      const result = service.findUpcoming(null);

      expect(result.some((event) => event.id === 'evt-104')).toBe(false);
    });

    it('should include upcoming unpublished events in the admin list', () => {
      const admin = {
        id: 'admin-1',
        role: UserRole.ADMIN,
        mustChangePassword: false,
      };

      const result = service.findUpcoming(admin);

      expect(result.some((event) => event.id === 'evt-104')).toBe(true);
    });
  });

  describe('event visibility', () => {
    it('should allow the public to view published events', () => {
      const event = service.findVisibleOne('evt-101', null);
      expect(event.isPublished).toBe(true);
    });

    it('should hide unpublished events from the public', () => {
      expect(() => service.findVisibleOne('evt-104', null)).toThrow(
        NotFoundException,
      );
    });

    it('should hide unpublished events from students', () => {
      const student = {
        id: 'student-1',
        role: UserRole.STUDENT,
        mustChangePassword: false,
      };

      expect(() => service.findVisibleOne('evt-104', student)).toThrow(
        NotFoundException,
      );
    });

    it('should allow admins to view unpublished events', () => {
      const admin = {
        id: 'admin-1',
        role: UserRole.ADMIN,
        mustChangePassword: false,
      };

      const event = service.findVisibleOne('evt-104', admin);
      expect(event.isPublished).toBe(false);
    });

    it('should allow organizers to view their own unpublished events', () => {
      const organizer = {
        id: 'organizer-1',
        role: UserRole.ORGANIZER,
        mustChangePassword: false,
      };

      const draft = service.create(
        {
          title: 'Organizer Test Draft',
          description: 'Testing organizer event visibility.',
          location: 'Main Campus',
          eventDate: '2026-12-20T09:00:00.000Z',
          category: 'technology',
          isPublished: false,
        },
        organizer.id,
      );

      const visibleEvent = service.findVisibleOne(draft.id, organizer);

      expect(visibleEvent.createdBy).toBe(organizer.id);
      expect(visibleEvent.isPublished).toBe(false);
    });

    it('should hide another organizer’s unpublished events', () => {
      const owner = {
        id: 'organizer-owner',
        role: UserRole.ORGANIZER,
        mustChangePassword: false,
      };

      const anotherOrganizer = {
        id: 'organizer-other',
        role: UserRole.ORGANIZER,
        mustChangePassword: false,
      };

      const draft = service.create(
        {
          title: 'Private Organizer Draft',
          description: 'Testing event ownership visibility.',
          location: 'Science Block',
          eventDate: '2026-12-21T09:00:00.000Z',
          category: 'science',
          isPublished: false,
        },
        owner.id,
      );

      expect(() =>
        service.findVisibleOne(draft.id, anotherOrganizer),
      ).toThrow(NotFoundException);
    });

    it('should hide an organizer’s own draft while they must change their password', () => {
      const organizer = {
        id: 'organizer-temporary',
        role: UserRole.ORGANIZER,
        mustChangePassword: false,
      };

      const draft = service.create(
        {
          title: 'Temporary Password Test Draft',
          description: 'Testing temporary password restrictions.',
          location: 'Business Block',
          eventDate: '2026-12-22T09:00:00.000Z',
          category: 'business',
          isPublished: false,
        },
        organizer.id,
      );

      expect(() =>
        service.findVisibleOne(draft.id, {
          ...organizer,
          mustChangePassword: true,
        }),
      ).toThrow(NotFoundException);
    });
  });
});
