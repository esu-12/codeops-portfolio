
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createEvent } from '@/services/eventService';

export default function CreateEventPage() {
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [category, setCategory] = useState('technology');
  const [isPublished, setIsPublished] = useState(true);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await createEvent({
        title: title.trim(),
        description: description.trim(),
        location: location.trim(),
        eventDate: new Date(eventDate).toISOString(),
        category,
        isPublished,
      });

      setSuccess('Event created successfully!');

      setTitle('');
      setDescription('');
      setLocation('');
      setEventDate('');
      setCategory('technology');
      setIsPublished(true);

      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Unable to create event. Please try again.',
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="page-section">
      <div className="container">
        <div className="section-heading">
          <span className="eyebrow">CAMPUSCONNECT</span>
          <h1>Create an Event</h1>
          <p>Share a new event with your campus community.</p>
        </div>

        <form className="event-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Event title</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter event title"
              required
              minLength={3}
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your event"
              rows={5}
              required
              minLength={10}
            />
          </div>

          <div className="form-group">
            <label htmlFor="location">Location</label>
            <input
              id="location"
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter event location"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="eventDate">Event date and time</label>
            <input
              id="eventDate"
              type="datetime-local"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="technology">Technology</option>
              <option value="business">Business</option>
              <option value="sports">Sports</option>
              <option value="environment">Environment</option>
              <option value="culture">Culture</option>
            </select>
          </div>

          <div className="form-checkbox">
            <input
              id="isPublished"
              type="checkbox"
              checked={isPublished}
              onChange={(e) => setIsPublished(e.target.checked)}
            />
            <label htmlFor="isPublished">Publish this event</label>
          </div>

          {error && (
            <p className="form-message error-message" role="alert">
              {error}
            </p>
          )}

          {success && (
            <p className="form-message success-message" role="status">
              {success}
            </p>
          )}

          <button
            type="submit"
            className="button button-primary"
            disabled={loading}
          >
            {loading ? 'Creating event...' : 'Create Event'}
          </button>

          <Link href="/events" className="form-cancel-link">
            Cancel and return to events
          </Link>
        </form>
      </div>
    </main>
  );
}