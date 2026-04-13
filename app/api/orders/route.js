import prisma from "@/lib/prisma";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");
  const products = await prisma.order.findMany({
    where: userId ? { userId } : {},
    orderBy: { createdAt: "desc" },
  });
  return new Response(JSON.stringify(products), { status: 200 });
}

export async function POST(request) {
  const body = await request.json();
  const order = await prisma.order.create({ data: body });
  return new Response(JSON.stringify(order), { status: 201 });
}
