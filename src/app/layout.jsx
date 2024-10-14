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
      <body className="flex flex-col h-screen w-screen text-white bg-[url('/fondo2.svg')] bg-no-repeat bg-cover bg-center">
        <div className="bg-black bg-opacity-90 md:bg-opacity-90 h-screen">
          <Navbar></Navbar>
          <div className="container md:mx-auto flex md:px-20 2xl:px-80 xl:px-60 md:pt-16 text-sm md:h-[calc(100vh-50px)] overflow-y-hidden">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
