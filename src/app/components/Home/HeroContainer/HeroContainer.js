"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function HeroContainer() {
  const [typingText, setTypingText] = useState("");
  const [inputValue, setInputValue] = useState("");
  const router = useRouter();
  const texts = ["Rasmlai", "Pasta", "Noodles", "Rice", "Cakes"];

  useEffect(() => {
    let index = 0;
    const updatePlaceholder = () => {
      const currentText = texts[index];
      let charIndex = 0;

      const typeEffect = setInterval(() => {
        if (charIndex < currentText.length) {
          setTypingText(currentText.slice(0, charIndex + 1));
          charIndex++;
        } else {
          clearInterval(typeEffect);
          setTimeout(() => {
            setTypingText("");
            index = (index + 1) % texts.length;
          }, 1000);
        }
      }, 150);
    };

    updatePlaceholder();

    const intervalId = setInterval(() => {
      index = (index + 1) % texts.length;
      updatePlaceholder();
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);

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
    <div
      className="relative w-11/12 sm:w-5/6 h-72 sm:h-60 md:h-80 lg:h-96 flex items-center justify-center bg-cover bg-center py-5 sm:py-5 lg:py-10 mx-auto rounded-xl sm:rounded-2xl dark:bg-black dark:text-white mt-6"
      style={{ backgroundImage: "url('/heroBackground.png')" }}
    >
      <div className="absolute inset-0 bg-black opacity-50 rounded-xl sm:rounded-2xl"></div>
      <div className="relative z-10 text-center text-white px-4 sm:px-6 w-full">
        <h1 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6">
          What do you feel like cooking?
        </h1>
        <div className="flex items-center bg-white w-4/5 lg:w-full max-w-md mx-auto rounded-xl sm:rounded-2xl p-1 sm:p-2 dark:bg-gray-700 dark:text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="black"
            className="bi bi-search ml-2 mr-1 flex-shrink-0"
            viewBox="0 0 16 16"
          >
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
          </svg>
          <input
            type="text"
            onKeyDown={handleKeyDown}
            className="flex-grow px-1 sm:px-2 py-1 sm:py-2 text-xs sm:text-sm md:text-base border-2 border-transparent focus:border-b-orange-500 focus:outline-none text-black dark:bg-gray-700 dark:text-white"
            placeholder={`Search for ${typingText}`}
            value={inputValue}
            onChange={handleInputChange}
          />
          <button
            className="ml-1 px-2 sm:px-3 py-1 sm:py-2 bg-orange-500 text-white hover:bg-orange-600 focus:outline-none rounded-lg text-xs sm:text-sm md:text-base flex-shrink-0 dark:bg-orange-300 dark:text-orange-800"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
        {/* Separator */}
        <div className="my-3 flex items-center justify-center gap-3">
          <div className="w-8 h-0.5 bg-orange-400 rounded-full animate-pulse" />
          <span className="text-sm sm:text-base text-gray-300 font-medium">
            OR
          </span>
          <div className="w-8 h-0.5 bg-orange-400 rounded-full animate-pulse" />
        </div>

        {/* Suggestion heading */}
        <h3 className="flex flex-col w-fit mx-auto align-middle justify-center mt-4 text-lg sm:text-xl md:text-4xl font-semibold">
          <div className="mr-5 my-auto">Just Ask{" "}</div>
          <Link
            href="/magic-chef-ai"
            className="flex text-white font-bold py-2 px-3 rounded-xl bg-gradient-to-tr from-orange-600 to-orange-300 w-fit mx-auto mt-2"
          >
            <div>😋 Magic Chef</div>
            <div className=" w-fit mx-auto text-sm lg:text-xl bg-white text-orange-600 font-bold px-3 lg:px-5 py-0.5 rounded-full shadow-md ml-2 h-fit my-auto">
              AI
            </div>
          </Link>
        </h3>
      </div>
    </div>
  );
}
