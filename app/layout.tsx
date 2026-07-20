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
  description: "An AI powered multi-tenant e-commerce app making workflows in restaurants fast , reliable and seamless",
  icons: {
    icon: [{ url: "/icon.png", type: "image/png", sizes: "512x512" }],
    apple: [
      { url: "/icon.png", sizes: "180x180", type: "image/png" }
    ],
    shortcut:[{url:"/icon.png" , sizes:"512x512" , type:"image/png"}]
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
      className={`${inter.className} scroll-smooth`}
    >
      <body className={`${inter.variable}min-h-full flex flex-col`}>

        {children}</body>
    </html>
  );
}
