import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LayoutMenu from "../components/Layout"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "TAOWR",
  description: "home page for TAOWR",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex min-h-screen">
          <LayoutMenu />
          <main className="flex-1 p-6">{children}</main> {/* 👈 Page content */}
        </div>
      </body>
    </html>
  );
}