// middleware.ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher(["/sign-in(.*)", "/sign-up(.*)", "/"]);
const validLanguages = ["en", "fr", "es"];
const defaultLanguage = "en";

// Create a modified middleware that handles both auth and language
// Create a modified middleware that handles both auth and language
// Create a modified middleware that handles both auth and language
const combinedMiddleware = async (
  auth: { protect: () => any },
  request: NextRequest
) => {
  const pathname = request.nextUrl.pathname;

  // Handle language for protected routes
  if (pathname.startsWith("/(protected)")) {
    // Check if language is already in URL
    const hasLang = validLanguages.some((lang) =>
      pathname.match(new RegExp(`/(protected)/(?:${lang})(/|$)`))
    );

    // If no language in URL, redirect to add default language
    if (!hasLang) {
      // Get path after /(protected)/
      const pathAfterProtected = pathname.replace("/(protected)", "");

      // If path is just /(protected), redirect to /(protected)/en
      if (pathAfterProtected === "" || pathAfterProtected === "/") {
        return NextResponse.redirect(
          new URL(`/(protected)/${defaultLanguage}`, request.url)
        );
      }

      // Otherwise add language to the path
      return NextResponse.redirect(
        new URL(
          `/(protected)/${defaultLanguage}${pathAfterProtected}`,
          request.url
        )
      );
    }
  }

  // Handle Clerk authentication
  if (!isPublicRoute(request)) {
    await auth.protect();
  }

  return NextResponse.next();
};

// Apply the Clerk middleware with our combined function
export default clerkMiddleware(combinedMiddleware);

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
