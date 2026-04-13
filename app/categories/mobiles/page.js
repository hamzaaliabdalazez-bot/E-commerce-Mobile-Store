import ContainerLayout from "@/components/layout/ContainerLayout";
import ProductCard from "@/components/ProductCard";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import prisma from "@/lib/prisma";

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
      
      <Typography variant="h4" gutterBottom>
        Mobiles
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        The latest smartphones and mobile devices for modern users.
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
