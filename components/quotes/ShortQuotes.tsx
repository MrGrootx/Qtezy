import React from "react";
import { Marquee } from "../magicui/Marquee";
import { mockQuotes } from "@/datas/quotesMockdata";
import { cn } from "@/lib/utils";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Heart } from "lucide-react";
import Link from "next/link";

const QuoteCard = ({
  username,
  body,
  category,
  likes = 0,
}: {
  username: string;
  body: string;
  category?: string;
  likes?: number;
}) => {
  return (
    <figure
      className={cn(
        "relative h-full w-[280px] md:w-[320px] lg:w-[350px] cursor-pointer overflow-hidden rounded-xl border p-4 md:p-6",
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
      )}
    >
      <Badge variant="outline" className=" text-gray-500 dark:text-white/80 ">
        {category}
      </Badge>

      <blockquote
        className="mt-2 text-base md:text-lg lg:text-xl"
        style={{
          fontFamily: "Pacifico, cursive",
        }}
      >
        "{body}"
      </blockquote>
      <div className="mt-4 flex  items-start justify-between">
        <p className="text-sm font-medium dark:text-white/40  ">
          -- {username}
        </p>
        <div className="flex items-center">
          <Heart className="mr-1" size={16} color="gray" />
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
            {likes}
          </span>
        </div>
      </div>
    </figure>
  );
};

const ShortQuotes = () => {
  return (
    <div className="w-full py-8 md:py-12 lg:py-16">
      <div className="container mx-auto px-4 text-center mb-8 md:mb-12">
        <h2
          className="lg:text-5xl text-xl  font-semibold text-shadow"
          style={{
            fontFamily: "Rubik, sans-serif",
          }}
        >
          Inspiring Quotes
        </h2>
        <p className="text-center text-gray-500 dark:text-gray-300 text-sm mt-1">
          Discover wisdom, motivation, and inspiration from our curated
          collection of meaningful quotes. Let these words spark your creativity
          and brighten your day.
        </p>
      </div>

      <div className="relative flex h-[400px] md:h-[500px] w-full flex-col items-center justify-center overflow-hidden gap-4">
        <Marquee pauseOnHover className="[--duration:20s]">
          {mockQuotes
            .slice(0, Math.ceil(mockQuotes.length / 2))
            .map((review) => (
              <QuoteCard
                key={`normal-${review.id}`}
                username={review.author}
                body={review.text}
                category={review.category}
                likes={review.total_likes}
              />
            ))}
        </Marquee>

        <Marquee reverse pauseOnHover className="[--duration:20s]">
          {mockQuotes.slice(Math.ceil(mockQuotes.length / 2)).map((review) => (
            <QuoteCard
              key={`reverse-${review.id}`}
              username={review.author}
              body={review.text}
              category={review.category}
              likes={review.total_likes}
            />
          ))}
        </Marquee>

        <div className="pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-background"></div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-background"></div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
      </div>

      <div className="container mx-auto px-4 text-center mt-8 md:mt-12">
        <Button
          size="lg"
          className="px-6 py-3 md:px-8 md:py-4 text-base md:text-lg font-semibold"
          asChild
        >
          <Link href="/quotes">Explore All Quotes</Link>
        </Button>
        <p className="text-sm md:text-base text-muted-foreground mt-3">
          Browse our complete collection of inspirational quotes
        </p>
      </div>
    </div>
  );
};

export default ShortQuotes;
