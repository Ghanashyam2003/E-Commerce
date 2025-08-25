import React from "react";
import { getData } from "../context/DataContext";

const FilterSection = ({
  search,
  setSearch,
  brand,
  setBrand,
  priceRange,
  setPriceRange,
  category,
  setCategory,
  handleBrandChange,
  handleCategoryChange,
}) => {
  const { categoryOnlyData, brandOnlyData, loading, error } = getData();

  return (
    <div className="bg-gray-100 mt-10 p-4 rounded-md h-max hidden md:block">
      {/* 🔄 Loading State */}
      {loading && (
        <div className="flex justify-center items-center py-5">
          <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="ml-2 text-blue-600 font-semibold">Loading...</span>
        </div>
      )}

      {/* ❌ Error Message */}
      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded-md mb-4">
          {error}
        </div>
      )}

      {/* 🔍 Search */}
      <input
        type="text"
        placeholder="Search.."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="bg-white p-2 rounded-md border-gray-400 border-2 w-full"
      />

      {/* 🏷 Category */}
      <h1 className="mt-5 font-semibold text-xl">Category</h1>
      <div className="flex flex-col gap-2 mt-3">
        {categoryOnlyData?.map((item, index) => (
          <div key={index} className="flex gap-2">
            <input
              type="checkbox"
              name={item}
              checked={category === item}
              value={item}
              onChange={handleCategoryChange}
            />
            <button className="cursor-pointer uppercase">{item}</button>
          </div>
        ))}
      </div>

      {/* 🏢 Brand */}
      <h1 className="mt-5 font-semibold text-xl mb-3">Brand</h1>
      <select
        className="bg-white w-full p-2 border-gray-200 border-2 rounded-md"
        value={brand}
        onChange={handleBrandChange}
      >
        {brandOnlyData?.map((item, index) => (
          <option key={index} value={item}>
            {item.toUpperCase()}
          </option>
        ))}
      </select>

      {/* 💰 Price Range */}
      <h1 className="mt-5 font-semibold text-xl mb-3">Price Range</h1>
      <div className="flex flex-col gap-2">
        <label>
          Price Range: ${priceRange[0]} - ${priceRange[1]}
        </label>
        <input
          type="range"
          min="0"
          max="5000"
          value={priceRange[1]}
          onChange={(e) =>
            setPriceRange([priceRange[0], Number(e.target.value)])
          }
          className="transition-all"
        />
      </div>

      {/* 🔄 Reset Button */}
      <button
        className="bg-red-500 text-white rounded-md px-3 py-1 mt-5 cursor-pointer"
        onClick={() => {
          setSearch("");
          setCategory("All");
          setBrand("All");
          setPriceRange([0, 5000]);
        }}
      >
        Reset Filters
      </button>
    </div>
  );
};

export default FilterSection;
