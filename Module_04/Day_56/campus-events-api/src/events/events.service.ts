import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { Event } from './types/event.interface';
import { Session } from './types/session.interface';

import { events } from './data/events.seed';
import { sessions } from './data/sessions.seed';

export interface FindEventsQuery {
  category?: string;
  location?: string;
  isPublished?: string;
  sortBy?: string;
  order?: string;
  page?: string;
  limit?: string;
}

@Injectable()
export class EventsService {
  // Return all events with filtering, sorting and pagination
  findAll(query: FindEventsQuery) {
    let result = [...events];

    // 1. Filter by category
    if (query.category) {
      result = result.filter(
        (event) =>
          event.category.toLowerCase() === query.category!.toLowerCase(),
      );
    }

    // 2. Filter by location
    if (query.location) {
      result = result.filter((event) =>
        event.location.toLowerCase().includes(query.location!.toLowerCase()),
      );
    }

    // 3. Filter by publication status
    if (query.isPublished !== undefined) {
      if (!['true', 'false'].includes(query.isPublished)) {
        throw new BadRequestException(
          'isPublished must be true or false',
        );
      }

      const published = query.isPublished === 'true';

      result = result.filter(
        (event) => event.isPublished === published,
      );
    }

    // 4. Validate sorting options
    const sortBy = query.sortBy ?? 'eventDate';
    const order = query.order ?? 'asc';

    if (!['eventDate', 'title'].includes(sortBy)) {
      throw new BadRequestException(
        'sortBy must be eventDate or title',
      );
    }

    if (!['asc', 'desc'].includes(order)) {
      throw new BadRequestException(
        'order must be asc or desc',
      );
    }

    // 5. Sort a copy of the filtered result
    result = [...result].sort((a, b) => {
      const comparison =
        sortBy === 'title'
          ? a.title.localeCompare(b.title)
          : new Date(a.eventDate).getTime() -
            new Date(b.eventDate).getTime();

      return order === 'asc' ? comparison : -comparison;
    });

    // 6. Validate pagination
    const page = query.page === undefined ? 1 : Number(query.page);
    const limit = query.limit === undefined ? 5 : Number(query.limit);

    if (
      !Number.isSafeInteger(page) ||
      !Number.isSafeInteger(limit) ||
      page < 1 ||
      limit < 1
    ) {
      throw new BadRequestException(
        'page and limit must be positive integers',
      );
    }

    // 7. Paginate after filtering and sorting
    const total = result.length;
    const offset = (page - 1) * limit;

    const items = result.slice(offset, offset + limit);

    return {
      items,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  // Return events whose date is today or later
  findUpcoming() {
    const today = new Date();

    return events.filter(
      (event) => new Date(event.eventDate) >= today,
    );
  }

  // Find one event by ID
  findOne(id: string): Event {
    const event = events.find((item) => item.id === id);

    if (!event) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }

    return event;
  }

  // Find all sessions belonging to an event
  findSessions(eventId: string): Session[] {
    this.findOne(eventId);

    return sessions.filter(
      (session) => session.eventId === eventId,
    );
  }

  // Find one session belonging to a specific event
  findOneSession(eventId: string, sessionId: string): Session {
    this.findOne(eventId);

    const session = sessions.find(
      (item) =>
        item.id === sessionId && item.eventId === eventId,
    );

    if (!session) {
      throw new NotFoundException(
        `Session ${sessionId} not found for event ${eventId}`,
      );
    }

    return session;
  }

  // Create a new event
  create(data: Omit<Event, 'id'>): Event {
    const newEvent: Event = {
      id: `evt-${Date.now()}`,
      ...data,
    };

    events.push(newEvent);

    return newEvent;
  }
}