"use client";
import React, { useContext } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import ProductManager from "@/components/admin/ProductManager";
import OrderManager from "@/components/admin/OrderManager";
import UserManager from "@/components/admin/UserManager";
import { ThemeModeContext } from "@/context/ThemeContext";
const Admin = ({ stats }) => {
  // I will use this context to change the language of the dashboard based on the user's preference. For now, it's just a placeholder.

  const { language } = useContext(ThemeModeContext);

  return (
    <>
      {" "}
      <Typography variant="h4" gutterBottom>
        {language === "EN" ? "Admin Dashboard" : "لوحة تحكم المسؤول"}
      </Typography>
      <Grid container spacing={3}>
        {[
          {
            label: language === "EN" ? "Orders" : "الطلبات",
            value: stats.orders,
          },
          {
            label: language === "EN" ? "Users" : "المستخدمون",
            value: stats.users,
          },
          {
            label: language === "EN" ? "Products" : "المنتجات",
            value: stats.products,
          },
          {
            label: language === "EN" ? "Revenue" : "الإيرادات",
            value: `$${stats.revenue.toFixed(2)}`,
          },
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
    </>
  );
};

export default Admin;
