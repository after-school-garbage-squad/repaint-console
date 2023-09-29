"use client";

import { useAtom } from "jotai";

import { PanelCard } from "../../components/panel-card";

import { Icon } from "@/components/Icon";
import { selectEventAtom } from "@/domain/event/store/atom";

export const BeaconStatePanel = () => {
  const [selectEvent] = useAtom(selectEventAtom);
  return (
    <PanelCard className={"w-full max-w-7xl"}>
      <div className={"flex flex-wrap gap-4"}>
        <h2 className={"text-deepBlue"}>ビーコンの状態</h2>
        <span className="flex items-center text-xs text-slate-500">
          <Icon
            icon={"ri:checkbox-blank-circle-fill"}
            className={"text-rose-500"}
          />
          は中を表します。
        </span>
      </div>
      <div className={"mt-2 w-full"}>
        <ul className={"flex flex-col gap-4 md:flex-row"}>
          {selectEvent?.spots.map((spot) => (
            <li
              key={spot.hwId}
              className={
                "flex w-full items-center justify-center gap-2 border-b-2 border-deepBlue px-4 py-2 md:w-max"
              }
            >
              <p>{spot.name}</p>
              {spot.bonus && (
                <Icon
                  icon={"ri:checkbox-blank-circle-fill"}
                  className={"h-max w-max text-rose-500"}
                />
              )}
            </li>
          ))}
        </ul>
      </div>
    </PanelCard>
  );
};
