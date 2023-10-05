"use client";

import { useEffect, useState } from "react";

import { useAtom } from "jotai";

import { PanelCard } from "../../components/panel-card";

import type { Beacon, Event, Traffic } from "@/domain/event/types";

import { getIdToken } from "@/domain/auth/api/get-id-token";
import { getTraffucStatus } from "@/domain/event/api/get-traffic-status";
import { selectEventAtom } from "@/domain/event/store/atom";
import { Icon } from "@/ux-domain/shared-ui/icon";

type SpotWithTrafficStatus = Beacon & Traffic;

export const BeaconStatePanel = () => {
  const [selectEvent] = useAtom(selectEventAtom);
  const [spotWithtrafficStatusList, setSpotList] = useState<
    SpotWithTrafficStatus[]
  >([]);

  const setTrafficList = async (idToken: string, selectEvent: Event) => {
    const trafficList = await getTraffucStatus(idToken, selectEvent.eventId);
    if (!trafficList) return;

    const filteredList = trafficList
      .map((traffic) => {
        const spot = selectEvent.spots.find(
          (spot) => spot.spotId === traffic.spotId
        );
        if (!spot) return;
        return { ...spot, ...traffic } as SpotWithTrafficStatus;
      })
      .filter((spot): spot is SpotWithTrafficStatus => spot !== undefined);

    setSpotList(filteredList);
  };

  useEffect(() => {
    if (!selectEvent) return;

    let poring: NodeJS.Timeout;
    (async () => {
      const idToken = await getIdToken();

      await setTrafficList(idToken, selectEvent);

      poring = setInterval(
        async () => await setTrafficList(idToken, selectEvent),
        3000
      );
    })();

    return () => clearInterval(poring);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        <ul className={"flex flex-col gap-4 md:flex-row"}>
          {spotWithtrafficStatusList ? (
            spotWithtrafficStatusList.map((spot) => (
              <li
                key={spot.hwId}
                className={
                  "flex w-full items-center justify-center gap-2 border-b-2 border-gray px-4 py-2 md:w-max"
                }
              >
                <p>{spot.headCount}</p>
                <p>{spot.name}</p>
                {spot.bonus && (
                  <Icon
                    icon={"ri:checkbox-blank-circle-fill"}
                    className={"h-max w-max text-rose-500"}
                  />
                )}
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
