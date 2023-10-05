import { NextResponse } from "next/server";

export const GET = async () => {
  const { getSession } = await import("@auth0/nextjs-auth0");
  const session = await getSession();

  if (!session?.idToken) {
    return NextResponse.json("can not get idToken from session", {
      status: 401,
    });
  }

  return NextResponse.json(session.idToken, { status: 200 });
};
