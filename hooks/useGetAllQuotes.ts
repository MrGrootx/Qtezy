import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useGetAllQuotes = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["allquotes"],
    queryFn: async () => {
      const response = await axios.get("/api/getall", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data.data;
    },
  });

  return { data, isLoading, error };
};

export default useGetAllQuotes;