import type { NextRequest } from "next/server";

export const GET = async (request: NextRequest, context: unknown) => {
  const { handleAuth } = await import("@auth0/nextjs-auth0");

  return handleAuth()(request, context);
};
