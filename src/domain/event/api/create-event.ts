import type { Event } from "../types";

export type CreateEventProps = {
  name: string;
  hpUrl: string;
  contact: {
    name: string;
    email: string;
    phone: string;
  };
  idToken: string;
};

export const createEvent = async ({
  name,
  hpUrl,
  contact,
  idToken,
}: CreateEventProps): Promise<Event> => {
  // fetch APIを使ってイベントを作成する
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/event/create`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${idToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        hpUrl,
        contact,
      }),
    },
  );

  return response.json();
};
