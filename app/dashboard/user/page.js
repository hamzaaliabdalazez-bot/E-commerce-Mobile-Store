import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import ContainerLayout from "@/components/layout/ContainerLayout";

import prisma from "@/lib/prisma";
import User from "./User";

export const revalidate = 10;

async function getOrders(userId) {
  return prisma.order.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take: 5,
  });
}

export default async function UserDashboard() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/auth/login");
  }

  const orders = await getOrders(session.user.id);

  return (
    <ContainerLayout>
     <User session={session} orders={orders} />
    </ContainerLayout>
  );
}
