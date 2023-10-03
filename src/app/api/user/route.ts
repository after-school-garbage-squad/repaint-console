import { getSession } from "@auth0/nextjs-auth0";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

export const fetchCache = "force-no-store";

// eslint-disable-next-line no-console
console.log("AUTH0_SECRET =", process.env.AUTH0_SECRET);

export const GET = async (req: NextRequest) => {
  const res = new NextResponse();
  const session = await getSession(req, res);
  if (!session?.idToken) return;
  const idToken = session.idToken;
  try {
    return NextResponse.json(idToken, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error, success: false });
  }
};
