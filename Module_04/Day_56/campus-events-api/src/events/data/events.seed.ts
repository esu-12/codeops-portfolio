import { Event } from '../types/event.interface';

export const events: Event[] = [
  {
    id: 'evt-101',
    title: 'Technology Innovation Day',
    description: 'Explore emerging technologies and digital innovation.',
    location: 'Main Campus',
    eventDate: '2026-12-04T09:00:00.000Z',
    category: 'technology',
    isPublished: true,
  },
  {
    id: 'evt-102',
    title: 'Business Leadership Conference',
    description: 'Learn leadership and entrepreneurship skills.',
    location: 'Business Block',
    eventDate: '2026-12-10T10:00:00.000Z',
    category: 'business',
    isPublished: true,
  },
  {
    id: 'evt-103',
    title: 'Campus Sports Festival',
    description: 'A celebration of sports and student teamwork.',
    location: 'Sports Ground',
    eventDate: '2026-11-20T08:00:00.000Z',
    category: 'sports',
    isPublished: true,
  },
  {
    id: 'evt-104',
    title: 'Environmental Awareness Workshop',
    description: 'Discuss sustainability and environmental protection.',
    location: 'Science Block',
    eventDate: '2026-12-15T09:00:00.000Z',
    category: 'environment',
    isPublished: false,
  },
  {
    id: 'evt-105',
    title: 'Student Cultural Day',
    description: 'Celebrate cultural diversity through music and art.',
    location: 'Main Campus',
    eventDate: '2026-10-15T09:00:00.000Z',
    category: 'culture',
    isPublished: true,
  },
];