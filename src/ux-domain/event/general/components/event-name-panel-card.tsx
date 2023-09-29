"use client";

import type { FC } from "react";

import { useAtom } from "jotai";

import { PanelCard } from "../../components/panel-card";

import { Icon } from "@/components/Icon";
import { Dialog } from "@/components/dialog";
import { selectEventAtom } from "@/domain/event/store/atom";

type EventNameEditDialogProps = {
  formDefaultValue: string;
};

const EventNameEditDialog: FC<EventNameEditDialogProps> = ({
  formDefaultValue,
}) => {
  return (
    <Dialog
      trigger={
        <button aria-label="イベントの名前を演習する">
          <Icon height={24} width={24} icon={"ri:edit-2-fill"} />
        </button>
      }
    >
      <div className={"flex flex-col gap-4"}>
        <p className={"text-lg text-deepBlue"}>イベント名を変更する</p>
        <form>
          <label htmlFor="event-name">イベント名</label>
          <input
            defaultValue={formDefaultValue}
            id="event-name"
            type="text"
            className={"mt-2 w-full rounded-lg border-2 border-deepBlue p-2"}
          />
          <button
            className={
              "absolute bottom-4 right-4 rounded-lg bg-deepBlue px-4 py-2 text-white"
            }
            type="submit"
            aria-label="イベント名の変更を確定する"
          >
            変更
          </button>
        </form>
      </div>
    </Dialog>
  );
};

export const EventNamePanelCard = () => {
  const [selectEvent] = useAtom(selectEventAtom);

  if (!selectEvent) return null;

  return (
    <PanelCard title={"イベント名"}>
      <p className={"text-lg text-deepBlue"}>イベント名</p>
      <div className={"flex items-center justify-between gap-2"}>
        <p className={"text-xl"}>{selectEvent.name}</p>
        <EventNameEditDialog formDefaultValue={selectEvent.name} />
      </div>
    </PanelCard>
  );
};
