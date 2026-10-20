// app/api/menu/route.js
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const dishes = await db.dish.findMany();

    return NextResponse.json({
      success: true,
      data: dishes,
    });
  } catch (error) {
    console.error("Failed to fetch menu:", error);

    return NextResponse.json(
      { success: false, message: "Failed to load menu." },
      { status: 500 }
    );
  }
}