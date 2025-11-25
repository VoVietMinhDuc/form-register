import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const data = await request.json();

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
