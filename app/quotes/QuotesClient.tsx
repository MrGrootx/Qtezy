"use client";
import React, { useRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import QuotesCard from "./QuotesCard";
import { mockQuotes } from "@/datas/quotesMockdata";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import "./parallax.css";
import { useQuery } from "@tanstack/react-query";
import { fetchQuotes } from "@/server/action";

const QuotesClient: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  
  const {
    data: quotes,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["quotes"],
    queryFn: fetchQuotes,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

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
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-gray-100"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-red-500">Error loading quotes. Please try again.</p>
      </div>
    );
  }

  const quotesToDisplay = quotes && quotes.length > 0 ? quotes : mockQuotes;

  return (
    <div className="mt-8 mb-8 parallax-container">
      <div className="p-4">
        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
          <Masonry>
            {quotesToDisplay.map((quote: any, index: number) => {
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
    </div>
  );
};

export default QuotesClient;
