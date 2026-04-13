import ContainerLayout from "@/components/layout/ContainerLayout";
import ProductCard from "@/components/ProductCard";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import prisma from "@/lib/prisma";

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
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom>
          All Products
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 3 }}>
          Browse all mobile products, cases and chargers for speedy checkout.
        </Typography>
        <Grid container spacing={2}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </ContainerLayout>
  );
}
