
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getEvent, getEventSessions } from '@/services/eventService';
import type { Event, Session } from '@/types/event';

interface EventDetailsPageProps {
  params: Promise<{ id: string }>;
}

function formatDate(date: string) {
  return new Date(date).toLocaleString('en-US', {
    dateStyle: 'long',
    timeStyle: 'short',
  });
}

export default async function EventDetailsPage({
  params,
}: EventDetailsPageProps) {
  const { id } = await params;

  let event: Event;
  let sessions: Session[];

  try {
    [event, sessions] = await Promise.all([
      getEvent(id),
      getEventSessions(id),
    ]);
  } catch {
    notFound();
  }

  return (
    <main className="page-section">
      <div className="container">
        <Link href="/events" className="event-card-link">
          ← Back to All Events
        </Link>

        <section className="event-details">
          <span className="event-category">{event.category}</span>

          <h1>{event.title}</h1>

          <p className="event-description">
            {event.description}
          </p>

          <div className="event-meta">
            <span>📅 {formatDate(event.eventDate)}</span>
            <span>📍 {event.location}</span>
            <span>
              {event.isPublished ? 'Published' : 'Unpublished'}
            </span>
          </div>
        </section>

        <section className="sessions-section">
          <div className="section-heading">
            <span className="eyebrow">EVENT PROGRAM</span>
            <h2>Event Sessions</h2>
            <p>Explore the sessions scheduled for this event.</p>
          </div>

          {sessions.length === 0 ? (
            <div className="status-message">
              No sessions have been scheduled for this event yet.
            </div>
          ) : (
            <div className="event-grid">
              {sessions.map((session) => (
                <article className="event-card" key={session.id}>
                  <div className="event-card-content">
                    <h3>{session.title}</h3>

                    <div className="event-meta">
                      <span>
                        🕒 {formatDate(session.startsAt)}
                      </span>
                      <span>
                        🕒 Ends: {formatDate(session.endsAt)}
                      </span>
                      <span>📍 {session.room}</span>
                    </div>

                    <Link
                      href={`/events/${encodeURIComponent(id)}/sessions/${encodeURIComponent(session.id)}`}
                      className="event-card-link"
                    >
                      View session details →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
