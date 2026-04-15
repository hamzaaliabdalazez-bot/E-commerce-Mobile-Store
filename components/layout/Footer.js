"use client";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { ThemeModeContext } from "@/context/ThemeContext";

import { useContext } from "react";

export default function Footer() {
  const { language } = useContext(ThemeModeContext);
  return (
    <footer>
      <Container
        sx={{
          py: 3,
          px: 2,
          textAlign: "center",
          position: "sticky",
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: "background.paper",
          width: "100%",
        }}
      >
        <Typography variant="body2" color="text.secondary">
          {language === "EN"
            ? "© 2024 Mobile Store. All rights reserved."
            : "© 2024 متجر الهواتف. جميع الحقوق محفوظة."}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {language === "EN"
            ? "Built with Next.js, Prisma, and Material-UI."
            : "تم بناؤه باستخدام Next.js و Prisma و Material-UI."}
        </Typography>
      </Container>
    </footer>
  );
}
