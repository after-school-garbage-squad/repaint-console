export const getImageUrl = async (
  imageId: string,
  eventId: string,
  idToken: string
): Promise<string> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/event/${eventId}/image/prxoy`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`,
      },
      method: "GET",
      body: JSON.stringify({
        imageId,
      }),
    }
  );

  const { url } = await response.json();

  return url;
};
