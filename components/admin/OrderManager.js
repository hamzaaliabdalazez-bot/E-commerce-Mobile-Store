"use client";

import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

export default function OrderManager() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const response = await fetch("/api/orders");
    const data = await response.json();
    setOrders(data);
  };

  const updateStatus = async (id, status) => {
    await fetch(`/api/orders/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    fetchOrders();
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        Manage Orders
      </Typography>
      <Box sx={{ display: "grid", gap: 2 }}>
        {orders.map((order) => (
          <Paper key={order.id} sx={{ p: 2 }}>
            <Typography variant="subtitle1">Order {order.id}</Typography>
            <Typography color="text.secondary">
              Total: ${order.totalAmount.toFixed(2)}
            </Typography>
            <Typography color="text.secondary">
              Status: {order.status}
            </Typography>
            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel>Status</InputLabel>
              <Select
                value={order.status}
                label="Status"
                onChange={(e) => updateStatus(order.id, e.target.value)}
              >
                {[
                  "PENDING",
                  "PROCESSING",
                  "SHIPPED",
                  "DELIVERED",
                  "CANCELLED",
                ].map((status) => (
                  <MenuItem key={status} value={status}>
                    {status}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Paper>
        ))}
      </Box>
    </Box>
  );
}
