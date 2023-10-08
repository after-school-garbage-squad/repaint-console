"use server";

import { getSession } from "@auth0/nextjs-auth0";

export const deleteSpot = async (eventId: string, spotId: string) => {
  const session = await getSession();

  if (!session?.idToken) {
    throw new Error("idToken is not vertify");
  }

  const apiUrl = new URL(
    `/admin/event/${eventId}/spot/delete`,
    process.env.NEXT_PUBLIC_API_URL,
  );

  const response = await fetch(apiUrl, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${session.idToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      spotId,
    }),
  });

  if (!response.ok) {
    throw new Error("スポットの削除に失敗しました");
  }
};
