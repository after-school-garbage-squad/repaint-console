import { z } from "zod";

export const editSpotSchema = z.object({
  name: z
    .string({ required_error: "必須項目です。" })
    .min(1, { message: "1文字以上で入力してください。" })
    .max(32, { message: "32文字以下で入力してください。" }),
});
