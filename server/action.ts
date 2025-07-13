import axios, { AxiosError } from "axios";

// Helper function to wait for a specified time
const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchQuotes = async (retries = 3): Promise<any> => {
  try {
    const res = await axios(`${process.env.NEXT_PUBLIC_BASE_URL}/api/quotes`);
    if (res.status !== 200)
      throw new Error(res.data.message || "Failed to fetch quotes");
    return res.data.data;
  } catch (error) {
    console.error("Error fetching quotes:", error);
    
    // Handle rate limiting with retry logic
    if (error instanceof AxiosError && error.response?.status === 429 && retries > 0) {
      const retryAfter = error.response.headers['retry-after'];
      const waitTime = retryAfter ? parseInt(retryAfter) * 1000 : 2000; // Wait 2 seconds by default
      
      console.log(`Rate limited. Retrying in ${waitTime}ms... (${retries} retries left)`);
      await wait(waitTime);
      return fetchQuotes(retries - 1);
    }
    
    throw error;
  }
};
