export const registerDefaultImage = async (
  idToken: string,
  eventID: string,
  formData: FormData
) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/event/${eventID}/image/register-default`,
    {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${idToken}`,
      },
      body: formData,
    }
  );

  if (!response.ok) {
    throw new Error("デフォルト画像の登録に失敗しました");
  }

  return response.json();
};
