
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getEvent, getSession } from '@/services/eventService';
import type { Event, Session } from '@/types/event';

interface SessionDetailsPageProps {
  params: Promise<{
    id: string;
    sessionId: string;
  }>;
}

function formatDate(date: string) {
  return new Date(date).toLocaleString('en-US', {
    dateStyle: 'long',
    timeStyle: 'short',
  });
}

export default async function SessionDetailsPage({
  params,
}: SessionDetailsPageProps) {
  const { id, sessionId } = await params;

  let event: Event;
  let session: Session;

  try {
    [event, session] = await Promise.all([
      getEvent(id),
      getSession(id, sessionId),
    ]);
  } catch {
    notFound();
  }

  return (
    <main className="page-section">
      <div className="container">
        <Link
          href={`/events/${encodeURIComponent(id)}`}
          className="event-card-link"
        >
          ← Back to {event.title}
        </Link>

        <section className="event-details">
          <span className="eyebrow">SESSION DETAILS</span>

          <h1>{session.title}</h1>

          <div className="event-meta">
            <span>📅 Starts: {formatDate(session.startsAt)}</span>
            <span>🕒 Ends: {formatDate(session.endsAt)}</span>
            <span>📍 Room: {session.room}</span>
          </div>
        </section>

        <section className="sessions-section">
          <div className="section-heading">
            <span className="eyebrow">RELATED EVENT</span>
            <h2>{event.title}</h2>
            <p>{event.description}</p>
            <p>Location: {event.location}</p>
            <p>Event date: {formatDate(event.eventDate)}</p>
          </div>

          <Link
            href={`/events/${encodeURIComponent(id)}`}
            className="button button-primary"
          >
            View full event
          </Link>
        </section>
      </div>
    </main>
  );
}