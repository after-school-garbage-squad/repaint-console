export const inviteOperator = async (
  idToken: string,
  eventId: string,
  email: string
) => {
  const api_url = new URL(`/admin/send-email`, process.env.NEXT_PUBLIC_API_URL);
  await fetch(api_url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${idToken}`,
    },
    body: JSON.stringify({ eventId, email }),
  });
};
