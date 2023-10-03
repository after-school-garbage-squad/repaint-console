import { NextResponse } from "next/server";

export const fetchCache = "force-no-store";

export const GET = async () => {
  const { getSession } = await import("@auth0/nextjs-auth0");
  const session = await getSession();
  if (!session?.idToken) return;
  const idToken = session.idToken;
  try {
    return NextResponse.json(idToken, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error, success: false });
  }
};
