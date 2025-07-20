"use client";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Quote } from "@/types/globals";
import { Heart } from "lucide-react";
import React from "react";

interface QuotesCardProps {
  data?: Quote;
}

const QuotesCardDashboard: React.FC<QuotesCardProps> = ({ data }) => {
  return (
    <figure
      className={cn(
        "relative  w-full overflow-hidden rounded-lg border p-4 group transition-all duration-300 hover:scale-105 hover:shadow-xl backdrop-blur-sm",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05] shadow-md",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15] dark:shadow-lg"
      )}
      style={{
        background:
          "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
      }}
    >
      <div className="flex justify-between items-center mb-2">
        <Badge variant="outline" className="capitalize">
          {data?.category}
        </Badge>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Badge
                variant={
                  data?.status === "approved"
                    ? "success"
                    : data?.status === "pending"
                    ? "warning"
                    : "destructive"
                }
                className="rouded-full capitalize  "
              >
                {data?.status == "approved"
                  ? "Public"
                  : data?.status === "pending"
                  ? "Waiting for Approval"
                  : "Rejected"}
              </Badge>
            </TooltipTrigger>
            <TooltipContent side="top">
              {data?.status === "approved" && "This quote is public and visible to everyone."}
              {data?.status === "pending" && "Waiting for admin approval."}
              {data?.status === "rejected" && "This quote was rejected by the admin."}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <blockquote
        className="mt-2 text-base md:text-lg lg:text-xl text-center"
        style={{
          fontFamily: "Pacifico, cursive",
        }}
      >
        "{data?.text || ""}"
      </blockquote>

      <div className="flex items-center gap-x-1 justify-between mt-4">
        <small className="text-sm text-gray-500 dark:text-gray-300 font-semibold">
          — {data?.author || "Unknown"}
        </small>
        <div className="flex items-center gap-x-1  text-gray-500 dark:text-gray-400">
          <Heart className="w-4 h-4" />
          <span
            className="font-semibold text-sm"
            style={{
              fontFamily: "Rubik, sans-serif",
            }}
          >
            {data?.total_likes || 0}
          </span>
        </div>
      </div>
    </figure>
  );
};

export default QuotesCardDashboard;
