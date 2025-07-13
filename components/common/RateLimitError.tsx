import React from "react";
import { Button } from "@/components/ui/button";

interface RateLimitErrorProps {
  onRetry?: () => void;
  resetAfter?: number; // seconds
}

const RateLimitError: React.FC<RateLimitErrorProps> = ({ onRetry, resetAfter }) => {
  const [countdown, setCountdown] = React.useState(resetAfter || 30);

  React.useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <div className="mb-4">
        <svg 
          className="w-16 h-16 text-yellow-500 mb-4" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 18.5c-.77.833.192 2.5 1.732 2.5z" 
          />
        </svg>
      </div>
      <h3 className="text-lg font-semibold mb-2">Too Many Requests</h3>
      <p className="text-gray-600 dark:text-gray-400 mb-4">
        You've made too many requests in a short time. Please wait a moment before trying again.
      </p>
      {countdown > 0 && (
        <p className="text-sm text-gray-500 mb-4">
          You can try again in {countdown} seconds...
        </p>
      )}
      <Button 
        onClick={onRetry} 
        disabled={countdown > 0}
        className="min-w-[120px]"
      >
        {countdown > 0 ? `Wait ${countdown}s` : "Try Again"}
      </Button>
    </div>
  );
};

export default RateLimitError;
