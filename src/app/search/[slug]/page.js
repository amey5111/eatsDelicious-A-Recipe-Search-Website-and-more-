"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Loading from "@/app/components/common/Loading";
import { Error } from "@/app/components/common/Error";

const FilterTags = ({ title, options, value, onChange, multiSelect }) => (
  <div className="mb-4">
    <h3 className="text-sm lg:text-base font-medium text-gray-700 dark:text-gray-300 mb-2">
      {title}
    </h3>
    <div className="flex flex-wrap gap-2">
      {options.map((option, index) => (
        <button
          key={index}
          onClick={() => {
            if (multiSelect) {
              const newValue = value.includes(option)
                ? value.filter(v => v !== option)
                : [...value, option];
              onChange(newValue);
            } else {
              onChange(value === option ? "" : option);
            }
          }}
          className={`px-3 py-1 text-sm rounded-full ${
            (multiSelect ? value.includes(option) : value === option)
              ? "bg-green-500 text-white"
              : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
          } hover:bg-green-400 hover:text-white transition-colors duration-200`}
        >
          {option}
        </button>
      ))}
    </div>
  </div>
);

const parseDecodedSlug = (decodedSlug) => {
  const params = new URLSearchParams(decodedSlug.replace('query=', ''));
  return {
    health: params.get('health') || '',
    cuisineType: params.getAll('cuisineType'),
    time: params.get('time') || '',
    diet: params.getAll('diet'),
    mealType: params.get('mealType') || '',
    dishType: params.get('dishType') || '',
  };
};

