import Image from "next/image";
import { useRouter } from "next/navigation";
import client from "@/lib/sanity";
import { urlFor } from "@/lib/sanity";
import Link from "next/link";

export async function fetchPost(slug) {
  try {
    const fetchedPost = await client.fetch(`*[slug.current == "${slug}"]`);
    console.log("Fetched posts from Sanity:", fetchedPost);
    return fetchedPost[0];
  } catch (error) {
    console.error("Error fetching posts from Sanity:", error);
    return null;
  }
}

export async function getSlides(slug) {
  const data = await fetchPost(slug);
  const handleGoToHomeClick = () => {

  }
  if (!data) return [];

  return [
    {
      title: data.slides[0].title,
      content: (
        <>
          <div className="flex flex-col lg:flex-row justify-evenly mt-10">
            <div className="h-auto w-full lg:w-[35%] flex align-middle justify-around">
              <Image
                src={urlFor(data.slides[0].content[2].asset).url()}
                alt="Iced Tea"
                height={300}
                width={250}
                className="relative -top-28 -left-2"
              />
              <Image
                src={urlFor(data.slides[0].content[3].asset).url()}
                alt="Iced Tea"
                height={300}
                width={240}
                className="relative top-5 right-16"
              />
            </div>
            <div className="w-full lg:w-[65%] text-lg lg:text-2xl px-8 py-5 font-sans font-medium">
              <div className="my-6">{data.slides[0].content[0].children[0].text}</div>
              <div className="my-5">{data.slides[0].content[1].children[0].text}</div>
            </div>
          </div>
        </>
      ),
    },
    {
      title: data.slides[1].title,
      content: (
        <>
          <div className="flex flex-col-reverse lg:flex-row">
            <div className="w-full lg:w-[70%] text-lg lg:text-2xl px-8 py-5 font-sans font-medium lg:ml-12">
              <div className="my-4">{data.slides[1].content[0].children[0].text}</div>
              <div className="my-4">{data.slides[1].content[1].children[0].text}</div>
              <div className="my-4">{data.slides[1].content[2].children[0].text}</div>
            </div>
            <div className=" w-full lg:w-[30%] flex flex-col justify-center items-center">
              <Image
                src={urlFor(data.slides[1].content[3].asset).url()}
                alt="Tea leaves falling"
                height={200}
                width={200}
                className="rounded-2xl mb-4"
              />
              <Image
                src={urlFor(data.slides[1].content[4].asset).url()}
                alt="Ice cubes falling"
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
      title: data.slides[2].title,
      content: (
        <div className="flex">
          <div className="text-lg lg:text-2xl px-8 py-5 font-sans font-medium">
            <div className="lg:flex flex-row justify-around">
              <Image
                src={urlFor(data.slides[2].content[0].asset).url()}
                alt="Iced Tea Story"
                height={150}
                width={150}
                className="mb-5 lg:mb-0 w-full border-4"
                layout="fixed"
              />
              <div className="flex flex-col">
                <div className="mb-6 w-11/12 ml-auto">{data.slides[2].content[1].children[0].text}</div>
                <div className="mt-6 w-11/12 ml-auto">{data.slides[2].content[2].children[0].text}</div>
              </div>
            </div>
            <div className="ml-6 lg:ml-0 mt-6">{data.slides[2].content[3].children[0].text}</div>
          </div>
        </div>
      ),
    },
    {
      title: data.slides[3].title,
      content: (
        <div className="flex flex-col items-center">
          <div className="text-lg lg:text-2xl px-8 py-4 font-sans font-medium text-center">
            {data.slides[3].content[0].children[0].text}
          </div>
          <div className=" flex flex-col lg:flex-row gap-8 w-full px-8 lg:px-12">
            {data.facts.map((fact, index) => (
              <div key={index} className="bg-white bg-opacity-20 rounded-xl p-6 transform transition-all hover:scale-105 hover:bg-opacity-30 lg:w-4/5 mx-auto text-center">
                <h3 className="text-xl lg:text-3xl font-bold mb-3 text-yellow-300">{fact.title}</h3>
                <p className="text-lg lg:text-2xl">{fact.description}</p>
              </div>
            ))}
          </div>
          <div className="w-full flex flex-col lg:flex-row justify-between items-center mt-8 px-12">
            <div className="w-screen lg:w-[40%] relative z-10">
              <input
                type="text"
                className="w-full py-2 px-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700 placeholder-gray-500"
                placeholder="Want to chill with an Iced Tea? Try Searching Iced Tea Recipes"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none pointer">
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
              <div className="mt-3 lg:mt-0 text-xl font-thin">Tags:</div>
              <div className="flex flex-wrap">
                {data.tags.map((tag, index) => (
                  <div key={index} className="bg-purple-500 mx-3 px-3 py-1 rounded-lg mb-3">
                    {tag}
                  </div>
                ))}
              </div>
            </div>
            <Link href="/" className="bg-green-400 text-white font-semibold py-2 px-6 rounded-full hover:bg-green-500 transition duration-300 ease-in-out z-20 text-center" onClick={handleGoToHomeClick}>
              Go To Home Page →
            </Link>
          </div>
        </div>
      ),
    },
  ];
}