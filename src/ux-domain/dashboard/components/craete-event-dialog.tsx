import { forwardRef, type ComponentProps } from "react";

import { useForm } from "react-hook-form";

import type { Event } from "@/domain/event/types";

import { Dialog } from "@/components/dialog";

type EventCreateFormInputProps = {
  label: string;
} & ComponentProps<"input">;

const EventCreateFormInput = forwardRef<
  HTMLInputElement,
  EventCreateFormInputProps
>(({ label, ...rest }, ref) => {
  return (
    <fieldset className={"contents"}>
      <label htmlFor="event-name">{label}</label>
      <input
        ref={ref}
        id="event-name"
        className={"rounded-lg border-2 border-deepBlue p-2 outline-none"}
        {...rest}
      />
    </fieldset>
  );
});

export const EventCreateDialog = () => {
  const {
    register,
    handleSubmit,
    formState: { isDirty, isValid },
  } = useForm<Omit<Event, "eventId" | "spots" | "image_id">>({
    mode: "onChange",
  });

  const onSubmit = (data: Omit<Event, "eventId" | "spots" | "image_id">) => {
    console.log(data);
  };

  return (
    <Dialog
      trigger={
        <button className={"rounded-lg bg-deepBlue px-4 py-2 text-white"}>
          イベント作成
        </button>
      }
    >
      <h1 className={"text-lg text-deepBlue"}>イベントを作成する</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div
          className={
            "mt-4 grid grid-cols-[max-content,1fr] items-center gap-2 "
          }
        >
          <EventCreateFormInput
            label="イベント名"
            type="text"
            placeholder="イベント名を入力"
            {...register("name", { required: true })}
          />
          <EventCreateFormInput
            type="text"
            label="ホームページのURL"
            placeholder="http://..."
            {...register("hpUrl", { required: true })}
          />
          <EventCreateFormInput
            label="責任者の名前"
            type="text"
            placeholder="repaintたろう"
            {...register("contact.name", { required: true })}
          />
          <EventCreateFormInput
            type="email"
            label="責任者のメールアドレス"
            placeholder="xxx@example.com"
            {...register("contact.email", { required: true })}
          />
          <EventCreateFormInput
            type="text"
            label="責任者の電話番号"
            placeholder="電話番号を半角で入力してください"
            {...register("contact.phone", { required: true })}
          />
        </div>
        <div className={"my-4 flex justify-end"}>
          <button
            disabled={!isDirty || !isValid}
            className={
              "rounded-lg bg-deepBlue px-4 py-2 text-white disabled:bg-gray"
            }
            type={"submit"}
          >
            作成する
          </button>
        </div>
      </form>
    </Dialog>
  );
};
