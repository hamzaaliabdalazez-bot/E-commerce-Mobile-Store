import ContainerLayout from "@/components/layout/ContainerLayout";

import prisma from "@/lib/prisma";
import Products from "./Products";

export const revalidate = 10;

async function getAllProducts() {
  return prisma.product.findMany({
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });
}

export default async function ProductsPage() {
  const products = await getAllProducts();

  return (
    <ContainerLayout>
      <Products products={products} />
    </ContainerLayout>
  );
}
