import React from "react";
import { Star } from "lucide-react";

function MealCard({ meal, onCardClick, isSelected, isDeletable, onDelete }) {
  return (
    <div
      className={`max-w-sm overflow-hidden rounded-lg border-[2px] bg-white shadow-md  transition-shadow hover:shadow-lg mx-auto ${
        isSelected ? "border-blue-900" : "border-black/10"
      }`}
    >
      {/* Image Section */}
      <div
        className="relative cursor-pointer rounded-lg overflow-hidden m-6"
        onClick={() => onCardClick(meal)}
      >
        <img
          src={meal.image}
          alt={meal.name}
          className="object-cover w-full h-48 rounded-lg"
        />
        <span className="absolute right-2 top-2 rounded bg-black px-3 py-1 text-sm font-medium text-white">
          {meal.mealType.join(", ")}
        </span>
      </div>

      {/* Content Section */}
      <div className="p-4">
        {/* Title */}
        <h2 className="text-2xl font-bold mb-2">{meal.name}</h2>

        {/* Instructions */}
        <p className="text-sm text-gray-600 mb-4 line-clamp-6">
          {meal.instructions}
        </p>

        {/* Cuisine and Rating */}
        <div className="flex items-center justify-between text-[12px]">
          <div className="flex items-center gap-2">
            <span className="font-medium">Cuisine:</span>
            <span className="text-gray-700">{meal.cuisine}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-medium">Rating:</span>
            <span className="text-gray-700">{meal.rating}</span>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < meal.rating
                      ? "fill-blue-950 text-blue-950"
                      : "fill-gray-300 text-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Delete Button (if deletable) */}
        {isDeletable && (
          <button
            onClick={(e) => {
              e.stopPropagation(); // Prevent triggering card click
              onDelete();
            }}
            className="mt-4 w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Remove
          </button>
        )}
      </div>
    </div>
  );
}

export default MealCard;
