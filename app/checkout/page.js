"use client";

import { useContext, useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import ContainerLayout from "@/components/layout/ContainerLayout";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { CartContext } from "@/context/CartContext";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { cart, total, clearCart } = useContext(CartContext);
  const { data: session } = useSession();
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (session) {
      setForm((prev) => ({
        ...prev,
        name: session.user.name || "",
        email: session.user.email || "",
      }));
    }
  }, [session]);

  const placeOrder = async () => {
    if (!session) {
      setMessage("Please log in to place an order.");
      return;
    }
    if (!form.name || !form.email || !form.address) {
      setMessage("Please complete all required fields.");
      return;
    }
    const order = {
      userId: session.user.id,
      items: cart,
      totalAmount: total,
      address: form.address,
      paymentMethod: "CARD",
    };
    const response = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
    });
    if (!response.ok) {
      setMessage("Unable to place order at this time.");
      return;
    }
    clearCart();
    router.push("/dashboard/user");
  };

  return (
    <ContainerLayout>
      <Typography variant="h4" gutterBottom>
        Checkout
      </Typography>
      <Box sx={{ display: "grid", gap: 3, maxWidth: 560 }}>
        <TextField
          label="Full name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          fullWidth
        />
        <TextField
          label="Email address"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          fullWidth
        />
        <TextField
          label="Shipping address"
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
          fullWidth
          multiline
          minRows={3}
        />
        <TextField
          label="Phone"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          fullWidth
        />
        {message && <Typography color="error">{message}</Typography>}
        <Button
          variant="contained"
          size="large"
          onClick={placeOrder}
          disabled={cart.length === 0}
        >
          Place Order
        </Button>
      </Box>
    </ContainerLayout>
  );
}
