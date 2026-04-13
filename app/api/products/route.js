import prisma from "@/lib/prisma";

export async function GET() {
  const products = await prisma.product.findMany({
    include: { category: true },
  });
  return new Response(JSON.stringify(products), { status: 200 });
}

export async function POST(request) {
  const body = await request.json();
  const product = await prisma.product.create({ data: body });
  return new Response(JSON.stringify(product), { status: 201 });
}
