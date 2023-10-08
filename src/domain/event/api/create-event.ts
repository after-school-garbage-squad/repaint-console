"use server";

import { getSession } from "@auth0/nextjs-auth0";

import { TokenError } from "@/domain/auth/error";

export type CreateEventProps = {
  name: string;
  hpUrl: string;
  contact: {
    name: string;
    email: string;
    phone: string;
  };
};

export const createEvent = async ({
  name,
  hpUrl,
  contact,
}: CreateEventProps) => {
  try {
    const session = await getSession();
    if (!session?.idToken) {
      throw new TokenError("idToken is not vertify");
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/admin/event/create`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session.idToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          hpUrl,
          contact,
        }),
      },
    );

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return response.json();
  } catch (error) {
    if (error instanceof TokenError) {
      throw error;
    } else if (error instanceof Error) {
      throw new TypeError(error.message);
    }
  }
};
