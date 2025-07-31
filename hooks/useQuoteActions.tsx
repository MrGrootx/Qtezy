import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useQuoteActions = () => {
  const queryClient = useQueryClient();

  const getStatistics = useMutation({
    mutationFn: async () => {
      const response = await axios.get("/api/quotes/statistics");
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["statistics"], data);
    },
  });

  return {
    getStatistics,
  };
};
