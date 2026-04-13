export const dynamic = "force-dynamic";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isBlocked: true, // تأكد أن هذا الحقل موجود في بريزما
        createdAt: true,
      },
    });
    // استخدم NextResponse.json لضمان إرسال JSON صحيح
    return NextResponse.json(users);
  } catch (error) {
    console.error("Fetch Users Error:", error);
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}

export async function POST(request) {
  const body = await request.json();
  const existing = await prisma.user.findUnique({
    where: { email: body.email },
  });

  if (existing) {
    return NextResponse.json(
      { message: "Email already in use" },
      { status: 409 },
    );
  }

  const hashedPassword = await bcrypt.hash(body.password, 10);
  const user = await prisma.user.create({
    data: {
      name: body.name,
      email: body.email,
      password: hashedPassword,
      role: "USER",
    },
  });
  return NextResponse.json({ id: user.id, email: user.email }, { status: 201 });
}
