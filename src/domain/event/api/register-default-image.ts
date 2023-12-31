"use server";

import { getSession } from "@auth0/nextjs-auth0";

import { TokenError } from "@/domain/auth/error";

export const registerDefaultImage = async (
  eventID: string,
  formData: FormData,
) => {
  try {
    const session = await getSession();

    if (!session?.idToken) {
      throw new TokenError("can not get idToken from session");
    }

    const apiUrl = new URL(
      `/admin/event/${eventID}/image/register-default`,
      process.env.NEXT_PUBLIC_API_URL,
    );

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${session.idToken}`,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }
  } catch (error) {
    console.error(error);
    if (error instanceof TokenError) {
      throw error;
    } else if (error instanceof Error) {
      throw new TypeError(error.message);
    }
  }
};
