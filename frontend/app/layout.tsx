'use client'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Inter } from "next/font/google";
import Image from "next/image";
import arrow from "@/public/arrow.svg";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient();

  return (
    <html lang="pt-BR">
      <head>
        <title>Atribuição de Operador</title>
      </head>
      <body className={inter.className}>
      <Image alt="arrow" src={arrow}
        className="absolute -z-10 h-full sm:w-3/6 py-4 left-0 bottom-0"
      />
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
      <Toaster/>
      </body>
    </html>
  );
}
