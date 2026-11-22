// src/components/EventManagement.tsx
'use client';

import { useState } from 'react';
import {
  deleteEvent,
  publishEvent,
  updateEvent,
} from '@/services/eventService';
import type { Event } from '@/types/event';

interface EventManagementProps {
  event: Event;
  onUpdated: (event: Event) => void;
  onDeleted: (eventId: string) => void;
}

export default function EventManagement({
  event,
  onUpdated,
  onDeleted,
}: EventManagementProps) {
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [title, setTitle] = useState(event.title);
  const [description, setDescription] = useState(event.description);
  const [location, setLocation] = useState(event.location);
  const [eventDate, setEventDate] = useState(
    event.eventDate.slice(0, 16),
  );
  const [category, setCategory] = useState(event.category);

  async function handleUpdate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const updated = await updateEvent(event.id, {
        title,
        description,
        location,
        eventDate: new Date(eventDate).toISOString(),
        category,
      });

      onUpdated(updated);
      setEditing(false);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Unable to update event.',
      );
    } finally {
      setLoading(false);
    }
  }

  async function handlePublish() {
    setLoading(true);
    setError('');

    try {
      const updated = await publishEvent(
        event.id,
        !event.isPublished,
      );

      onUpdated(updated);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Unable to update publication.',
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${event.title}"?`,
    );

    if (!confirmed) return;

    setLoading(true);
    setError('');

    try {
      await deleteEvent(event.id);
      onDeleted(event.id);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Unable to delete event.',
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="event-management">
      {error && (
        <p className="status-message error-message" role="alert">
          {error}
        </p>
      )}

      {editing ? (
        <form onSubmit={handleUpdate} className="event-management-form">
          <label>
            Event title
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </label>

          <label>
            Description
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </label>

          <label>
            Location
            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </label>

          <label>
            Event date
            <input
              type="datetime-local"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
              required
            />
          </label>

          <label>
            Category
            <input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
          </label>

          <button type="submit" disabled={loading}>
            {loading ? 'Saving...' : 'Save changes'}
          </button>

          <button
            type="button"
            onClick={() => setEditing(false)}
            disabled={loading}
          >
            Cancel
          </button>
        </form>
      ) : (
        <div className="event-management-actions">
          <button
            type="button"
            onClick={() => setEditing(true)}
            disabled={loading}
          >
            Edit
          </button>

          <button
            type="button"
            onClick={handlePublish}
            disabled={loading}
          >
            {event.isPublished ? 'Unpublish' : 'Publish'}
          </button>

          <button
            type="button"
            onClick={handleDelete}
            disabled={loading}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}