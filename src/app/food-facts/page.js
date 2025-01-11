"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import client from "@/lib/sanity";
import { urlFor } from "@/lib/sanity";
import Loading from "../components/common/Loading";

// Fisher-Yates shuffle algorithm
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const FoodFacts = () => {
  const [foodFacts, setFoodFacts] = useState([]);
  const [shuffledFacts, setShuffledFacts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const REVEAL_DELAY = 0; // 0 seconds
  const NEXT_SLIDE_DELAY = 6500; // 6.5 seconds

  useEffect(() => {
    // Fetch the facts
    async function fetchFoodFacts() {
      try {
        setIsLoading(true);
        const fetchedFoodFacts = await client.fetch(`*[_type == "foodFact"]`);
        console.log("Fetched foodFacts from Sanity:", fetchedFoodFacts);
        setFoodFacts(fetchedFoodFacts);
        // Shuffle facts when they are fetched
        setShuffledFacts(shuffleArray(fetchedFoodFacts));
      } catch (error) {
        console.error("Error fetching posts from Sanity:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchFoodFacts();
  }, []);

  useEffect(() => {
    if (shuffledFacts.length === 0) return;

    const revealTimer = setTimeout(() => {
      setIsRevealed(true);
    }, REVEAL_DELAY);

    const nextSlideTimer = setTimeout(() => {
      nextSlide();
    }, REVEAL_DELAY + NEXT_SLIDE_DELAY);

    return () => {
      clearTimeout(revealTimer);
      clearTimeout(nextSlideTimer);
    };
  }, [currentIndex, shuffledFacts]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % shuffledFacts.length);
    setIsRevealed(false);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + shuffledFacts.length) % shuffledFacts.length);
    setIsRevealed(false);
  };

  if (isLoading) {
    return (
      <div className="bg-gradient-to-br from-green-400 to-blue-500 dark:from-green-800 dark:to-blue-900 flex items-center justify-center p-4 min-h-screen">
        <div className="text-white text-3xl font-bold">Loading Food Facts...</div>
      </div>
    );
  }

  if (shuffledFacts.length === 0) return null;

  const currentFact = shuffledFacts[currentIndex];

  return (
    <div className="bg-gradient-to-br from-green-400 to-blue-500 dark:from-green-800 dark:to-blue-900 flex items-center justify-center p-4 min-h-screen">
      <div className="max-w-5xl w-full flex items-center">
        <button
          onClick={prevSlide}
          className="hidden md:block bg-white dark:bg-gray-800 text-gray-800 dark:text-white p-2 rounded-full shadow-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300 mr-4"
        >
          &#8592;
        </button>
        <div className="flex-grow bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">
          <div className="p-6 bg-gray-100 dark:bg-gray-700">
            <h1 className="text-4xl font-bold mb-4 text-center text-gray-800 dark:text-white">
              Food Facts
            </h1>
          </div>
          <div className="relative h-96">
            <div 
              className="absolute inset-0 z-10"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left;
                if (x < rect.width / 2) {
                  prevSlide();
                } else {
                  nextSlide();
                }
              }}
            />
            <Image
              src={urlFor(currentFact.image).url()}
              alt="Food fact illustration"
              layout="fill"
              objectFit="cover"
            />
            {isRevealed && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center p-6">
                <p className="text-white text-3xl text-center font-semibold">
                  {currentFact.text}
                </p>
              </div>
            )}
          </div>
          <div className="p-6 bg-gray-100 dark:bg-gray-700">
            <div className="w-full bg-gray-300 dark:bg-gray-600 rounded-full h-2">
              <div
                className="bg-blue-600 dark:bg-blue-400 h-2 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${((currentIndex + 1) / shuffledFacts.length) * 100}%` }}
              />
            </div>
          </div>
        </div>
        <button
          onClick={nextSlide}
          className="hidden md:block bg-white dark:bg-gray-800 text-gray-800 dark:text-white p-2 rounded-full shadow-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300 ml-4"
        >
          &#8594;
        </button>
      </div>
    </div>
  );
};

export default FoodFacts;