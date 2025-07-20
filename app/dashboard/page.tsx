"use client";
import React from "react";
import useGetMyPosts from "@/hooks/useGetMyPosts";
import { Quote } from "@/types/globals";
import Loader from "@/components/Loader";
import QuotesCardDashboard from "@/components/dashboard/QuotesCardDashboard";
import DashboardStatitics from "./Dashboardstatistics";

const Page = () => {
  const { data: quotes, isLoading } = useGetMyPosts();
  const totalQuotes = quotes?.length || 0;
  const totalApproved = quotes?.filter((quote: Quote) => quote.status === "approved").length || 0;
  const totalPending = quotes?.filter((quote: Quote) => quote.status === "pending").length || 0;

  return (
    <div className="relative">
      <div className="absolute inset-0 z-0 bg-fixed bg-center bg-cover blur-sm opacity-20"></div>

      <div className="relative">
        <div className="absolute inset-0 z-0 bg-fixed bg-center bg-cover blur-sm opacity-20"></div>
        <div className="relative z-10 container mx-auto px-4 py-16">
          <DashboardStatitics totalQuotes={totalQuotes} totalApproved={totalApproved} totalPending={totalPending} />
          <h1
            className="text-3xl font-bold mb-5 mt-3   text-white"
            style={{ fontFamily: "Pacifico, cursive" }}
          >
            My Quotes
          </h1>
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <Loader />
            </div>
          ) : (
            <div className="columns-1 sm:columns-2 lg:columns-4 gap-6 space-y-6">
              {quotes?.map((quote: Quote) => (
                <div key={quote.id} className="break-inside-avoid">
                  <QuotesCardDashboard data={quote}  />
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
