import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import ChangePasswordForm from '@/components/ChangePasswordForm';

export default async function ChangePasswordPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/login');
  }

  if (!user.mustChangePassword) {
    redirect('/events');
  }

  return (
    <main className="auth-page">
      <div className="auth-container">
        <h1 className="auth-heading">Change Your Password</h1>
        <p>
          Your organizer account uses a temporary password.
          Create a new password before continuing.
        </p>

        <ChangePasswordForm />
      </div>
    </main>
  );
}