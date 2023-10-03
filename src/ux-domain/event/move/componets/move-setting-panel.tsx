"use client";

import { useState } from "react";

import { useAtom } from "jotai";
import Select from "react-select";

import { PanelCard } from "../../components/panel-card";

import { getIdToken } from "@/domain/auth/api/get-id-token";
import { controlTrafic } from "@/domain/event/api/control-traffic";
import { selectEventAtom } from "@/domain/event/store/atom";

export const MoveSettingPanel = () => {
  const [selectEvent] = useAtom(selectEventAtom);
  const [moveFrom, setMoveFrom] = useState<string>("");
  const [moveTo, setMoveTo] = useState<string>("");

  const onSubmit = async () => {
    const idToken = await getIdToken();
    if (!selectEvent) return;
    await controlTrafic(idToken, selectEvent.eventId, moveTo, moveFrom);
  };

  return (
    <PanelCard className="w-full max-w-7xl">
      <h2 className={"text-lg text-deepBlue"}>回遊施策</h2>
      <form onSubmit={onSubmit}>
        <div className={"flex flex-col justify-center gap-8 md:flex-row"}>
          <div className={"flex w-full flex-1 flex-col gap-1"}>
            <label
              htmlFor="move-from"
              className="w-max border-b-2 border-blue px-2">
              移動元
            </label>
            <Select
              onChange={(e) => {
                setMoveFrom(e!.value);
              }}
              id="move-from"
              options={selectEvent?.spots.map((spot) => {
                return { value: spot.spotId, label: spot.name };
              })}
            />
          </div>
          <div className={"flex w-full flex-1 flex-col gap-1"}>
            <label
              htmlFor="move-to"
              className="w-max border-b-2 border-blue  px-2">
              移動先
            </label>
            <Select
              onChange={(e) => {
                setMoveTo(e!.value);
              }}
              id="move-to"
              options={selectEvent?.spots.map((spot) => {
                return { value: spot.spotId, label: spot.name };
              })}
            />
          </div>
        </div>
        <button
          type={"button"}
          onClick={onSubmit}
          className={
            "mx-auto mt-4 block rounded-lg bg-deepBlue px-4 py-2 text-white"
          }>
          決定する
        </button>
      </form>
    </PanelCard>
  );
};
