import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Handle OPTIONS request for CORS
export async function OPTIONS() {
  return NextResponse.json(
    {},
    {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    }
  );
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    // Kiểm tra email đã tồn tại (case-insensitive)
    if (!data?.email) {
      return NextResponse.json({ success: false, error: "Email is required" }, { status: 400 });
    }

    // Use raw SQL LOWER(...) comparison to ensure case-insensitive match
    const existingRows = (await prisma.$queryRaw`
      SELECT * FROM registrations WHERE LOWER(email) = LOWER(${data.email}) LIMIT 1
    `) as any[];

    if (existingRows.length > 0) {
      return NextResponse.json({ success: false, error: "Email đã được sử dụng" }, { status: 409 });
    }

    // Validate required fields
    if (!data.fullName || !data.studentId || !data.phone || !data.email) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Insert data with Prisma
    const registration = await prisma.registration.create({
      data: {
        fullName: data.fullName,
        studentId: data.studentId,
        phone: data.phone,
        email: data.email,
        facebookLink: data.facebookLink || null,
        house: data.house || null,
        major: data.major || null,
        experience: data.experience || null,
        goal: data.goal || null,
        expectation: data.expectation || null,
      },
    });

    return NextResponse.json({ success: true, data: registration });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { success: false, error: "Database error" },
      { status: 500 }
    );
  }
}
