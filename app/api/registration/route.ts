import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

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

    // Insert data với Prisma
    const registration = await prisma.registration.create({
      data: {
        fullName: data.fullName,
        studentId: data.studentId,
        phone: data.phone,
        email: data.email,
        facebookLink: data.facebookLink,
        house: data.house,
        major: data.major,
        experience: data.experience,
        goal: data.goal,
        expectation: data.expectation,
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
