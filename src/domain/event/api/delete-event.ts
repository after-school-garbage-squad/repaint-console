"use server";

import { getSession } from "@auth0/nextjs-auth0";

import { TokenError } from "@/domain/auth/error";

export const deleteEvent = async (eventId: string) => {
  try {
    const session = await getSession();
    if (!session?.idToken) {
      throw new TokenError("idToken is not vertify");
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/admin/event/${eventId}/delete`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${session.idToken}`,
        },
      },
    );

    if (!response.ok) {
      throw new Error("イベントの削除に失敗しました");
    }
  } catch (error) {
    if (error instanceof TokenError) {
      throw error;
    } else if (error instanceof Error) {
      throw new TypeError(error.message);
    }
  }
};
