"use server";

import { getSession } from "@auth0/nextjs-auth0";

import { TokenError } from "@/domain/auth/error";

export const addOperator = async (inviteToken: string) => {
  try {
    const session = await getSession();

    if (!session?.idToken) {
      throw new TokenError("can not get idToken from session");
    }

    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/add-operator`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${session.idToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: inviteToken,
      }),
    });
  } catch (error) {
    if (error instanceof TokenError) {
      throw error;
    } else if (error instanceof Error) {
      throw new TypeError(error.message);
    }
  }
};
