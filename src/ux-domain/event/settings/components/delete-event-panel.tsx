"use client";

import { useState } from "react";

import { Close } from "@radix-ui/react-dialog";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";

import { PanelCard } from "../../components/panel-card";

import { getIdToken } from "@/domain/auth/api/get-id-token";
import { deleteEvent } from "@/domain/event/api/delete-event";
import { selectEventIdAtom } from "@/domain/event/store/atom";
import { Dialog } from "@/ux-domain/shared-ui/dialog";

export const DeleteEventDialog = () => {
  const router = useRouter();

  const [selectEventId] = useAtom(selectEventIdAtom);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const onSubmit = async () => {
    try {
      const idToken = await getIdToken();
      await deleteEvent(idToken, selectEventId);

      setIsDialogOpen(false);
      router.push("/dashboard");
    } catch (error) {
      console.error(error);
    }
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

export const DeleteEventPanel = () => {
  return (
    <PanelCard className={"flex items-center justify-between"}>
      <p className={"text-lg text-deepBlue"}>イベント削除</p>
      <DeleteEventDialog />
    </PanelCard>
  );
};
