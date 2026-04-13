"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import ContainerLayout from "@/components/layout/ContainerLayout";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Link from "next/link";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!form.email || !form.password) {
      setError("All fields are required");
      return;
    }

    const res = await signIn("credentials", {
      redirect: false,

      email: form.email,
      password: form.password,
    });
    if (res.error) {
      setError(res.error);
    } else {
      router.push("/");
    }
  };

  return (
    <ContainerLayout>
      <Box sx={{ maxWidth: 420, mx: "auto", py: 8 }}>
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "grid", gap: 2 }}
        >
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
            Sign in
          </Button>
        </Box>
        <Typography sx={{ mt: 2 }}>
          New here? <Link href="/auth/register">Create an account</Link>
        </Typography>
      </Box>
    </ContainerLayout>
  );
}
