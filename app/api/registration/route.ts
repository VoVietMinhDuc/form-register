import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import nodemailer from "nodemailer";
import type { Registration } from "@prisma/client";

async function sendConfirmationEmail(registration: Registration) {
  // Read SMTP config from env
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 587;
  const secure = process.env.SMTP_SECURE === "true"; // true for 465
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  // Recipient: prefer the registrant's email, otherwise fallback to MAIL_TO
  const defaultMailTo = process.env.MAIL_TO || "kdshuynh48964@gmail.com";
  const mailTo = registration?.email || defaultMailTo;
  const mailFrom = process.env.MAIL_FROM || user || `no-reply@localhost`;

  if (!host || !user || !pass) {
    console.warn("SMTP config not fully provided. Skipping email send.");
    return;
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
  });

  const subject = `Đăng ký RISE SPACE thành công`;
  const html = `
    <p>Xin chào <strong>${registration.fullName}</strong>,</p>
    <p>Bạn đã đăng ký tham gia <strong>RISE SPACE</strong> thành công. Thông tin đăng ký của bạn:</p>
    <ul>
      <li>MSSV: ${registration.studentId}</li>
      <li>SĐT: ${registration.phone}</li>
      <li>Email: ${registration.email}</li>
      <li>Facebook: ${registration.facebookLink}</li>
      <li>Nhà: ${registration.house}</li>
      <li>Chuyên ngành: ${registration.major}</li>
    </ul>
    <p>Chúc bạn một ngày tốt lành!</p>
  `;

  // Ensure we have at least one recipient
  if (!mailTo) {
    console.warn("No recipient email found, skipping send.");
    return;
  }

  const mailOptions = {
    from: mailFrom,
    to: mailTo,
    bcc: defaultMailTo && defaultMailTo !== mailTo ? defaultMailTo : undefined,
    subject,
    text: `Xin chao ${registration.fullName}, ban da dang ky RISE SPACE thanh cong.`,
    html,
  };

  try {
    // Optionally verify transporter first
    await transporter.verify();
    const info = await transporter.sendMail(mailOptions);
    console.log(
      "Confirmation email sent to",
      mailTo,
      "messageId:",
      info.messageId
    );
  } catch (err) {
    console.error("Failed to send confirmation email:", err);
  }
}

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

    // Try to send confirmation email (best-effort). Do not block returning success.
    sendConfirmationEmail(registration).catch((e) => {
      console.error("sendConfirmationEmail error:", e);
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
