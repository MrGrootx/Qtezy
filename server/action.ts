import { Quote } from "@/types/globals";
import axios, { AxiosError } from "axios";

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const fetchQuotes = async (retries = 3): Promise<any> => {
  try {
    const res = await axios(`${process.env.NEXT_PUBLIC_BASE_URL}/api/quotes`);
    if (res.status !== 200)
      throw new Error(res.data.message || "Failed to fetch quotes");
    return res.data.data;
  } catch (error) {

    if (
      error instanceof AxiosError &&
      error.response?.status === 429 &&
      retries > 0
    ) {
      const retryAfter = error.response.headers["retry-after"];
      const waitTime = retryAfter ? parseInt(retryAfter) * 1000 : 2000; // Wait 2 seconds by default

      console.log(
        `Rate limited. Retrying in ${waitTime}ms... (${retries} retries left)`
      );
      await wait(waitTime);
      return fetchQuotes(retries - 1);
    }

    throw error;
  }
};

export const likeQuote = async (
  quoteId: string,
): Promise<{ success: boolean; message: string }> => {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/quotes/${quoteId}/like`
    );


    if (res.status !== 200) {
      return {
        success: false,
        message: res.data.message || "Failed to like quote",
      };
    }

    

    return {
      success: true,
      message: res.data.message || "Liked!",
    };
  } catch (error) {
   

    return {
      success: false,
      message:
        error instanceof AxiosError
          ? error.response?.data?.message || "Request failed"
          : "An unexpected error occurred",
    };
  }
};

export const CreateQuote = async (quote: Quote): Promise<Quote> => {
  const response = await axios.post("/api/quotes/create", quote, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.data; 
};


export const fetchMyQuotes = async (): Promise<any> => {
  try {
    const res = await axios.get(
      `/api/quotes/getmypost`
    );

    if (res.status !== 200) {
      throw new Error(res.data.message || "Failed to fetch my quotes");
    }

    return res.data.data;
  } catch (error) {
    console.error("Error fetching my quotes:", error);
    throw error instanceof AxiosError ? error : new Error("An unexpected error occurred");
  }
}