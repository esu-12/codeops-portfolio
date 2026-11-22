import { cookies } from 'next/headers';

export interface CurrentUser {
  id: string;
  name?: string;
  email: string;
  role: 'STUDENT' | 'ORGANIZER' | 'ADMIN';
}

export async function getCurrentUser(): Promise<CurrentUser | null> {
  const token = (await cookies()).get('access_token')?.value;
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  if (!token || !apiBaseUrl) {
    return null;
  }

  try {
    const response = await fetch(`${apiBaseUrl}/auth/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      return null;
    }

    return (await response.json()) as CurrentUser;
  } catch {
    return null;
  }
}