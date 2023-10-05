import { withMiddlewareAuthRequired } from "@auth0/nextjs-auth0/edge";

import type { NextRequest } from "next/server";

// const afterRefresh = async (session: Session) => {
//   delete session.idToken;
//   return session;
// };

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default withMiddlewareAuthRequired(async (_req: NextRequest) => {
  // const res = NextResponse.next();
  // await getAccessToken(req, res, {
  //   refresh: true,
  //   afterRefresh,
  // });
});

export const config = {
  matcher: ["/dashboard/:path*", "/event/:path*"],
};
