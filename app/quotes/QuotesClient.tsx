"use client";
import React, { useEffect, useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import QuotesCard from "./QuotesCard";
import { mockQuotes } from "@/datas/quotesMockdata";
import "./parallax.css";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchQuotes, likeQuote } from "@/server/action";
import { Quote } from "@/types/globals";
import RateLimitError from "@/components/common/RateLimitError";
import Loader from "@/components/Loader";
import { useAuth } from "@clerk/nextjs";
import { useRouter, useSearchParams } from "next/navigation";
import { Heart, TwitterIcon } from "lucide-react";

const ITEMS_PER_PAGE = 20;
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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
  const [openModel, setOpenModel] = useState(false);
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
  const handleShare = (quote: Quote) => {
    if (!navigator.canShare) {
      toast.error("Sharing is not supported in this browser.");
      return;
    }
    const text = encodeURIComponent(`"${quote.text}" - ${quote.author}`);
    const twitterUrl = `https://twitter.com/intent/tweet?text=${text}`;

    window.open(twitterUrl, "_blank");
  };

  const searchParam = useSearchParams();
  const quoteId = searchParam.get("quoteId");
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);

  const openQuoteModal = (quote: Quote) => {
    if (!quote) return;

    setSelectedQuote(quote);
    setOpenModel(true);

    const currentParams = new URLSearchParams();
    if (searchQuery) currentParams.set("search", searchQuery);
    if (selectedCategory) currentParams.set("category", selectedCategory);
    currentParams.set("quoteId", quote.id);

    router.push(`/quotes?${currentParams.toString()}`, { scroll: false });
  };

  const closeModal = () => {
    setOpenModel(false);
    setSelectedQuote(null);

    const currentParams = new URLSearchParams();
    if (searchQuery) currentParams.set("search", searchQuery);
    if (selectedCategory) currentParams.set("category", selectedCategory);

    const newUrl = currentParams.toString()
      ? `/quotes?${currentParams.toString()}`
      : "/quotes";
    router.replace(newUrl, { scroll: false });
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

  useEffect(() => {
    if (quoteId && filteredQuotes.length > 0) {
      const quote = filteredQuotes.find((q: Quote) => q.id === quoteId);
      if (quote) {
        setSelectedQuote(quote);
        setOpenModel(true);

        const currentParams = new URLSearchParams();
        if (searchQuery) currentParams.set("search", searchQuery);
        if (selectedCategory) currentParams.set("category", selectedCategory);
        currentParams.set("quoteId", quoteId);

        router.replace(`/quotes?${currentParams.toString()}`, {
          scroll: false,
        });
      }
    }
  }, [quoteId, filteredQuotes, searchQuery, selectedCategory, router]);

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
                  onShare={() => handleShare(quote)}
                  isLiking={isLiking.has(quote.id)}
                  openQuoteModal={openQuoteModal}
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

      <Dialog
        open={openModel}
        modal
        onOpenChange={(open) => {
          if (!open) {
            closeModal();
          }
        }}
      >
        <DialogContent className="max-w-2xl p-0 overflow-hidden border-0">
          <DialogTitle className="sr-only">Quote Details</DialogTitle>
          {selectedQuote && (
            <div
              className="relative w-full p-6 group"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
                backdropFilter: "blur(10px)",
              }}
            >
              <div className="flex justify-between items-center mb-6">
                <Badge variant="outline" className="text-sm">
                  {selectedQuote.category}
                </Badge>
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleLike(selectedQuote.id)}
                    disabled={isLiking.has(selectedQuote.id)}
                    className="transition-all duration-200 hover:scale-110 hover:bg-red-50 dark:hover:bg-red-950/20 hover:cursor-pointer"
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        selectedQuote.isLiked
                          ? "fill-red-500 text-red-500"
                          : "text-gray-500 dark:text-gray-400"
                      } ${isLiking.has(selectedQuote.id) && "animate-pulse"}`}
                    />
                    <span className="ml-1 font-semibold">
                      {selectedQuote.total_likes || 0}
                    </span>
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleShare(selectedQuote)}
                    className="transition-all duration-200 hover:scale-110 hover:bg-blue-50 dark:hover:bg-blue-950/20 hover:cursor-pointer"
                  >
                    <TwitterIcon className="w-5 h-5 text-blue-500" />
                  </Button>
                </div>
              </div>

              <blockquote
                className="text-xl md:text-2xl lg:text-3xl text-center leading-relaxed mb-6 text-gray-800 dark:text-gray-200"
                style={{
                  fontFamily: "Pacifico, cursive",
                }}
              >
                "{selectedQuote.text}"
              </blockquote>

              <div className="text-center">
                <p className="text-lg text-gray-600 dark:text-gray-300 font-semibold">
                  — {selectedQuote.author}
                </p>
              </div>

              {(searchQuery || selectedCategory) && (
                <div className="mt-6 p-3 bg-gray-100/50 dark:bg-gray-800/50 rounded-lg">
                  <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                    {searchQuery && (
                      <span>
                        Found via search: <strong>"{searchQuery}"</strong>
                      </span>
                    )}
                    {searchQuery && selectedCategory && <span> | </span>}
                    {selectedCategory && (
                      <span>
                        In category: <strong>{selectedCategory}</strong>
                      </span>
                    )}
                  </p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default QuotesClient;
