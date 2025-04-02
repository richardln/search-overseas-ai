// app/layout.tsx
"use client";  // 标记为客户端组件

import { Geist, Geist_Mono } from "next/font/google";
import useTheme from './theme';  // 导入刚才创建的 useTheme
import { metadata } from './metadata';  // 导入metadata
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useTheme();  // 在布局中调用 theme 切换逻辑

  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
