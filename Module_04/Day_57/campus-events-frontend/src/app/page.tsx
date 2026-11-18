import Link from 'next/link';
import EventCard from '@/components/EventCard';
import { getUpcomingEvents } from '@/services/eventService';
import type { Event } from '@/types/event';

export default async function Home() {
  let events: Event[] = [];
  let error = '';

  try {
    const upcomingEvents = await getUpcomingEvents();

    events = upcomingEvents
      .filter((event) => event.isPublished)
      .sort(
        (a, b) =>
          new Date(a.eventDate).getTime() -
          new Date(b.eventDate).getTime(),
      )
      .slice(0, 3);
  } catch {
    error = 'Unable to load upcoming events. Please try again later.';
  }

  return (
    <main>
      <section className="hero">
        <div className="container hero-content">
          <span className="hero-label">YOUR CAMPUS, YOUR COMMUNITY</span>

          <h1>
            Discover What&apos;s
            <span> Happening on Campus</span>
          </h1>

          <p>
            Explore exciting campus events, learn new skills, meet people,
            and be part of something meaningful.
          </p>

          <div className="hero-actions">
            <Link href="/events" className="button">
              Explore Events →
            </Link>

            <Link href="/create-event" className="button button-secondary">
              + Create an Event
            </Link>
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="container">
          <div className="section-top">
            <div className="section-heading">
              <span className="eyebrow">DON&apos;T MISS OUT</span>
              <h2>Upcoming Events</h2>
              <p>Find your next campus experience.</p>
            </div>

            <Link href="/events" className="view-all-link">
              View all events →
            </Link>
          </div>

          {error ? (
            <div className="status-message error-message" role="alert">
              {error}
            </div>
          ) : events.length === 0 ? (
            <div className="status-message">
              No upcoming published events are available right now.
            </div>
          ) : (
            <div className="event-grid">
              {events.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="home-cta">
        <div className="container home-cta-content">
          <div>
            <h2>Have an event to share?</h2>
            <p>Bring your campus community together. Create an event today.</p>
          </div>

          <Link href="/create-event" className="button">
            Create Event →
          </Link>
        </div>
      </section>
    </main>
  );
}
