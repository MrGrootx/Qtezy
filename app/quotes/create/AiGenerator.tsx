"use client";
import GlassCard from "@/components/GlassCard";
import { Button } from "@/components/ui/button";
import { Copy, SparkleIcon, X } from "lucide-react";
import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogHeader,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import { toast } from "sonner";
import { useGenerateQuote } from "@/hooks/useGenerateQuote";
import { GeneratedQuote } from "@/types/globals";

interface AiGeneratorProps {
  topic: string;
  setTopic: React.Dispatch<React.SetStateAction<string>>;
}

const AiGenerator = ({topic, setTopic}: AiGeneratorProps) => {
  const [openModel, setOpenModel] = React.useState(false);
  const { mutate: generate, data: quote, isPending } = useGenerateQuote();
  const [quotes, setQuotes] = useState<GeneratedQuote[]>([]);
  const handleGenerate = () => {
    if (!topic) return;
    generate(topic, {
      onSuccess: (newQuote) => {
        toast.success("Quote generated successfully!");
        setQuotes((prev) => [newQuote, ...prev]);
        setTopic("");
      },

      onError: (err) => {
        console.error("Failed to generate quote", err);
      },
    });
  };

  const closeModal = () => setOpenModel(false);
  return (
    <GlassCard>
      <div className="flex items-center gap-x-2">
        <SparkleIcon />
        <h2
          className="text-2xl font-semibold mb-4 mt-2 text-white/95"
          style={{ fontFamily: "Pacifico, cursive" }}
        >
          AI Quote Generator
        </h2>
      </div>
      <p className="text-gray-700 dark:text-gray-300 mb-4">
        Need inspiration? Let AI generate meaningful quotes based on your topic
        or theme.
      </p>
      <Button
        className="w-full cursor-pointer font-semibold"
        variant="outline"
        size="lg"
        onClick={() => setOpenModel(true)}
        style={{
          fontFamily: "Kanit, sans-serif",
        }}
      >
        Generate Quote
      </Button>

      <AlertDialog
        open={openModel}
        onOpenChange={(open) => {
          if (!open) {
            closeModal();
          }
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader className="flex items-center justify-between flex-row">
            <div>
              <AlertDialogTitle>AI Quote Generator</AlertDialogTitle>
              <AlertDialogDescription className="text-sm text-gray-500 dark:text-gray-400">
                Enter a topic or theme to generate a quote.
              </AlertDialogDescription>
            </div>
            <AlertDialogCancel asChild>
              <Button
                size="icon"
                variant="ghost"
                className="h-6 w-6 p-0 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </Button>
            </AlertDialogCancel>
          </AlertDialogHeader>
          <div className="grid w-full items-center gap-3">
            <Label htmlFor="email">What kind of quote would you like?</Label>
            <Input
              id="topic"
              placeholder="e.g. Motivation, Life, Success"
              className="w-full border"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              autoComplete="off"
            />
          </div>
          <AlertDialogFooter>
            <Button
              onClick={handleGenerate}
              disabled={isPending}
              className="w-full hover:cursor-pointer"
            >
              {isPending ? "Generating..." : "Generate Quote"}
            </Button>
          </AlertDialogFooter>
          {quotes.length > 0 && (
            <AlertDialogHeader style={{ fontFamily: "Pacifico, cursive" }}>
              Generated Quotes:
            </AlertDialogHeader>
          )}
          {quotes.slice(0, 3).map((quote, index) => (
            <div key={index} className="dark:bg-black/30 rounded p-3">
              <div className="flex flex-col">
                <span
                  style={{ fontFamily: "Pacifico, cursive" }}
                  className="text-gray-700 dark:text-gray-300 mb-2"
                >
                  "{quote.title}"
                </span>
                <span
                  className="text-gray-500 text-sm italic"
                  style={{ fontFamily: "Kanit, sans-serif" }}
                >
                  — {quote.author}
                </span>
              </div>
              <div className="flex items-end justify-end w-full mt-2">
                <div className="flex items-center gap-x-2">
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      navigator.clipboard.writeText(
                        `${quote.title} ${quote.author}`
                      )
                    }
                  >
                    <Copy className="mr-1 h-4 w-4" />
                    Copy Quote
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </AlertDialogContent>
      </AlertDialog>
    </GlassCard>
  );
};

export default AiGenerator;
