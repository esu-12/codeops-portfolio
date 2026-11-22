
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  if (!apiBaseUrl) {
    return NextResponse.json(
      { message: 'API URL is not configured.' },
      { status: 500 },
    );
  }

  try {
    const body = await request.json();

    const response = await fetch(`${apiBaseUrl}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
      cache: 'no-store',
    });

    const result = await response.json().catch(() => ({}));

    if (!response.ok) {
      return NextResponse.json(result, {
        status: response.status,
      });
    }

    const { access_token, user } = result;

    if (!access_token || !user) {
      return NextResponse.json(
        { message: 'Invalid authentication response.' },
        { status: 502 },
      );
    }

    const nextResponse = NextResponse.json({ user });

    nextResponse.cookies.set('access_token', access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60,
    });

    return nextResponse;
  } catch {
    return NextResponse.json(
      { message: 'Unable to reach the authentication server.' },
      { status: 502 },
    );
  }
}
