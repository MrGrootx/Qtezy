// Server action for fetching quotes
export const fetchQuotes = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/quotes`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to fetch quotes");
    return data.data;
  } catch (error) {
    console.error("Error fetching quotes:", error);
    throw error;
  }
};
