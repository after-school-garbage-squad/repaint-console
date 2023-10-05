import type { Traffic } from "../types";

export const getTraffucStatus = async (idToken: string, eventId: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/event/${eventId}/traffic/get-status?eventId=${eventId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`,
      },
    },
  );
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  const { traffics } = await response.json();
  return traffics as Traffic[];
};
