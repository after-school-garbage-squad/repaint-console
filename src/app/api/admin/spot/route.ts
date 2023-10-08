import { getSession } from "@auth0/nextjs-auth0";
import { NextResponse, type NextRequest } from "next/server";

import { TokenError } from "@/domain/auth/error";

export const GET = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);

    const eventId = searchParams.get("eventId");

    const apiUrl = new URL(
      `/admin/event/${eventId}/traffic/get-status`,
      process.env.NEXT_PUBLIC_API_URL,
    );

    const session = await getSession();

    if (!session?.idToken) {
      throw new TokenError("idToken is not vertify");
    }

    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.idToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return NextResponse.json(await response.json(), { status: 200 });
  } catch (error) {
    if (error instanceof TokenError) {
      return NextResponse.json({ error: error.message }, { status: 401 });
    } else if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
};
