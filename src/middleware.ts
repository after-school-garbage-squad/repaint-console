import {
  getSession,
  withMiddlewareAuthRequired,
} from "@auth0/nextjs-auth0/edge";
import { NextResponse, type NextRequest } from "next/server";

export default withMiddlewareAuthRequired(async (req: NextRequest) => {
  const res = NextResponse.next();
  const session = await getSession(req, res);
  if (!session?.idToken) {
    return NextResponse.redirect("/login");
  }
});

export const config = {
  matcher: ["/dashboard/:path*", "/event/:path*"],
};
