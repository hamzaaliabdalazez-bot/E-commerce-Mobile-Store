export const dynamic = "force-dynamic";
import prisma from "@/lib/prisma";

export async function PATCH(request, { params }) {
  const body = await request.json();
  const updated = await prisma.order.update({
    where: { id: params.id },
    data: body,
  });
  return new Response(JSON.stringify(updated), { status: 200 });
}

export async function DELETE(request, { params }) {
  await prisma.order.delete({ where: { id: params.id } });
  return new Response(null, { status: 204 });
}
