import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import CreateOrganizerForm from '@/components/CreateOrganizerForm';

export default async function AdminOrganizersPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/login');
  }

  if (user.role !== 'ADMIN') {
    redirect('/events');
  }

  return (
    <main className="auth-page">
      <div className="auth-container">
        <h1 className="auth-heading">Manage Organizers</h1>

        <p>
          Create organizer accounts by providing the organizer's name,
          email address, and a temporary password.
        </p>

        <CreateOrganizerForm />
      </div>
    </main>
  );
}