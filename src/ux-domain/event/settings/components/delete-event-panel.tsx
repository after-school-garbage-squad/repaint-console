"use client";

import { Close } from "@radix-ui/react-dialog";
import { useAtom } from "jotai";

import { PanelCard } from "../../components/panel-card";

import { Dialog } from "@/components/dialog";
import { selectEventIDAtom } from "@/domain/event/store/atom";

export const DeleteEventDialog = () => {
  const [selectEventID] = useAtom(selectEventIDAtom);
  return (
    <Dialog
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
            onSubmit={() => {
              console.log(selectEventID);
            }}
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
    <PanelCard>
      <p className={"text-lg text-deepBlue"}>イベント削除</p>
      <DeleteEventDialog />
    </PanelCard>
  );
};
