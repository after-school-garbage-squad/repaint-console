import type { FC } from "react";
import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Title } from "@radix-ui/react-dialog";
import { useForm } from "react-hook-form";

import type { SubmitHandler } from "react-hook-form";
import type { z } from "zod";

import { inviteOperator } from "@/domain/event/api/invite-operator";
import { inviteOperatorSchema } from "@/domain/event/schema/invite-operator-schema";
import { Dialog } from "@/ux-domain/shared-ui/dialog";

type InviteOperatorProps = {
  selectEventId: string;
};

export const InviteOperatorDialog: FC<InviteOperatorProps> = ({
  selectEventId,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm<z.infer<typeof inviteOperatorSchema>>({
    mode: "onChange",
    resolver: zodResolver(inviteOperatorSchema),
  });

  // TODO:RHFのisLoadingに置き換えたい

  const [isLoading, setisLoading] = useState<boolean>(false);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const onSubmit: SubmitHandler<z.infer<typeof inviteOperatorSchema>> = async (
    data,
  ) => {
    setisLoading(true);
    await inviteOperator(selectEventId, data.email);
    setisLoading(false);
    reset();
    setIsDialogOpen(false);
  };

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={() => setIsDialogOpen(!isDialogOpen)}
      trigger={
        <button className={"rounded-lg bg-deepBlue px-4 py-2 text-white"}>
          招待する
        </button>
      }
    >
      <div className={"flex h-full flex-col gap-7"}>
        <Title className={"text-lg"}>メンバーを招待する</Title>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={"flex h-full flex-col items-center justify-center gap-2"}
        >
          <div className="w-full">
            <label htmlFor="email">招待するメンバーのメールアドレス</label>
            <input
              id="email"
              placeholder="mail@example.com"
              type="email"
              className={"w-full rounded-lg border-2 border-deepBlue p-1"}
              {...register("email")}
            />
            {errors.email && (
              <p className={"text-red"}>{errors.email.message}</p>
            )}
          </div>
          <button
            className={
              "absolute bottom-4 right-4 rounded-lg bg-deepBlue px-4 py-2 text-white disabled:bg-gray"
            }
            disabled={!isDirty || !isValid || isLoading}
            type={"submit"}
            aria-label="指定したメールアドレスに対して招待する"
          >
            招待する
          </button>
        </form>
      </div>
    </Dialog>
  );
};
