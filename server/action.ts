import axios from "axios";
export const fetchQuotes = async () => {
  try {
    const res = await axios(`${process.env.NEXT_PUBLIC_BASE_URL}/api/quotes`);
    if (res.status !== 200)
      throw new Error(res.data.message || "Failed to fetch quotes");
    return res.data.data;
  } catch (error) {
    console.error("Error fetching quotes:", error);
    throw error;
  }
};
