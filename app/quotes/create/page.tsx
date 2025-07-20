"use client";
import GlassCard from "@/components/GlassCard";
import React from "react";
import AiGenerator from "./AiGenerator";
import QuoteForm from "./Form";

const page = () => {
  const [topic, setTopic] = React.useState("");
  const [author, setAuthor] = React.useState("");
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
          <AiGenerator
            topic={topic}
            setTopic={setTopic}
            setAuthor={setAuthor}
          />
        </div>
        <div className="max-w-3xl w-full mt-4 mb-4">
          <GlassCard>
            <h1
              className="text-2xl font-bold mb-4"
              style={{ fontFamily: "Pacifico, cursive" }}
            >
              Submit a Quote
            </h1>
            <QuoteForm
              topic={topic}
              setTopic={setTopic}
              author={author}
              setAuthor={setAuthor}
            />
          </GlassCard>
        </div>
      </div>
    </div>
  );
};

export default page;
