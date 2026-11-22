// src/app/api/events/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';

type RouteContext = {
  params: Promise<{ id: string }>;
};

async function forwardRequest(
  request: NextRequest,
  context: RouteContext,
  method: 'PATCH' | 'DELETE',
  endpoint = '',
) {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const token = request.cookies.get('access_token')?.value;

  if (!token) {
    return NextResponse.json(
      { message: 'Please log in first.' },
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
    const { id } = await context.params;
    const body =
      method === 'PATCH' ? await request.json() : undefined;

    const response = await fetch(
      `${apiBaseUrl}/events/${encodeURIComponent(id)}${endpoint}`,
      {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          ...(body ? { 'Content-Type': 'application/json' } : {}),
        },
        ...(body ? { body: JSON.stringify(body) } : {}),
        cache: 'no-store',
      },
    );

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

export async function PATCH(
  request: NextRequest,
  context: RouteContext,
) {
  return forwardRequest(request, context, 'PATCH');
}

export async function DELETE(
  request: NextRequest,
  context: RouteContext,
) {
  return forwardRequest(request, context, 'DELETE');
}