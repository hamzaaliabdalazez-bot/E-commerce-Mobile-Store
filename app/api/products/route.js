import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
export async function POST(request) {
  try {
    const body = await request.json();
    const { name, description, price, categoryId, images, slug } = body;

    const newProduct = await prisma.product.create({
      data: {
        name,
        slug,
        description,
        price: parseFloat(price),
        images: images,
        // هذه الطريقة تضمن أنه سيضيف القسم فقط إذا كان الـ ID صالحاً وموجوداً
        ...(categoryId && categoryId.length === 24 ? { categoryId } : {}),
      },
    });

    return new Response(JSON.stringify(newProduct), { status: 201 });
  } catch (error) {
    console.error("خطأ في Prisma:", error.message);
    return new Response(
      JSON.stringify({ error: "فشل في إنشاء المنتج. تأكد من صحة Category ID" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      include: { category: true }, // إذا كنت تريد جلب القسم أيضاً
      orderBy: { createdAt: "desc" },
    });

    // تأكد من استخدام NextResponse.json
    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json([], { status: 500 });
  }
}
