import type { Event } from "../types";

export const getEvent = async (idToken: string): Promise<Event[]> => {
  // 例外処理を含んだfetch APIを使ってイベントを取得する
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/event/list`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    },
  );

  if (!response.ok) {
    throw new Error("イベントの取得に失敗しました");
  }

  return response.json();
};
