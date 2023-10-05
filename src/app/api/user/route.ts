import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
  const res = NextResponse.next();
  const { getSession, updateSession } = await import("@auth0/nextjs-auth0");
  const session = await getSession();

  await updateSession(req, res, {
    ...session,
    user: { ...session?.user, name: "UPDATED" },
  });

  if (!session?.idToken) {
    return NextResponse.json("can not get idToken from session", {
      status: 401,
    });
  }

  return NextResponse.json(session.idToken, { status: 200 });
};
