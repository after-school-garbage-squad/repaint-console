import { forwardRef, useState, type ComponentProps } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Close } from "@radix-ui/react-dialog";
import { useAtom } from "jotai";
import { useForm } from "react-hook-form";

import type { SubmitHandler } from "react-hook-form";
import type { z } from "zod";

import { Dialog } from "@/components/dialog";
import { getIdToken } from "@/domain/auth/api/get-id-token";
import { createEvent } from "@/domain/event/api/create-event";
import { EventFormSchema } from "@/domain/event/schema/event-form-schema";
import { eventListAtom } from "@/domain/event/store/atom";

type EventCreateFormInputProps = {
  label: string;
  error?: string;
} & ComponentProps<"input">;

const EventCreateFormInput = forwardRef<
  HTMLInputElement,
  EventCreateFormInputProps
>(({ label, error, ...rest }, ref) => {
  return (
    <>
      <fieldset
        className={
          "grid grid-flow-col grid-rows-[1fr_1fr] items-center md:grid-flow-row md:grid-cols-[180px_1fr] md:grid-rows-[1fr]"
        }>
        <label htmlFor="event-name">{label}</label>
        <input
          ref={ref}
          id="event-name"
          className={
            "w-full rounded-lg border-2 border-deepBlue p-2 outline-none"
          }
          {...rest}
        />
      </fieldset>
      {error && <p className={"text-red"}>{error}</p>}
    </>
  );
});

export const EventCreateDialog = () => {
  const [eventList, setEventList] = useAtom(eventListAtom);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const {
    register,
    reset,
    handleSubmit,
    formState: { isDirty, isValid, errors },
  } = useForm<z.infer<typeof EventFormSchema>>({
    mode: "onChange",
    resolver: zodResolver(EventFormSchema),
  });

  const onSubmit: SubmitHandler<z.infer<typeof EventFormSchema>> = async (
    data
  ) => {
    const idToken = await getIdToken();
    if (!idToken) return;
    const eventaData = await createEvent({
      ...data,
      idToken,
    });

    setEventList([...eventList, eventaData]);

    reset();
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
      }>
      <h1 className={"text-lg text-deepBlue"}>イベントを作成する</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={"mt-4 flex flex-col gap-4"}>
          <EventCreateFormInput
            label="イベント名"
            type="text"
            error={errors.name?.message}
            placeholder="イベント名を入力"
            {...register("name", { required: true })}
          />
          <EventCreateFormInput
            type="text"
            label="ホームページのURL"
            error={errors.hpUrl?.message}
            placeholder="http://..."
            {...register("hpUrl", { required: true })}
          />
          <EventCreateFormInput
            label="責任者の名前"
            type="text"
            error={errors.contact?.name?.message}
            placeholder="repaintたろう"
            {...register("contact.name", { required: true })}
          />
          <EventCreateFormInput
            type="email"
            label="責任者のメールアドレス"
            error={errors.contact?.email?.message}
            placeholder="xxx@example.com"
            {...register("contact.email", { required: true })}
          />
          <EventCreateFormInput
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
              disabled={!isDirty || !isValid}
              className={
                "rounded-lg bg-deepBlue px-4 py-2 text-white disabled:bg-gray"
              }>
              作成する
            </button>
          </Close>
        </div>
      </form>
    </Dialog>
  );
};
