import type { Metadata } from "next";
import "./globals.scss";

export const metadata: Metadata = {
  title: "Canvas",
  description: "Desenhe algo aqui...",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
