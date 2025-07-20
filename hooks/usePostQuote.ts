import { Quote } from "@/types/globals";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const CreateQuote = async (quote: Quote): Promise<Quote> => {
  const response = await axios.post("/api/quotes/create", quote, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.data; 
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
