import React from "react";

const CategoryFilter = ({
  categories = ["all", "love", "math", "gaming", "programming"],
  selectedCategory = "all",
  onSelectCategory,
}) => {
  return (
    <div className="w-full">
      <div className="flex flex-wrap gap-3">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => onSelectCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
              ${
                selectedCategory === category
                  ? "bg-blue-600 text-white shadow-md scale-105"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }
            `}
          >
            {category === "all"
              ? "All Categories"
              : category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
