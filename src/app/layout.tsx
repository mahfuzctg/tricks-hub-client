import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/lib/Providers";


export const metadata: Metadata = {
    title: "Tricks Hub",
    description: "A platform to discover and share amazing coding tricks and tips",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}>
      <Providers>
      {children}
      </Providers>
      
      </body>
    </html>
  );
}