import ContainerLayout from "@/components/layout/ContainerLayout";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import prisma from "@/lib/prisma";
import ProductDetailsClient from "@/components/ProductDetailsClient";

export const revalidate = 10;

async function getProduct(productId) {
  return prisma.product.findUnique({
    where: { id: productId },
    include: { category: true },
  });
}

export default async function ProductDetails({ params }) {
  const product = await getProduct(params.productId);

  return (
    <ContainerLayout>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Box
            component="img"
            src={product.images?.[0] || "/placeholder.png"}
            alt={product.name}
            sx={{ width: "100%", borderRadius: 2 }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <ProductDetailsClient product={product} />
        </Grid>
      </Grid>
    </ContainerLayout>
  );
}
