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
  }, [pathName]);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
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
    <nav className=" flex items-center justify-around whitespace-nowrap px-10 py-3 bg-white border dark:border-0 dark:bg-gray-700 sticky top-0 z-50 w-[102%]">
      <Link href="/" className="flex items-center gap-8">
        <div className="flex items-center gap-2 text-[#181311]">
          <Image
            src="/ED Navbar Logo.png"
            alt="logo"
            height={60}
            width={55}
            className="rounded-xl"
          />
          <h2 className="text-[#5ed2b8] text-2xl font-bold leading-tight tracking-[-0.015em] mr-10">
            Eats Delicious
          </h2>
        </div>
      </Link>
      <div className="hidden md:flex items-center gap-9">
        <Link
          className="text-[#f2610d] text-lg font-semibold leading-normal"
          href="/nutri-select"
        >
          Nutri Select
        </Link>
        <Link
          className="text-[#f2610d] text-lg font-semibold leading-normal"
          href="/food-facts"
        >
          Food Facts
        </Link>
        <Link
          className="text-[#f2610d] text-lg font-semibold leading-normal"
          href="/search/time=5"
        >
          Quick Dishes
        </Link>
        <Link
          className="text-[#f2610d] text-lg font-semibold leading-normal relative"
          href="/food-story"
        >
          Food Story
          <span className="absolute top-[-11px] right-[-81px] text-xs font-semibold px-2 py-1 rounded-full text-white bg-gradient-to-r from-green-200 to-green-300 dark:bg-gradient-to-r dark:from-gray-700 dark:to-green-700">
            New Story...
          </span>
        </Link>
      </div>
      <div className="hidden md:flex flex-1 justify-end gap-8 align-middle">
        <Link
        href="/magic-chef-ai"
        className="flex flex-col items-center font-semibold dark:text-white bg-orange-500 text-white rounded-xl py-1 px-8 shadow-lg shadow-orange-300 text-xl relative"
      >
        🧑🏼‍🍳Magic Chef
        <span className="ml-2 bg-white text-orange-500 text-xs font-bold px-1.5 py-0.5 rounded-md">
          AI Powered
        </span>
      </Link>
        <ThemeToggle />
        <label className="flex flex-col min-w-96 !h-10 max-w-64 my-auto mr-1">
          <div className="flex w-full flex-1 items-stretch rounded-xl h-full">
            <div
              className="text-[#8a7060] flex border-none bg-purple-100 items-center justify-center pl-4 rounded-l-xl border-r-0 dark:bg-gray-600"
              data-icon="MagnifyingGlass"
              data-size="24px"
              data-weight="regular"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24px"
                height="24px"
                fill="currentColor"
                viewBox="0 0 256 256"
              >
                <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
              </svg>
            </div>
            <input
              placeholder="Search"
              onKeyDown={handleKeyDown}
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-orange-300 focus:outline-0 focus:ring-0 border-none bg-purple-100 focus:border-none h-full placeholder:text-[#8a7060] px-4 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal mr-3 dark:bg-gray-600"
              value={inputValue}
              onChange={handleInputChange}
            />
            <div className="flex items-center justify-center">
              <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 @[480px]:h-12 @[480px]:px-5 bg-[#5ed2b8] text-white text-lg font-semibold leading-normal tracking-[0.015em] @[480px]:text-lg @[480px]:font-semibold @[480px]:leading-normal @[480px]:tracking-[0.015em] dark:bg-green-800 dark:text-green-400 ">
                <span className="truncate" onClick={handleSearch}>
                  Search
                </span>
              </button>
            </div>
          </div>
        </label>
      </div>
      <Link
        href="/magic-chef-ai"
        className="flex flex-col lg:hidden items-center w-fit ml-3 font-semibold dark:text-white bg-orange-500 text-white rounded-xl py-1 px-2 shadow-lg shadow-orange-300 text-base relative"
      >
        😋Magic Chef
        <span className="ml-2 bg-white text-orange-500 text-xs font-bold px-1.5 py-0.5 rounded-md">
          AI Powered
        </span>
      </Link>

      <div className="flex lg:hidden w-fit ml-3">
        <ThemeToggle />
      </div>
      <button
        className="md:hidden flex items-center ml-2"
        onClick={handleMenuToggle}
      >
        {isMenuOpen ? (
          <svg
            className="w-6 h-6 text-[#181311] dark:text-[#5ed2b8]"
            fill="none"
            stroke="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 16 16"
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
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-purple-50 shadow-lg z-50 dark:bg-gray-800">
          <Link
            className="block text-[#f2610d] text-lg font-semibold leading-normal my-2 px-4 py-2"
            href="/nutri-select"
            onClick={handleMenuToggle}
          >
            Nutri Select
          </Link>
          <Link
            className="block text-[#f2610d] text-lg font-semibold leading-normal my-2 px-4 py-2"
            href="/food-facts"
            onClick={handleMenuToggle}
          >
            Food Facts
          </Link>
          <Link
            className="block text-[#f2610d] text-lg font-semibold leading-normal my-2 px-4 py-2"
            href="/search/time=5"
            onClick={handleMenuToggle}
          >
            Quick Dishes
          </Link>
          <Link
            className="block text-[#f2610d] text-lg font-semibold leading-normal my-2 px-4 py-2 relative"
            href="/food-story"
            onClick={handleMenuToggle}
          >
            Food Story
            <span className="ml-2 text-xs font-semibold px-2 py-1 rounded-full text-white bg-gradient-to-r from-green-200 to-green-300 dark:bg-gradient-to-r dark:from-gray-700 dark:to-green-700">
              New Story...
            </span>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
