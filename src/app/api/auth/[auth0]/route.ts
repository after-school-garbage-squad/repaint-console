import { handleLogin } from "@auth0/nextjs-auth0";

import type { NextRequest } from "next/server";

export const GET = async (request: NextRequest, context: unknown) => {
  const { handleAuth } = await import("@auth0/nextjs-auth0");

  return handleAuth({
    login: handleLogin({
      authorizationParams: {
        scope: "openid profile email offline_access",
      },
    }),
  })(request, context);
};
