"use client";

import { useContext } from "react";
import { CartContext } from "@/context/CartContext";
import { ThemeModeContext } from "@/context/ThemeContext";
import ContainerLayout from "@/components/layout/ContainerLayout";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, total } =
    useContext(CartContext);
const { language } = useContext(ThemeModeContext);
  const router = useRouter();

  return (
    <ContainerLayout>
      <Typography variant="h4" gutterBottom>
        {language === "EN" ? "Your Shopping Cart" : "سلة التسوق الخاصة بك"}
      </Typography>
      <Box
        sx={{
          width: "100%",
          minHeight: "60vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {cart.length === 0 ? (
          <Typography color="text.secondary">
            {language === "EN"
              ? "Your cart is empty. Browse products to"
              : "سلة التسوق فارغة. تصفح المنتجات ل"}{" "}
            <Link href="/products">
              <span className="font-bold text-blue-600 hover:underline hover:text-blue-400">
                {language === "EN"
                  ? "start shopping"
                  : "إضافة عناصر إلى سلة التسوق الخاصة بك."}
              </span>
            </Link>
            .
          </Typography>
        ) : (
          <Grid container spacing={2}>
            <Grid item xs={12} md={8}>
              {cart.map((item) => (
                <Box
                  key={item.id}
                  sx={{
                    display: "flex",
                    gap: 2,
                    p: 2,
                    border: "1px solid",
                    borderColor: "divider",
                    borderRadius: 2,
                    mb: 2,
                  }}
                >
                  <Box
                    component="img"
                    src={item.images?.[0] || "/placeholder.png"}
                    alt={item.name}
                    sx={{ width: 120, borderRadius: 2 }}
                  />
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h6">{item.name}</Typography>
                    <Typography color="text.secondary">
                      ${item.price.toFixed(2)}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        mt: 1,
                      }}
                    >
                      <TextField
                        type="number"
                        value={item.quantity}
                        onChange={(e) =>
                          updateQuantity(item.id, Number(e.target.value))
                        }
                        inputProps={{ min: 1 }}
                        size="small"
                        sx={{ width: 100 }}
                      />
                      <IconButton
                        color="error"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </Box>
                </Box>
              ))}
            </Grid>
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  p: 3,
                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: 2,
                }}
              >
                <Typography variant="h6" gutterBottom>
                  {language === "EN" ? "Order Summary" : "ملخص الطلب"}
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  {language === "EN" ? "Total" : "الإجمالي"}: <strong>${total.toFixed(2)}</strong>
                </Typography>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => router.push("/checkout")}
                >
                 {language === "EN" ? "Proceed to Checkout" : "المتابعة إلى الدفع"}
                </Button>
              </Box>
            </Grid>
          </Grid>
        )}
      </Box>
    </ContainerLayout>
  );
}
