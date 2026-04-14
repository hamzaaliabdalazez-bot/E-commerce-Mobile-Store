export const dynamic = "force-dynamic";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const product = await prisma.product.findUnique({
    where: { id: params.id },
    include: { category: true },
  });
  if (!product)
    return new Response(JSON.stringify({ message: "Product not found" }), {
      status: 404,
    });
  return new Response(JSON.stringify(product), { status: 200 });
}

export async function PATCH(request, { params }) {
  const body = await request.json();
  const product = await prisma.product.update({
    where: { id: params.id },
    data: body,
  });
  return new Response(JSON.stringify(product), { status: 200 });
}

// export async function DELETE(request, { params }) {
//   await prisma.product.delete({ where: { id: params.id } });
//   return new Response(null, { status: 204 });
// }

export async function DELETE(req, { params }) {
  try {
    const { id } = params;

    await prisma.product.delete({
      where: { id: id },
    });

    return NextResponse.json(
      { message: "Product deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Delete Error:", error);
    return NextResponse.json(
      { message: "Error deleting product" },
      { status: 500 },
    );
  }
}


export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();
    const { price, images } = body;

    // تحديث المنتج في قاعدة البيانات
    const updatedProduct = await prisma.product.update({
      where: { id: id },
      data: {
        price: price,
        images: images,
      },
    });

    return NextResponse.json(updatedProduct, { status: 200 });
  } catch (error) {
    console.error("Update Error:", error);

    // معالجة خطأ إذا كان المنتج غير موجود
    if (error.code === "P2025") {
      return NextResponse.json({ error: "المنتج غير موجود" }, { status: 404 });
    }

    return NextResponse.json(
      { error: "فشل في تحديث البيانات" },
      { status: 500 },
    );
  }
}
