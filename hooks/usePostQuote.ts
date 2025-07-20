import { CreateQuote } from "@/server/action";
import { Quote } from "@/types/globals";
import { useMutation } from "@tanstack/react-query";
 

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
