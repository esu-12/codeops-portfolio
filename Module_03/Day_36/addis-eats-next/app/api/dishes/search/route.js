import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = (searchParams.get("q") || "").trim();
  const page = Math.max(1, Number(searchParams.get("page")) || 1);
  const pageSize = 2;

  const dishes = await db.dish.findMany();

  const filtered = dishes.filter((dish) =>
    `${dish.name} ${dish.description} ${dish.category}`
      .toLowerCase()
      .includes(query.toLowerCase())
  );

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * pageSize;

  return NextResponse.json({
    items: filtered.slice(start, start + pageSize),
    page: safePage,
    pageSize,
    total,
    totalPages,
    query,
  });
}
