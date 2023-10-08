"use server";

import { getSession } from "@auth0/nextjs-auth0";

import { TokenError } from "@/domain/auth/error";

export const inviteOperator = async (eventId: string, email: string) => {
  try {
    const session = await getSession();

    if (!session?.idToken) {
      throw new TokenError("idToken is not vertify");
    }

    const api_url = new URL(
      `/admin/send-email`,
      process.env.NEXT_PUBLIC_API_URL,
    );
    await fetch(api_url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.idToken}`,
      },
      body: JSON.stringify({ eventId, email }),
    });
  } catch (error) {
    if (error instanceof TokenError) {
      throw error;
    } else if (error instanceof Error) {
      throw new TypeError(error.message);
    }
  }
};
