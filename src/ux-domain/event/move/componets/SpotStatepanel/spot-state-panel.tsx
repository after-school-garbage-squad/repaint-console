"use client";

import type { FC } from "react";
import { useEffect, useState } from "react";

import { PanelCard } from "../../../components/panel-card";

import type { Spot, Traffic } from "@/domain/event/types";

import { useTrafficStatus } from "@/domain/event/utils/use-traffic-status";
import { Icon } from "@/ux-domain/shared-ui/icon";

type SpotWithTrafficStatus = Spot & Traffic;

type SpotStatePanelProps = {
  spots: Spot[];
  selectEventId: string;
};

export const SpotStatePanel: FC<SpotStatePanelProps> = ({
  selectEventId,
  spots,
}) => {
  const { data } = useTrafficStatus(selectEventId);
  const [spotWithTrafficStatusList, setList] = useState<
    SpotWithTrafficStatus[] | null
  >(null);

  useEffect(() => {
    if (!data) return;
    const newList = spots.map((spot) => {
      const traffic = data.find((traffic) => traffic.spotId === spot.spotId);
      return { ...spot, ...traffic } as SpotWithTrafficStatus;
    });
    setList(newList);
  }, [data, spots]);

  return (
    <PanelCard className={"w-full max-w-7xl"}>
      <div className={"flex flex-wrap gap-4"}>
        <h2 className={"text-lg"}>ビーコンの状態</h2>
        <span className="flex items-center text-xs text-slate-500">
          <Icon
            icon={"ri:checkbox-blank-circle-fill"}
            className={"text-rose-500"}
          />
          はボーナス中を表します。
        </span>
      </div>
      <div className={"mt-2 w-full"}>
        <ul
          className={
            "grid grid-flow-col grid-cols-1 gap-4 md:grid-flow-row md:grid-cols-2"
          }
        >
          {spotWithTrafficStatusList ? (
            spotWithTrafficStatusList.map((spot) => (
              <li
                key={spot.hwId}
                className={
                  "flex w-full flex-col flex-wrap items-center justify-center gap-2 rounded-lg border-2 border-gray px-4 py-2 shadow-lg "
                }
              >
                <div className={"flex items-center gap-2"}>
                  <p>{spot.name}</p>
                  {spot.bonus && (
                    <Icon
                      icon={"ri:checkbox-blank-circle-fill"}
                      className={"h-max w-max text-rose-500"}
                    />
                  )}
                </div>
                <div>
                  <p>直近の周囲の人数： {spot.headCount}人</p>
                </div>
              </li>
            ))
          ) : (
            <p>登録されているビーコンがありません</p>
          )}
        </ul>
      </div>
    </PanelCard>
  );
};
