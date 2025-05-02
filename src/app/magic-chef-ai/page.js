"use client";
import { useState, useEffect } from "react";
import TypingEffect from "../components/common/TypingEffect";

export default function Home() {
  const [input, setInput] = useState("");
  const [aiReply, setAiReply] = useState("");
  const [structuredData, setStructuredData] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [source, setSource] = useState("");

  const handleSubmit = async () => {
    const res = await fetch("/api/recipe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: input }),
    });
    const data = await res.json();
    setSource(data.source);

    if (data.source === "api") {
      console.log("API reply", data.reply);
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
      console.log("AI reply", data.reply);
      const parsedJson = extractStructuredJson(data.reply);
      if (parsedJson) {
        setStructuredData(parsedJson);
      } else {
        setStructuredData(null);
      }
      setAiReply(data.reply);
      setRecipes([]);
    }
  };

  // Extract JSON block only from beginning of text
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

  // Remove JSON block for clean display of remaining text
  const cleanReplyText = (text) => {
    return text.replace(/^\s*({[\s\S]*?})\s*(?:\n|$)/, "").trim();
  };

  return (
    <div className="min-h-screen p-8 flex flex-col lg:flex-row space-x-5 justify-between">
      <div className="min-w-[54%]">
        <div
          className="flex mx-auto flex-col items-center w-4/5 lg:w-1/2 font-semibold text-white rounded-xl py-1 px-2 text-4xl  lg:text-5xl relative pb-5 mb-5 bg-gradient-to-tr from-orange-300 to-orange-500 dark:bg-gradient-to-tr dark:from-orange-950 dark:to-orange-500"
        >
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
      <div className="min-w-auto">
        {/* AI Response */}
        {aiReply && (
          <div className="mt-6 max-w-4xl w-full border border-teal-400 bg-teal-50 p-4 shadow text-gray-800 space-y-4 rounded-2xl dark:bg-gray-950 dark:text-white">
            🤖 <strong>Magic Response:</strong>
            {/* Structured JSON Part */}
            {structuredData && (
              <div className="bg-white p-4 rounded-xl border border-teal-500 space-x-4 flex flex-col text-orange-400 justify-center dark:bg-gray-900">
                <span className="underline underline-offset-4 bg-orange-400 text-white p-2 rounded-xl w-fit mb-2 dark:bg-orange-500">
                  Detected Food Preferences:
                </span>
                <span className="font-medium p-2 rounded-xl text-base lg:text-lg">
                  <span className="text-base lg:text-xl font-semibold bg-orange-100 px-2 mr-2 dark:bg-orange-600 dark:text-white">
                    Ingredients:
                  </span>{" "}
                  {structuredData.ingredients.join(", ")}
                </span>
                <span className="font-medium p-2 rounded-xl text-base lg:text-lg">
                  <span className="text-base lg:text-xl font-semibold bg-orange-100 px-2 mr-2 dark:bg-orange-600 dark:text-white">
                    Diet:
                  </span>{" "}
                  {structuredData.diet}
                </span>
                <span className="font-medium p-2 rounded-xl text-base lg:text-lg">
                  <span className="text-base lg:text-xl font-semibold bg-orange-100 px-2 mr-2 dark:bg-orange-600 dark:text-white">
                    Meal Type:
                  </span>{" "}
                  {structuredData.mealType}
                </span>
              </div>
            )}
            {/* Remaining Text */}
            <p className="whitespace-pre-wrap font-mono text-base lg:text-lg">
              {cleanReplyText(aiReply)}
            </p>
          </div>
        )}

        {/* API Recipes */}
        {recipes.length > 0 && (
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl w-full">
            {recipes.map((r, index) => (
              <div key={index} className="bg-white rounded-lg shadow p-4">
                <img
                  src={r.image}
                  alt={r.title}
                  className="w-full h-48 object-cover rounded mb-3"
                />
                <h2 className="text-xl font-semibold mb-1">{r.title}</h2>
                <p
                  className="text-sm text-gray-700 mb-2"
                  dangerouslySetInnerHTML={{ __html: r.summary }}
                />
                <h3 className="font-semibold mt-2">📝 Ingredients:</h3>
                <ul className="list-disc ml-6 text-sm text-gray-800 mb-2">
                  {r.ingredients?.map((i, idx) => (
                    <li key={idx}>
                      {i.name} - {i.amount}
                    </li>
                  ))}
                </ul>
                <a
                  href={r.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  View Full Recipe
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
