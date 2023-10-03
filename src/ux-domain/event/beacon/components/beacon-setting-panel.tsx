"use client";

import type { FC } from "react";

import { useAtom } from "jotai";

import { PanelCard } from "../../components/panel-card";

import type { Beacon } from "@/domain/event/types";

import { Icon } from "@/components/Icon";
import { Dialog } from "@/components/dialog";
import { selectEventAtom } from "@/domain/event/store/atom";

type BeaconSettingDialogProps = {
  beacon: Beacon;
};

export const BeaconSettingDialog: FC<BeaconSettingDialogProps> = ({
  beacon,
}) => {
  return (
    <Dialog
      trigger={
        <button>
          <Icon height={24} width={24} icon={"ri:settings-5-line"} />
        </button>
      }
    >
      <p className={"text-lg text-deepBlue"}>ビーコン詳細</p>
      <div className={"mt-4 grid grid-cols-[max-content_1fr]"}>
        <div className={"contents text-lg"}>
          <p>ビーコン名</p>
          <p className={"px-2"}>{beacon.name}</p>
        </div>
        <div className={"contents text-lg"}>
          <p>ビーコンID</p>
          <p className={"px-2"}>{beacon.hwId}</p>
        </div>
        <div className={"contents text-lg"}>
          <p>スポットID</p>
          <p className={"px-2"}>{beacon.spotId}</p>
        </div>
        <div className={"contents text-lg"}>
          <p>サービスUUID</p>
          <p className={"px-2"}>{beacon.serviceUuid}</p>
        </div>
      </div>
      <button
        className={"mt-4 rounded-lg bg-red px-4 py-2 text-white"}
        aria-label="ビーコンをイベントから削除する"
      >
        削除する
      </button>
    </Dialog>
  );
};

export const BeaconSettingPanel = () => {
  const [selectEvent] = useAtom(selectEventAtom);

  return (
    <PanelCard>
      <p className={"text-lg text-deepBlue"}>登録済みビーコンリスト</p>
      <ul className={"flex flex-col gap-2"}>
        {selectEvent?.spots.map((spot) => (
          <li
            key={spot.hwId}
            className={
              "flex items-center justify-between border-b-2 border-gray py-1"
            }
          >
            <p>{spot.name}</p>
            <BeaconSettingDialog beacon={spot} />
          </li>
        ))}
      </ul>
    </PanelCard>
  );
};
