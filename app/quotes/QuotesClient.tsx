"use client";
import React, { useEffect, useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import QuotesCard from "./QuotesCard";
import { mockQuotes } from "@/datas/quotesMockdata";
import "./parallax.css";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchQuotes, likeQuote } from "@/server/action";
import { Quote } from "@/types/globals";
import RateLimitError from "@/components/common/RateLimitError";
import Loader from "@/components/Loader";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const ITEMS_PER_PAGE = 20;
import { toast } from "sonner";

interface QuotesClientProps {
  searchQuery?: string;
  selectedCategory?: string;
}

const QuotesClient: React.FC<QuotesClientProps> = ({
  searchQuery = "",
  selectedCategory = "",
}) => {
  const [mounted, setMounted] = useState(false);
  const [displayCount, setDisplayCount] = useState(ITEMS_PER_PAGE);
  const [isLiking, setIsLiking] = useState<Set<string>>(new Set());
  const { isLoaded, isSignedIn } = useAuth();
  const router = useRouter();
  const queryClient = useQueryClient();

  const likeMutation = useMutation({
    mutationFn: likeQuote,
    onMutate: (quoteId) => {
      setIsLiking((prev) => new Set(prev).add(quoteId));
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["quotes"] });
      const message = data?.message || "Action successful";

      toast.success(message);
    },
    onError: (error, quoteId) => {
      if ((error as any)?.response?.status === 429) {
        toast.error(
          "You're doing that too quickly. Please wait a moment before trying again."
        );
      } else {
        toast.error("Something went wrong. Please try again later.");
      }
    },
    onSettled: (data, error, quoteId) => {
      setIsLiking((prev) => {
        const newSet = new Set(prev);
        newSet.delete(quoteId);
        return newSet;
      });
    },
  });

  const handleLike = (quoteId: string) => {
    if (!isLoaded || !isSignedIn) {
      router.push("/sign-in");
      return;
    }

    if (isLiking.has(quoteId)) {
      return;
    }

    likeMutation.mutate(quoteId);
  };

  const {
    data: quotes,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["quotes"],
    queryFn: () => fetchQuotes(),
    staleTime: 10 * 60 * 1000,
    cacheTime: 15 * 60 * 1000,
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

  const displayedQuotes = useMemo(() => {
    return filteredQuotes.slice(0, displayCount);
  }, [filteredQuotes, displayCount]);

  const loadMore = () => {
    setDisplayCount((prev) =>
      Math.min(prev + ITEMS_PER_PAGE, filteredQuotes.length)
    );
  };

  const hasMore = displayCount < filteredQuotes.length;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setDisplayCount(ITEMS_PER_PAGE);
  }, [searchQuery, selectedCategory]);

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
          <div
            key={`quotes-${displayCount}`}
            className="p-4"
            style={{
              columns: "300px",
              columnGap: "16px",
              columnFill: "balance",
            }}
          >
            {displayedQuotes.map((quote: Quote, index: number) => (
              <div
                key={quote.id || index}
                className="w-full mb-4"
                style={{
                  breakInside: "avoid",
                  pageBreakInside: "avoid",
                }}
              >
                <QuotesCard
                  data={quote}
                  onLike={() => handleLike(quote.id)}
                  onShare={() => console.log("Shared quote:", quote.id)}
                  isLiking={isLiking.has(quote.id)}
                />
              </div>
            ))}
          </div>

          {hasMore && (
            <div className="flex justify-center">
              <Button
                onClick={loadMore}
                className="mt-4 cursor-pointer"
                size={"lg"}
              >
                Load More ({displayCount} of {filteredQuotes.length})
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default QuotesClient;
