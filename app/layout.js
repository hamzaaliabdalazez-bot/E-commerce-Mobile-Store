import "./globals.css";
import ThemeRegistry from "@/components/layout/ThemeRegistry";

export const metadata = {
  title: "Mobile E-Commerce",
  description:
    "Modern mobile-first e-commerce store built with Next.js and MUI.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>{children}</ThemeRegistry>
      </body>
    </html>
  );
}
