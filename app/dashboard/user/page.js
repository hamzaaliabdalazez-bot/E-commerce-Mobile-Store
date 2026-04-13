import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import ContainerLayout from "@/components/layout/ContainerLayout";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import prisma from "@/lib/prisma";

export const revalidate = 10;

async function getOrders(userId) {
  return prisma.order.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take: 5,
  });
}

export default async function UserDashboard() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/auth/login");
  }

  const orders = await getOrders(session.user.id);

  return (
    <ContainerLayout>
      <Typography variant="h4" gutterBottom>
        My Dashboard
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              p: 3,
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 2,
            }}
          >
            <Typography variant="h6">Profile</Typography>
            <Typography color="text.secondary" sx={{ mt: 1 }}>
              Manage your account details and track orders.
            </Typography>
            <Typography sx={{ mt: 2 }}>
              Welcome back, {session.user.name || session.user.email}.
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              p: 3,
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 2,
            }}
          >
            <Typography variant="h6">Recent Orders</Typography>
            {orders.length ? (
              orders.map((order) => (
                <Box
                  key={order.id}
                  sx={{
                    mt: 2,
                    p: 2,
                    border: "1px solid",
                    borderColor: "divider",
                    borderRadius: 1,
                  }}
                >
                  <Typography variant="subtitle1">Order {order.id}</Typography>
                  <Typography color="text.secondary">
                    Total: ${order.totalAmount.toFixed(2)}
                  </Typography>
                  <Typography color="text.secondary">
                    Status: {order.status}
                  </Typography>
                </Box>
              ))
            ) : (
              <Typography color="text.secondary" sx={{ mt: 2 }}>
                No orders yet.
              </Typography>
            )}
          </Box>
        </Grid>
      </Grid>
    </ContainerLayout>
  );
}
