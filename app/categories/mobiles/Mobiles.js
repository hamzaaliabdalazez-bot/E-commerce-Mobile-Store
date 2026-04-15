"use client";
import React, { useContext } from "react";
import { ThemeModeContext } from "@/context/ThemeContext";
import ProductCard from "@/components/ProductCard";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const Mobiles = ({ products }) => {
    const {language} = useContext(ThemeModeContext);
  return (
    <>
      {" "}
      <Typography variant="h4" gutterBottom>
        {language === "EN" ? "Mobiles" : "الهواتف"}
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        {language === "EN"
          ? "Explore our wide range of mobile phones, featuring the latest models from top brands. Find the perfect device that suits your needs and style."
          : "استكشف مجموعتنا الواسعة من الهواتف المحمولة، التي تضم أحدث الطرازات من أفضل العلامات التجارية. اعثر على الجهاز المثالي الذي يناسب احتياجاتك وأسلوبك."}
      </Typography>
      <Grid container spacing={2}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Mobiles;
