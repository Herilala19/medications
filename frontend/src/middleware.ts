import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware({
  ...routing,
  localeDetection: false,
});

export const config = {
  matcher: ["/", "/(fr|en)/:path*", "/((?!_next|_vercel|.*\\..*).*)"],
};
