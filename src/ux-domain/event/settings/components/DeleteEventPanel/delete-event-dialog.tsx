"use client";
import { useState, type FC } from "react";

import { Close } from "@radix-ui/react-dialog";
import { useRouter } from "next/navigation";

import { deleteEvent } from "@/domain/event/api/delete-event";
import { Dialog } from "@/ux-domain/shared-ui/dialog";

type DeleteEventDialogProps = {
  selectEventId: string;
};

export const DeleteEventDialog: FC<DeleteEventDialogProps> = ({
  selectEventId,
}) => {
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const onSubmit = async () => {
    await deleteEvent(selectEventId);

    setIsDialogOpen(false);
    router.push("/dashboard");
  };

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={() => setIsDialogOpen(!isDialogOpen)}
      trigger={
        <button
          className={"mt-2 rounded-lg bg-red px-4 py-2 text-white"}
          aria-label="イベントを削除する"
        >
          イベントを削除する
        </button>
      }
    >
      <div className={"flex flex-col gap-4"}>
        <p className={"flex-1 text-lg text-deepBlue"}>
          イベントを削除しますか？
        </p>
        <div className={"flex h-full flex-auto flex-row items-center gap-4"}>
          <Close asChild>
            <button
              className={"flex-1 rounded-lg bg-deepBlue px-4 py-2 text-white"}
              aria-label="イベントを削除をキャンセルする"
            >
              キャンセル
            </button>
          </Close>
          <button
            onClick={onSubmit}
            className={"flex-1 rounded-lg bg-red px-4 py-2 text-white"}
            aria-label="イベントを削除を確定する"
          >
            削除する
          </button>
        </div>
      </div>
    </Dialog>
  );
};
