import React, { useState, useEffect } from "react";
import MealCard from "./components/MealCard";
import MaxWidthWrapper from "./components/maxWidthWrapper";
import Header from "./components/header";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [activeTab, setActiveTab] = useState("All Meals");
  const [weekData, setWeekData] = useState({
    "Week 1": [],
    "Week 2": [],
    "Week 3": [],
    "Week 4": [],
  });
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [highlightedMeal, setHighlightedMeal] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false); 
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch("https://dummyjson.com/recipes");
        const data = await response.json();
        setRecipes(data.recipes);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };
    fetchRecipes();
  }, []);

  const handleAddToWeek = (meal, week) => {
    setWeekData((prev) => ({
      ...prev,
      [week]: [...prev[week], meal],
    }));
    setShowModal(false); 
  };

  const handleDeleteFromWeek = (mealId, week) => {
    setWeekData((prev) => ({
      ...prev,
      [week]: prev[week].filter((meal) => meal.id !== mealId),
    }));
  };

  const renderMeals = () => {
    if (activeTab === "All Meals") {
      return recipes.map((meal) => (
        <MealCard
          key={meal.id}
          meal={meal}
          isSelected={highlightedMeal?.id === meal.id}
          onCardClick={() => setHighlightedMeal(meal)}
        />
      ));
    } else {
      return weekData[activeTab]?.map((meal) => (
        <MealCard
          key={meal.id}
          meal={meal}
          isDeletable
          onDelete={() => handleDeleteFromWeek(meal.id, activeTab)}
        />
      ));
    }
  };

  return (
    <div className="min-h-screen ">
    <Header/>
      <MaxWidthWrapper>
        <h1 className="text-3xl font-bold mb-6 text-center sm:text-left">
          Weekly Order
        </h1>
      </MaxWidthWrapper>

      <div className="sticky top-0 z-50 w-full bg-white shadow-md">
        <div className="flex items-center justify-between px-4 sm:px-8 lg:px-16 py-4 sm:py-6">
          <div className="sm:hidden">
            <button
              className="text-blue-900 focus:outline-none"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 5.25h16.5M3.75 12h16.5M3.75 18.75h16.5"
                />
              </svg>
            </button>
          </div>

          <div className="hidden sm:flex flex-wrap items-center justify-center sm:justify-start space-x-12">
            <button
              className={`text-sm font-bold pb-2 ${
                activeTab === "All Meals"
                  ? "text-blue-900 border-b-2 border-blue-900"
                  : "text-black"
              }`}
              onClick={() => setActiveTab("All Meals")}
            >
              All Meals
            </button>
            {Object.keys(weekData).map((week) => (
              <button
                key={week}
                className={`text-sm font-bold pb-2 ${
                  activeTab === week
                    ? "text-blue-900 border-b-2 border-blue-900"
                    : "text-black"
                }`}
                onClick={() => setActiveTab(week)}
              >
                {week}
              </button>
            ))}
          </div>

          <div>
            <button
              className="bg-blue-900 text-white px-6 py-2 rounded hover:bg-blue-800 font-bold text-sm"
              onClick={() => {
                if (highlightedMeal) {
                  setSelectedMeal(highlightedMeal);
                  setShowModal(true);
                } else {
                  alert("Please select a meal first!");
                }
              }}
            >
              Add to Week
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="sm:hidden flex flex-col bg-white px-4 py-4 border-t border-gray-200">
            <button
              className={`text-sm font-bold mb-2 ${
                activeTab === "All Meals"
                  ? "text-blue-900"
                  : "text-black"
              }`}
              onClick={() => {
                setActiveTab("All Meals");
                setMenuOpen(false);
              }}
            >
              All Meals
            </button>
            {Object.keys(weekData).map((week) => (
              <button
                key={week}
                className={`text-sm font-bold mb-2 ${
                  activeTab === week ? "text-blue-900" : "text-black"
                }`}
                onClick={() => {
                  setActiveTab(week);
                  setMenuOpen(false);
                }}
              >
                  {week}
                </button>
            ))}
          </div>
        )}
      </div>

      <MaxWidthWrapper>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-12 px-4 py-12">
          {renderMeals()}
        </div>
      </MaxWidthWrapper>

      {showModal && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-md mx-auto">
            <h2 className="text-xl font-bold mb-4">Select Week</h2>
            
            <div className="grid grid-cols-4 space-x-2">
              {Object.keys(weekData).map((week) => (
                <button
                  key={week}
                  className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
                  onClick={() => handleAddToWeek(selectedMeal, week)}
                >
                  {week}
                </button>
              ))}
            </div>
            <button
              className="mt-4 bg-blue-950 text-white px-4 py-2 rounded"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
