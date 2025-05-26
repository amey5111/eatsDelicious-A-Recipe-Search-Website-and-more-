"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import ThemeToggle from "../ThemeToggle";
import Link from "next/link";

const Navbar = () => {
  const [inputValue, setInputValue] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const pathName = usePathname();

  useEffect(() => {
    setInputValue("");
    setIsMenuOpen(false); // Close mobile menu on route change
  }, [pathName]);

  const handleMenuToggle = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSearch = () => {
    if (inputValue.trim()) {
      router.push(`/search/query=${encodeURIComponent(inputValue.trim())}`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && inputValue.trim()) {
      handleSearch();
    }
  };

  return (
    <>
      <nav className="flex items-center justify-between px-4 md:px-10 py-3 bg-white border dark:border-0 dark:bg-gray-700 sticky top-0 z-50 w-full overflow-x-hidden">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/ED Navbar Logo.png"
            alt="logo"
            height={60}
            width={55}
            className="rounded-xl"
          />
          <h2 className="text-[#5ed2b8] text-xl md:text-2xl font-bold leading-tight tracking-[-0.015em]">
            Eats Delicious
          </h2>
        </Link>

        <div className="hidden md:flex items-center gap-6 lg:gap-9">
          <Link className="text-[#f2610d] text-lg font-semibold" href="/nutri-select">
            Nutri Select
          </Link>
          <Link className="text-[#f2610d] text-lg font-semibold" href="/food-facts">
            Food Facts
          </Link>
          <Link className="text-[#f2610d] text-lg font-semibold" href="/search/time=5">
            Quick Dishes
          </Link>
          <Link
            className="text-[#f2610d] text-lg font-semibold relative"
            href="/food-story"
          >
            Food Story
            <span className="absolute top-[-11px] right-[-81px] text-xs font-semibold px-2 py-1 rounded-full text-white bg-gradient-to-r from-green-200 to-green-300 dark:bg-gradient-to-r dark:from-gray-700 dark:to-green-700">
              New Story...
            </span>
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-4 lg:gap-8">
          <Link
            href="/magic-chef-ai"
            className="flex flex-col items-center font-semibold dark:text-white bg-orange-500 text-white rounded-xl py-1 px-6 shadow-lg shadow-orange-300 text-lg relative"
          >
            🧑🏼‍🍳Magic Chef
            <span className="ml-2 bg-white text-orange-500 text-xs font-bold px-1.5 py-0.5 rounded-md">
              AI Powered
            </span>
          </Link>

          <ThemeToggle />

          {/* Search Section - Fixed Layout */}
          <div className="flex items-center gap-2">
            <div className="flex items-center rounded-xl overflow-hidden border border-gray-300 dark:border-none">
              <div className="bg-purple-100 dark:bg-gray-600 px-3 py-2 flex items-center justify-center rounded-l-xl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="23"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                  className="text-[#8a7060]"
                >
                  <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z" />
                </svg>
              </div>
              <input
                placeholder="Search"
                onKeyDown={handleKeyDown}
                value={inputValue}
                onChange={handleInputChange}
                className="w-48 px-4 py-2 bg-purple-100 dark:bg-gray-600 text-orange-300 placeholder:text-[#8a7060] text-base border-none focus:outline-none rounded-r-xl"
              />
            </div>
            <button
              onClick={handleSearch}
              className="px-4 py-2 bg-[#5ed2b8] hover:bg-[#4bc2a8] dark:bg-green-800 dark:hover:bg-green-700 dark:text-green-400 text-white text-base font-semibold rounded-xl transition-colors duration-200 whitespace-nowrap"
            >
              Search
            </button>
          </div>
        </div>

        {/* Mobile: Magic Chef + Theme Toggle + Menu Icon */}
        <div className="flex md:hidden items-center gap-2">
          <Link
            href="/magic-chef-ai"
            className="flex flex-col items-center font-semibold dark:text-white bg-orange-500 text-white rounded-xl py-1 px-2 shadow-lg shadow-orange-300 text-sm"
          >
            😋Magic Chef
            <span className="ml-2 bg-white text-orange-500 text-xs font-bold px-1 py-0.5 rounded-md">
              AI Powered
            </span>
          </Link>
          <ThemeToggle />
          <button onClick={handleMenuToggle}>
            {isMenuOpen ? (
              <svg
                className="w-6 h-6 text-[#181311] dark:text-[#5ed2b8]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 16 16"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
              </svg>
            ) : (
              <svg
                className="w-6 h-6 text-[#181311] dark:text-[#5ed2b8]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-purple-50 shadow-lg z-40 dark:bg-gray-800 w-full px-4 py-2 absolute top-[66px] left-0">
          <Link
            href="/nutri-select"
            onClick={handleMenuToggle}
            className="block py-2 text-[#f2610d] text-base font-semibold"
          >
            Nutri Select
          </Link>
          <Link
            href="/food-facts"
            onClick={handleMenuToggle}
            className="block py-2 text-[#f2610d] text-base font-semibold"
          >
            Food Facts
          </Link>
          <Link
            href="/search/time=5"
            onClick={handleMenuToggle}
            className="block py-2 text-[#f2610d] text-base font-semibold"
          >
            Quick Dishes
          </Link>
          <Link
            href="/food-story"
            onClick={handleMenuToggle}
            className="block py-2 text-[#f2610d] text-base font-semibold relative"
          >
            Food Story
            <span className="ml-2 text-xs font-semibold px-2 py-1 rounded-full text-white bg-gradient-to-r from-green-200 to-green-300 dark:bg-gradient-to-r dark:from-gray-700 dark:to-green-700">
              New Story...
            </span>
          </Link>
        </div>
      )}
    </>
  );
};

export default Navbar;
