import { Inter, Titillium_Web } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const titilliumWeb = Titillium_Web({
  subsets: ["latin"],
  weight: "200",
});

export const metadata = {
  title: "Curriculum Vitae",
  description: "Generador de Curriculum vitae",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${titilliumWeb.className} antialiased`}>
      <body className="flex flex-col h-screen w-screen bg-black text-white">
        <Navbar></Navbar>
        <div className="container flex md:mx-auto md:pt-16 md:px-60 flex-grow">
          {children}
        </div>
        {/* <Footer></Footer> */}
      </body>
    </html>
  );
}
