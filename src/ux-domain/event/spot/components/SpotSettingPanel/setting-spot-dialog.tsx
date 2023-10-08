"use client";

import type { FC } from "react";
import { useState } from "react";

import { Icon } from "@iconify/react/dist/iconify.js";
import { Title } from "@radix-ui/react-dialog";
import * as Tabs from "@radix-ui/react-tabs";

import { EditSpotTab } from "./edit-spots-tab";
import { SpotQRContent } from "./spot-qr-tab";

import type { Spot } from "@/domain/event/types";

import { Dialog } from "@/ux-domain/shared-ui/dialog";

type SpotSettingDialogProps = {
  spot: Spot;
  selectEventId: string;
};

export const BeaconSettingDialog: FC<SpotSettingDialogProps> = ({
  spot,
  selectEventId,
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={() => setIsDialogOpen(!isDialogOpen)}
      trigger={
        <button className={"hover:text-deepBlue"}>
          <Icon height={24} width={24} icon={"ri:settings-5-line"} />
        </button>
      }
    >
      <Title className={"text-lg text-deepBlue"}>ビーコン詳細</Title>
      <Tabs.Root defaultValue="tab1" className="mt-2">
        <Tabs.List className={"flex gap-2"}>
          <Tabs.Trigger
            value="tab1"
            className="flex-1 rounded-lg border-2 border-deepBlue p-1 data-[state=active]:bg-deepBlue data-[state=active]:text-white"
          >
            ビーコン詳細
          </Tabs.Trigger>
          <Tabs.Trigger
            value="tab2"
            className="flex-1 rounded-lg border-2 border-deepBlue p-1 data-[state=active]:bg-deepBlue data-[state=active]:text-white"
          >
            ビーコンQRコード
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="tab1">
          <EditSpotTab
            spot={spot}
            setIsDialogOpen={setIsDialogOpen}
            selectEventId={selectEventId}
          />
        </Tabs.Content>
        <Tabs.Content value="tab2">
          <SpotQRContent spot={spot} selectEventId={selectEventId} />
        </Tabs.Content>
      </Tabs.Root>
    </Dialog>
  );
};
