"use client";
import React, { useRef, useEffect, useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import QuotesCard from "./QuotesCard";
import { mockQuotes } from "@/datas/quotesMockdata";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import "./parallax.css";
import { useQuery } from "@tanstack/react-query";
import { fetchQuotes } from "@/server/action";
import { Quote } from "@/types/globals";
import RateLimitError from "@/components/common/RateLimitError";
import Loader from "@/components/Loader";

interface QuotesClientProps {
  searchQuery?: string;
  selectedCategory?: string;
}

const QuotesClient: React.FC<QuotesClientProps> = ({
  searchQuery = "",
  selectedCategory = "",
}) => {
  const [mounted, setMounted] = useState(false);

  const {
    data: quotes,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["quotes"],
    queryFn: () => fetchQuotes(),
    staleTime: 10 * 60 * 1000, // 10 minutes - longer cache
    cacheTime: 15 * 60 * 1000, // 15 minutes - keep in cache longer
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: (failureCount: number, error: any) => {
      if (error?.response?.status === 429) return false;
      return failureCount < 3;
    },
  });

  const filteredQuotes = useMemo(() => {
    const quotesToFilter = quotes && quotes.length > 0 ? quotes : mockQuotes;

    return quotesToFilter.filter((quote: Quote) => {
      const matchesSearch =
        !searchQuery ||
        quote.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
        quote.author.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        !selectedCategory ||
        quote.category.toLowerCase() === selectedCategory.toLowerCase();

      return matchesSearch && matchesCategory;
    });
  }, [quotes, searchQuery, selectedCategory]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-pulse rounded-lg h-8 w-32 bg-gray-200 dark:bg-gray-700"></div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
         <Loader />
      </div>
    );
  }

  if (isError) {
    if ((error as any)?.response?.status === 429) {
      return (
        <div className="mt-8 mb-8">
          <RateLimitError onRetry={() => refetch()} resetAfter={30} />
        </div>
      );
    }

    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <p className="text-red-500 mb-4">
            Error loading quotes. Please try again.
          </p>
          <Button onClick={() => refetch()} variant="outline">
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8 mb-8 parallax-container">
      {(searchQuery || selectedCategory) && (
        <div className="p-4 mb-4 bg-gray-100 dark:bg-gray-900/45 rounded">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {searchQuery && (
              <span>
                Searching for: <strong>"{searchQuery}"</strong>
              </span>
            )}
            {searchQuery && selectedCategory && <span> | </span>}
            {selectedCategory && (
              <span>
                Category: <strong>{selectedCategory}</strong>
              </span>
            )}
            <span className="ml-2">({filteredQuotes.length} results)</span>
          </p>
        </div>
      )}

      {filteredQuotes.length === 0 ? (
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <p className="text-gray-500 text-lg mb-2">
              No quotes found matching your criteria.
            </p>
            {(searchQuery || selectedCategory) && (
              <p className="text-gray-400 text-sm">
                Try adjusting your search or selecting a different category.
              </p>
            )}
          </div>
        </div>
      ) : (
        <>
          <div className="p-4">
            <ResponsiveMasonry
              columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
            >
              <Masonry>
                {filteredQuotes.map((quote: any, index: number) => {
                  return (
                    <div key={quote.id || index} className="w-full mr-4 mb-4">
                      <QuotesCard
                        data={quote}
                        onLike={() => console.log("Liked quote:", quote.id)}
                        onShare={() => console.log("Shared quote:", quote.id)}
                      />
                    </div>
                  );
                })}
              </Masonry>
            </ResponsiveMasonry>
          </div>
          <div className="flex justify-center">
            <Button className="mt-4" size={"lg"}>
              Load More
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default QuotesClient;
