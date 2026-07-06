import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
const inter = Inter({
  subsets:["latin"],
  display:"swap",
  variable:"--fonts-inter"
})

export const metadata: Metadata = {
  title: "FudStack - The Chef's key to seamless workflow",
  description: "An AI powered multi-tenant e-commerce app making  workflows in restaurants fast , reliable and seamless",
  icons:{
    icon:[{url:"./foodstack.png" , type:"image/png" , sizes:"512x512"}],
     shortcut: [{ url: "/icon.png", type: "image/png", sizes: "512x512" }],
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.className}`}
    >
      <body className={`${inter.variable}min-h-full flex flex-col`}>{children}</body>
    </html>
  );
}
