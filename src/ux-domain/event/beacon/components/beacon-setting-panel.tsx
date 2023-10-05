"use client";

import type { FC } from "react";
import { useState } from "react";

import { Title } from "@radix-ui/react-dialog";
import * as Tabs from "@radix-ui/react-tabs";
import { useAtom } from "jotai";
import QRCode from "react-qr-code";

import { PanelCard } from "../../components/panel-card";

import type { Beacon } from "@/domain/event/types";

import { getIdToken } from "@/domain/auth/api/get-id-token";
import { deleteSpot } from "@/domain/event/api/delete-spot";
import { getEventList } from "@/domain/event/api/get-event-list";
import {
  eventListAtom,
  selectEventAtom,
  selectEventIdAtom,
} from "@/domain/event/store/atom";
import { Dialog } from "@/ux-domain/shared-ui/dialog";
import { Icon } from "@/ux-domain/shared-ui/icon";

type SpotEditContentProps = {
  onSubmit: () => void;
  spot: Beacon;
};

type SpotQRContentProps = {
  spot: Beacon;
};

type SpotSettingDialogProps = {
  spot: Beacon;
};

const SpotQRContent: FC<SpotQRContentProps> = ({ spot }) => {
  const [selectEventId] = useAtom(selectEventIdAtom);

  return (
    <div className="flex flex-col">
      <div id="qr-code" className={"grid flex-auto place-items-center p-4"}>
        <QRCode
          value={JSON.stringify({
            eventId: selectEventId,
            spotId: spot.spotId,
          })}
          width={250}
        />
      </div>
      <button className={"rounded-lg bg-deepBlue px-4 py-2 text-white"}>
        保存する
      </button>
    </div>
  );
};

const SpotEditContent: FC<SpotEditContentProps> = ({ spot, onSubmit }) => {
  return (
    <>
      <div className={"mt-4 flex flex-col gap-2"}>
        <div>
          <p className="w-max border-b-2 border-gray px-2 text-sm text-zinc-700">
            ビーコン名
          </p>
          <p className={"mx-2 mt-2"}>{spot.name}</p>
        </div>
        <div>
          <p className="w-max border-b-2 border-gray px-2 text-sm text-zinc-700">
            ビーコンHWID
          </p>
          <p className={"mx-2 mt-2"}>{spot.hwId}</p>
        </div>
        <div>
          <p className="w-max border-b-2 border-gray px-2 text-sm text-zinc-700">
            スポットID
          </p>
          <p className={"mx-2 mt-2"}>{spot.spotId}</p>
        </div>
        <div>
          <p className="w-max border-b-2 border-gray px-2 text-sm text-zinc-700">
            サービスUUID
          </p>
          <p className={"mx-2 mt-2"}>{spot.serviceUuid}</p>
        </div>
      </div>
      <button
        onClick={onSubmit}
        className={"mt-4 rounded-lg bg-red px-4 py-2 text-white"}
        aria-label="ビーコンをイベントから削除する">
        削除する
      </button>
    </>
  );
};

export const BeaconSettingDialog: FC<SpotSettingDialogProps> = ({ spot }) => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [selectEventId] = useAtom(selectEventIdAtom);
  const setEventList = useAtom(eventListAtom)[1];

  const onSubmit = async () => {
    const idToken = await getIdToken();

    if (!selectEventId) return;
    await deleteSpot(idToken, selectEventId, spot.spotId);
    const newEventList = await getEventList(idToken);

    setEventList(
      newEventList.map((event) => {
        if (event.eventId === selectEventId) {
          return {
            ...event,
          };
        }
        return event;
      })
    );

    setIsDialogOpen(false);
  };

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={() => setIsDialogOpen(!isDialogOpen)}
      trigger={
        <button className={"hover:text-deepBlue"}>
          <Icon height={24} width={24} icon={"ri:settings-5-line"} />
        </button>
      }>
      <Title className={"text-lg text-deepBlue"}>ビーコン詳細</Title>
      <Tabs.Root defaultValue="tab1" className="mt-2">
        <Tabs.List className={"flex gap-2"}>
          <Tabs.Trigger
            value="tab1"
            className="flex-1 rounded-lg border-2 border-gray p-1 data-[state=active]:border-deepBlue">
            ビーコン詳細
          </Tabs.Trigger>
          <Tabs.Trigger
            value="tab2"
            className="flex-1 rounded-lg border-2 border-gray p-1 data-[state=active]:border-deepBlue">
            ビーコンQRコード
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="tab1">
          <SpotEditContent spot={spot} onSubmit={onSubmit} />
        </Tabs.Content>

        <Tabs.Content value="tab2">
          <SpotQRContent spot={spot} />
        </Tabs.Content>
      </Tabs.Root>
    </Dialog>
  );
};

export const BeaconSettingPanel = () => {
  const [selectEvent] = useAtom(selectEventAtom);

  return (
    <PanelCard>
      <p className={"text-lg text-deepBlue"}>登録済みスポットリスト</p>
      <ul className={"flex flex-col gap-2"}>
        {selectEvent?.spots ? (
          selectEvent?.spots.map((spot) => (
            <li
              key={spot.hwId}
              className={
                "flex items-center justify-between border-b-2 border-gray py-1"
              }>
              <p>{spot.name}</p>
              <BeaconSettingDialog spot={spot} />
            </li>
          ))
        ) : (
          <p>登録されているビーコンはありません</p>
        )}
      </ul>
    </PanelCard>
  );
};
