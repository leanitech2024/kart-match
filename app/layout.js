import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Loading from "./loading"
import {Suspense} from 'react'
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "KartMatch",
  description: "KartMatch",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Suspense fallback={<Loading/>}>
        {children}
        </Suspense>
      </body>
    </html>
  );
}
