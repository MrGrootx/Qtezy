"use client";
``;
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Quote } from "@/types/globals";
import { Heart, TwitterIcon } from "lucide-react";
import React from "react";

interface QuotesCardProps {
  data?: Quote;
  onLike?:  () => void;
  onShare?: () => void;
  isLiking?: boolean;
}

const QuotesCard: React.FC<QuotesCardProps> = ({ data, onLike, onShare, isLiking = false }) => {
  return (
    <figure
      className={cn(
        "relative cursor-pointer w-full overflow-hidden rounded-lg border p-4 group transition-all duration-300 hover:scale-105 hover:shadow-xl backdrop-blur-sm",
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
        <Badge variant="outline">{data?.category}</Badge>
        <div className="opacity-0 group-hover:opacity-100 duration-200 transition-all">
          <div className="flex items-center gap-x-2">
            <Button
              size={"icon"}
              variant="ghost"
              onClick={onLike}
              disabled={isLiking}
              className={cn(
                "cursor-pointer",
                isLiking && "opacity-50 cursor-not-allowed"
              )}
            >
              <Heart className={cn(isLiking && "animate-pulse")} />
            </Button>
            <Button
              size={"icon"}
              variant="ghost"
              onClick={onShare}
              className="cursor-pointer"
            >
              <TwitterIcon />
            </Button>
          </div>
        </div>
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

export default QuotesCard;
