import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "./components/common/NavBar";
import { Footer } from "./components/common/Footer";
import { Analytics } from "@vercel/analytics/react"

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Eats Delicious : search today's menu",
  description:
    "A perfect website to search millions of recipies in just few click",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavBar />
        {children}
        <Analytics/>
        <Footer/>
      </body>
    </html>
  );
}
