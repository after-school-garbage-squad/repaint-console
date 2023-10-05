export const getSpotList = async (idToken: string, eventId: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/event/${eventId}/spot/list`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    },
  );

  if (!response.ok) {
    throw new Error("スポットの取得に失敗しました");
  }

  return response.json();
};
