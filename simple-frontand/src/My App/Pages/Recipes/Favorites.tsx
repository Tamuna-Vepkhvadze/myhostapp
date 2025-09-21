import React, { useState } from "react";
import { GrayHeart, RedHeart } from "./icon";
import { useFavoritesStore } from "../../../zustand/useFavoritesStore";
import { useFavoriteMeals } from "../../components/Hook/useKookies";


const Favorites: React.FC = () => {
  const { favorites, toggleFavorite } = useFavoritesStore();
  const { data: favoriteMeals } = useFavoriteMeals(favorites);
  const [selectedMealId, setSelectedMealId] = useState<string | null>(null);
  const selectedMeal = favoriteMeals?.find((m) => m.idMeal === selectedMealId);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-6">
      <h1 className="text-3xl font-bold text-center text-indigo-700 mb-8">
        My Favorites
      </h1>

      {!favoriteMeals || favoriteMeals.length === 0 ? (
        <p className="text-center text-gray-500">No favorites yet.</p>
      ) : (
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {favoriteMeals.map((meal) => (
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
                <h3 className="font-semibold text-lg text-gray-800">
                  {meal.strMeal}
                </h3>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(meal.idMeal);
                  }}
                 
                >
                {favorites.includes(meal.idMeal) ? <RedHeart /> : <GrayHeart />}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Detail Modal */}
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

export default Favorites;
