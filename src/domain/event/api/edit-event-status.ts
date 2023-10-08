"use server";

import { getSession } from "@auth0/nextjs-auth0";

import type { Contact, Event } from "../types";

import { TokenError } from "@/domain/auth/error";

export const editEventStatus = async (
  event: Event,
  name: string,
  hpUrl: string,
  contact: Contact,
) => {
  try {
    const session = await getSession();

    if (!session?.idToken) {
      throw new TokenError("idToken is not vertify");
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/admin/event/${event.eventId}/update`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${session.idToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...event,
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
