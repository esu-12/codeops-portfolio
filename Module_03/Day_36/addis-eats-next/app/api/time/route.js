// app/api/time/route.js

import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    message: "Time API is working",
    timestamp: new Date().toISOString(),
  });
}
