import ContainerLayout from "@/components/layout/ContainerLayout";

import prisma from "@/lib/prisma";
import Mobiles from "./Mobiles";

export const revalidate = 10;

async function getCategoryProducts() {
  return prisma.product.findMany({
    where: { category: { slug: "mobiles" } },
    include: { category: true },
  });
}

export default async function MobilesPage() {
  const products = await getCategoryProducts();

  return (
    <ContainerLayout>
      <Mobiles products={products} />
    </ContainerLayout>
  );
}
