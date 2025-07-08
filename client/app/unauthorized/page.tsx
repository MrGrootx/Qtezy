import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShieldX } from "lucide-react";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-6 p-8">
        <div className="flex justify-center">
          <ShieldX className="h-24 w-24 text-red-500" />
        </div>
        
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-foreground">Access Denied</h1>
          <p className="text-lg text-muted-foreground">
            You don't have permission to access this area.
          </p>
          <p className="text-sm text-muted-foreground">
            This incident has been logged for security purposes.
          </p>
        </div>
        
        <div className="space-y-4">
          <Button asChild>
            <Link href="/">
              Return to Home
            </Link>
          </Button>
          
          <div className="text-xs text-muted-foreground">
            If you believe this is an error, please contact support.
          </div>
        </div>
      </div>
    </div>
  );
}
