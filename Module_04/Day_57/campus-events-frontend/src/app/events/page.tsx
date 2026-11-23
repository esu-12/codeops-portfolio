
'use client';

import { useEffect, useMemo, useState } from 'react';
import EventCard from '@/components/EventCard';
import EventFilters from '@/components/EventFilters';
import Loading from '@/components/Loading';
import Pagination from '@/components/Pagination';
import SearchBar from '@/components/SearchBar';
import { getEvents } from '@/services/eventService';
import type { Event, PaginatedEvents } from '@/types/event';

const PAGE_SIZE = 6;

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [currentUser, setCurrentUser] = useState<{
    id: string;
    role: 'STUDENT' | 'ORGANIZER' | 'ADMIN';
  } | null>(null);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [isPublished, setIsPublished] = useState('');

  const [sortBy, setSortBy] = useState('eventDate');
  const [order, setOrder] = useState('asc');

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadEvents() {
      setLoading(true);
      setError('');

      try {
        const params: Record<string, string> = {
          page: String(page),
          limit: String(PAGE_SIZE),
          sortBy,
          order,
        };

        if (category) params.category = category;
        if (location) params.location = location;
        if (isPublished) params.isPublished = isPublished;

        const result: PaginatedEvents = await getEvents(params);

        setEvents(result.items);
        setTotal(result.total);
        setTotalPages(result.totalPages);
      } catch {
        setError('Unable to load events. Please check your connection and try again.');
        setEvents([]);
        setTotal(0);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    }

    loadEvents();
  }, [page, category, location, isPublished, sortBy, order]);

  const categories = useMemo(
    () => [
      ...new Set(
        events
          .map((event) => event.category)
          .filter(Boolean),
      ),
    ].sort(),
    [events],
  );

  useEffect(() => {
  async function loadCurrentUser() {
    try {
      const response = await fetch('/api/auth/profile', {
        cache: 'no-store',
      });

      if (!response.ok) return;

      const user = await response.json();

      setCurrentUser(user);
    } catch {
      setCurrentUser(null);
    }
  }

  loadCurrentUser();
}, []);

  const locations = useMemo(
    () => [
      ...new Set(
        events
          .map((event) => event.location)
          .filter(Boolean),
      ),
    ].sort(),
    [events],
  );

  const filteredEvents = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return events.filter((event) =>
      (event.title ?? '').toLowerCase().includes(normalizedSearch),
    );
  }, [events, search]);

  function updateFilter(
    setter: (value: string) => void,
    value: string,
  ) {
    setter(value);
    setPage(1);
  }

  return (
    <main className="page-section">
      <div className="container">
        <div className="section-heading">
          <span className="eyebrow">EXPLORE OUR CAMPUS</span>
          <h1>All Events</h1>
          <p>Discover events, workshops, conferences, and activities.</p>
        </div>

        <div className="events-toolbar">
          <SearchBar
            value={search}
            onChange={(value) => {
              setSearch(value);
              setPage(1);
            }}
          />

          <EventFilters
            category={category}
            location={location}
            isPublished={isPublished}
            categories={categories}
            locations={locations}
            onCategoryChange={(value) => updateFilter(setCategory, value)}
            onLocationChange={(value) => updateFilter(setLocation, value)}
            onPublishedChange={(value) => updateFilter(setIsPublished, value)}
          />

          <div className="sort-controls">
            <div className="filter-group">
              <label htmlFor="sort-by">Sort by</label>
              <select
                id="sort-by"
                value={sortBy}
                onChange={(event) => updateFilter(setSortBy, event.target.value)}
              >
                <option value="eventDate">Event date</option>
                <option value="title">Event title</option>
              </select>
            </div>

            <div className="filter-group">
              <label htmlFor="sort-order">Order</label>
              <select
                id="sort-order"
                value={order}
                onChange={(event) => updateFilter(setOrder, event.target.value)}
              >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>
          </div>
        </div>

        {!loading && !error && (
          <p className="results-count">
            Showing {filteredEvents.length} of {total} events
          </p>
        )}

        {loading ? (
          <Loading message="Loading campus events..." />
        ) : error ? (
          <div className="status-message error-message" role="alert">
            {error}
          </div>
        ) : filteredEvents.length === 0 ? (
          <div className="status-message">
            No events found. Try changing your search or filters.
          </div>
        ) : (
          <>
            <div className="event-grid">
              {filteredEvents.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  canManage={
                    currentUser?.role === 'ADMIN' ||
                    (currentUser?.role === 'ORGANIZER' &&
                      currentUser.id === event.createdBy)
                  }
                  onUpdated={(updated) =>
                    setEvents((current) =>
                      current.map((item) =>
                        item.id === updated.id ? updated : item,
                      ),
                    )
                  }
                  onDeleted={(eventId) => {
                    setEvents((current) =>
                      current.filter((item) => item.id !== eventId),
                    );
                    setTotal((current) => Math.max(0, current - 1));
                  }}
                />
              ))}
            </div>

            <Pagination
              page={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          </>
        )}
      </div>
    </main>
  );
}
