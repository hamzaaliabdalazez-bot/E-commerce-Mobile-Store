"use client";

import { useContext, useState } from "react";
import { CartContext } from "@/context/CartContext";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import Snackbar from "@mui/material/Snackbar";

export default function ProductDetailsClient({ product }) {
  const { addToCart } = useContext(CartContext);
  const [open, setOpen] = useState(false);

  const handleAdd = () => {
    addToCart(product, 1);
    setOpen(true);
  };

  return (
    <>
      <Box>
        <Typography variant="h4" gutterBottom>
          {product.name}
        </Typography>
        <Rating
          value={product.rating || 4.5}
          precision={0.5}
          readOnly
          sx={{ mb: 1 }}
        />
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          {product.description}
        </Typography>
        <Typography variant="h5" sx={{ mb: 2 }}>
          ${product.price.toFixed(2)}
        </Typography>
        <Button variant="contained" size="large" onClick={handleAdd}>
          Add to cart
        </Button>
      </Box>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
        message="Added to cart"
      />
    </>
  );
}
