"use client";

import { useAtom } from "jotai";

import { PanelCard } from "../../components/panel-card";

import { Icon } from "@/components/Icon";
import { selectEventAtom } from "@/domain/event/store/atom";

export const BeaconSettingPanel = () => {
  const [selectEvent] = useAtom(selectEventAtom);

  return (
    <PanelCard>
      <p className={"text-lg text-deepBlue"}>登録済みビーコンリスト</p>
      <ul>
        {selectEvent?.spots.map((spot) => (
          <li
            key={spot.hwId}
            className={
              "flex items-center justify-between border-b-2 border-gray py-1"
            }
          >
            <p>{spot.name}</p>
            <Icon height={24} width={24} icon={"ri:settings-5-line"} />
          </li>
        ))}
      </ul>
    </PanelCard>
  );
};
