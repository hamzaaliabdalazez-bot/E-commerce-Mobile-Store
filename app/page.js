import prisma from "@/lib/prisma";
import Homepage from "./Home/page";

export const revalidate = 10;

async function getFeaturedProducts() {
  return prisma.product.findMany({ take: 3, orderBy: { createdAt: "desc" } });
}

export default async function Home() {
  const featured = await getFeaturedProducts();

  return (
    <>
         <Homepage featured={featured} />
    </>
  );
}
