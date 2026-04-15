import ContainerLayout from "@/components/layout/ContainerLayout";
import prisma from "@/lib/prisma";
import Covers from "./Covers";

export const revalidate = 10;

async function getCategoryProducts() {
  return prisma.product.findMany({
    where: { category: { slug: "covers" } },
    include: { category: true },
  });
}

export default async function CoversPage() {
  const products = await getCategoryProducts();

  return (
    <ContainerLayout>
<Covers products={products} />
    </ContainerLayout>
  );
}
