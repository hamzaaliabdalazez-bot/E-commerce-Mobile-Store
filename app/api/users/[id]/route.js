import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
  try {
    const { id } = params; // تأكد أن المجلد اسمه [id]
    await prisma.user.delete({ where: { id } });
    return NextResponse.json({ message: "User deleted" });
  } catch (error) {
    return NextResponse.json(
      { message: "Error deleting user" },
      { status: 500 },
    );
  }
}

export async function PATCH(req, { params }) {
  try {
    const { id } = params;
    const { isBlocked } = await req.json();

    const updatedUser = await prisma.user.update({
      where: { id },
      data: { isBlocked },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    return NextResponse.json(
      { message: "Error updating user" },
      { status: 500 },
    );
  }
}
