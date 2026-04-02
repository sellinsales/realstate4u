import { withAuth } from "next-auth/middleware";

export default withAuth(
  function proxy() {
    return undefined;
  },
  {
    secret: process.env.NEXTAUTH_SECRET || "realstate4u-development-secret",
    pages: {
      signIn: "/login",
    },
    callbacks: {
      authorized: ({ req, token }) => {
        const { pathname } = req.nextUrl;

        if (pathname.startsWith("/admin")) {
          return token?.role === "ADMIN";
        }

        if (pathname.startsWith("/dashboard") || pathname.startsWith("/post-property")) {
          return !!token;
        }

        return true;
      },
    },
  },
);

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*", "/post-property"],
};
