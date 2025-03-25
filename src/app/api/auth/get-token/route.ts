import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const token = (await cookies()).get("token")?.value || null;
  return NextResponse.json({ success: true, token }, { status: 200 });
}
