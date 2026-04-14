"use client";

import { useEffect, useState } from "react";
import { 
  Box, Typography, TextField, Button, Grid, Paper, 
  MenuItem, Select, InputLabel, FormControl, CircularProgress 
} from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete'; // أيقونة الحذف

export default function ProductManager() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]); // لتخزين الأقسام
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    categoryId: "",
    images: [],
  });
  const [loading, setLoading] = useState(false);
  const [fetchingData, setFetchingData] = useState(true);

  useEffect(() => {
    // جلب المنتجات والأقسام عند تحميل الصفحة
    Promise.all([fetchProducts(), fetchCategories()]).finally(() =>
      setFetchingData(false),
    );
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/products");
      // التحقق من أن الرد سليم (Status 200)
      if (!response.ok) {
        console.error("Products API error:", response.status);
        setProducts([]);
        return;
      }

      const text = await response.text(); // قراءة الرد كنص أولاً
      const data = text ? JSON.parse(text) : []; // تحويله لـ JSON فقط إذا لم يكن فارغاً
      setProducts(data);
    } catch (error) {
      console.error("Fetch Products failed:", error);
      setProducts([]);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/categories");
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleCreate = async () => {
    if (
      !form.name ||
      !form.price ||
      !form.categoryId ||
      form.images.length === 0
    ) {
      alert("يرجى ملء كافة الحقول واختيار قسم ورفع صورة");
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
    };

    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      setLoading(false);

      if (response.ok) {
        alert("تم إضافة المنتج بنجاح!");
        setForm({
          name: "",
          description: "",
          price: "",
          categoryId: "",
          images: [],
        });
        fetchProducts();
      } else {
        alert(`فشل الحفظ: ${result.error || "خطأ غير معروف"}`);
      }
    } catch (error) {
      setLoading(false);
      alert("حدث خطأ في الاتصال بالخادم");
    }
  };

  const handleDelete = async (productId) => {
    if (!confirm("هل أنت متأكد من حذف هذا المنتج نهائياً من قاعدة البيانات؟"))
      return;

    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("تم الحذف بنجاح");
        setProducts((prev) => prev.filter((p) => p.id !== productId));
      } else {
        alert("فشل في حذف المنتج");
      }
    } catch (error) {
      alert("حدث خطأ أثناء الاتصال بالسيرفر للحذف");
    }
  };

  const handleUploadClick = () => {
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: "dmboypqab",
        uploadPreset: "hamza_preset_key",
        multiple: true,
        maxFiles: 5,
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          setForm((prev) => ({
            ...prev,
            images: [...prev.images, result.info.secure_url],
          }));
        }
      },
    );
    widget.open();
  };

  if (fetchingData)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
        <CircularProgress />
      </Box>
    );

  return (
    <Box sx={{ mt: 4, p: 2 }}>
      <script
        src="https://upload-widget.cloudinary.com/global/all.js"
        async
      ></script>

      <Typography variant="h5" gutterBottom fontWeight="bold">
        إدارة المتجر
      </Typography>

      {/* نموذج إضافة المنتج */}
      <Paper sx={{ p: 3, mb: 4, borderRadius: 2 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          إضافة منتج جديد
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="اسم المنتج"
              value={form.name}
              fullWidth
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="السعر"
              type="number"
              value={form.price}
              fullWidth
              onChange={(e) => setForm({ ...form, price: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            {/* القائمة المنسدلة للأقسام */}
            <FormControl fullWidth>
              <InputLabel>القسم</InputLabel>
              <Select
                value={form.categoryId}
                label="القسم"
                onChange={(e) =>
                  setForm({ ...form, categoryId: e.target.value })
                }
              >
                {categories.map((cat) => (
                  <MenuItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              variant="outlined"
              fullWidth
              startIcon={<CloudUploadIcon />}
              onClick={handleUploadClick}
              sx={{ height: "56px" }}
            >
              رفع صور ({form.images.length})
            </Button>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="الوصف"
              multiline
              rows={2}
              value={form.description}
              fullWidth
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />
          </Grid>
        </Grid>

        <Box sx={{ display: "flex", gap: 1, mt: 2, flexWrap: "wrap" }}>
          {form.images.map((img, i) => (
            <Box
              component="img"
              key={i}
              src={img}
              sx={{
                width: 60,
                height: 60,
                borderRadius: 1,
                objectFit: "cover",
                border: "1px solid #ddd",
              }}
            />
          ))}
        </Box>

        <Button
          sx={{ mt: 3 }}
          variant="contained"
          onClick={handleCreate}
          disabled={loading}
          fullWidth
          size="large"
        >
          {loading ? "جاري الحفظ..." : "حفظ المنتج في قاعدة البيانات"}
        </Button>
      </Paper>

      {/* قائمة المنتجات الحالية مع زر الحذف */}
      <Typography variant="h6" gutterBottom>
        المنتجات الحالية
      </Typography>
      <Grid container spacing={2}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Paper sx={{ p: 2, borderRadius: 2, position: "relative" }}>
              <Box
                component="img"
                src={product.images[0]}
                sx={{
                  width: "100%",
                  height: 150,
                  objectFit: "cover",
                  borderRadius: 1,
                  mb: 1,
                }}
              />
              <Typography variant="subtitle1" noWrap fontWeight="bold">
                {product.name}
              </Typography>
              <Typography color="primary" fontWeight="bold">
                ${product.price}
              </Typography>
              <Button
                variant="contained"
                color="error"
                fullWidth
                startIcon={<DeleteIcon />}
                sx={{ mt: 2 }}
                onClick={() => handleDelete(product.id)}
              >
                حذف نهائي
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}