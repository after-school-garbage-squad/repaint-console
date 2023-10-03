import { getSession } from "@auth0/nextjs-auth0";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

export const fetchCache = "no-store";

// eslint-disable-next-line no-console
console.log("AUTH0_SECRET =", process.env.AUTH0_SECRET);

export const GET = async (req: NextRequest) => {
  const res = NextResponse.next();
  const session = await getSession(req, res);
  if (!session?.idToken) return;
  const idToken = session.idToken;
  return NextResponse.json(idToken, { status: 200 });
};
