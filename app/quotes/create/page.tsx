import GlassCard from "@/components/GlassCard";
import { SendIcon, SparkleIcon } from "lucide-react";
import React from "react";
import AiGenerator from "./AiGenerator";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import QuoteForm from "./Form";
import { Button } from "@/components/ui/button";

const page = () => {
  return (
    <div className="container mx-auto px-2 lg:px-8  w-full h-screen">
      <h1
        className="text-4xl font-bold mb-4 text-center"
        style={{ fontFamily: "Pacifico, cursive" }}
      >
        Share Your Wisdoms
      </h1>
      <p className="text-lg text-center mb-8 font-semibold dark:text-white/70">
        Submit a meaningful quote that has inspired you or create your own
        wisdom to share with the world.
      </p>
      <div className="flex justify-center items-center flex-col">
        <div className="max-w-3xl w-full">
          <AiGenerator />
        </div>
        <div className="max-w-3xl w-full mt-4 mb-4">
          <GlassCard>
            <h1
              className="text-2xl font-bold mb-4"
              style={{ fontFamily: "Pacifico, cursive" }}
            >
              Submit a Quote
            </h1>
            <QuoteForm />
           
          </GlassCard>
        </div>
      </div>
    </div>
  );
};

export default page;
