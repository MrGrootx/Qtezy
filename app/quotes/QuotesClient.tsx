"use client";
import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import QuotesCard from "./QuotesCard";
import { mockQuotes } from "@/datas/quotesMockdata";
import { useQuotes } from "@/hooks/useQuotes";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import "./parallax.css";

const QuotesClient: React.FC = () => {
  const { data: quotes, isLoading, error } = useQuotes();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
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
          <Masonry >
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
