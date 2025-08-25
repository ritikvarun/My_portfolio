"use client";
import { useState } from "react";
import { X, Menu } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  return (
    <nav className="fixed cursor-pointer bg-gray-400 top-0 left-0 w-full flex justify-between items-center py-4 md:px-[200px] px-4 shadow-md z-50">
      {/* Logo */}
      <div
        onClick={() => {
          router.push("/");
        }}
        className="flex items-center gap-2"
      >
        <Image src="/images/logo.svg" alt="logo" width={40} height={40} />
        <h1 className="text-xl font-bold text-black">Ritik</h1>
      </div>

      {/* Menu Icon */}
      <button className="text-black md:hidden" onClick={() => setOpen(!open)}>
        {open ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Desktop Menu */}
      <ul className="hidden md:flex gap-6 text-black font-medium">
        <Link href="/about">About</Link>
        <Link href="/projects">Projects</Link>
      </ul>
      {/* Mobile Box Menu */}
      {open && (
        <div className="md:hidden items-center absolute top-14 right-4 bg-black/90 rounded-xl shadow-lg p-4 w-40 flex flex-col gap-3 text-white font-medium">
          <Link href="/about">About</Link>
          <Link href="/projects">Projects</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
