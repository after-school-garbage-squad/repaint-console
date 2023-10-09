"use client";

import { MoveSettingPanel } from "./componets/MoveSettingPanel/move-setting-panel";
import { SpotSettingPanel } from "./componets/SpotSettingPanel/spot-setting-panel";
import { SpotStatePanel } from "./componets/SpotStatepanel/spot-state-panel";

import { useSelectEvent } from "@/domain/event/utils/use-select-event";

export const MovePage = ({ params }: { params: { id: string } }) => {
  const { selectEvent } = useSelectEvent(params.id);

  return (
    <main className={"flex flex-col gap-6"}>
      <h2 className={"text-2xl"}>回遊施策</h2>
      <div className="flex flex-col gap-4">
        <MoveSettingPanel
          selectEventId={params.id}
          spots={selectEvent?.spots ?? []}
        />
        <SpotStatePanel
          selectEventId={params.id}
          spots={selectEvent?.spots ?? []}
        />
        <SpotSettingPanel
          selectEventId={params.id}
          spots={selectEvent?.spots ?? []}
        />
      </div>
    </main>
  );
};

export default MovePage;
