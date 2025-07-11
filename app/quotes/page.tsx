"use client";
import { Button } from "@/components/ui/button";
import React, { useRef, useEffect } from "react";
import Search from "./Search";
import Categories from "./Categories";
import { cn } from "@/lib/utils";
import QuotesCard from "./QuotesCard";
import { mockQuotes } from "@/datas/quotesMockdata";
import { useParallax } from "@/hooks/useParallax";
import "./parallax.css";

const page = () => {
  const scrollY = useParallax();
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="container mx-auto px-2 lg:px-8">
      <div className="w-full flex justify-center mt-8 p-4">
        <Search />
      </div>
      <div className="px-4 mb-3">
        <Categories />
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
      <div className="mt-8 mb-8 parallax-container" ref={containerRef}>
        <div className="masonry-grid columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-4 p-4">
          {mockQuotes.map((quote, index) => {
            const parallaxOffset = (index % 4) * 0.2;
            const transformY = scrollY * parallaxOffset;

            return (
              <div
                key={index}
                className="masonry-item quote-card-enter break-inside-avoid mb-4 will-change-transform"
                style={{
                  transform: `translateY(${transformY + (index % 3) * 15}px)`,
                  transition: "transform 0.1s ease-out",
                  animationDelay: `${index * 0.1}s`,
                }}
              >
                <div className="quote-card">
                  <QuotesCard
                    data={quote}
                    onLike={() => console.log("Liked!")}
                    onShare={() => console.log("Shared!")}
                  />
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex justify-center">
          <Button className=" mt-4" size={"lg"}>
            Load More
          </Button>
        </div>
      </div>
    </div>
  );
};

export default page;
