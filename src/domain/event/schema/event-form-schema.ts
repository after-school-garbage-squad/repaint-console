import { z } from "zod";

// TODO: 適切な命名に変更する
export const EventFormSchema = z.object({
  name: z
    .string({
      required_error: "必須項目です",
    })
    .min(1, { message: "1文字以上で入力してください。" })
    .max(50, { message: "50文字以内で入力してください。" }),
  hpUrl: z
    .string({
      required_error: "必須項目です",
    })
    .url({ message: "URLの形式で入力してください。" }),
  contact: z.object({
    name: z
      .string({ required_error: "必須項目です" })
      .min(3, { message: "1文字以上でお願いします。" })
      .max(50, { message: "50文字以内でお願いします。" }),
    email: z.string({ required_error: "必須項目です。" }).email({
      message: "メールアドレスの形式で入力してください。",
    }),
    phone: z
      .string({
        required_error: "必須項目です。",
      })
      .regex(/^\d{10,11}$/, {
        message: "電話番号をハイフンなしでお願いします。",
      })
      .regex(/^[^-]*$/, { message: "ハイフン無しで入力してください" }),
  }),
});
