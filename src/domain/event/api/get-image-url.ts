export const getImageUrl = async (
  idToken: string,
  eventId: string,
  imageId: string,
): Promise<string> => {
  const url = new URL(
    `/admin/event/${eventId}/image/proxy?eventImageId=${imageId}`,
    process.env.NEXT_PUBLIC_API_URL
  );

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
    method: "GET",
  });

  const { imageUrl } = await response.json();

  return imageUrl;
};
