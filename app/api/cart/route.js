import prisma from "@/lib/prisma";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");
  if (!userId) {
    return new Response(JSON.stringify({ message: "Missing userId" }), {
      status: 400,
    });
  }
  const cart = await prisma.cart.findUnique({ where: { userId } });
  return new Response(JSON.stringify(cart || { items: [] }), { status: 200 });
}

export async function POST(request) {
  const body = await request.json();
  const { userId, items } = body;
  if (!userId || !items) {
    return new Response(JSON.stringify({ message: "Missing data" }), {
      status: 400,
    });
  }
  const cart = await prisma.cart.upsert({
    where: { userId },
    update: { items },
    create: { userId, items },
  });
  return new Response(JSON.stringify(cart), { status: 200 });
}
