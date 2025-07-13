"use client";
import React, { useState, useCallback, useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import SearchandFilter from "./SearchandFilter";
import QuotesClient from "./QuotesClient";

const QuotesPageClient: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [searchQuery, setSearchQuery] = useState<string>(
    searchParams.get("search") || ""
  );
  const [selectedCategory, setSelectedCategory] = useState<string>(
    searchParams.get("category") || ""
  );

  const updateURL = useCallback(
    (search: string, category: string) => {
      const params = new URLSearchParams();
      if (search) params.set("search", search);
      if (category) params.set("category", category);

      const queryString = params.toString();
      const newURL = queryString ? `${pathname}?${queryString}` : pathname;

      router.replace(newURL, { scroll: false });
    },
    [pathname, router]
  );

  const handleSearchChange = useCallback(
    (query: string) => {
      setSearchQuery(query);
      updateURL(query, selectedCategory);
    },
    [selectedCategory, updateURL]
  );

  const handleCategoryChange = useCallback(
    (category: string) => {
      setSelectedCategory(category);
      updateURL(searchQuery, category);
    },
    [searchQuery, updateURL]
  );

  useEffect(() => {
    const urlSearch = searchParams.get("search") || "";
    const urlCategory = searchParams.get("category") || "";

    if (urlSearch !== searchQuery) setSearchQuery(urlSearch);
    if (urlCategory !== selectedCategory) setSelectedCategory(urlCategory);
  }, [searchParams]);

  return (
    <>
      <SearchandFilter
        onSearchChange={handleSearchChange}
        onCategoryChange={handleCategoryChange}
        searchQuery={searchQuery}
        selectedCategory={selectedCategory}
      />
      <div className="mt-8 mb-8">
        <QuotesClient
          searchQuery={searchQuery}
          selectedCategory={selectedCategory}
        />
      </div>
    </>
  );
};

export default QuotesPageClient;
