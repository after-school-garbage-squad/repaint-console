"use client";

import { useEffect } from "react";

import { useAtom } from "jotai";

import { PanelCard } from "../../components/panel-card";

import { Icon } from "@/components/Icon";
import { selectEventAtom } from "@/domain/event/store/atom";

export const BeaconSettingPanel = () => {
  const [selectEvent] = useAtom(selectEventAtom);

  useEffect(() => {
    console.log(selectEvent);
  }, [selectEvent]);
  return (
    <PanelCard>
      <p className={"text-lg text-deepBlue"}>登録済みビーコンリスト</p>
      <ul>
        {selectEvent?.beacons.map((beacon) => (
          <li
            key={beacon.HWID}
            className={
              "flex items-center justify-between border-b-2 border-gray py-1"
            }
          >
            <p>{beacon.HWID}</p>
            <Icon height={24} width={24} icon={"ri:settings-5-line"} />
          </li>
        ))}
      </ul>
    </PanelCard>
  );
};
