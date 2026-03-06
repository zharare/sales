import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CONSITEC Sales Reporting",
  description: "Sistema de reportes comerciales con exportación a Excel"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
