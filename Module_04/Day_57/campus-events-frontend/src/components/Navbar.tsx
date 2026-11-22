import Link from 'next/link';
import { getCurrentUser } from '@/lib/auth';
import LogoutButton from './LogoutButton';

export default async function Navbar() {
  const user = await getCurrentUser();

  const canCreateEvents =
    user?.role === 'ORGANIZER' || user?.role === 'ADMIN';

  return (
    <header className="navbar">
      <div className="navbar-container">
        <Link href="/" className="brand">
          <span className="brand-icon">C</span>
          <span>
            Campus<span className="brand-accent">Connect</span>
          </span>
        </Link>

        <nav className="nav-links" aria-label="Main navigation">
          <Link href="/">Home</Link>
          <Link href="/events">All Events</Link>

          {canCreateEvents && (
            <Link href="/create-event" className="nav-button">
              + Create Event
            </Link>
          )}

          {user ? (
            <>
              <span className="nav-user">
                {user.name || user.email} ({user.role})
              </span>
              <LogoutButton />
            </>
          ) : (
            <>
              <Link href="/login">Login</Link>
              <Link href="/register" className="nav-button">
                Register
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}