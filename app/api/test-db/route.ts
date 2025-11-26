import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // Test connection bằng cách count records
    const count = await prisma.registration.count();

    return NextResponse.json({
      success: true,
      message: "Kết nối database thành công!",
      registrationCount: count,
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      {
        success: false,
        message: "Kết nối database thất bại!",
        error: errorMessage,
      },
      { status: 500 }
    );
  }
}
