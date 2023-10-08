"use server";

import { getSession } from "@auth0/nextjs-auth0";

import type { Spot } from "../types";

import { TokenError } from "@/domain/auth/error";

export const updateSpot = async (
  eventId: string,
  spot: Spot,
  isPick?: boolean,
  name?: string,
) => {
  try {
    const session = await getSession();

    if (!session?.idToken) {
      throw new TokenError("idToken is not vertify");
    }

    const apiURL = new URL(
      `/admin/event/${eventId}/spot/update`,
      process.env.NEXT_PUBLIC_API_URL,
    );

    const response = await fetch(apiURL, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.idToken}`,
      },
      body: JSON.stringify({
        ...spot,
        isPick,
        name,
      }),
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
