// app/api/orders/[id]/stream/route.js
import { NextResponse } from "next/server";
import { getOrder } from "@/lib/db";
import { getSession } from "@/lib/session";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(request, { params }) {
  const session = await getSession();

  if (!session) {
    return NextResponse.json(
      { error: "Authentication required." },
      { status: 401 }
    );
  }

  const { id } = await params;
  const initialOrder = await getOrder(id);

  // Do not reveal another user's order.
  if (!initialOrder || 
    (initialOrder.userId !== session.id && session.role !=="staff")) {
    return NextResponse.json(
      { error: "Order not found." },
      { status: 404 }
    );
  }

  const encoder = new TextEncoder();
  let timer;
  let closed = false;
  let lastStatus = initialOrder.status;
  let lastUpdatedAt = initialOrder.updatedAt ?? initialOrder.createdAt;

  const stream = new ReadableStream({
    start(controller) {
      function send(order) {
        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify(order)}\n\n`)
        );
      }

      function close() {
        if (closed) return;
        closed = true;
        clearInterval(timer);
        try {
          controller.close();
        } catch {
          // The connection may already be closed.
        }
      }

      // Seed the stream with the current server-side order.
      send(initialOrder);

      if (initialOrder.status === "DELIVERED") {
        close();
        return;
      }

      timer = setInterval(async () => {
        if (closed) return;

        try {
          const order = await getOrder(id);

          if (!order || 
            (order.userId !== session.id && session.role !=="staff")) {
            close();
            return;
          }

          const updatedAt = order.updatedAt ?? order.createdAt;

          if (
            order.status !== lastStatus ||
            updatedAt !== lastUpdatedAt
          ) {
            lastStatus = order.status;
            lastUpdatedAt = updatedAt;
            send(order);
          }

          if (order.status === "DELIVERED") {
            close();
          }
        } catch {
          close();
        }
      }, 3000);

      request.signal.addEventListener("abort", close, { once: true });
    },

    cancel() {
      closed = true;
      clearInterval(timer);
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
      "X-Accel-Buffering": "no",
    },
  });
}