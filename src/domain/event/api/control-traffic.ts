"use server";

import { getSession } from "@auth0/nextjs-auth0";

import { TokenError } from "@/domain/auth/error";

export const controlTrafic = async (
  eventId: string,
  to: string,
  from?: string,
) => {
  try {
    const session = await getSession();
    if (!session?.idToken) {
      throw new TokenError("idToken is not vertify");
    }

    const api_url = new URL(
      `/admin/event/${eventId}/traffic/set-bonus`,
      process.env.NEXT_PUBLIC_API_URL,
    );

    const response = await fetch(api_url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${session.idToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ from, to }),
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
  } catch (error) {
    if (error instanceof TokenError) {
      throw error;
    } else if (error instanceof Error) {
      throw new TypeError(error.message);
    }
  }
};
