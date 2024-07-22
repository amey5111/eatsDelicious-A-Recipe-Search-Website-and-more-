import React from "react";
import Link from 'next/link';

function MealType() {
  return (
    <div className="ml-1 lg:ml-36 pb-5">
      <h3 className="ltext-lg lg:text-xl font-semibold my-5 ml-2 lg:ml-0">Explore a Recipe For</h3>
      <div className="flex flex-wrap -mx-2 lg:mr-36 justify-between px-1">
        {[
          { name: "Breakfast", image: "/MealType/breakfast.jpg" },
          { name: "Lunch", image: "/MealType/lunch.jpg" },
          { name: "Dinner", image: "/MealType/dinner.jpg" },
          { name: "Teatime", image: "/MealType/snacks.jpg" },
          { name: "Snacks", image: "/MealType/teaTime.jpg" }
        ].map((meal) => (
          <Link href={`/search/mealType=${meal.name}`} key={meal.name} className="w-1/2 px-2 mb-4 lg:w-1/6">
            <div className="flex flex-col items-center justify-center hover:shadow-xl">
              <div
                className="w-full h-36 bg-gray-300 bg-center bg-cover rounded-lg shadow-md"
                style={{
                  backgroundImage: `url('${meal.image}')`,
                }}
              ></div>

              <div className="w-full -mt-10 overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800">
                <h3 className="py-2 font-bold tracking-wide text-center text-gray-800 uppercase dark:text-white">
                  {meal.name}
                </h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default MealType;