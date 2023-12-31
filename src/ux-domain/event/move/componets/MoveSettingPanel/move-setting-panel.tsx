"use client";

import type { FC } from "react";
import { useState } from "react";

import { useAtom } from "jotai";
import Select from "react-select";

import { PanelCard } from "../../../components/panel-card";

import type { Spot } from "@/domain/event/types";

import { enableBonus } from "@/domain/event/api/enable-bonus";
import { useEventList } from "@/domain/event/utils/use-event-list";
import { alertDialogStateAtom } from "@/ux-domain/shared-ui/ErrorAlertDialog/atom";

type MoveSettingPanelProps = {
  selectEventId: string;
  spots: Spot[];
};

export const MoveSettingPanel: FC<MoveSettingPanelProps> = ({
  selectEventId,
  spots,
}) => {
  const [moveFrom, setMoveFrom] = useState<string | null>("");
  const [moveTo, setMoveTo] = useState<string | null>("");
  const setDialogState = useAtom(alertDialogStateAtom)[1];
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { mutate } = useEventList();

  const onSubmit = async () => {
    if (!moveFrom || !moveTo) return;
    setIsSubmitting(true);
    try {
      await enableBonus(selectEventId, moveTo, moveFrom);
    } catch (error) {
      if (error instanceof Error) {
        setDialogState({ isOpen: true, error });
        setIsSubmitting(false);
        return;
      }
    }
    mutate();
    setIsSubmitting(false);
  };

  return (
    <PanelCard className="w-full max-w-7xl">
      <h2 className={"text-lg"}>回遊施策</h2>
      <form onSubmit={onSubmit}>
        <div className={"flex flex-col justify-center gap-8 md:flex-row"}>
          <div className={"flex w-full flex-1 flex-col gap-1"}>
            <label
              htmlFor="move-from"
              className="w-max border-b-2 border-blue px-2"
            >
              移動元
            </label>
            <Select
              onChange={(e) => {
                if (!e) {
                  setMoveFrom(null);
                  return;
                }
                setMoveFrom(e!.value);
              }}
              id="move-from"
              isClearable
              options={
                spots &&
                spots
                  .filter((spot) => spot.spotId !== moveTo)
                  .map((spot) => {
                    return { value: spot.spotId, label: spot.name };
                  })
              }
            />
          </div>
          <div className={"flex w-full flex-1 flex-col gap-1"}>
            <label
              htmlFor="move-to"
              className="w-max border-b-2 border-blue  px-2"
            >
              移動先
            </label>
            <Select
              onChange={(e) => {
                if (!e) {
                  setMoveTo(null);
                  return;
                }
                setMoveTo(e!.value);
              }}
              isClearable
              id="move-to"
              options={
                spots &&
                spots
                  .filter((spot) => spot.spotId !== moveFrom)
                  .map((spot) => {
                    return { value: spot.spotId, label: spot.name };
                  })
              }
            />
          </div>
        </div>
        <button
          type={"button"}
          disabled={!moveFrom || !moveTo || isSubmitting}
          onClick={onSubmit}
          className={
            "mx-auto mt-4 block rounded-lg bg-deepBlue px-4 py-2 text-white disabled:bg-gray"
          }
        >
          決定する
        </button>
      </form>
    </PanelCard>
  );
};
