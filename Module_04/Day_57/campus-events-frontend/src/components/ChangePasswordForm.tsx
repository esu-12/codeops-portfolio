'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ChangePasswordForm() {
  const router = useRouter();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');

    if (newPassword.length < 8) {
      setError('Your new password must contain at least 8 characters.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('The new passwords do not match.');
      return;
    }

    if (currentPassword === newPassword) {
      setError('Your new password must be different from your current password.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/auth/change-password', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setError(
          Array.isArray(result.message)
            ? result.message.join(' ')
            : result.message || 'Unable to change your password.',
        );
        return;
      }

      router.replace('/events');
      router.refresh();
    } catch {
      setError('Unable to connect to the server. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="currentPassword">Current temporary password</label>
        <input
          id="currentPassword"
          type="password"
          value={currentPassword}
          onChange={(event) => setCurrentPassword(event.target.value)}
          autoComplete="current-password"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="newPassword">New password</label>
        <input
          id="newPassword"
          type="password"
          value={newPassword}
          onChange={(event) => setNewPassword(event.target.value)}
          autoComplete="new-password"
          minLength={8}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="confirmPassword">Confirm new password</label>
        <input
          id="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          autoComplete="new-password"
          minLength={8}
          required
        />
      </div>

      {error && <p className="error-message">{error}</p>}

      <button type="submit" disabled={loading}>
        {loading ? 'Changing password...' : 'Change Password'}
      </button>
    </form>
  );
}