// app/api/dishes/route.js

import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  const dishes = await db.dish.findMany();

  return NextResponse.json(dishes);
}