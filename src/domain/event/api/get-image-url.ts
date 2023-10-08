"use server";
import { getSession } from "@auth0/nextjs-auth0";

import { TokenError } from "../../auth/error";

export const getImageUrl = async (eventId: string, imageId: string) => {
  try {
    const idToken = await getSession();
    if (!idToken?.idToken) {
      throw new TokenError("idToken is not vertify");
    }

    const reqUrl = new URL(
      `/admin/event/${eventId}/image/proxy?eventImageId=${imageId}`,
      process.env.NEXT_PUBLIC_API_URL,
    );

    const response = await fetch(reqUrl, {
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
      method: "GET",
    });

    const { url } = await response.json();

    return url as string;
  } catch (error) {
    if (error instanceof TokenError) {
      throw error;
    } else if (error instanceof Error) {
      throw new TypeError(error.message);
    }
  }
};
