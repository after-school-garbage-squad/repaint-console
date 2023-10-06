import type { Beacon } from "../types";

export const updateSpot = async (
  idToken: string,
  eventId: string,
  spot: Beacon,
  isPick?: boolean,
  name?: string,
) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/event/${eventId}/spot/update`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`,
      },
      body: JSON.stringify({
        ...spot,
        isPick,
        name,
      }),
    },
  );

  if (!response.ok) {
    throw new Error(response.statusText);
  }
};
