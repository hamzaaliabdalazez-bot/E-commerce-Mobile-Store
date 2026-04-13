import ContainerLayout from "@/components/layout/ContainerLayout";
import ProductCard from "@/components/ProductCard";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import prisma from "@/lib/prisma";

export const revalidate = 10;

async function getCategoryProducts() {
  return prisma.product.findMany({
    where: { category: { slug: "chargers" } },
    include: { category: true },
  });
}

export default async function ChargersPage() {
  const products = await getCategoryProducts();

  return (
    <ContainerLayout>
      <Typography variant="h4" gutterBottom>
        Chargers
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        Fast charging adapters and cables for every smartphone.
      </Typography>
      <Grid container spacing={2}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </ContainerLayout>
  );
}
