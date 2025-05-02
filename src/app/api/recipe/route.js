import { NextResponse } from "next/server";

export async function POST(req) {
  const { prompt } = await req.json();

  const basePrompt = `You are an expert recipe assistant and your name is Magic Chef and I am using you in my web application to help them so respond for them according to following.
Extract structured search data from the user's message.

If the user is looking for a recipe using ingredients or with dietary preferences, respond ONLY with a JSON object like:
{
  "ingredients": ["ingredient1", "ingredient2"],
  "diet": "vegan/vegetarian/none",
  "mealType": "breakfast/lunch/dinner/snack"
}

If the user is asking for something else like modifying a recipe, or other recipe help, respond normally as an assistant with helpful tips or friendly answers. don't give this:
{
  "ingredients": ["ingredient1", "ingredient2"],
  "diet": "vegan/vegetarian/none",
  "mealType": "breakfast/lunch/dinner/snack"
}
in that case

also avoid the descriptiom about you response in any case like "Since the user is asking for a recipe modification and not specifying ingredients or dietary preferences for a new recipe, here's my response: or (Note: This response does not include the JSON object format because the user is asking for a recipe modification, not specifying ingredients or dietary preferences for a new recipe.)" 

If User is greeting to you or gving greetings, hi or hello type meaages you also just respond "Hello! How can I help you with cooking today?". nothing else should be there in response 

Please Don't include notes about your responses like " This response is tailored according to the instructions provided, and does not include any additional information or JSON objects." 

If the question is NOT about food or recipes, say:
"I'm here to help you with meals! Let's cook something delicious 😊"

Now respond to:
User: ${prompt}
`;

  const mistralRes = await fetch("https://api.mistral.ai/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.MISTRAL_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "mistral-medium",
      messages: [{ role: "user", content: basePrompt }],
      temperature: 0.7,
    }),
  });

  const mistralData = await mistralRes.json();
  let rawReply = mistralData.choices?.[0]?.message?.content || "";
  let reply = rawReply;
  let source = "ai";

  let structuredQuery = {};
  try {
    structuredQuery = JSON.parse(rawReply);
  } catch (err) {
    structuredQuery = null;
  }

  if (
    structuredQuery &&
    Array.isArray(structuredQuery.ingredients) &&
    structuredQuery.ingredients.length > 0
  ) {
    const ingredients = structuredQuery.ingredients.join(",");
    const diet = structuredQuery.diet && structuredQuery.diet !== "none"
      ? `&diet=${structuredQuery.diet}`
      : "";
    const mealType = structuredQuery.mealType
      ? `&type=${structuredQuery.mealType}`
      : "";

    const spoonacularUrl = `https://api.spoonacular.com/recipes/complexSearch?includeIngredients=${encodeURIComponent(
      ingredients
    )}${diet}${mealType}&addRecipeInformation=true&fillIngredients=true&number=5&apiKey=${process.env.SPOONACULAR_API_KEY}`;

    const spoonacularRes = await fetch(spoonacularUrl);

    if (!spoonacularRes.ok) {
      const errorText = await spoonacularRes.text();
      console.error("Spoonacular API Error:", spoonacularRes.status, errorText);
      return NextResponse.json({ reply: "⚠️ Failed to fetch recipes. Please try again later.", source: "api" });
    }

    const spoonacularData = await spoonacularRes.json();

    if (spoonacularData.results?.length > 0) {
      source = "api";
      return NextResponse.json({
        source,
        recipes: spoonacularData.results.map((r) => ({
          title: r.title,
          image: r.image,
          summary: r.summary,
          ingredients: r.extendedIngredients?.map((i) => ({
            name: i.name,
            amount: `${i.amount} ${i.unit}`,
          })),
          link: r.sourceUrl || `https://spoonacular.com/recipes/${r.title.replace(/ /g, "-").toLowerCase()}-${r.id}`,
        })),
      });
    } else {
      return NextResponse.json({
        reply: `😕 I couldn't find recipes using those ingredients. Try changing them!`,
        source: "api",
      });
    }
  }

  return NextResponse.json({ reply, source });
}
