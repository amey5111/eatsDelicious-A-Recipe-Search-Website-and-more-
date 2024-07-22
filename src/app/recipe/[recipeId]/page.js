"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import NutrientChart from "../../components/recipe/NutrientChart";
import axios from "axios";
import Loading from "@/app/components/common/Loading";
import { Error } from "@/app/components/common/Error";

const Recipe = ({ params }) => {
  const recipeId = params.recipeId;
  const [recipe, setRecipe] = useState(null);
  const [nutrientInfo, setNutrientInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(
          `https://api.edamam.com/api/recipes/v2/${recipeId}?type=public&app_id=${process.env.NEXT_PUBLIC_APP_ID}&app_key=${process.env.NEXT_PUBLIC_APP_KEY}`
        );
        setNutrientInfo(response.data.recipe.totalNutrients);
        setRecipe(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [recipeId]);

  if (loading) {
    return (
      <div>
        <Loading text="Getting your recipe open" />
      </div>
    );
  }

  if (error) {
    return <Error error={error.message} />;
  }

  if (!recipe) {
    return null;
  }

  return (
    <div className="dark:bg-gray-950 min-h-screen dark:text-white">
      <div className="lg:grid lg:grid-cols-[450px_1fr] lg:gap-8 lg:px-8">
        <div className="mt-3 lg:mt-8 rounded-lg w-[65%] lg:w-full mx-auto">
          <div className="lg:sticky lg:top-14 mt-20">
            <Image
              src={recipe.recipe.image}
              alt="Recipe Image"
              width={800}
              height={350}
              className="rounded-xl border border-purple-500 w-full h-[200px] lg:h-[320px] object-cover mx-auto"
            />
            <div className="my-1 lg:my-3 hidden lg:flex mt-5">
              <div className="text-sm lg:text-lg font-medium border-b-4 border-b-[#5ed2b8] w-fit whitespace-nowrap h-fit my-auto">
                Best For:
              </div>
              <div className="flex items-center flex-wrap">
                {recipe.recipe.mealType.map((mealType, index) => (
                  <div
                    key={index}
                    className="ml-5 text-xs lg:text-lg font-medium text-white bg-orange-500 px-2 py-1 mb-2 dark:bg-orange-700"
                  >
                    {mealType}
                  </div>
                ))}
              </div>
            </div>
            <div className="my-1 lg:my-3 hidden lg:flex">
              <div className="text-sm lg:text-lg font-medium border-b-4 border-b-[#5ed2b8] w-fit whitespace-nowrap h-fit my-auto">
                Total Calories:
              </div>
              <div className="text-base lg:text-lg font-medium ml-3 border-2 border-purple-500 rounded-md px-1 lg:px-5 py-1">
                {recipe.recipe.calories.toFixed(2)}
              </div>
              <div className="text-sm lg:text-base ml-2 mt-auto text-orange-600">
                Calories/Serving
              </div>
            </div>
            <div className="mt-5 my-3 hidden lg:flex">
              <h3 className="text-sm lg:text-lg font-medium border-b-4 border-b-[#5ed2b8] w-fit whitespace-nowrap h-fit">
                Diet Labels :
              </h3>
              <div className="flex items-center flex-wrap">
                {recipe.recipe.dietLabels.map((dietLabel, index) => (
                  <div
                    key={index}
                    className="ml-5 text-xs lg:text-sm font-medium rounded-xl bg-pink-500 text-white px-2 py-1 mb-2 dark:bg-pink-700"
                  >
                    {dietLabel}
                  </div>
                ))}
              </div>
            </div>
            <div className="my-3 hidden lg:flex">
              <h3 className="text-sm lg:text-lg font-medium border-b-4 border-b-[#5ed2b8] w-fit whitespace-nowrap h-fit">
                Cuisine Type :
              </h3>
              <div className="flex items-center flex-wrap">
                {recipe.recipe.cuisineType.map((cuisineType, index) => (
                  <div
                    key={index}
                    className="ml-5 text-xs lg:text-base font-medium rounded-xl bg-purple-500 text-white px-2 py-1 mb-3 dark:bg-purple-700"
                  >
                    {cuisineType}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-2 lg:mt-8 text-center mx-auto lg:mx-0 w-11/12 lg:w-full">
          <h1 className="text-2xl lg:text-4xl font-bold pb-5 border-b-2 lg:border-b-4 border-b-[#5ed2b8] dark:border-b-green-500 dark:text-green-200">
            {recipe.recipe.label}
          </h1>
          <h3 className="text-right text-base lg:text-lg font-medium bg-green-100 rounded-md w-fit px-5 mt-2 mb-2 ml-auto dark:bg-green-700">
            ~ {recipe.recipe.source}
          </h3>
          <div>
            <div className="border-b border-t border-t-orange-500 border-b-orange-500 w-1/2 lg:w-1/3 text-orange-500 py-2 text-xl lg:text-2xl font-semibold rounded-xl bg-orange-50 dark:bg-orange-900 dark:text-orange-100">
              Ingredients
            </div>
            <div
  className={`mt-5 ${
    recipe.recipe.ingredientLines.length > 4
      ? "lg:grid lg:grid-cols-2 lg:gap-x-8 lg:gap-y-4"
      : "flex flex-col"
  } text-left space-y-5 lg:space-y-0`}
>
  {recipe.recipe.ingredientLines.map((ingredientLine, index) => (
    <div
      key={index}
      className={`${
        recipe.recipe.ingredientLines.length > 4 ? "lg:mb-0" : ""
      } flex flex-col`}
    >
      <div className="flex text-base lg:text-xl font-sans">
        <div className="w-fit h-fit my-auto">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            fill="orange"
            className="bi bi-check2-circle"
            viewBox="0 0 16 16"
          >
            <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0" />
            <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z" />
          </svg>
        </div>
        <div className={`ml-3 w-full ${recipe.recipe.ingredientLines.length > 4 ? "":"lg:my-3"}`}>{ingredientLine}</div>
      </div>
      <hr className="dark:font-medium dark:border-gray-700 mt-4 lg:mt-4" />
    </div>
  ))}
</div>
          </div>
          <div className="flex flex-col lg:flex-row">
            <div className="h-fit my-8 lg:my-auto">
              <a
                className="w-fit text-orange-500 py-1 px-5 text-sm lg:text-xl font-mono bg-purple-200 hover:bg-purple-300 rounded-xl border-t border-b border-t-purple-400 border-b-purple-400 flex dark:text-orange-500 dark:bg-[#483248] lg:dark:bg-[#301934] lg:hover:dark:bg-[#1e1020] flex-col lg:flex-row"
                href={recipe.recipe.url}
              >
                <div>
                  Click to Get Steps for Preparation on {recipe.recipe.source}
                </div>
                <div className="m-auto">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="35"
                    height="35"
                    fill="#a855f7"
                    className="bi bi-folder-symlink"
                    viewBox="0 0 16 16"
                  >
                    <path d="m11.798 8.271-3.182 1.97c-.27.166-.616-.036-.616-.372V9.1s-2.571-.3-4 2.4c.571-4.8 3.143-4.8 4-4.8v-.769c0-.336.346-.538.616-.371l3.182 1.969c.27.166.27.576 0 .742" />
                    <path d="m.5 3 .04.87a2 2 0 0 0-.342 1.311l.637 7A2 2 0 0 0 2.826 14h10.348a2 2 0 0 0 1.991-1.819l.637-7A2 2 0 0 0 13.81 3H9.828a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 6.172 1H2.5a2 2 0 0 0-2 2m.694 2.09A1 1 0 0 1 2.19 4h11.62a1 1 0 0 1 .996 1.09l-.636 7a1 1 0 0 1-.996.91H2.826a1 1 0 0 1-.995-.91zM6.172 2a1 1 0 0 1 .707.293L7.586 3H2.19q-.362.002-.683.12L1.5 2.98a1 1 0 0 1 1-.98z" />
                  </svg>
                </div>
              </a>
            </div>
            <div className="max-w-screen-sm lg:w-5/6 mt-3 ml-5">
              <h1 className="border-b-4 border-b-green-300 w-1/2 mx-auto text-xl text-center font-medium mb-2">
                Nutritional Information
              </h1>
              <NutrientChart data={nutrientInfo} />
            </div>
          </div>
          <div className="flex my-1 lg:my-3 lg:hidden">
            <div className="text-sm lg:text-lg font-medium border-b-4 border-b-[#5ed2b8] w-fit whitespace-nowrap h-fit my-auto">
              Total Calories:
            </div>
            <div className="text-base lg:text-lg font-medium ml-3 border-2 border-purple-500 rounded-md px-1 lg:px-5 py-1">
              {recipe.recipe.calories.toFixed(2)}
            </div>
            <div className="text-sm lg:text-base ml-2 mt-auto text-orange-600">
              Calories/Serving
            </div>
          </div>
          <div className="my-1 lg:my-3 flex lg:hidden mt-5">
            <div className="text-sm lg:text-lg font-medium border-b-4 border-b-[#5ed2b8] w-fit whitespace-nowrap h-fit my-auto">
              Best For:
            </div>
            <div className="flex items-center flex-wrap">
              {recipe.recipe.mealType.map((mealType, index) => (
                <div
                  key={index}
                  className="ml-5 text-xs lg:text-lg font-medium text-white bg-orange-500 px-2 py-1 mb-2 dark:bg-orange-700"
                >
                  {mealType}
                </div>
              ))}
            </div>
          </div>
          <div className="mt-5 my-3 flex lg:hidden">
            <h3 className="text-sm lg:text-lg font-medium border-b-4 border-b-[#5ed2b8] w-fit whitespace-nowrap h-fit">
              Diet Labels :
            </h3>
            <div className="flex items-center flex-wrap">
              {recipe.recipe.dietLabels.map((dietLabel, index) => (
                <div
                  key={index}
                  className="ml-5 text-xs lg:text-sm font-medium rounded-xl bg-pink-500 text-white px-2 py-1 mb-2 dark:bg-pink-700"
                >
                  {dietLabel}
                </div>
              ))}
            </div>
          </div>
          <div className="my-3 flex lg:hidden">
            <h3 className="text-sm lg:text-lg font-medium border-b-4 border-b-[#5ed2b8] w-fit whitespace-nowrap h-fit">
              Cuisine Type :
            </h3>
            <div className="flex items-center flex-wrap">
              {recipe.recipe.cuisineType.map((cuisineType, index) => (
                <div
                  key={index}
                  className="ml-5 text-xs lg:text-base font-medium rounded-xl bg-purple-500 text-white px-2 py-1 mb-3 dark:bg-purple-700"
                >
                  {cuisineType}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recipe;
