import type { NextRequest } from "next/server";

export const GET = async (request: NextRequest, context: unknown) => {
  const { handleAuth, handleCallback, handleLogin } = await import(
    "@auth0/nextjs-auth0"
  );

  return handleAuth({
    login: handleLogin({
      returnTo: "/dashboard",
    }),
    callback: handleCallback({
      redirectUri: new URL("/api/auth/callback", request.url).toString(),
    }),
  })(request, context);
};
