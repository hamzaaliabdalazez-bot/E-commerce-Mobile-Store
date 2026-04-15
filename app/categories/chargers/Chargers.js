import React from "react";
import { useContext } from "react";
import { ThemeModeContext } from "@/context/ThemeContext";
import ProductCard from "@/components/ProductCard";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const Chargers = ({ products }) => {
  const { language } = useContext(ThemeModeContext);
  return (
    <>
      {" "}
      <Typography variant="h4" gutterBottom>
        {language === "en" ? "Chargers" : "الشواحن"}
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        {language === "en"
          ? "Fast charging adapters and cables for every smartphone."
          : "محولات الشحن السريعة والكابلات لجميع الهواتف الذكية."}
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

export default Chargers;
