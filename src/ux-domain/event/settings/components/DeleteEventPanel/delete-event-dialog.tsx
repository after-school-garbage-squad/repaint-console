"use client";
import { useState, type FC } from "react";

import { Action, Cancel, Title } from "@radix-ui/react-alert-dialog";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";

import { deleteEvent } from "@/domain/event/api/delete-event";
import { AlertDialog } from "@/ux-domain/shared-ui/AlertDialog/alert-dialog";
import { alertDialogStateAtom } from "@/ux-domain/shared-ui/ErrorAlertDialog/atom";

type DeleteEventDialogProps = {
  selectEventId: string;
};

export const DeleteEventDialog: FC<DeleteEventDialogProps> = ({
  selectEventId,
}) => {
  const setDialogState = useAtom(alertDialogStateAtom)[1];
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const onSubmit = async () => {
    setIsSubmitting(true);
    try {
      await deleteEvent(selectEventId);
    } catch (error) {
      if (error instanceof Error) {
        setDialogState({ isOpen: true, error });
      }
      setIsDialogOpen(false);
      setIsSubmitting(false);
      return;
    }

    setIsDialogOpen(false);
    setIsSubmitting(false);
    router.push("/dashboard");
  };

  return (
    <AlertDialog
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
        <Title className={"flex-1 text-lg"}>イベントを削除しますか？</Title>
        <div
          className={"flex flex-auto flex-row items-center justify-end gap-4"}
        >
          <Cancel asChild>
            <button
              disabled={isSubmitting}
              className={"rounded-lg border-2 px-4 py-2 text-deepBlue"}
              aria-label="イベントを削除をキャンセルする"
            >
              キャンセル
            </button>
          </Cancel>
          <Action asChild>
            <button
              onClick={(e) => {
                e.preventDefault();
                onSubmit();
              }}
              disabled={isSubmitting}
              className={"rounded-lg bg-red px-4 py-2 text-white"}
              aria-label="イベントを削除を確定する"
            >
              削除する
            </button>
          </Action>
        </div>
      </div>
    </AlertDialog>
  );
};
