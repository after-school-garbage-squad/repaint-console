import { z } from "zod";

export const uploadImageSchema = z.object({
  imageFile: z
    .custom<FileList>()
    .transform((files) => files[0])
    .refine((file) => file.size < 32_000_000, {
      message: "画像サイズは32MB以下にしてください",
    }),
});
