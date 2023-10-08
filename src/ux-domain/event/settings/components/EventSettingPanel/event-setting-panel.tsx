"use client";

import type { FC } from "react";
import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { PanelCard } from "../../../components/panel-card";

import { EventEditFormInput } from "./event-setting-form-input";

import type { Event } from "@/domain/event/types";
import type { SubmitHandler } from "react-hook-form";
import type { z } from "zod";

import { editEventStatus } from "@/domain/event/api/edit-event-status";
import { EventFormSchema } from "@/domain/event/schema/event-form-schema";
import { useEventList } from "@/domain/event/utils/use-event-list";

export type EventSettingPanelProps = {
  selectEvent: Event;
};

export const EventSettingPanel: FC<EventSettingPanelProps> = ({
  selectEvent,
}) => {
  const { mutate } = useEventList();

  const [isEditable, setEditable] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<z.infer<typeof EventFormSchema>>({
    mode: "onChange",
    resolver: zodResolver(EventFormSchema),
  });

  const toggleEditMode = () => {
    if (selectEvent) {
      setValue("name", selectEvent.name);
      setValue("hpUrl", selectEvent.hpUrl);
      setValue("contact.name", selectEvent.contact.name);
      setValue("contact.email", selectEvent.contact.email);
      setValue("contact.phone", selectEvent.contact.phone);
    }
    setEditable(!isEditable);
  };

  const onSubmit: SubmitHandler<z.infer<typeof EventFormSchema>> = async (
    data,
  ) => {
    setEditable(false);
    if (!selectEvent) return;

    const prevData: z.infer<typeof EventFormSchema> = {
      name: selectEvent?.name,
      hpUrl: selectEvent?.hpUrl,
      contact: {
        name: selectEvent?.contact.name,
        email: selectEvent?.contact.email,
        phone: selectEvent?.contact.phone,
      },
    };
    if (JSON.stringify(prevData) === JSON.stringify(data)) return;

    await editEventStatus(selectEvent, data.name, data.hpUrl, data.contact);

    mutate();
  };

  return (
    <PanelCard>
      <div className={"flex items-center justify-between"}>
        <h2 className={"text-lg"}>その他設定</h2>
        <button
          onClick={toggleEditMode}
          disabled={isEditable}
          className={
            "rounded-lg bg-deepBlue px-4 py-2 text-white disabled:bg-gray"
          }
          aria-label="イベント情報を編集する"
        >
          編集する
        </button>
      </div>
      <form
        className={"mt-2 flex flex-col gap-2"}
        onSubmit={handleSubmit(onSubmit)}
      >
        <EventEditFormInput
          label={"イベント名"}
          disabled={!isEditable}
          error={errors.name?.message}
          defaultValue={selectEvent?.name}
          {...register("name")}
        />
        <EventEditFormInput
          label={"イベントHP"}
          disabled={!isEditable}
          defaultValue={selectEvent?.hpUrl}
          error={errors.hpUrl?.message}
          {...register("hpUrl")}
        />
        <EventEditFormInput
          label={"責任者の名前"}
          disabled={!isEditable}
          defaultValue={selectEvent?.contact.name}
          error={errors.contact?.name?.message}
          {...register("contact.name")}
        />
        <EventEditFormInput
          label={"責任者のメールアドレス"}
          disabled={!isEditable}
          defaultValue={selectEvent?.contact.email}
          error={errors.contact?.email?.message}
          {...register("contact.email")}
        />
        <EventEditFormInput
          label={"責任者の電話番号"}
          disabled={!isEditable}
          defaultValue={selectEvent?.contact.phone}
          error={errors.contact?.phone?.message}
          {...register("contact.phone")}
        />
        {isEditable && (
          <div className={"mt-2 flex gap-2"}>
            <button
              onClick={toggleEditMode}
              className={
                "flex-1 rounded-lg px-4 py-2 outline outline-2 outline-green "
              }
            >
              キャンセル
            </button>
            <button
              type="submit"
              className={"flex-1 rounded-lg bg-deepBlue px-4 py-2 text-white "}
              aria-label="イベント情報の変更を確定する"
            >
              変更する
            </button>
          </div>
        )}
      </form>
    </PanelCard>
  );
};
