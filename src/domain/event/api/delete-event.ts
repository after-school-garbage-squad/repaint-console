export const deleteEvent = async (idToken: string, eventId: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/event/${eventId}/delete`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    },
  );

  if (!response.ok) {
    throw new Error("イベントの削除に失敗しました");
  }
};
