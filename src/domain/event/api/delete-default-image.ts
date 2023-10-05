export const deleteDefaultImage = async (
  idToken: string,
  eventId: string,
  imageId: string,
) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/event/${eventId}/image/delete-default`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`,
      },
      body: JSON.stringify({
        imageId,
      }),
    },
  );
  if (!response.ok) {
    throw new Error(response.statusText);
  }
};
