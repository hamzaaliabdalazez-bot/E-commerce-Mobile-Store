"use client";

import { useContext, useState } from "react";
import { CartContext } from "@/context/CartContext";
import { ThemeModeContext } from "@/context/ThemeContext";
import Link from "next/link";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import Snackbar from "@mui/material/Snackbar";


export default function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);
  const {language} = useContext(ThemeModeContext);
  const [open, setOpen] = useState(false);

  const handleAdd = () => {
    addToCart(product, 1);
    setOpen(true);
  };
  return (
    <Card sx={{ maxWidth: 345, m: 1 }}>
      <Link href={`/product/${product.id}`}>
        <CardMedia
          component="img"
          height="220"
          image={product.images?.[0] || "/placeholder.png"}
          alt={product.name}
        />
      </Link>
      <CardContent>
        <Typography variant="h6" component="div" gutterBottom>
          {product.name}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ minHeight: 54 }}
        >
          {product.description.substring(0, 80)}...
        </Typography>
        <Rating
          value={product.rating || 4.5}
          precision={0.5}
          readOnly
          size="small"
          sx={{ mt: 1 }}
        />
        <Typography variant="h6">${product.price.toFixed(2)}</Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "space-between" }}>
        <Button variant="contained" size="large" onClick={handleAdd}>
        {language === "EN" ? "Add To Cart" : "اضف للسله"}
        </Button>

        <Button component={Link} href={`/product/${product.id}`} size="small">
        {language === "EN" ? "View Details" : "عرض التفاصيل"}
        </Button>
      </CardActions>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
        message="Added to cart"
      />
    </Card>
  );
}
