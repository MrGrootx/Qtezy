"use client";
import GlassCard from "@/components/GlassCard";
import { Button } from "@/components/ui/button";
import { Copy, SparkleIcon, X } from "lucide-react";
import React from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogHeader,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const AiGenerator = () => {
  const [openModel, setOpenModel] = React.useState(false);

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
            <AlertDialogTitle>AI Quote Generator</AlertDialogTitle>
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
              type="email"
              id="email"
              placeholder="eg. Motivation, Life, Success"
              className="w-full border"
              autoComplete="off"
            />
          </div>
          <AlertDialogFooter>
            <Button
              className="w-full cursor-pointer font-semibold"
              onClick={() => {
                closeModal();
              }}
            >
              Generate Quotes
            </Button>
          </AlertDialogFooter>
          <AlertDialogHeader>Generated Quotes:</AlertDialogHeader>
          <div className="dark:bg-black/30 rounded p-3 ">
            <div className="flex flex-col">
              <span
                style={{
                  fontFamily: "Pacifico, cursive",
                }}
                className="text-gray-700 dark:text-gray-300 mb-4"
              >
                "The greatest life comes from within your own determination to
                succeed."
              </span>
            </div>
            <div className="flex items-end justify-end w-full">
              <Button variant={"ghost"} className="hover:cursor-pointer">
                <Copy />
                Copy Quote
              </Button>
            </div>
          </div>
          <div className="dark:bg-black/30 rounded p-3 ">
            <div className="flex flex-col">
              <span
                style={{
                  fontFamily: "Pacifico, cursive",
                }}
                className="text-gray-700 dark:text-gray-300 mb-4"
              >
                "The greatest life comes from within your own determination to
                succeed."
              </span>
            </div>
            <div className="flex items-end justify-end w-full">
              <Button variant={"ghost"} className="hover:cursor-pointer">
                <Copy />
                Copy Quote
              </Button>
            </div>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </GlassCard>
  );
};

export default AiGenerator;
