import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-container">
        <Link href="/" className="brand">
          <span className="brand-icon">C</span>
          <span>Campus<span className="brand-accent">Connect</span></span>
        </Link>

        <nav className="nav-links" aria-label="Main navigation">
          <Link href="/">Home</Link>
          <Link href="/events">All Events</Link>
          <Link href="/create-event" className="nav-button">
            + Create Event
          </Link>
        </nav>
      </div>
    </header>
  );
}
