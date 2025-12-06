import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email")?.trim();

    if (!email) {
      return NextResponse.json({ success: false, error: "Missing email query" }, { status: 400 });
    }

    // Use raw SQL LOWER(...) comparison to ensure case-insensitive match
    const rows = (await prisma.$queryRaw`
      SELECT * FROM registrations WHERE LOWER(email) = LOWER(${email}) LIMIT 1
    `) as any[];

    return NextResponse.json({ success: true, exists: rows.length > 0 });
  } catch (error: any) {
    console.error("check-email error:", error);
    return NextResponse.json({ success: false, error: error?.message ?? "Server error" }, { status: 500 });
  }
}
