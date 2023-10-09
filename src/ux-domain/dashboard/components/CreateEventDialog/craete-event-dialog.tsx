"use client";

import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Close } from "@radix-ui/react-dialog";
import { useAtom } from "jotai";
import { useForm } from "react-hook-form";

import { CreateEventFormInput } from "./event-create-form-input";

import type { SubmitHandler } from "react-hook-form";
import type { z } from "zod";

import { createEvent } from "@/domain/event/api/create-event";
import { EventFormSchema } from "@/domain/event/schema/event-form-schema";
import { useEventList } from "@/domain/event/utils/use-event-list";
import { alertDialogStateAtom } from "@/ux-domain/shared-ui/ErrorAlertDialog/atom";
import { Dialog } from "@/ux-domain/shared-ui/dialog";

export const CreateEventDialog = () => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const { mutate } = useEventList();
  const setDialogState = useAtom(alertDialogStateAtom)[1];

  const {
    register,
    reset,
    handleSubmit,
    formState: { isDirty, isValid, errors, isSubmitting },
  } = useForm<z.infer<typeof EventFormSchema>>({
    mode: "onChange",
    resolver: zodResolver(EventFormSchema),
  });

  const onSubmit: SubmitHandler<z.infer<typeof EventFormSchema>> = async (
    data,
  ) => {
    try {
      await createEvent({
        ...data,
      });
    } catch (error) {
      if (error instanceof Error) {
        setDialogState({ isOpen: true, error });
      }
      setIsDialogOpen(false);
      return;
    }

    reset();
    mutate();
    setIsDialogOpen(false);
  };

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={() => setIsDialogOpen(!isDialogOpen)}
      trigger={
        <button className={"rounded-lg bg-deepBlue px-4 py-2 text-white"}>
          イベント作成
        </button>
      }
    >
      <h1 className={"text-lg text-deepBlue"}>イベントを作成する</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={"mt-4 flex flex-col gap-4"}>
          <CreateEventFormInput
            label="イベント名"
            type="text"
            error={errors.name?.message}
            placeholder="イベント名を入力"
            {...register("name", { required: true })}
          />
          <CreateEventFormInput
            type="text"
            label="ホームページのURL"
            error={errors.hpUrl?.message}
            placeholder="http://..."
            {...register("hpUrl", { required: true })}
          />
          <CreateEventFormInput
            label="責任者の名前"
            type="text"
            error={errors.contact?.name?.message}
            placeholder="repaintたろう"
            {...register("contact.name", { required: true })}
          />
          <CreateEventFormInput
            type="email"
            label="責任者のメールアドレス"
            error={errors.contact?.email?.message}
            placeholder="xxx@example.com"
            {...register("contact.email", { required: true })}
          />
          <CreateEventFormInput
            type="text"
            label="責任者の電話番号"
            error={errors.contact?.phone?.message}
            placeholder="電話番号を半角で入力してください"
            {...register("contact.phone", { required: true })}
          />
        </div>
        <div className={"my-4 flex justify-end"}>
          <Close asChild>
            <button
              onClick={(event) => {
                event.preventDefault();
                handleSubmit(onSubmit)(event);
              }}
              type="submit"
              disabled={!isDirty || !isValid || isSubmitting}
              className={
                "rounded-lg bg-deepBlue px-4 py-2 text-white disabled:bg-gray"
              }
            >
              作成する
            </button>
          </Close>
        </div>
      </form>
    </Dialog>
  );
};
