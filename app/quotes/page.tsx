import React from "react";
import { dehydrate, Hydrate, QueryClient } from "@tanstack/react-query";

import { fetchQuotes } from "@/server/action";
import QuotesClient from "./QuotesClient";
import SearchandFilter from "./SearchandFilter";

const page = async () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000, // 5 minutes
        refetchOnWindowFocus: false,
      },
    },
  });
  
  await queryClient.prefetchQuery({
    queryKey: ["quotes"],
    queryFn: fetchQuotes,
  });

  return (
    <div className="container mx-auto px-2 lg:px-8 min-h-screen">
      <SearchandFilter/>
      <div className="mt-8 mb-8">
        <Hydrate state={dehydrate(queryClient)}>
          <QuotesClient />
        </Hydrate>
      </div>
    </div>
  );
};

export default page;
