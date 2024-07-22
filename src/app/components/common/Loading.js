import React from "react";
import Image from "next/image";
function Loading({ text }) {
  return (
    <div className="h-screen lg:h-1/2 w-full gap-x-2 flex flex-col lg:flex-row-reverse items-center text-2xl lg:text-4xl font-semibold my-auto mx-auto lg:pr-24 lg:pt-0 pt-24">
      <div>
        <div className="w-full gap-x-2 flex justify-center items-center">
          <div className="text-[#d991c2] text-2xl lg:text-4xl font-bold">
            {text}{" "}
          </div>
          <div className="w-3 bg-[#d991c2] animate-pulse h-3 rounded-full mt-5 hidden lg:block"></div>
          <div className="w-3 animate-pulse h-3 bg-[#9869b8] rounded-full mt-5 hidden lg:block"></div>
          <div className="w-3 h-3 animate-pulse bg-[#6756cc] rounded-full mt-5 hidden lg:block"></div>
        </div>
      </div>
      <div className=" h-5/6 lg:h-3/4 w-full lg:w-1/2 my-auto">
        <Image
          src="/Loading/loading black.gif"
          alt="Food"
          height={10}
          width={10}
          layout="responsive"
          className="hidden dark:block"
        />
        <Image
          src="/Loading/loading white.gif"
          alt="Food"
          height={100}
          width={100}
          layout="responsive"
          className="block dark:hidden"
        />
      </div>
    </div>
  );
}

export default Loading;
