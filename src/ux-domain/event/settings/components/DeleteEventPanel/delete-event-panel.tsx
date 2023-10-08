"use client";

import type { FC } from "react";

import { PanelCard } from "../../../components/panel-card";

import { DeleteEventDialog } from "./delete-event-dialog";

type DeleteEventPanelProps = {
  selectEventId: string;
};

export const DeleteEventPanel: FC<DeleteEventPanelProps> = ({
  selectEventId,
}) => {
  return (
    <PanelCard className={"flex items-center justify-between"}>
      <p className={"text-lg text-deepBlue"}>イベント削除</p>
      <DeleteEventDialog selectEventId={selectEventId} />
    </PanelCard>
  );
};
