export const deleteSpot = async (
  idToken: string,
  eventId: string,
  spotId: string
) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/event/${eventId}/spot/delete`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${idToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        spotId,
      }),
    }
  );

  if (!response.ok) {
    throw new Error("スポットの削除に失敗しました");
  }
};
