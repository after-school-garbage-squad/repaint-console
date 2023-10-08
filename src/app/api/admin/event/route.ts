import { getSession } from "@auth0/nextjs-auth0";
import { NextResponse } from "next/server";

import type { Event } from "@/domain/event/types";

export const GET = async () => {
  const session = await getSession();
  if (!session?.idToken) {
    return NextResponse.json("idToken is not vertify", { status: 401 });
  }

  const apiURL = new URL("/admin/event/list", process.env.NEXT_PUBLIC_API_URL);

  try {
    const response = await fetch(apiURL, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${session.idToken}`,
      },
    });

    const data: Event[] = await response.json();

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      throw new TypeError(error.message);
    }
  }
};
