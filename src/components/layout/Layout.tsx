import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen w-full bg-[#030303] text-white">
      <Navbar />
      <main className="w-full">{children}</main>
      <Footer />
    </div>
  );
}
