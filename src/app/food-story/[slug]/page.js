"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { getSlides } from "./slides";

function Blog() {
  const params = useParams();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function loadSlides() {
      console.log("params", typeof params.slug);
      const fetchedSlides = await getSlides(params.slug);
      setSlides(fetchedSlides);
      setLoading(false);
    }
    loadSlides();
  }, []);

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide((prev) => prev - 1);
    }
  };

  const handleMenuOpen = () => {
    setIsMenuOpen((prevState) => {
      console.log("Menu toggled. New state:", !prevState);
      return !prevState;
    });
  };

  const handleMenuOptionClick = (index) => {
    setCurrentSlide(index);
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === "ArrowLeft") prevSlide();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentSlide]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gradient-to-br from-green-400 to-blue-500 dark:from-green-800 dark:to-blue-900 flex p-4 flex-col text-white min-h-screen">
      <div className="flex flex-col h-full">
        <div
          className="rounded-full bg-white text-black p-3 absolute w-fit z-20 dark:bg-gray-700 dark:text-yellow-400 hover:cursor-pointer"
          onClick={handleMenuOpen}
        >
          {isMenuOpen ? (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                fill="currentColor"
                className="bi bi-x-lg"
                viewBox="0 0 16 16"
              >
                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
              </svg>
            </>
          ) : (
            <div className="flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                fill="currentColor"
                className="bi bi-list"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
                />
              </svg>
              <div className="text-sm h-fit my-auto ml-1">
                Navigate Through Story
              </div>
            </div>
          )}
        </div>
        {isMenuOpen && (
          <div className="bg-white text-blue-500 dark:text-green-300 flex flex-col w-fit absolute rounded-xl pl-16 py-5 pt-12 px-5 z-10 space-y-4 shadow-lg dark:bg-gray-700">
            {slides.map((slide, index) => (
              <div
                key={index}
                className="w-fit text-lg border-y border-y-yellow-400 font-serif px-1 py-0.5 hover:bg-orange-300 dark:hover:bg-orange-500 hover:text-white hover:cursor-pointer"
                onClick={() => handleMenuOptionClick(index)}
              >
                {slide.title}
              </div>
            ))}
          </div>
        )}
        <h1 className="text-right border-b-4 w-10/12 text-white font-bold text-5xl pb-5 ml-auto mr-10 pt-8 mb-8">
          {slides[currentSlide]?.title}
        </h1>
        <div className="flex-grow overflow-hidden">
          {slides[currentSlide]?.content}
        </div>
        <div className="flex justify-between items-center mt-8">
          {currentSlide > 0 && (
            <button
              onClick={prevSlide}
              className="bg-white text-blue-500 px-4 py-2 rounded-lg"
            >
              Previous
            </button>
          )}
          <div className="flex-grow mx-16">
            <div className="bg-white h-2 rounded-full">
              <div
                className="bg-orange-500 h-full rounded-full transition-all duration-300 ease-in-out"
                style={{
                  width: `${((currentSlide + 1) / slides.length) * 100}%`,
                }}
              ></div>
            </div>
          </div>
          {currentSlide < slides.length - 1 && (
            <button
              onClick={nextSlide}
              className="bg-white text-blue-500 px-4 py-2 rounded-lg"
            >
              Next
            </button>
          )}
        </div>
      </div>
      <div
        className="absolute top-0 left-0 w-1/2 h-full cursor-auto"
        onClick={prevSlide}
      />
      <div
        className="absolute top-0 right-0 w-1/2 h-full cursor-auto"
        onClick={nextSlide}
      />
    </div>
  );
}

export default Blog;