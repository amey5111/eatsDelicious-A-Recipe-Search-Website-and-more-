"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import Image from "next/image";
import client from "@/lib/sanity";
import { urlFor } from '@/lib/sanity';

export default function FoodStory() {
  // const [text, setText] = useState('');
  // const fullText = "First Story Coming Soon stay tuned...:)";
  // const [showText, setShowText] = useState(false);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setShowText(true);
  //   }, 5000);

  //   return () => clearTimeout(timer);
  // }, []);

  // useEffect(() => {
  //   if (showText && text.length < fullText.length) {
  //     const typingTimer = setTimeout(() => {
  //       setText(fullText.slice(0, text.length + 1));
  //     }, 50);

  //     return () => clearTimeout(typingTimer);
  //   }
  // }, [text, showText]);

  const router = useRouter();
  const [posts, setPosts] = useState([]);

  const handlePostOpen = (slug) => {
    router.push(`food-story/${slug}`)
  }
  useEffect(() => {
    async function fetchPosts() {
      try {
        const fetchedPosts = await client.fetch(`*[_type == "post"]{title, slug, category, description, "mainImage": mainImage.asset->}`);
        console.log("Fetched posts from Sanity:", fetchedPosts);
        setPosts(fetchedPosts);
      } catch (error) {
        console.error("Error fetching posts from Sanity:", error);
      }
    }

    fetchPosts();

  }, []);


  return (
    <div className="-mt-5 bg-gradient-to-r from-green-100 to-white-200 dark:from-gray-900 dark:to-black min-h-screen py-5">
      <div className="bg-[url('/food-story/heroImg.jpeg')] min-h-80 opacity-85 lg:opacity-90 bg-no-repeat bg-cover text-white mx-2 lg:mx-24 rounded-2xl my-5 border-4 border-green-700 dark:border dark:border-green-400 py-5">
        <h1 className="text-6xl lg:text-8xl font-extrabold lg:text-right pl-2 lg:pl-0 mr-20 pt-8 font-serif">
          Food Story
        </h1>
        <h3 className=" text-3xl lg:text-4xl font-bold lg:text-right mr-20 pt-4 font-sans pl-2 lg:pl-0">
          Delicious Stories Behind Your Favourite Recipes
        </h3>
        <hr className=" border-[2px] mt-8 w-11/12 mx-auto" />
      </div>
      {/* <div className='w-fit h-fit m-auto flex text-3xl font-mono text-green-500 mt-28 lg:mt-20 text-center'>
        {text}
      </div> */}
      {posts?.map((post, index) =>(
        <div key={index} className="my-6 mx-8 sm:my-6 sm:mx-8 md:mx-10 lg:mx-20 cursor-default w-fit" onClick={() => handlePostOpen(post.slug.current)}>
        <div className="relative flex flex-col sm:flex-row bg-clip-border rounded-xl bg-white text-gray-700 shadow-md w-full max-w-[48rem] dark:bg-gray-600 dark:text-white border border-inherit dark:border-black dark:hover:border-white hover:border-green-400">
          <div className="relative w-full sm:w-2/5 h-48 sm:h-auto m-0 overflow-hidden text-gray-700 bg-orange-200 dark:bg-gray-500 rounded-tl-xl lg:rounded-bl-xl rounded-tr-xl lg:rounded-tr-none bg-clip-border shrink-0">
            <Image
              src={urlFor(post.mainImage).width(300).height(300).url()}
              alt="card-image"
              className="object-cover w-full h-full"
              layout="fill"
            />
          </div>
          <div className="p-4 sm:p-6 flex flex-col flex-grow">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2">
              <h6 className="font-sans text-sm sm:text-base antialiased font-semibold leading-relaxed tracking-normal text-gray-700 uppercase dark:text-gray-200 -mt-8 lg:mt-auto z-10 lg:z-0 bg-white dark:bg-gray-600 py-1 lg:py-0 px-2 lg:px-0 rounded-t-lg lg:rounded-none">
                {post.category}
              </h6>
              <div className="bg-gradient-to-tr from-green-400 to-yellow-400 w-fit px-2 rounded-xl py-1 text-white text-sm sm:text-sm mt-2 sm:mt-0 lg:static absolute -top-4 right-3 z-10">
                First Food Story
              </div>
            </div>
            <h4 className="block mb-2 font-sans text-xl sm:text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900 dark:text-white">
              {post.title}
            </h4>
            <p className="block mb-4 font-sans text-sm sm:text-base antialiased font-normal leading-relaxed text-gray-700 dark:text-gray-200">
              {post.description}
            </p>
            <div className="mt-auto">
              <button
                className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2 w-full sm:w-auto font-sans font-bold text-center text-sm sm:text-base align-middle transition-all rounded-lg select-none disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none active:bg-gray-900/20 bg-gradient-to-br from-blue-400 to-green-400 hover:from-orange-400 hover:to-green-400 text-white"
                type="button"
                onClick={() => handlePostOpen(post.slug.current)}
              >
                Open and Read
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      ))}
    </div>
  );
}
