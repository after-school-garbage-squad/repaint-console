"use server";

import { getSession } from "@auth0/nextjs-auth0";

import { TokenError } from "@/domain/auth/error";

export const disableBonus = async (eventId: string, spotId: string) => {
  try {
    const session = await getSession();
    if (!session?.idToken) {
      throw new Error("idToken is not vertify");
    }

    const apiUrl = new URL(
      `/admin/event/${eventId}/traffic/disable-bonus`,
      process.env.NEXT_PUBLIC_API_URL
    );

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${session.idToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ spotId }),
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
