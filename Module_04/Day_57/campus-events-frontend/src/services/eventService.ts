import type { Event, PaginatedEvents, Session } from '@/types/event';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

async function request<T>(endpoint: string, options?: RequestInit): Promise<T> {
  if (!API_BASE_URL) {
    throw new Error('API URL is not configured. Check your .env.local file.');
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status} ${response.statusText}`);
  }

  return response.json() as Promise<T>;
}

export function getEvents(
  params: Record<string, string> = {},
): Promise<PaginatedEvents> {
  const query = new URLSearchParams(params).toString();
  return request<PaginatedEvents>(`/events${query ? `?${query}` : ''}`);
}

export function getUpcomingEvents(): Promise<Event[]> {
  return request<Event[]>('/events/upcoming');
}

export function getEvent(id: string): Promise<Event> {
  return request<Event>(`/events/${encodeURIComponent(id)}`);
}

export function getEventSessions(id: string): Promise<Session[]> {
  return request<Session[]>(`/events/${encodeURIComponent(id)}/sessions`);
}

export function getSession(
  eventId: string,
  sessionId: string,
): Promise<Session> {
  return request<Session>(
    `/events/${encodeURIComponent(eventId)}/sessions/${encodeURIComponent(sessionId)}`,
  );
}


export async function createEvent(
  data: Omit<Event, 'id'>,
): Promise<Event> {
  const response = await fetch('/api/events', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    cache: 'no-store',
  });

  if (!response.ok) {
    const result = await response.json().catch(() => null);

    throw new Error(
      result?.message ?? `API request failed: ${response.status} ${response.statusText}`,
    );
  }

  return response.json() as Promise<Event>;
}
