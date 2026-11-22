import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const token = request.cookies.get('access_token')?.value;

  if (!token) {
    return NextResponse.json(
      { message: 'Not authenticated.' },
      { status: 401 },
    );
  }

  if (!apiBaseUrl) {
    return NextResponse.json(
      { message: 'API URL is not configured.' },
      { status: 500 },
    );
  }

  try {
    const response = await fetch(`${apiBaseUrl}/auth/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: 'no-store',
    });

    const result = await response.json().catch(() => ({}));

    return NextResponse.json(result, {
      status: response.status,
    });
  } catch {
    return NextResponse.json(
      { message: 'Unable to reach the authentication server.' },
      { status: 502 },
    );
  }
}