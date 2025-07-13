"use client";
import { Button } from "@/components/ui/button";
import categories from "@/datas/Categories";
import React, { useState, useCallback } from "react";

interface CategoriesProps {
  selectedCategory?: string;
  onCategorySelect?: (category: string) => void;
}

const Categories = React.memo(
  ({ onCategorySelect, selectedCategory }: CategoriesProps) => {
    const [activeCategory, setActiveCategory] = useState<string>(
      selectedCategory || ""
    );

    const handleCategoryClick = useCallback(
      (category: string) => {
        const newCategory = activeCategory === category ? "" : category;
        setActiveCategory(newCategory);
        onCategorySelect?.(newCategory);
      },
      [activeCategory, onCategorySelect]
    );

    return (
      <div>
        <div className="flex flex-wrap gap-2">
          <Button
            variant={activeCategory === "" ? "default" : "outline"}
            className="text-sm px-4 py-2 transition-colors font-medium cursor-pointer min-w-fit"
            onClick={() => handleCategoryClick("")}
          >
            All
          </Button>
          {categories.map((category, index) => (
            <Button
              key={index}
              variant={activeCategory === category ? "default" : "outline"}
              className="text-sm px-4 py-2 transition-colors cursor-pointer font-medium min-w-fit"
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>
    );
  }
);

Categories.displayName = "Categories";

export default Categories;
