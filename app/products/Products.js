"use client";
import React from "react";
import ProductCard from "@/components/ProductCard";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { ThemeModeContext } from "@/context/ThemeContext";
import { useContext } from "react";
const Products = ({ products }) => {
  const { language } = useContext(ThemeModeContext);
  return (
    <>
      {" "}
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom>
          {language === "EN" ? "All Products" : "جميع المنتجات"}
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 3 }}>
          {language === "EN"
            ? "Browse all mobile products, cases and chargers for speedy checkout."
            : "تصفح جميع منتجات الهواتف المحمولة، والغطاء، والأجهزة الشحن للدفع السريع."}
        </Typography>
        <Grid container spacing={2}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default Products;
