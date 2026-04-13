"use client";

import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

export default function ProductManager() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    slug: "",
    description: "",
    price: "",
    categoryId: "",
    images: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const response = await fetch("/api/products");
    const data = await response.json();
    setProducts(data);
  };

  const handleCreate = async () => {
    if (!form.name || !form.price) {
      alert("يرجى ملء الاسم والسعر على الأقل");
      return;
    }
    setLoading(true);
    const payload = {
      ...form,
      slug: form.name
        .toLowerCase()
        .replace(/ /g, "-")
        .replace(/[^\w-]+/g, ""),
      price: Number(form.price),
      images: form.images
        .split(",")
        .map((url) => url.trim())
        .filter(Boolean),
      categoryId:
        form.categoryId.trim().length === 24 ? form.categoryId.trim() : null,
    };
    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      setLoading(false);
      if (response.ok) {
        setForm({
          name: "",
          slug: "",
          description: "",
          price: "",
          categoryId: "",
          images: "",
        });
        fetchProducts();
      }
    } catch (error) {
      console.error("Error creating product:", error);
      alert("Failed to create product");
    }
  };
  const handleDelete = async (productId) => {
    if (!confirm("هل أنت متأكد من رغبتك في حذف هذا المنتج؟")) return;

    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // تحديث القائمة محلياً بعد الحذف الناجح
        setProducts((prev) => prev.filter((p) => p.id !== productId));
      } else {
        alert("فشل حذف المنتج");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("حدث خطأ أثناء الحذف");
    }
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        Manage Products
      </Typography>
      <Paper sx={{ p: 3, mb: 4 }}>
        <Grid container spacing={2}>
          {[
            { label: "Name", key: "name" },
            { label: "Slug", key: "slug" },
            { label: "Description", key: "description" },
            { label: "Price", key: "price", type: "number" },
            { label: "Category ID", key: "categoryId" },
            { label: "Images (comma separated)", key: "images" },
          ].map((field) => (
            <Grid
              item
              xs={12}
              sm={field.key === "description" ? 12 : 6}
              key={field.key}
            >
              <TextField
                label={field.label}
                type={field.type || "text"}
                value={form[field.key]}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, [field.key]: e.target.value }))
                }
                fullWidth
                multiline={field.key === "description"}
                minRows={field.key === "description" ? 2 : 1}
              />
            </Grid>
          ))}
        </Grid>
        <Button
          sx={{ mt: 2 }}
          variant="contained"
          onClick={handleCreate}
          disabled={loading}
        >
          {loading ? "جاري الإضافة..." : "Add product"}
        </Button>
      </Paper>
      <Typography variant="subtitle1" gutterBottom>
        Existing products
      </Typography>
      <Grid container spacing={2}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="subtitle1">{product.name}</Typography>
              <Typography color="text.secondary">
                ${Number(product.price).toFixed(2)}
              </Typography>
              <Button
                variant="outlined"
                color="error"
                size="small"
                sx={{ mt: 1 }}
                onClick={() => handleDelete(product.id)}
              >
                حذف المنتج
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
