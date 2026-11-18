export interface Event {
  id: string;
  title: string;
  description: string;
  location: string;
  eventDate: string;
  category: string;
  isPublished: boolean;
}

export interface Session {
  id: string;
  eventId: string;
  title: string;
  startsAt: string;
  endsAt: string;
  room: string;
}

export interface PaginatedEvents {
  items: Event[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
