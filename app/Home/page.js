"use client";
import React from "react";
import Link from "next/link";
import ContainerLayout from "@/components/layout/ContainerLayout";
import ProductCard from "@/components/ProductCard";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { ThemeModeContext } from "@/context/ThemeContext";
import { useContext } from "react";

const Homepage = ({ featured }) => {
  const { language } = useContext(ThemeModeContext);

  return (
    <>
      {" "}
      <Box
        sx={{
          textAlign: "center",
          py: 6,
          backgroundImage:
            "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),url('/assets/gsmarena_013.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "100%",
          height: 400,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          color: "#fff",
          textShadow: "0 2px 4px rgba(0,0,0,0.6)",
          mb: 4,
          borderRadius: 2,
          color: "#fff",
          boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
        }}
      >
        <Typography variant="h3" component="h1" gutterBottom>
          {language === "EN"
            ? "Mobile shopping made simple."
            : "تسوق الهواتف بسهولة."}
        </Typography>
        <Typography variant="h6" sx={{ maxWidth: 680, mx: "auto", mb: 4 }}>
          {language === "EN"
            ? "Discover the latest mobile devices, accessories, and fast chargers designed for modern life."
            : "اكتشف أحدث أجهزة الهواتف المحمولة، والقطع الغيار، والأجهزة الشحن السريعة المصممة للحياة الحديثة."}
        </Typography>
        <Button
          component={Link}
          href="/products"
          variant="contained"
          size="large"
        >
          {language === "EN" ? "Shop Now" : "تسوق الآن"}
        </Button>
      </Box>
      <ContainerLayout
        title="Home - Mobile Store"
        description="Discover the latest mobile devices, accessories, and fast chargers designed for modern life."
      >
        <Box sx={{ py: 4 }}>
          <Typography variant="h5" gutterBottom>
            {language === "EN" ? "Featured Products" : "منتجات مميزة"}
          </Typography>
          <Grid container spacing={2}>
            {featured.map((product) => (
              <Grid item xs={12} sm={6} md={4} key={product.id}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box sx={{ py: 4 }}>
          <Typography variant="h5" gutterBottom>
            {language === "EN" ? "Shop by Category" : "تسوق حسب الفئة"}
          </Typography>
          <Grid container spacing={2}>
            {[
              {
                name: language === "EN" ? "Mobiles" : "الهواتف",
                href: "/categories/mobiles",
              },
              {
                name: language === "EN" ? "Covers" : "أغلفة",
                href: "/categories/covers",
              },
              {
                name: language === "EN" ? "Chargers" : "أجهزة الشحن",
                href: "/categories/chargers",
              },
            ].map((category) => (
              <Grid item xs={12} sm={4} key={category.name}>
                <Box
                  sx={{
                    p: 3,
                    border: "1px solid",
                    borderColor: "divider",
                    borderRadius: 2,
                    height: "100%",
                  }}
                >
                  <Typography variant="h6" gutterBottom>
                    {category.name}
                  </Typography>
                  <Typography color="text.secondary" sx={{ mb: 2 }}>
                    {language === "EN"
                      ? `Discover the best ${category.name.toLowerCase()} for modern mobile users.`
                      : `اكتشف أفضل ${category.name.toLowerCase()} للمستخدمين الحديثين.`}
                  </Typography>
                  <Button
                    component={Link}
                    href={category.href}
                    variant="outlined"
                  >
                    {language === "EN" ? "Explore" : "استكشف"}
                  </Button>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </ContainerLayout>
    </>
  );
};

export default Homepage;
