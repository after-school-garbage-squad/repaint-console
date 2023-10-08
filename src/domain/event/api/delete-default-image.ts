"use server";
import { getSession } from "@auth0/nextjs-auth0";

import { TokenError } from "@/domain/auth/error";

export const deleteDefaultImage = async (eventId: string, imageId: string) => {
  try {
    const session = await getSession();
    if (!session?.idToken) {
      throw new TokenError("can not get idToken from session");
    }

    const reqUrl = new URL(
      `/admin/event/${eventId}/image/delete-default`,
      process.env.NEXT_PUBLIC_API_URL,
    );

    const response = await fetch(reqUrl, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.idToken}`,
      },
      body: JSON.stringify({
        imageId,
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
