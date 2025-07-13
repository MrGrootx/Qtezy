import React from "react";
import { dehydrate, Hydrate, QueryClient } from "@tanstack/react-query";

import { fetchQuotes } from "@/server/action";
import QuotesPageClient from "./QuotesPageClient";

const page = async () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 10 * 60 * 1000, // 10 minutes
        cacheTime: 15 * 60 * 1000, // 15 minutes
        refetchOnWindowFocus: false,
        refetchOnMount: false,
      },
    },
  });
  
  await queryClient.prefetchQuery({
    queryKey: ["quotes"],
    queryFn: () => fetchQuotes(),
  });

  return (
    <div className="container mx-auto px-2 lg:px-8 min-h-screen">
      <Hydrate state={dehydrate(queryClient)}>
        <QuotesPageClient />
      </Hydrate>
    </div>
  );
};

export default page;
