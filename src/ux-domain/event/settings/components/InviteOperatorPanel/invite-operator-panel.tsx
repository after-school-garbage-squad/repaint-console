"use client";

import type { FC } from "react";

import { InviteOperatorDialog } from "./invite-operator-dialog";

import { PanelCard } from "@/ux-domain/event/components/panel-card";

type InviteOperatorPanelProps = {
  selectEventId: string;
};

export const InviteOperaotPanel: FC<InviteOperatorPanelProps> = ({
  selectEventId,
}) => {
  return (
    <PanelCard className={"flex items-center justify-between"}>
      <h2 className={"text-lg"}>メンバー招待</h2>
      <InviteOperatorDialog selectEventId={selectEventId} />
    </PanelCard>
  );
};
