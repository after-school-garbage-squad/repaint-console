export const addOperator = async (idToken: string, inviteToken: string) => {
  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/add-operator`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${idToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: inviteToken,
    }),
  });
};
