export const getImageUrl = async (
  imageId: string,
  eventId: string,
  idToken: string
): Promise<string> => {
  const url = new URL(
    `/admin/event/${eventId}/image/proxy?eventImageId=${imageId}`,
    process.env.NEXT_PUBLIC_API_URL
  );

  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${idToken}`,
    },
    method: "GET",
  });

  const { imageUrl } = await response.json();

  return imageUrl;
};
