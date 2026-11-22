import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import CreateEventForm from './CreateEventForm';

export default async function CreateEventPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/login');
  }

  if (user.role !== 'ORGANIZER' && user.role !== 'ADMIN') {
    redirect('/events');
  }

  return <CreateEventForm />;
}