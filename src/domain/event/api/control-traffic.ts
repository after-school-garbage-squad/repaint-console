export const controlTrafic = async (
  idToken: string,
  eventId: string,
  to: string,
  from?: string
) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/admin/event/${eventId}/traffic/control`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${idToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ from, to }),
      }
    );
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("データが見つかりませんでした");
      } else if (response.status === 500) {
        throw new Error("サーバーエラーが発生しました");
      } else {
        throw new Error(`HTTPエラー! ステータスコード: ${response.status}`);
      }
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new TypeError(error.message);
    }
  }
};
