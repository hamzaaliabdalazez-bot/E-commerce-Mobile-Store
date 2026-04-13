"use client";

import CssBaseline from "@mui/material/CssBaseline";
import { SessionProvider } from "next-auth/react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { CartProvider } from "@/context/CartContext";
import THemeModeProvider from "@/context/ThemeContext";

export default function ThemeRegistry({ children }) {
  return (
    <CartProvider>
      <THemeModeProvider>
        <CssBaseline />
        <SessionProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </SessionProvider>
      </THemeModeProvider>
    </CartProvider>
  );
}
