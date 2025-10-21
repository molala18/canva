import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    serverId: process.env.SERVER_ID || "UNKNOWN",
    serverColor: process.env.SERVER_COLOR || "#6b7280",
    timestamp: new Date().toISOString(),
  });
}
