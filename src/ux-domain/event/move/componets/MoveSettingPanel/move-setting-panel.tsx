"use client";

import type { FC } from "react";
import { useState } from "react";

import Select from "react-select";

import { PanelCard } from "../../../components/panel-card";

import type { Spot } from "@/domain/event/types";

import { controlTrafic } from "@/domain/event/api/control-traffic";

type MoveSettingPanelProps = {
  selectEventId: string;
  spots: Spot[];
};

export const MoveSettingPanel: FC<MoveSettingPanelProps> = ({
  selectEventId,
  spots,
}) => {
  const [moveFrom, setMoveFrom] = useState<string>("");
  const [moveTo, setMoveTo] = useState<string>("");

  const onSubmit = async () => {
    await controlTrafic(selectEventId, moveTo, moveFrom);
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
                setMoveFrom(e!.value);
              }}
              id="move-from"
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
                setMoveTo(e!.value);
              }}
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
          disabled={!moveFrom || !moveTo}
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
