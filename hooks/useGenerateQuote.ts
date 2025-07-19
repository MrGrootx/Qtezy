import { GeneratedQuote } from "@/types/globals";
import { useMutation } from "@tanstack/react-query";

const PERPLEXITY_API_KEY = process.env.NEXT_PUBLIC_PERPLEXITY_API_KEY; // or load securely



export const generateQuote = async (topic: string): Promise<GeneratedQuote> => {
  const response = await fetch("https://api.perplexity.ai/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${PERPLEXITY_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "sonar-pro",
      messages: [
        {
          role: "system",
          content:
            'You are a quote generator that gives short, motivational quotes along with the author. Respond ONLY in JSON format like this: {"quote": "...", "author": "..."}',
        },
        {
          role: "user",
          content: `Give me a motivational quote about: ${topic}`,
        },
      ],
    }),
  });

  const data = await response.json();
  const content = data?.choices?.[0]?.message?.content;

  if (!content) {
    throw new Error("No quote returned");
  }

  try {
    const parsed = JSON.parse(content);
    return {
      title: parsed.quote,
      author: parsed.author ?? "Anonymous",
    };
  } catch (e) {
    console.error("Failed to parse quote JSON:", content);
    throw new Error("Invalid quote format received");
  }
};

export const useGenerateQuote = () =>
  useMutation({
    mutationFn: (topic: string) => generateQuote(topic),
  });
