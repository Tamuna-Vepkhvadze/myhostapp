import React, { useEffect, useState } from "react";
import { GrayHeart, RedHeart } from "./icon";
import { useFavoritesStore } from "../../../zustand/useFavoritesStore";
import { useAreas, useMealDetail, useMealsByArea } from "../../components/Hook/useKookies";



const Recipes: React.FC = () => {
  const { favorites, toggleFavorite } = useFavoritesStore();
  const [activeArea, setActiveArea] = useState<string | null>(null);
  const [selectedMealId, setSelectedMealId] = useState<string | null>(null);

  const { data: areas } = useAreas();
  const { data: meals } = useMealsByArea(activeArea);
  const { data: selectedMeal } = useMealDetail(selectedMealId);

  useEffect(() => {
    if (areas && areas.length > 0 && !activeArea) {
      setActiveArea(areas[0].strArea);
    }
  }, [areas]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-6">
      <h1 className="text-3xl font-bold text-center text-indigo-700 mb-8">
        Recipes Explorer
      </h1>

      {/* Areas */}
      <div className="flex flex-wrap gap-3 justify-center mb-8">
        {areas?.map((a) => (
          <button
            key={a.strArea}
            onClick={() => setActiveArea(a.strArea)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              activeArea === a.strArea
                ? "bg-indigo-600 text-white shadow"
                : "bg-white border border-gray-200 hover:bg-gray-100"
            }`}
          >
            {a.strArea}
          </button>
        ))}
      </div>

      {/* Meals */}
      {activeArea && meals && (
        <div className="max-w-6xl mx-auto">
          <h2 className="text-xl font-semibold mb-4">Dishes from {activeArea}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {meals.map((meal) => (
              <div
                key={meal.idMeal}
                className="bg-white rounded-xl overflow-hidden shadow hover:scale-[1.02] transition relative cursor-pointer"
              >
                <img
                  src={meal.strMealThumb}
                  alt={meal.strMeal}
                  className="w-full h-48 object-cover"
                  onClick={() => setSelectedMealId(meal.idMeal)}
                />
                <div className="p-4 flex justify-between items-center">
                  <h3 className="font-semibold text-lg text-gray-800">{meal.strMeal}</h3>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(meal.idMeal);
                    }}
                    className="w-6 h-6"
                  >
                    {favorites.includes(meal.idMeal) ? <RedHeart /> : <GrayHeart />}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal */}
      {selectedMeal && (
        <div className="fixed inset-0 bg-black/50 flex items-start justify-center z-50 overflow-auto p-6">
          <div className="bg-white rounded-2xl shadow-xl max-w-4xl w-full relative">
            <button
              onClick={() => setSelectedMealId(null)}
              className="absolute top-3 right-3 bg-gray-100 rounded-full p-2 hover:bg-gray-200"
            >
              ✕
            </button>
            <div className="p-6 grid md:grid-cols-3 gap-6">
              <div>
                <img
                  src={selectedMeal.strMealThumb}
                  alt={selectedMeal.strMeal}
                  className="w-full rounded-lg"
                />
                <p className="mt-3 text-sm text-gray-600">
                  <strong>Category:</strong> {selectedMeal.strCategory} <br />
                  <strong>Area:</strong> {selectedMeal.strArea}
                </p>
                <button
                  onClick={() => toggleFavorite(selectedMeal.idMeal)}
                  className={`mt-3 px-3 py-1 rounded font-medium transition ${
                    favorites.includes(selectedMeal.idMeal)
                      ? "bg-red-500 text-gray-100"
                      : "bg-gray-500 text-white"
                  }`}
                >
                  {favorites.includes(selectedMeal.idMeal)
                    ? "Remove from favorites"
                    : "Add to favorites"}
                </button>
              </div>

              <div className="md:col-span-2">
                <h2 className="text-2xl font-bold mb-2">{selectedMeal.strMeal}</h2>
                <h3 className="font-semibold mb-1">Ingredients:</h3>
                <ul className="grid grid-cols-2 gap-2 mb-4 text-sm">
                  {Array.from({ length: 20 }).map((_, i) => {
                    const ing = selectedMeal[`strIngredient${i + 1}`];
                    const measure = selectedMeal[`strMeasure${i + 1}`];
                    if (ing && ing.trim()) {
                      return (
                        <li key={i} className="bg-gray-50 p-2 rounded">
                          {ing} — {measure}
                        </li>
                      );
                    }
                    return null;
                  })}
                </ul>

                <h3 className="font-semibold mb-1">Instructions:</h3>
                <p className="text-gray-700 whitespace-pre-line">
                  {selectedMeal.strInstructions}
                </p>

                {selectedMeal.strYoutube && (
                  <div className="mt-4">
                    <h3 className="font-semibold mb-1">Video:</h3>
                    <div className="aspect-video">
                      <iframe
                        src={`https://www.youtube.com/embed/${
                          new URL(selectedMeal.strYoutube).searchParams.get("v")
                        }`}
                        className="w-full h-full rounded"
                        allowFullScreen
                      ></iframe>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Recipes;
