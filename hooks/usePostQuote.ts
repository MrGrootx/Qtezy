import { Quote } from "@/types/globals";
import { useMutation } from "@tanstack/react-query";

const CreateQuote = async (quote: Quote): Promise<Quote> => {
  const response = await fetch("/api/quotes/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(quote),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(err || "Failed to create quote");
  }

  return response.json();
};

type UsePostQuoteOptions = {
  onSuccess?: (data: Quote) => void;
  onError?: (error: unknown) => void;
};

const usePostQuote = ({ onSuccess, onError }: UsePostQuoteOptions = {}) => {
  const mutation = useMutation({
    mutationFn: CreateQuote,
    mutationKey: ["createQuote"],
    onSuccess,
    onError,
  });

  return mutation;
};

export default usePostQuote;
