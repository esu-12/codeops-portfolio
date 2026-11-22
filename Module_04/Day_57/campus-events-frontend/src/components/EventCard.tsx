// src/components/EventCard.tsx
import Link from 'next/link';
import EventManagement from '@/components/EventManagement';
import type { Event } from '@/types/event';

interface EventCardProps {
  event: Event;
  canManage?: boolean;
  onUpdated?: (event: Event) => void;
  onDeleted?: (eventId: string) => void;
}

export default function EventCard({
  event,
  canManage,
  onUpdated,
  onDeleted,
}: EventCardProps) {
  const eventDate = new Date(event.eventDate);

  const formattedDate = eventDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  const formattedTime = eventDate.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  });

  return (
    <article className="event-card">
      <div className="event-card-content">
        <span className="event-category">{event.category}</span>

        <h3>{event.title}</h3>

        <p className="event-description">{event.description}</p>

        <div className="event-meta">
          <span>📅 {formattedDate} · {formattedTime}</span>
          <span>📍 {event.location}</span>
        </div>

        <Link
          href={`/events/${encodeURIComponent(event.id)}`}
          className="event-card-link"
        >
          View event details →
        </Link>

        {canManage && onUpdated && onDeleted && (
          <EventManagement
            event={event}
            onUpdated={onUpdated}
            onDeleted={onDeleted}
          />
        )}
      </div>
    </article>
  );
}