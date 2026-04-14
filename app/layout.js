import "./globals.css";
import ThemeRegistry from "@/components/layout/ThemeRegistry";
import Script from "next/script";
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
<Script src="https://upload-widget.cloudinary.com/global/all.js" strategy="beforeInteractive" />
      </body>
    </html>
  );
}

// أضف هذا داخل الـ return في الأسفل
