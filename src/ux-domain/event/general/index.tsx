"use client";

import { EventDefaultImageSetPanel } from "./components/EventDefaultImageSetPanel/event-default-image-set-panel";
import { EventQrPanel } from "./components/EventQRPanel/event-qr-panel";

import { useSelectEvent } from "@/domain/event/utils/use-select-event";

export const GeneralPage = ({ params }: { params: { id: string } }) => {
  const { selectEvent } = useSelectEvent(params.id);
  return (
    <main className={"flex flex-col gap-6"}>
      <h2 className={"text-2xl"}>一般</h2>
      <div className={"flex flex-col gap-4 md:flex-row"}>
        <div
          className={"flex flex-auto flex-col justify-start gap-4 md:flex-row"}
        >
          <EventQrPanel selectEventId={params.id} />
          <EventDefaultImageSetPanel
            imageIdList={selectEvent?.images ?? []}
            selectEventId={params.id}
          />
        </div>
      </div>
    </main>
  );
};

export default GeneralPage;
