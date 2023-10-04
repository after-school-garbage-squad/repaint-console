export const controlTrafic = async (
  idToken: string,
  eventId: string,
  to: string,
  from?: string,
) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/event/${eventId}/traffic/control`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${idToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ from, to }),
    },
  );

  if (!response.ok) {
    throw new Error("データの送信に失敗しました");
  }
};
