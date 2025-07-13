import { useQuery } from "@tanstack/react-query";

const fetchQuotes = async () => {
  const res = await fetch("/api/quotes");
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to fetch quotes");
  return data.data;
};

export const useQuotes = () => {
  return useQuery({ 
    queryKey: ["quotes"], 
    queryFn: fetchQuotes,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
