import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { ratelimit } from "@/lib/ratelimiter";
import { getClientIp } from "@/lib/ip";

const isProtectedRoute = createRouteMatcher(["/dashboard(.*)", "/forum(.*)"]);
const isAdminRoute = createRouteMatcher(["/admin(.*)"]);
const isApiRoute = createRouteMatcher(["/api(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  if (isApiRoute(req)) {
    const ip = await getClientIp();
    const { success, limit, reset, remaining } = await ratelimit.limit(ip);

    if (!success) {
      return NextResponse.json(
        {
          message: "Rate limit exceeded. Please try again later.",
          limit,
          reset,
          remaining,
        },
        { status: 429 }
      );
    }
  }

  const { userId, sessionClaims } = await auth();
  
  if (isAdminRoute(req)) {
    if (!userId) {
      return NextResponse.redirect(new URL('/sign-in', req.url));
    }
    
    const privateMetadata = sessionClaims?.metadata as { role?: string } | undefined;
    const userRole = privateMetadata?.role;
    
    if (userRole !== "admin") {
      return NextResponse.redirect(new URL('/unauthorized', req.url));
    }
    
    return;  
  }
  
  if (isProtectedRoute(req)) {
    if (!userId) {
      return NextResponse.redirect(new URL('/sign-in', req.url));
    }
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
