"use client";

import * as Dialog from "@radix-ui/react-alert-dialog";
import { useAtom } from "jotai";

import { alertDialogStateAtom } from "./atom";

export const ErrorAlertDialog = () => {
  const [state, setState] = useAtom(alertDialogStateAtom);

  return (
    <Dialog.Root open={state?.isOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-black opacity-30" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 max-h-[320px] w-[90%] max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white px-4 pb-4 pt-8 shadow-lg md:w-full md:max-w-2xl">
          <Dialog.Title className="text-lg font-bold text-red">
            {state?.error instanceof TypeError
              ? "通信エラーが発生しました"
              : "ログインセッションが切れました"}
          </Dialog.Title>
          <Dialog.Description className="mt-2 text-base">
            {state?.error && <p>{state.error.message}</p>}
          </Dialog.Description>
          <div className={"flex justify-end"}>
            <Dialog.Action asChild>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setState({ isOpen: !state?.isOpen, error: state!.error });
                }}
                className="rounded-lg bg-deepBlue px-4 py-2 text-white"
              >
                Close
              </button>
            </Dialog.Action>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
