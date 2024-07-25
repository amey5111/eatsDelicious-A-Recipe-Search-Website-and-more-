"use client";
import React, { useState, useEffect } from 'react';

export default function FoodStory() {
  const [text, setText] = useState('');
  const fullText = "First Story Coming Soon stay tuned...:)";
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowText(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (showText && text.length < fullText.length) {
      const typingTimer = setTimeout(() => {
        setText(fullText.slice(0, text.length + 1));
      }, 50);

      return () => clearTimeout(typingTimer);
    }
  }, [text, showText]);

  return (
    <div className='-mt-5 bg-gradient-to-r from-green-100 to-orange-200 dark:from-gray-900 dark:to-black min-h-screen py-5'>
      <div className="bg-[url('/food-story/heroImg.jpeg')] min-h-80 opacity-85 lg:opacity-90 bg-no-repeat bg-cover text-white mx-2 lg:mx-24 rounded-2xl my-5 border-4 border-green-700 dark:border dark:border-green-400 py-5">
        <h1 className='text-6xl lg:text-8xl font-extrabold lg:text-right pl-2 lg:pl-0 mr-20 pt-8 font-serif'>Food Story</h1>
        <h3 className=' text-3xl lg:text-4xl font-bold lg:text-right mr-20 pt-4 font-sans pl-2 lg:pl-0'>
          Delicious Stories Behind Your Favourite Recipes
        </h3>
        <hr className=' border-[2px] mt-8 w-11/12 mx-auto'/>
      </div>
      <div className='w-fit h-fit m-auto flex text-3xl font-mono text-green-500 mt-28 lg:mt-20 text-center'>
        {text}
      </div>
    </div>
  );
}