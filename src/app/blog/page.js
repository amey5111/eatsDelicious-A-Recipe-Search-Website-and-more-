"use client";
import React, { useState, useEffect } from "react";
import client from "@/lib/sanity";
import Image from "next/image";

const slides = [
  {
    title: "The Chilled Story: When Tea Met the Coolest Ice",
    content: (
      <>
        <div className="flex flex-row justify-evenly mt-10">
          <div className="w-[35%] flex align-middle justify-around">
            <Image
              src="/food-story/IcedTea/glass-of-Iced-tea.jpg"
              alt="Iced Tea"
              height={300}
              width={250}
              className="relative -top-28 -left-2"
            />
            <Image
              src="/food-story/IcedTea/delicious-iced-tea.jpg"
              alt="Iced Tea"
              height={300}
              width={240}
              className="relative top-5 right-16"
            />
          </div>
          <div className="w-[65%] text-2xl px-8 py-5 font-sans font-medium">
            <div className="my-6">
              Yes, you read it right! The stats say that almost 85% of all tea
              consumed in the US is iced! Nothing beats the cool, crisp flavor
              of iced tea on a warm summer day. This cool, refreshing drink of
              US culture has already captured the taste buds of people not only
              in the US but all around the world.
            </div>
            <div className="my-5">
              Like US Iced tea has gained popularity in nations like South Korea
              and Japan in the form of Green Iced Tea, which is a combination of
              refreshing as well as good nutritional values. Brazil has its own
              twist with iced mate, a popular drink in the southern regions.
              This chill beverage has the power to quench our thirst and awaken
              our senses, regardless of whether you want it sweet and simple or
              bold and complex.
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    title: "History: Tea to Iced Tea",
    content: (
      <>
        <div className="flex flex-row">
          <div className="w-[70%] text-2xl px-8 py-5 font-sans font-medium ml-12">
            <div className="my-4">
              As Iced tea is an Iced version of Tea only, its history has roots
              in the origin of Tea in China. It&apos;s the story of 2737 BC.
              When some tree leaves were blown into boiling water by Emperor
              Shen Nung&apos;s servant, Tea was first made. So Tea was there
              since 2737 BC!
            </div>
            <div className="my-4">
              But it took a long way for a normal tea to modify itself as an
              Iced one. This is because, as early as 1823, Marguerite Countess
              of Blessington wrote of sipping iced tea in Naples. You can get
              the earliest printed Iced tea recipe which is from the 1870s.
            </div>
            <div className="my-4">
              Iced Tea started its journey in the 1860&apos;s in the US.
              Although the US people first tasted it as a
              &quot;for-a-change&quot; drink. But almost in some years it gained
              so much popularity throughout the US. Iced Tea Recipes appeared in
              printed format, It was served on hotel menus, sold at train
              stations, and all over the US.
            </div>
          </div>
          <div className="w-[30%] flex flex-col justify-center items-center">
            <Image
              src="/food-story/IcedTea/tea leaves falling.jpeg"
              alt="Iced Tea"
              height={200}
              width={200}
              className="rounded-2xl mb-4"
            />
            <Image
              src="/food-story/IcedTea/ice cubes falling.jpeg"
              alt="Iced Tea"
              height={200}
              width={200}
              className="rounded-2xl"
            />
          </div>
        </div>
      </>
    ),
  },
  {
    title: "The 1904's Story: The turning point in Iced Tea's life",
    content: (
      <div className="flex">
        <div className="text-2xl px-8 py-5 font-sans font-medium">
          <div className="flex flex-row justify-around">
            <Image
              src="/food-story/IcedTea/Iced Tea 1904 Story.jpeg"
              alt="Iced Tea Story"
              height={150}
              width={150}
              className="w-full border-4"
              layout="fixed"
            />
            <div className="flex flex-col">
              <div className="mb-6 w-11/12 ml-auto">
                The turning point in Iced Tea&apos;s life came in 1904 at the
                World&apos;s Fair in St. Louis. Richard Blechynden, a
                British-Indian-born merchant, had a big role in the promotion of
                Iced tea. He had worked for the government in a variety of
                marketing capacities, promoting Indian teas.
              </div>
              <div className="mt-6 w-11/12 ml-auto">
                He had planned to give away free samples of hot tea to
                1904&apos;s St. Louis World Fair visitors. However, St. Louis
                was so hot that folks were just not in the mood for a nice hot
                cup of tea. So Richard thought, &quot;If they won&apos;t drink
                hot tea, how about cold tea?&quot; He dumped ice into his hot
                tea with some apparatus and simple process, and the resulting
                cold tea. This refreshing idea not only became a delicious
                moment of the world fair but also resulted as a game changer in
                the popularity of Iced Tea.
              </div>
            </div>
          </div>
          <div className="mt-6">
            The beverage sold so well that it gained national popularity after
            the event. Although iced tea existed before it, it is unknown if he
            had heard of it. However, his decision to begin selling cooled tea
            at the fair was a success and had a lasting impact for Iced Tea.
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "Coolest Facts about Iced Tea",
    content: (
      <div className="flex flex-col items-center">
        <div className="text-2xl px-8 py-4 font-sans font-medium text-center">
          Today, iced tea comes in a variety of flavors and styles. From classic
          black tea to fruity herbal blends and health-focused green teas,
          there&apos;s an iced tea for every taste. So here come some
          interesting facts about our blog&apos;s hero
        </div>
        <div className="grid grid-cols-3 gap-8 w-full px-12">
          <div className="bg-white bg-opacity-20 rounded-xl p-6 transform transition-all hover:scale-105 hover:bg-opacity-30">
            <h3 className="text-3xl font-bold mb-3 text-yellow-300">
              National Iced Tea Month
            </h3>
            <p className="text-2xl">
              June is celebrated as National Iced Tea Month in the United
              States.
            </p>
          </div>
          <div className="bg-white bg-opacity-20 rounded-xl p-6 transform transition-all hover:scale-105 hover:bg-opacity-30">
            <h3 className="text-3xl font-bold mb-3 text-yellow-300">Sun Tea</h3>
            <p className="text-2xl">
              Sun tea, made by placing a tall glass of tea in sunlight, was a
              popular method before refrigeration became widespread.
            </p>
          </div>
          <div className="bg-white bg-opacity-20 rounded-xl p-6 transform transition-all hover:scale-105 hover:bg-opacity-30">
            <h3 className="text-3xl font-bold mb-3 text-yellow-300">
              Record-Breaking Tea
            </h3>
            <p className="text-2xl">
              The largest cup of iced tea was created in Summerville, South
              Carolina, in 2016. It held a staggering 2,524 gallons of tea!
            </p>
          </div>
        </div>
        <div className="w-full flex justify-between items-center mt-8 px-12">
          <div className="w-[35%] relative">
            <input
              type="text"
              className="w-full py-2 px-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700 placeholder-gray-500"
              placeholder="Want to chill with an Iced Tea? Try Searching Iced Tea"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
          <div>
            <div className="text-xl font-thin">Tags:</div>
            <div className="flex flex-wrap">
              <div className=" bg-purple-500 mx-3 px-3 py-1 rounded-lg mb-3">
                # IcedTea-History
              </div>
              <div className=" bg-purple-500 mx-3 px-3 py-1 rounded-lg mb-3">
                # Refreshing-Drinks
              </div>
              <div className=" bg-purple-500 mx-3 px-3 py-1 rounded-lg mb-3">
                # Tea-Culture
              </div>
              <div className=" bg-purple-500 mx-3 px-3 py-1 rounded-lg mb-3">
                # Summer-Beverages
              </div>
              <div className=" bg-purple-500 mx-3 px-3 py-1 rounded-lg">
                # Cool-Facts
              </div>
            </div>
          </div>
          <button className="bg-green-400 text-white font-semibold py-2 px-6 rounded-full hover:bg-green-500 transition duration-300 ease-in-out">
            Go To Home Page →
          </button>
        </div>
      </div>
    ),
  },
];

function Blog() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [posts, setPosts] = useState([]);


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
    async function fetchPosts() {
      try {
        const fetchedPosts = await client.fetch(`*[slug.current == "IcedTeaStory"]`);
        console.log("Fetched posts from Sanity:", fetchedPosts);
        setPosts(fetchedPosts);
      } catch (error) {
        console.error("Error fetching posts from Sanity:", error);
      }
    }

    fetchPosts();

    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === "ArrowLeft") prevSlide();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentSlide]);

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
            {slides.map((slide, index) => {
              return (
                <div
                  key={index}
                  className="w-fit text-lg border-y border-y-yellow-400 font-serif px-1 py-0.5 hover:bg-orange-300 dark:hover:bg-orange-500 hover:text-white hover:cursor-pointer"
                  onClick={() => handleMenuOptionClick(index)}
                >
                  {slide.title}
                </div>
              );
            })}
          </div>
        )}
        <h1 className="text-right border-b-4 w-10/12 text-white font-bold text-5xl pb-5 ml-auto mr-10 pt-8 mb-8">
          {slides[currentSlide].title}
        </h1>
        <div className="flex-grow overflow-hidden">
          {slides[currentSlide].content}
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
