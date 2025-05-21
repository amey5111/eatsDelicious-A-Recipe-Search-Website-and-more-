"use client";
import { useState } from "react";
import TypingEffect from "../components/common/TypingEffect";
import ReactMarkdown from "react-markdown";
import Loading from "../components/MagicLoading";

export default function Home() {
  const [input, setInput] = useState("");
  const [aiReply, setAiReply] = useState("");
  const [structuredData, setStructuredData] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [source, setSource] = useState("");
  const [loading, setLoading] = useState(false); // NEW STATE

  const handleSubmit = async () => {
    setLoading(true);
    const res = await fetch("/api/recipe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: input }),
    });
    const data = await res.json();
    setSource(data.source);

    if (data.source === "api") {
      if (data.recipes) {
        setRecipes(data.recipes);
        setAiReply("");
        setStructuredData(null);
      } else {
        setAiReply(data.reply);
        setRecipes([]);
        setStructuredData(null);
      }
    } else {
      const parsedJson = extractStructuredJson(data.reply);
      if (parsedJson) {
        setStructuredData(parsedJson);
      } else {
        setStructuredData(null);
      }
      setAiReply(data.reply);
      setRecipes([]);
    }
    setLoading(false);
  };

  const extractStructuredJson = (text) => {
    const match = text.match(/^\s*({[\s\S]*?})/);
    if (!match) return null;
    try {
      const parsed = JSON.parse(match[1]);
      if (
        parsed &&
        typeof parsed === "object" &&
        Array.isArray(parsed.ingredients) &&
        "diet" in parsed &&
        "mealType" in parsed
      ) {
        return parsed;
      }
    } catch (err) {
      console.error("Failed to parse structured data", err);
    }
    return null;
  };

  const cleanReplyText = (text) => {
    return text.replace(/^\s*({[\s\S]*?})\s*(?:\n|$)/, "").trim();
  };

  return (
    <div className="min-h-screen p-8 flex flex-col lg:flex-row space-x-5 justify-between dark:bg-[#1c1d21]">
      {/* Left Section (Input & Header) */}
      <div className="min-w-[54%]">
        <div className="flex mx-auto flex-col items-center w-4/5 lg:w-1/2 font-semibold text-white rounded-xl py-1 px-2 text-4xl  lg:text-5xl relative pb-5 mb-5 bg-gradient-to-tr from-orange-300 to-orange-500 dark:bg-gradient-to-tr dark:from-orange-950 dark:to-orange-500">
          😋Magic Chef
          <span className="ml-2 bg-white text-orange-500 text-sm font-bold px-1.5 py-0.5 rounded-md mt-1 dark:bg-orange-500 dark:text-white">
            AI Powered Recipe Expert
          </span>
        </div>

        <TypingEffect />
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter ingredients, dietary preferences, or paste a recipe to modify..."
          className="w-full max-w-4xl border border-orange-500 p-4 rounded-xl mb-4 dark:bg-gray-950 dark:border-orange-600 dark:text-white bg-orange-50 mt-5 text-orange-500"
          rows={6}
        />
        <button
          onClick={handleSubmit}
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 flex mx-auto"
        >
          Send to Magic Chef🚀
        </button>
      </div>

      {/* Right Section (Response OR Loading) */}
      <div className="min-w-auto">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <Loading text="Magic Chef is cooking..." />
          </div>
        ) : (
          <>
            {/* AI Reply */}
            {aiReply && (
              <div className="mt-6 max-w-4xl w-full border border-teal-400 bg-teal-50 p-4 shadow text-gray-800 space-y-4 rounded-2xl dark:bg-teal-950 dark:text-white">
                <strong className="font-semibold text-xl bg-orange-400 text-white rounded-md p-1 dark:bg-orange-800">
                  🤖 Magic Response:
                </strong>

                {structuredData && (
                  <div className="bg-white p-4 rounded-xl border border-teal-500 space-x-4 flex flex-col text-orange-400 justify-center dark:bg-gray-900">
                    <span className="underline underline-offset-4 bg-orange-400 text-white p-2 rounded-xl w-fit mb-2 dark:bg-orange-500">
                      Detected Food Preferences:
                    </span>
                    <span className="font-medium p-2 rounded-xl text-base lg:text-lg">
                      <span className="text-base lg:text-xl font-semibold bg-orange-100 px-2 mr-2 dark:bg-orange-600 dark:text-white">
                        Ingredients:
                      </span>
                      {structuredData.ingredients.join(", ")}
                    </span>
                    <span className="font-medium p-2 rounded-xl text-base lg:text-lg">
                      <span className="text-base lg:text-xl font-semibold bg-orange-100 px-2 mr-2 dark:bg-orange-600 dark:text-white">
                        Diet:
                      </span>
                      {structuredData.diet}
                    </span>
                    <span className="font-medium p-2 rounded-xl text-base lg:text-lg">
                      <span className="text-base lg:text-xl font-semibold bg-orange-100 px-2 mr-2 dark:bg-orange-600 dark:text-white">
                        Meal Type:
                      </span>
                      {structuredData.mealType}
                    </span>
                  </div>
                )}
                <p className="whitespace-pre-wrap font-mono text-base lg:text-lg">
                  <ReactMarkdown>{cleanReplyText(aiReply)}</ReactMarkdown>
                </p>
              </div>
            )}

            {/* API Recipes */}
            {recipes.length > 0 && (
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl w-full">
                <div className="col-span-2 text-xl font-mono dark:text-white">
                  Here are some recipes that I found for you from Spoonacular just for you...😋
                </div>
                {recipes.map((r, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl shadow-md p-4  dark:bg-teal-950 dark:text-orange-500 transition-all duration-300 hover:shadow-lg"
                  >
                    <img
                      src={r.image}
                      alt={r.title}
                      className="w-full h-48 object-cover rounded-lg mb-3"
                    />
                    <h2 className="text-xl font-bold mb-1">{r.title}</h2>
                    <p
                      className="text-gray-700 dark:text-white text-base mb-2"
                      dangerouslySetInnerHTML={{
                        __html: `${r.summary?.split(". ")[0]}.`,
                      }}
                    ></p>

                    <div className="flex flex-wrap gap-2 mb-2">
                      {r.vegetarian && (
                        <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full dark:bg-green-900 dark:text-green-200">
                          Vegetarian
                        </span>
                      )}
                      {r.vegan && (
                        <span className="text-xs px-2 py-1 bg-purple-100 text-purple-800 rounded-full dark:bg-purple-900 dark:text-purple-200">
                          Vegan
                        </span>
                      )}
                      {r.glutenFree && (
                        <span className="text-xs px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full dark:bg-yellow-900 dark:text-yellow-200">
                          Gluten-Free
                        </span>
                      )}
                      {r.dairyFree && (
                        <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full dark:bg-blue-900 dark:text-blue-200">
                          Dairy-Free
                        </span>
                      )}
                      {r.veryHealthy && (
                        <span className="text-xs px-2 py-1 bg-teal-100 text-teal-800 rounded-full dark:bg-teal-900 dark:text-teal-200">
                          Healthy
                        </span>
                      )}
                    </div>

                    <h3 className="font-semibold mt-2">📝 Ingredients:</h3>
                    <ul className="list-disc ml-6 text-sm text-gray-800 dark:text-white mb-2">
                      {r.ingredients?.slice(0, 6).map((i, idx) => (
                        <li key={idx}>
                          {i.name} - {i.amount}
                        </li>
                      ))}
                      {r.ingredients?.length > 6 && <li>...and more</li>}
                    </ul>

                    <a
                      href={r.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                    >
                      View Full Recipe
                    </a>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
