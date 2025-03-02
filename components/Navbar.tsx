"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          🚗 CarRental
        </Link>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          ☰
        </button>

        {/* Menu Items */}
        <ul className={`md:flex gap-6 ${isOpen ? "block" : "hidden"} md:block`}>
          <li>
            <Link href="/cars" className="hover:text-gray-200">Browse Cars</Link>
          </li>
          <li>
            <Link href="/bookings" className="hover:text-gray-200">My Bookings</Link>
          </li>
          <li>
            <Link href="/auth/login" className="bg-white text-blue-600 px-4 py-2 rounded">Login</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
