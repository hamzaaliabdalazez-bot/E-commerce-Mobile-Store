"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ContainerLayout from "@/components/layout/ContainerLayout";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default function RegisterPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.name,
        email: form.email,
        password: form.password,
      }),
    });
    if (!response.ok) {
      setError("Unable to register user.");
      return;
    }
    router.push("/auth/login");
  };

  return (
    <ContainerLayout>
      <Box sx={{ maxWidth: 420, mx: "auto", py: 8 }}>
        <Typography variant="h4" gutterBottom>
          Register
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "grid", gap: 2 }}
        >
          <TextField
            label="Full name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            fullWidth
          />
          <TextField
            label="Email"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            fullWidth
          />
          <TextField
            label="Password"
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            fullWidth
          />
          {error && <Typography color="error">{error}</Typography>}
          <Button type="submit" variant="contained" size="large">
            Create account
          </Button>
        </Box>
      </Box>
    </ContainerLayout>
  );
}
