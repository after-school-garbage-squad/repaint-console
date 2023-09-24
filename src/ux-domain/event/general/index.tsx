import { EventImageSetPanel } from "./components/event-image-set-panel";
import { EventNamePanelCard } from "./components/event-name-panel-card";
import { EventQrPanel } from "./components/event-qr-panel";
import { ManagementMemberCard } from "./components/manegement-member-card";

export default function Page() {
  return (
    <main className={"mx-4 flex flex-col gap-6"}>
      <h2 className={"mt-4 text-2xl"}>一般</h2>
      <div className={"flex gap-8"}>
        <div className={"flex flex-col gap-4"}>
          <EventNamePanelCard />
          <ManagementMemberCard />
        </div>
        <div className={"flex justify-start gap-4"}>
          <EventQrPanel />
          <EventImageSetPanel />
        </div>
      </div>
    </main>
  );
}
