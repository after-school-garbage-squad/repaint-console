"use client";

import type { FC } from "react";

import * as RadixDialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";

export type DialogProps = {
  trigger: React.ReactNode;
  children: React.ReactNode;
  onOpenChange?: () => void;
  open?: boolean;
};

export const Dialog: FC<DialogProps> = ({
  trigger,
  children,
  onOpenChange,
  open,
}) => {
  return (
    <RadixDialog.Root onOpenChange={onOpenChange} open={open}>
      <RadixDialog.Trigger asChild>{trigger}</RadixDialog.Trigger>
      <RadixDialog.Overlay className="fixed inset-0 z-40 bg-black opacity-30" />
      <RadixDialog.Content className="fixed left-1/2 top-1/2 z-50 min-h-[384px] w-[90%] max-w-sm  -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white px-4 pt-8 shadow-lg md:w-full md:max-w-2xl">
        <RadixDialog.Close className={"absolute right-4 top-4"}>
          <Cross2Icon />
        </RadixDialog.Close>
        {children}
      </RadixDialog.Content>
    </RadixDialog.Root>
  );
};
