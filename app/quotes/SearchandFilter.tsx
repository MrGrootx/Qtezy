"use client";
import { Button } from "@/components/ui/button";
import React, { useState, useCallback } from "react";
import Search from "./Search";
import Categories from "./Categories";

interface SearchandFilterProps {
  onSearchChange?: (query: string) => void;
  onCategoryChange?: (category: string) => void;
  searchQuery?: string;
  selectedCategory?: string;
}

const SearchandFilter = ({ 
  onSearchChange, 
  onCategoryChange, 
  searchQuery, 
  selectedCategory 
}: SearchandFilterProps) => {
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery || "");
  const [localSelectedCategory, setLocalSelectedCategory] = useState(selectedCategory || "");

  const handleSearchChange = useCallback((query: string) => {
    setLocalSearchQuery(query);
    onSearchChange?.(query);
  }, [onSearchChange]);

  const handleCategoryChange = useCallback((category: string) => {
    setLocalSelectedCategory(category);
    onCategoryChange?.(category);
  }, [onCategoryChange]);

  return (
    <>
      <div className="w-full flex justify-center mt-8 p-4">
        <Search 
          onSearch={handleSearchChange} 
          defaultValue={localSearchQuery}
        />
      </div>
      <div className="px-4 mb-3">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <Categories 
            selectedCategory={localSelectedCategory}
            onCategorySelect={handleCategoryChange}
          />
          {(localSearchQuery || localSelectedCategory) && (
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => {
                setLocalSearchQuery("");
                setLocalSelectedCategory("");
                onSearchChange?.("");
                onCategoryChange?.("");
              }}
              className="self-start sm:self-center hover:cursor-pointer"
            >
              Clear Filters
            </Button>
          )}
        </div>
      </div>
      <div className="flex items-center justify-center flex-col">
        <h1
          className="lg:text-6xl text-2xl font-semibold"
          style={{
            fontFamily: "Satisfy, cursive",
          }}
        >
          Quotes Collections
        </h1>
        <p
          style={{ fontFamily: "Pacifico, cursive" }}
          className="lg:text-xl text-lg text-center mt-4 dark:text-gray-400 text-gray-800"
        >
          Explore timeless quotes, gather inspiration for your path, and
          contribute your own voice to the world.
        </p>
        <Button className="mt-4" size={"lg"}>
          Share Your Quote
        </Button>
      </div>
    </>
  );
};

export default SearchandFilter;
