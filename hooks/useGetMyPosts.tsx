import { fetchMyQuotes } from "@/server/action";
import { Quote } from "@/types/globals";
import { useMutation, useQuery } from "@tanstack/react-query";

type UsePostQuoteOptions = {
  onSuccess?: (data: Quote) => void;
  onError?: (error: unknown) => void;
};

const useGetMyPosts = () => {
  return useQuery({
    queryKey: ["getMyPosts"],
    queryFn: fetchMyQuotes,
  });
};
export default useGetMyPosts;
