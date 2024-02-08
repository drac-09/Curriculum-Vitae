import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Curriculum Vitae",
  description: "Generador de Curriculum vitae",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex flex-col h-screen w-screen bg-black text-white">
        <Navbar></Navbar>
        <div className="container flex mx-auto pt-4 md:pt-16 px-2 md:px-32 flex-grow">
          {children}
        </div>
        {/* <Footer></Footer> */}
      </body>
    </html>
  );
}
