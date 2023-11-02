import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Core",
  description: "Beauty salon management system",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className="main">{children}</body>
    </html>
  );
}
