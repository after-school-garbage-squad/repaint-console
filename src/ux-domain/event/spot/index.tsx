"use client";

import { useSelectEvent } from "@/domain/event/utils/use-select-event";
import { SpotSettingPanel } from "@/ux-domain/event/spot/components/SpotSettingPanel/spot-setting-panel";

export const SpotSettingPage = ({ params }: { params: { id: string } }) => {
  const { selectEvent } = useSelectEvent(params.id);

  return (
    <main className={"flex flex-col flex-wrap gap-6"}>
      <h2 className={"text-2xl"}>ビーコン設定</h2>
      <SpotSettingPanel
        selectEventId={params.id}
        spots={selectEvent?.spots ?? []}
      />
    </main>
  );
};

export default SpotSettingPage;
