import { PanelCard } from "../../components/panel-card";

import { Icon } from "@/components/Icon";

export const EventNamePanelCard = () => {
  return (
    <PanelCard title={"イベント名"}>
      <p className={"text-lg text-deepBlue"}>イベント名</p>
      <div className={"flex items-center justify-between gap-2"}>
        <p className={"text-xl"}>This is event name</p>
        <Icon height={24} width={24} icon={"ri:edit-2-fill"} />
      </div>
    </PanelCard>
  );
};
