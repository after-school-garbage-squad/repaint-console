import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

export const fetchCache = "force-no-store";

export const GET = async (req: NextRequest) => {
  const res = NextResponse.next();
  const getSession = await import("@auth0/nextjs-auth0").then(
    (m) => m.getSession
  );
  const session = await getSession(req, res);
  if (!session?.idToken) return;
  const idToken = session.idToken;
  return NextResponse.json(idToken, { status: 200 });
};
