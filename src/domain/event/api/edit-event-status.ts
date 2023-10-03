import type { Contact, Event } from "../types";

export const editEventStatus = async (
  idToken: string,
  event: Event,
  name: string,
  hpUrl: string,
  contact: Contact
) => {
  // fetch APIを使ってイベント名を更新する
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/event/${event.eventId}/update`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${idToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...event,
        name,
        hpUrl,
        contact,
      }),
    }
  );

  return response.json();
};
