"use client";

import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

export default function UserManager() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/users");

      // إذا كان هناك خطأ في السيرفر (مثل 500)، لا تحاول قراءة JSON
      if (!response.ok) {
        const errorText = await response.text(); // اقرأ الخطأ كنص لمعرفة المشكلة
        console.error("Server Error Text:", errorText);
        return;
      }

      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Network or JSON error:", error);
    }
  };
  const deleteUser = async (id) => {
    if (!confirm("حذف المستخدم نهائياً؟")) return;
    const res = await fetch(`/api/users/${id}`, { method: "DELETE" });
    if (res.ok) setUsers(users.filter((u) => u.id !== id));
  };

  const toggleBlock = async (id, currentStatus) => {
    try {
      const res = await fetch(`/api/users/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" }, // أضف هذا السطر
        body: JSON.stringify({ isBlocked: !currentStatus }),
      });

      if (res.ok) {
        setUsers((prevUsers) =>
          prevUsers.map((u) =>
            u.id === id ? { ...u, isBlocked: !currentStatus } : u,
          ),
        );
      } else {
        alert("حدث خطأ أثناء تحديث حالة المستخدم");
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        Manage Users
      </Typography>
      <Box sx={{ display: "grid", gap: 2 }}>
        {users.map((user) => (
          <Paper
            key={user.id}
            sx={{
              p: 2,
              mb: 2,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box>
              <Typography>
                {user.name} ({user.email})
              </Typography>
              {user.isBlocked && (
                <Typography color="error" variant="caption">
                  محظور
                </Typography>
              )}
            </Box>
            <Stack direction="row" spacing={1}>
              <Button
                variant="contained"
                color={user.isBlocked ? "success" : "warning"}
                onClick={() => toggleBlock(user.id, user.isBlocked)}
              >
                {user.isBlocked ? "إلغاء الحظر" : "حظر"}
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={() => deleteUser(user.id)}
              >
                حذف
              </Button>
            </Stack>
          </Paper>
        ))}
      </Box>
    </Box>
  );
}