export default function SearchPage({ params }) {
  const app_key = process.env.NEXT_PUBLIC_APP_KEY;
  const app_id = process.env.NEXT_PUBLIC_APP_ID;
  const base_url = "https://api.edamam.com/api/recipes/v2";
  const { slug } = params;
  const decodedSlug = decodeURIComponent(slug);

  const [searchResults, setSearchResults] = useState(null);
  const [displayedResults, setDisplayedResults] = useState([]);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [filtersApplied, setFiltersApplied] = useState(false);
  const [filters, setFilters] = useState(() => parseDecodedSlug(decodedSlug));
  const [filtersCount, setFiltersCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const filterOptions = {
    "health": [
      "vegetarian", "vegan"
    ],
    "Cuisine Type": [
      "American", "Indian", "British", "Caribbean", "Chinese",
      "French", "Asian", "Italian", "Japanese", "Kosher",
      "Mediterranean", "Mexican", "Nordic",
    ],
    "time": ["5", "10", "15", "30", "45", "1 hour", "1.5 hour", "2 hour", "3 hour"],
    "Diet": [
      "balanced", "high-fiber", "high-protein", "low-carb", "low-fat", "low-sodium",
    ],
    "Meal Type": ["Breakfast", "Dinner", "Lunch", "Teatime"],
    "Dish Type": [
      "Biscuits and cookies", "Bread", "Cereals", "Condiments and sauces",
      "Desserts", "Drinks", "Main course", "Pancake", "Preps", "Preserve",
      "Salad", "Sandwiches", "Soup", "Starter",
    ],
  };

  useEffect(() => {
    fetchResults(filters);
    console.log("filters", filters);
  }, [decodedSlug]);

  useEffect(()=>{
    setFiltersCount(countFilters(filters));
  },[]);

  const countFilters = (filters) => {
    return Object.values(filters).reduce((total, value) => {
      if (Array.isArray(value)) {
          return total + value.length;
      }
      if (typeof value === 'string' && value !== "") {
          return total + 1;
      }
      return total;
  }, 0);
  }
  const fetchResults = (appliedFilters = filters) => {
    setLoading(true);
    setFiltersApplied(false);
    let url = decodedSlug.startsWith("query")
      ? `${base_url}?type=public&q=${
          decodedSlug.split("=")[1]
        }&app_id=${app_id}&app_key=${app_key}`
      : decodedSlug.includes("[")
      ? `${base_url}?type=public&app_id=${app_id}&app_key=${app_key}${decodedSlug
          .replaceAll("[", "%5B")
          .replaceAll("]", "%5D")
          .replaceAll("+", "%2B")}`
      : `${base_url}?type=public&app_id=${app_id}&app_key=${app_key}`;

    Object.entries(appliedFilters).forEach(([key, value]) => {
      if (Array.isArray(value) && value.length > 0) {
        value.forEach(item => {
          if (item && typeof item === 'string' && item.trim() !== '') {
            url += `&${key}=${encodeURIComponent(item)}`;
          }
        });
      } else if (value && typeof value === 'string' && value.trim() !== '') {
        url += `&${key}=${encodeURIComponent(value)}`;
      }
    });
    console.log("appliedFilters", appliedFilters)
    console.log(url);

    axios
      .get(url)
      .then((response) => {
        console.log(response.data);
        setSearchResults(response.data.hits);
        setDisplayedResults(response.data.hits.slice(0, 10));
        setPage(1);
      })
      .catch((error) => {
        console.error("Error fetching search results:", error);
        setError(
          "Something went wrong while fetching search results. Please try again."
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const getSearchString = (decodedSlug) => {
    if (decodedSlug.startsWith("query=")) {
      return `For ${decodedSlug.split("=")[1]}`;
    } else if (decodedSlug.includes("&nutrients")) {
      return "that include the nutrients you need";
    } else if (decodedSlug.startsWith("time=")) {
      return `For ${decodedSlug.split("=")[1]} minutes recipes`;
    } else if (decodedSlug.startsWith("mealType=")) {
      return `For ${decodedSlug.split("=")[1]} recipes`;
    } else if (decodedSlug.startsWith("diet=")) {
      if (decodedSlug.split("=")[1] === 'balanced') {
        return `For Healthy recipes`;
      }
      return `For ${decodedSlug.split("=")[1]} diet recipes`;
    } else if (decodedSlug.startsWith("health=")) {
      return `For ${decodedSlug.split("=")[1]} recipes`
    } else if (decodedSlug.startsWith("dishType=")) {
      return `For ${decodedSlug.split("=")[1]}`;
    } else if (decodedSlug.startsWith("cuisineType=")) {
      return `For ${decodedSlug.split("=")[1]} cuisine`;
    } else {
      return "";
    }
  };

  const loadMore = () => {
    const nextPage = page + 1;
    const startIndex = page * 10;
    const endIndex = startIndex + 10;
    setDisplayedResults([
      ...displayedResults,
      ...searchResults.slice(startIndex, endIndex),
    ]);
    setPage(nextPage);
  };

  const applyFilters = () => {
    fetchResults(filters);
    setIsDrawerOpen(false);
    setFiltersCount(countFilters(filters));
    setFiltersApplied(true);
  };

  const handleRecipeClick = (recipeId) => {
    router.push(`/recipe/${recipeId}`);
  };

  return (
    <div className="min-w-screen mx-0 px-5 lg:px-10 py-8 dark:bg-[#1b1d21] dark:text-white">
      <div className="flex justify-between w-full lg:mx-auto">
        <h1 className="text-2xl lg:text-3xl font-bold mb-4 dark:text-white h-fit my-auto lg:px-3 lg:py-1 lg:bg-green-100 lg:dark:bg-green-950 lg:border-b lg:border-b-green-500 lg:pb-3">
        {filtersApplied 
    ? "Filtred Search results as per your preferences"
    : `Search Results ${getSearchString(decodedSlug)}`}
        </h1>
        <button
          onClick={() => setIsDrawerOpen(true)}
          className="flex items-center ml-auto mb-4 bg-green-500 hover:bg-green-600 text-white font-bold py-1 lg:py-2 px-2 lg:px-8 rounded-xl h-fit my-auto lg:mr-44"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            className="bi bi-funnel mr-2"
            viewBox="0 0 16 16"
          >
            <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5zm1 .5v1.308l4.372 4.858A.5.5 0 0 1 7 8.5v5.306l2-.666V8.5a.5.5 0 0 1 .128-.334L13.5 3.308V2z" />
          </svg>
          <div>Filters{filtersCount > 0 && <span className="bg-orange-400 rounded-full px-3 py-1 relative -top-3 -right-3 lg:-right-9 lg:-top-4">{filtersCount}</span>}</div>
        </button>
      </div>

      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div
              className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              onClick={() => {setIsDrawerOpen(false); setFilters(parseDecodedSlug(decodedSlug))}}
            ></div>
            <section className="absolute inset-y-0 right-0 pl-10 max-w-full flex">
              <div className="w-screen max-w-md">
                <div className="h-full flex flex-col bg-white dark:bg-gray-800 shadow-xl">
                  <div className="flex-1 overflow-y-auto">
                    <div className="py-6 px-4 sm:px-6">
                      <div className="flex items-start justify-between">
                        <h2 className="text-xl font-medium text-gray-900 dark:text-white">Filters</h2>
                        <button
                          type="button"
                          className="text-gray-400 hover:text-gray-500"
                          onClick={() => {setIsDrawerOpen(false); setFilters(parseDecodedSlug(decodedSlug))}}
                        >
                          <span className="sr-only">Close panel</span>
                          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                      <div className="mt-8">
                        <FilterTags
                          title="Food Preferences"
                          options={filterOptions["health"]}
                          value={filters.health}
                          onChange={(value) => setFilters({ ...filters, health: value })}
                          multiSelect={false}
                        />
                        <FilterTags
                          title="Cuisine Type"
                          options={filterOptions["Cuisine Type"]}
                          value={filters.cuisineType}
                          onChange={(value) => setFilters({ ...filters, cuisineType: value })}
                          multiSelect={true}
                        />
                        <FilterTags
                          title="Preparation Time"
                          options={filterOptions["time"]}
                          value={filters.time}
                          onChange={(value) => setFilters({ ...filters, time: value })}
                          multiSelect={false}
                        />
                        <FilterTags
                          title="Diet"
                          options={filterOptions["Diet"]}
                          value={filters.diet}
                          onChange={(value) => setFilters({ ...filters, diet: value })}
                          multiSelect={true}
                        />
                        <FilterTags
                          title="Meal Type"
                          options={filterOptions["Meal Type"]}
                          value={filters.mealType}
                          onChange={(value) => setFilters({ ...filters, mealType: value })}
                          multiSelect={false}
                        />
                        <FilterTags
                          title="Dish Type"
                          options={filterOptions["Dish Type"]}
                          value={filters.dishType}
                          onChange={(value) => setFilters({ ...filters, dishType: value })}
                          multiSelect={false}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex-shrink-0 px-4 py-4 flex justify-end border-t border-gray-200 lg:mb-0 mb-8">
                    <button
                      type="button"
                      className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                      onClick={applyFilters}
                    >
                      Apply Filters
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      )}

      {error && <Error error={error}/>}

      {loading ? (
        <Loading text="Searching Something Delicious" />
      ) : displayedResults.length === 0 && !error ? (
        <div className="flex align-middle justify-center">
          <div className="w-fit h-fit mx-auto mt-10">
            <Image
              src="/no_recipe_found_with_text.png"
              alt="no recipes found"
              height={800}
              width={800}
              layout="fixed"
            />
            <Link
              href="/"
              className="flex text-green-400 border border-green-400 p-2 h-fit w-fit rounded-xl dark:hover:bg-green-500 dark:hover:text-white hover:bg-green-400 hover:text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="23"
                height="23"
                fill="currentColor"
                className="bi bi-arrow-left-circle h-fit my-auto mr-3"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z"
                />
              </svg>
              <span>Back To Home</span>
            </Link>
          </div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 lg:gap-12">
            {displayedResults.map((hit, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg hover:shadow-[#5ed2b8] dark:hover:shadow-gray-600 hover:border hover:border-[#9ff3e1] dark:hover:border-gray-500 cursor-pointer"
                onClick={() => handleRecipeClick(hit.recipe.uri.split("_")[1])}
              >
                <div className="relative h-40 lg:h-48">
                  <Image
                    src={hit.recipe.image}
                    alt={hit.recipe.label}
                    className="w-full h-full object-cover"
                    width={100}
                    height={100}
                  />
                </div>
                <div className="text-center text-wrap p-1 lg:p-4">
                  <h2 className="lg:text-xl font-semibold text-gray-800 dark:text-white text-2xl">
                    {hit.recipe.label}
                  </h2>
                </div>
                <div className="flex flex-row w-fit lg:space-x-2 text-xs lg:text-sm font-mono lg:px-2 pb-2 align-middle">
                  <span className="font-sans text-lg px-1 dark:text-white">
                    Cuisine Type:
                  </span>
                  <div className="py-1 px-2 bg-purple-100 dark:bg-purple-700 border border-purple-500 dark:border-purple-400 text-black dark:text-white rounded-xl mr-2 lg:text-base">
                    {hit.recipe.cuisineType[0]}
                  </div>
                </div>
                <div className="flex flex-row w-fit lg:space-x-2 text-xs lg:text-sm font-mono lg:px-2 pb-2 align-middle">
                  {hit.recipe.dietLabels.length > 0 && (
                    <span className="font-sans text-lg px-1 dark:text-white">
                      Health Labels:
                    </span>
                  )}
                  {hit.recipe.dietLabels[0] && (
                    <div className="py-1 px-2 bg-orange-100 dark:bg-orange-700 border border-orange-500 dark:border-orange-400 text-black dark:text-white rounded-xl mr-2 lg:text-base">
                      {hit.recipe.dietLabels[0]}
                    </div>
                  )}
                  {hit.recipe.dietLabels[1] && (
                    <div className="py-1 px-2 bg-orange-100 dark:bg-orange-700 border border-orange-500 dark:border-orange-400 text-black dark:text-white rounded-xl lg:text-base">
                      {hit.recipe.dietLabels[1]}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          {searchResults && displayedResults.length < searchResults.length && (
            <div className="mt-8 text-center">
              <button
                onClick={loadMore}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded dark:bg-blue-700 dark:hover:bg-blue-900"
              >
                Load More
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
