"use client";
import { DeleteEventPanel } from "./components/DeleteEventPanel/delete-event-panel";
import { EventSettingPanel } from "./components/EventSettingPanel/event-setting-panel";
import { InviteOperaotPanel } from "./components/InviteOperatorPanel/invite-operator-panel";

import { useSelectEvent } from "@/domain/event/utils/use-select-event";

const EventSettingPage = ({ params }: { params: { id: string } }) => {
  const { selectEvent } = useSelectEvent(params.id);
  return (
    <main className={"flex flex-col gap-6"}>
      <h2 className={"text-2xl"}>その他設定</h2>
      <InviteOperaotPanel selectEventId={params.id} />
      {selectEvent ? <EventSettingPanel selectEvent={selectEvent} /> : <></>}
      <DeleteEventPanel selectEventId={params.id} />
    </main>
  );
};

export default EventSettingPage;
