// app/api/dishes/[id]/route.js

import { NextResponse } from "next/server";
import { getDish } from "@/lib/db";

export async function GET(request, { params }) {
  const { id } = await params;

  const dish = await getDish(id);

  if (!dish) {
    return NextResponse.json(
      {
        error: "Dish not found.",
      },
      {
        status: 404,
      }
    );
  }

  return NextResponse.json(dish);
}