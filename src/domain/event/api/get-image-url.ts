export const getImageUrl = async (
  idToken: string,
  eventId: string,
  imageId: string
): Promise<string> => {
  const reqUrl = new URL(
    `/admin/event/${eventId}/image/proxy?eventImageId=${imageId}`,
    process.env.NEXT_PUBLIC_API_URL
  );

  const response = await fetch(reqUrl, {
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
    method: "GET",
  });

  const { url } = await response.json();

  return url;
};
