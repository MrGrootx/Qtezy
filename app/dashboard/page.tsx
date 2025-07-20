"use client";
import React from "react";
import useGetMyPosts from "@/hooks/useGetMyPosts";
import { Quote } from "@/types/globals";
import Loader from "@/components/Loader";
import QuotesCardDashboard from "@/components/dashboard/QuotesCardDashboard";

const Page = () => {
  const { data: quotes, isLoading } = useGetMyPosts();
 

  return (
    <div className="relative">
      <div className="absolute inset-0 z-0 bg-fixed bg-center bg-cover blur-sm opacity-20"></div>

      <div className="relative">
         {" "}
        <div className="absolute inset-0 z-0 bg-fixed bg-center bg-cover blur-sm opacity-20"></div>
         {" "}
        <div className="relative z-10 container mx-auto px-4 py-16">
             {" "}
          <h1
            className="text-4xl font-bold mb-8 text-center text-white"
            style={{ fontFamily: "Pacifico, cursive" }}
          >
                  My Quotes    {" "}
          </h1>
             {" "}
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <Loader />
            </div>
          ) : (
            <div className="columns-1 sm:columns-2 lg:columns-4 gap-6 space-y-6">
              {quotes?.map((quote: Quote) => (
                <div key={quote.id} className="break-inside-avoid">
                  <QuotesCardDashboard data={quote} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
