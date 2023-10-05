"use client";

import type { FC } from "react";

import * as RadixDialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";

import { sessionDialogAtom } from "./atom";

export const SessionAlertDialog: FC<RadixDialog.DialogProps> = () => {
  const router = useRouter();

  const [open, setDialogState] = useAtom(sessionDialogAtom);
  return (
    <RadixDialog.Root open={open}>
      <RadixDialog.Overlay className="fixed inset-0 z-40 bg-black opacity-30" />
      <RadixDialog.Content className="fixed left-1/2 top-1/2 z-50 min-h-[384px] w-[90%] max-w-sm  -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white px-4 pt-8 shadow-lg md:w-full md:max-w-2xl">
        <RadixDialog.Close
          onClick={() => setDialogState(!open)}
          className={"absolute right-4 top-4"}>
          <Cross2Icon width={24} height={24} />
        </RadixDialog.Close>
        <RadixDialog.Title className={"text-lg text-deepBlue"}>
          再ログインしてください。
        </RadixDialog.Title>
        <p>セッションが切れました。再度ログインしてください。</p>
        <button
          onClick={() => {
            router.push("/login");
          }}>
          ログイン画面に飛ぶ
        </button>
      </RadixDialog.Content>
    </RadixDialog.Root>
  );
};
