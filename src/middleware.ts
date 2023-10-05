import {
  getAccessToken,
  getSession,
  withMiddlewareAuthRequired,
} from "@auth0/nextjs-auth0/edge";
import { NextResponse, type NextRequest } from "next/server";

import type { Session } from "@auth0/nextjs-auth0/edge";

const afterRefresh = async (session: Session) => {
  delete session.idToken;
  return session;
};

export default withMiddlewareAuthRequired(async (req: NextRequest) => {
  const res = NextResponse.next();
  const session = await getSession(req, res);

  if (session?.user) {
    await getAccessToken(req, res, {
      refresh: true,
      afterRefresh,
    });
  }
});

export const config = {
  matcher: ["/dashboard/:path*", "/event/:path*", "/api/:path*"],
};
