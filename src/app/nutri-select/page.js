"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState, useMemo } from "react";

function IngredientsRemix() {
  const nutrients = [
    { name: "Calories", unit: "Kcal", code: "ENERC_KCAL" },
    { name: "Calcium", unit: "mg", code: "CA" },
    { name: "Carbohydrates", unit: "g", code: "CHOCDF.net" },
    { name: "Protein", unit: "g", code: "PROCNT" },
    { name: "Cholesterol", unit: "mg", code: "CHOLE" },
    { name: "Sugars Total", unit: "g", code: "SUGAR" },
    { name: "Sugars added", unit: "g", code: "SUGAR.added" },
    { name: "Lipid (fat)", unit: "g", code: "FAT" },
    { name: "Iron", unit: "mg", code: "FE" },
    { name: "Zinc", unit: "mg", code: "ZN" },
    { name: "Fiber", unit: "g", code: "FIBTG" },
    { name: "Potassium", unit: "mg", code: "K" },
    { name: "Magnesium", unit: "mg", code: "MG" },
    { name: "Sodium", unit: "mg", code: "NA" },
  ];

  const [selectedNutrients, setSelectedNutrients] = useState([]);
  const [nutrientInputs, setNutrientInputs] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const filteredNutrients = useMemo(() => {
    return nutrients.filter((nutrient) =>
      nutrient.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const handleNutrientSelect = (nutrient) => {
    if (selectedNutrients.includes(nutrient.name)) {
      setSelectedNutrients(
        selectedNutrients.filter((n) => n !== nutrient.name)
      );
    } else {
      setSelectedNutrients([...selectedNutrients, nutrient.name]);
    }
  };

  const handleInputChange = (nutrient, type, value, code) => {
    setNutrientInputs((prev) => ({
      ...prev,
      [nutrient]: { ...prev[nutrient], [type]: value, code: code },
    }));
  };

  const createURLAndSearch = () => {
    let url = "";
    Object.entries(nutrientInputs).forEach(([nutrient, { min, max, code }]) => {
      console.log(min, max, code);
      if (min && max) {
        url = url + `&nutrients[${code}]=${min}-${max}`;
      } else if (!max) {
        url = url + `&nutrients[${code}]=${min}+`;
      } else if (!min) {
        url = url + `&nutrients[${code}]=${max}`;
      }
    });
    router.push(`/search/${url}`);
  };

  const handleSearch = () => {
    console.log("Search with:", nutrientInputs);
    createURLAndSearch();
  };

  const hasAnyNutrientValue = () => {
    return Object.values(nutrientInputs).some(
      (nutrient) => nutrient.min || nutrient.max
    );
  };

  return (
    <div className="dark:bg-black dark:text-white p-4 pb-20">
      <h1 className="text-4xl font-bold my-4 text-white bg-[#f2610d] rounded-lg text-center w-fit mx-auto py-1 px-2">
        Nutrients Remix
      </h1>
      <p className="text-center text-base lg:text-xl font-medium border-b border-b-green-400 pb-2 mb-4">
        Need Specific Nutrients in your Recipe? <br /> Select nutrients, set
        quantities, and search for recipes!
      </p>
      <h2 className="text-xl font-bold mb-3 ml-1">Select Nutrients</h2>
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Left column: Nutrient selection and inputs */}
        <div className="w-full lg:w-1/2 lg:border-b-0 border-b border-b-orange-300">
          <input
            type="text"
            placeholder="Search nutrients..."
            className="w-full p-2 mb-4 border rounded dark:bg-gray-950"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="flex flex-wrap gap-2 mb-4">
            {filteredNutrients.map((nutrient) => (
              <button
                key={nutrient.name}
                className={`px-3 py-1 rounded-full text-sm lg:text-lg ${
                  selectedNutrients.includes(nutrient.name)
                    ? "bg-green-500 text-white"
                    : "bg-gray-200 dark:bg-gray-800"
                }`}
                onClick={() => handleNutrientSelect(nutrient)}
              >
                {nutrient.name}
              </button>
            ))}
          </div>
          {selectedNutrients.length === 0 ? (
            <div className="flex justify-center items-center flex-col">
              <div className="text-center text-sm lg:text-lg w-fit font-light border border-green-300 px-5 opacity-95">
                No Nutrients Selected ...
                <br /> Select the Nutrients and specify the quantity Required
              </div>
              <Image
                src="/Nutrients Remix/selected-nutrients.png"
                alt="No nutrients selected"
                height={190}
                width={450}
                className="lg:w-1/2 h-auto opacity-30 -mt-8"
              />
            </div>
          ) : (
            selectedNutrients.map((nutrientName) => {
              const nutrient = nutrients.find((n) => n.name === nutrientName);
              return (
                <div key={nutrient.name} className="mb-4">
                  <h3 className="font-semibold mb-2">
                    {nutrient.name} ({nutrient.unit})
                  </h3>
                  <div className="flex space-x-2">
                    <input
                      type="number"
                      placeholder="Min"
                      className="w-1/2 p-2 border rounded-md dark:bg-gray-950"
                      value={nutrientInputs[nutrient.name]?.min || ""}
                      onChange={(e) =>
                        handleInputChange(
                          nutrient.name,
                          "min",
                          e.target.value,
                          nutrient.code
                        )
                      }
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      className="w-1/2 p-2 border rounded-md dark:bg-gray-950"
                      value={nutrientInputs[nutrient.name]?.max || ""}
                      onChange={(e) =>
                        handleInputChange(
                          nutrient.name,
                          "max",
                          e.target.value,
                          nutrient.code
                        )
                      }
                    />
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Right column: Table */}
        <div className="w-full lg:w-1/2 lg:mr-10">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg mb-4">
            <h2 className="text-xl font-bold mb-4">
              Selected Nutrients Summary
            </h2>
            {selectedNutrients.length > 0 ? (
              <>
                <table className="w-full lg:w-5/6 lg:mx-auto lg:text-lg">
                  <thead>
                    <tr className="bg-gray-200 dark:bg-gray-700">
                      <th className="p-2 text-left">Nutrient</th>
                      <th className="p-2 text-center">Min</th>
                      <th className="p-2 text-center">Max</th>
                      <th className="p-2 text-left">Unit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedNutrients.map((nutrientName) => {
                      const nutrient = nutrients.find(
                        (n) => n.name === nutrientName
                      );
                      return (
                        <tr
                          key={nutrient.name}
                          className="border-b dark:border-gray-600"
                        >
                          <td className="p-2">{nutrient.name}</td>
                          <td className="p-2 text-center">
                            {nutrientInputs[nutrient.name]?.min || "-"}
                          </td>
                          <td className="p-2 text-center">
                            {nutrientInputs[nutrient.name]?.max || "-"}
                          </td>
                          <td className="p-2">{nutrient.unit}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                {!hasAnyNutrientValue() && (
                  <p className="text-red-500 mt-4  text-lg border border-red-500 dark:border-red-600 rounded-xl text-center w-fit mx-auto px-3">
                    Please input at least one min or max value for a nutrient.
                  </p>
                )}
              </>
            ) : (
              <div className="w-5/6 mx-auto px=auto">
                <Image
                  src="/Nutrients Remix/select-nutrients.png"
                  alt="No nutrients selected"
                  height={190}
                  width={450}
                  className="lg:w-4/6 h-auto opacity-30"
                />
                <div className="text-center text-sm lg:text-lg lg w-fit font-light border border-green-300 px- opacity-95">
                  No nutrients selected ...
                  <br /> Selected Nutrients will be shown here
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Floating summary panel */}
      {selectedNutrients.length >= 1 && hasAnyNutrientValue() && (
        <div className="fixed bottom-0 right-0 lg:bottom-56 bg-white dark:bg-gray-800 p-2 lg:p-4 rounded-lg shadow-lg w-full lg:w-fit flex lg:flex-col text-sm lg:text-base justify-between">
          <p className="font-bold h-fit my-auto mr-3 text-center">
            Selected Nutrients: {selectedNutrients.length}
          </p>
          <button
            className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors"
            onClick={handleSearch}
          >
            Search Recipes
          </button>
        </div>
      )}
    </div>
  );
}

export default IngredientsRemix;