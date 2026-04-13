import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import ContainerLayout from "@/components/layout/ContainerLayout";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import prisma from "@/lib/prisma";
import ProductManager from "@/components/admin/ProductManager";
import OrderManager from "@/components/admin/OrderManager";
import UserManager from "@/components/admin/UserManager";

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
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>
      <Grid container spacing={3}>
        {[
          { label: "Orders", value: stats.orders },
          { label: "Users", value: stats.users },
          { label: "Products", value: stats.products },
          { label: "Revenue", value: `$${stats.revenue.toFixed(2)}` },
        ].map((card) => (
          <Grid item xs={12} sm={6} md={3} key={card.label}>
            <Box
              sx={{
                p: 3,
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 2,
              }}
            >
              <Typography variant="subtitle2" color="text.secondary">
                {card.label}
              </Typography>
              <Typography variant="h5" sx={{ mt: 1 }}>
                {card.value}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
      <ProductManager />
      <OrderManager />
      <UserManager />
    </ContainerLayout>
  );
}
