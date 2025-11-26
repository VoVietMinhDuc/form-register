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
