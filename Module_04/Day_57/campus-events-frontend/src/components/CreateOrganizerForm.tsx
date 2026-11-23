'use client';

import { useState } from 'react';

export default function CreateOrganizerForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setSuccess('');

    if (password.length < 8) {
      setError('The temporary password must contain at least 8 characters.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/users/organizers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const result = await response.json();

      if (!response.ok) {
        setError(
          Array.isArray(result.message)
            ? result.message.join(' ')
            : result.message || 'Unable to create organizer account.',
        );
        return;
      }

      setSuccess(
        `Organizer account created successfully for ${result.user?.email || email}. Share the temporary password securely. The organizer must change it on first login.`,
      );

      setName('');
      setEmail('');
      setPassword('');
    } catch {
      setError('Unable to connect to the server. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="organizerName">Organizer name</label>
        <input
          id="organizerName"
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          maxLength={80}
          autoComplete="name"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="organizerEmail">Email address</label>
        <input
          id="organizerEmail"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          maxLength={254}
          autoComplete="email"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="temporaryPassword">Temporary password</label>
        <input
          id="temporaryPassword"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          minLength={8}
          maxLength={72}
          autoComplete="new-password"
          required
        />
      </div>

      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}

      <button type="submit" disabled={loading}>
        {loading ? 'Creating account...' : 'Create Organizer Account'}
      </button>
    </form>
  );
}