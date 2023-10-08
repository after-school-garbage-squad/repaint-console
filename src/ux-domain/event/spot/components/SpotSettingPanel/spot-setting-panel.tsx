import type { FC } from "react";

import { PanelCard } from "../../../components/panel-card";

import { BeaconSettingDialog } from "./setting-spot-dialog";

import type { Spot } from "@/domain/event/types";

type SpotSettingPanelProps = {
  spots: Spot[];
  selectEventId: string;
};

export const SpotSettingPanel: FC<SpotSettingPanelProps> = ({
  selectEventId,
  spots,
}) => {
  return (
    <PanelCard>
      <h2 className={"text-lg"}>登録済みスポットリスト</h2>
      <ul className={"mt-4 flex flex-col gap-2"}>
        {spots.length > 0 ? (
          spots.map((spot) => (
            <li
              key={spot.hwId}
              className={
                "flex w-full items-center justify-between gap-4 border-b-2 border-gray px-2 py-1"
              }
            >
              <p className={"max-w-[268px] flex-1 break-words text-center"}>
                {spot.name}
              </p>
              <BeaconSettingDialog spot={spot} selectEventId={selectEventId} />
            </li>
          ))
        ) : (
          <p>登録されているビーコンはありません</p>
        )}
      </ul>
    </PanelCard>
  );
};
