import React from "react";
import bgPizza from '../assets/bg-pizza.png'; // Update the path as per your folder structure


function Header() {
  return (
    <div
      className="relative h-64 sm:h-80 bg-cover bg-center"
      style={{
        backgroundImage: `url(${bgPizza})`, // Replace with your background image URL
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-white/50"></div>

      {/* Text Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-black px-4">
        <h1 className="text-3xl sm:text-4xl font-bold">Optimized Your Meal</h1>
        <p className="mt-2 text-sm sm:text-base">
          Select Meal to Add in Week. You will be able to edit, modify and
          change the Meal Weeks.
        </p>
      </div>
    </div>
  );
}

export default Header;
