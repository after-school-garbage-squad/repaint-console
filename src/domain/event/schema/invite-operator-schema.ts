import { z } from "zod";
export const inviteOperatorSchema = z.object({
  email: z.string({ required_error: "必須項目です。" }).email({
    message: "メールアドレスの形式で入力してください。",
  }),
});
