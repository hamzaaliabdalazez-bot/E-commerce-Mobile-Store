"use client";
import React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { useContext } from "react";
import { ThemeModeContext } from "@/context/ThemeContext";
const User = ({ session, orders }) => {
  const { language } = useContext(ThemeModeContext);
  return (
    <>
      {" "}
      <Typography variant="h4" gutterBottom>
        {language === "en" ? "User Dashboard" : "لوحة المستخدم"}
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
            <Typography variant="h6">
              {language === "en" ? "Profile" : "الملف الشخصي"}
            </Typography>
            <Typography color="text.secondary" sx={{ mt: 1 }}>
              {language === "en"
                ? "Manage your account details and track orders."
                : "إدارة تفاصيل حسابك وتتبع الطلبات."}
            </Typography>
            <Typography sx={{ mt: 2 }}>
              {language === "en"
                ? `Welcome back, ${session.user.name || session.user.email}.`
                : `مرحباً بعودتك, ${session.user.name || session.user.email}.`}
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
            <Typography variant="h6">
              {language === "en" ? "Recent Orders" : "الطلبات الأخيرة"}
            </Typography>
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
                  <Typography variant="subtitle1">
                    {language === "en"
                      ? `Order ${order.id}`
                      : `طلب ${order.id}`}
                  </Typography>
                  <Typography color="text.secondary">
                    {language === "en" ? "Total:" : "المجموع:"} $
                    {order.totalAmount.toFixed(2)}
                  </Typography>
                  <Typography color="text.secondary">
                    {language === "en" ? "Status:" : "الحالة:"} {order.status}
                  </Typography>
                </Box>
              ))
            ) : (
              <Typography color="text.secondary" sx={{ mt: 2 }}>
                {language === "en"
                  ? "No orders yet."
                  : "لا توجد طلبات حتى الآن."}
              </Typography>
            )}
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default User;
