import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { FiltersProvider } from "@/context/FiltersContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bulltrack - Bull Ranking Dashboard",
  description: "Plataforma avanzada de ranking genético bovino",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${inter.variable} font-sans antialiased`}>
        <FiltersProvider>
          {children}
        </FiltersProvider>
      </body>
    </html>
  );
}