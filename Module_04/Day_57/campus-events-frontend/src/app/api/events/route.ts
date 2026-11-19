
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const apiKey = process.env.CLASSROOM_API_KEY;

  if (!apiBaseUrl || !apiKey) {
    return NextResponse.json(
      { message: 'API URL or API key is not configured.' },
      { status: 500 },
    );
  }

  try {
    const body = await request.json();

    const response = await fetch(`${apiBaseUrl}/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
      },
      body: JSON.stringify(body),
      cache: 'no-store',
    });

    const result = await response.json().catch(() => ({}));

    return NextResponse.json(result, {
      status: response.status,
    });
  } catch {
    return NextResponse.json(
      { message: 'Unable to reach the events API.' },
      { status: 502 },
    );
  }
}
