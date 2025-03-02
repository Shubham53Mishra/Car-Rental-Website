"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  // Function to check authentication state
  const checkAuth = () => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    setIsAuthenticated(!!token);
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserName(user.name || "");
      setUserEmail(user.email || "");
    }
  };

  // Run authentication check on component mount
  useEffect(() => {
    checkAuth();
  }, []);

  // Listen for token changes (when login/logout happens)
  useEffect(() => {
    const handleStorageChange = () => checkAuth();
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    setUserName("");
    setUserEmail("");
    setShowDropdown(false);
    window.dispatchEvent(new Event("storage")); // Trigger storage event
  };

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
        <ul className={`md:flex gap-6 ${isOpen ? "block" : "hidden"} md:block items-center`}>
          <li>
            <Link href="/cars" className="hover:text-gray-200">Browse Cars</Link>
          </li>
          <li>
            <Link href="/bookings" className="hover:text-gray-200">My Bookings</Link>
          </li>

          {/* Show Signup/Login when NOT logged in, otherwise show Avatar Dropdown */}
          {!isAuthenticated ? (
            <>
              <li>
                <Link href="/auth/signup" className="hover:text-gray-200">Sign Up</Link>
              </li>
              <li>
                <Link href="/auth/login" className="bg-white text-blue-600 px-4 py-2 rounded">Login</Link>
              </li>
            </>
          ) : (
            <li className="relative">
              {/* Avatar */}
              <div
                className="w-10 h-10 bg-gray-300 text-blue-600 flex items-center justify-center rounded-full font-bold cursor-pointer"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                {userName ? userName.charAt(0).toUpperCase() : "U"}
              </div>

              {/* Dropdown Menu */}
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-black shadow-lg rounded-lg p-3">
                  <p className="font-bold">{userName}</p>
                  <p className="text-sm text-gray-600">{userEmail}</p>
                  <hr className="my-2" />
                  <button
                    onClick={handleLogout}
                    className="w-full text-left bg-red-500 text-white px-4 py-2 rounded mt-2"
                  >
                    Logout
                  </button>
                </div>
              )}
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}
