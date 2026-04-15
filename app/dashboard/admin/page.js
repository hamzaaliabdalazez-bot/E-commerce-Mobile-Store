import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import ContainerLayout from "@/components/layout/ContainerLayout";
import prisma from "@/lib/prisma";
import Admin from "./Admin";

export const revalidate = 10;

async function getStats() {
  const orders = await prisma.order.count();
  const users = await prisma.user.count();
  const products = await prisma.product.count();
  const total = await prisma.order.aggregate({ _sum: { totalAmount: true } });
  return { orders, users, products, revenue: total._sum.totalAmount || 0 };
}

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") {
    redirect("/");
  }

  const stats = await getStats();

  return (
    <ContainerLayout>
     <Admin stats={stats} />
    </ContainerLayout>
  );
}
