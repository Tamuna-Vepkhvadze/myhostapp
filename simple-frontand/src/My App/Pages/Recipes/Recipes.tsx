import React, { useEffect, useState } from "react"

type Area = { strArea: string }
type MealSummary = { idMeal: string; strMeal: string; strMealThumb: string }
type MealDetail = {
  idMeal: string
  strMeal: string
  strCategory: string
  strArea: string
  strInstructions: string
  strMealThumb: string
  strYoutube: string
  [key: string]: any
}

const BASE = "https://www.themealdb.com/api/json/v1/1"

const Recipes: React.FC = () => {
  const [areas, setAreas] = useState<Area[]>([])
  const [activeArea, setActiveArea] = useState<string | null>(null)
  const [meals, setMeals] = useState<MealSummary[]>([])
  const [selectedMeal, setSelectedMeal] = useState<MealDetail | null>(null)

  useEffect(() => {
    fetch(`${BASE}/list.php?a=list`)
      .then((res) => res.json())
      .then((data) => {
        setAreas(data.meals ?? [])
        if (data.meals?.length > 0) {
          // ავირჩიოთ პირველი ქვეყანა ავტომატურად
          loadMeals(data.meals[0].strArea)
        }
      })
  }, [])

  const loadMeals = (area: string) => {
    setActiveArea(area)
    fetch(`${BASE}/filter.php?a=${encodeURIComponent(area)}`)
      .then((res) => res.json())
      .then((data) => setMeals(data.meals ?? []))
  }

  const loadMealDetail = (id: string) => {
    fetch(`${BASE}/lookup.php?i=${id}`)
      .then((res) => res.json())
      .then((data) => setSelectedMeal(data.meals[0]))
  }

  const closeDetail = () => setSelectedMeal(null)

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-6">
      <h1 className="text-3xl font-bold text-center text-indigo-700 mb-8">Recipes Explorer</h1>

      {/* Areas */}
      <div className="flex flex-wrap gap-3 justify-center mb-8">
        {areas.map((a) => (
          <button
            key={a.strArea}
            onClick={() => loadMeals(a.strArea)}
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
      {activeArea && (
        <div className="max-w-6xl mx-auto">
          <h2 className="text-xl font-semibold mb-4">Dishes from {activeArea}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {meals.map((meal) => (
              <div
                key={meal.idMeal}
                onClick={() => loadMealDetail(meal.idMeal)}
                className="bg-white rounded-xl overflow-hidden shadow hover:scale-[1.02] transition cursor-pointer"
              >
                <img
                  src={meal.strMealThumb}
                  alt={meal.strMeal}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-lg text-gray-800">{meal.strMeal}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {selectedMeal && (
        <div className="fixed inset-0 bg-black/50 flex items-start justify-center z-50 overflow-auto p-6">
          <div className="bg-white rounded-2xl shadow-xl max-w-4xl w-full relative">
            <button
              onClick={closeDetail}
              className="absolute cursor-pointer top-3 right-3 bg-red-500 text-white font-bold rounded-full px-3 py-2"
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
                    const ing = selectedMeal[`strIngredient${i + 1}`]
                    const measure = selectedMeal[`strMeasure${i + 1}`]
                    if (ing && ing.trim()) {
                      return (
                        <li key={i} className="bg-gray-50 p-2 rounded">
                          {ing} — {measure}
                        </li>
                      )
                    }
                    return null
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
  )
}

export default Recipes
