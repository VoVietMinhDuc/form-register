import type { Metadata } from "next";
import { Geist, Geist_Mono, Be_Vietnam_Pro } from "next/font/google";
import { LenisProvider } from "@/components/providers/LenisProvider";
import { ToasterProvider } from "@/components/providers/ToasterProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const beVietnam = Be_Vietnam_Pro({
  variable: "--font-phoenix",
  subsets: ["vietnamese"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Phoenix House",
<<<<<<< HEAD
  description:
    "Landing page Phoenix House với tinh thần tái sinh, quyền năng và bùng nổ năng lượng.",
=======
  description: "Phoenix House Information",
>>>>>>> 42bcc281e0bd2347cd4a968b025020fbb50fc214
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${beVietnam.variable} phoenix-scroll antialiased min-h-screen bg-[#050505] text-white`}
      >
        <LenisProvider>
          {children}
          <ToasterProvider />
        </LenisProvider>
      </body>
    </html>
  );
}
