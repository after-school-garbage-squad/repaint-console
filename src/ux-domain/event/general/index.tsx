import { EventDefaultImageSetPanel } from "./components/event-default-image-set-panel";
import { EventNamePanelCard } from "./components/event-name-panel-card";
import { EventQrPanel } from "./components/event-qr-panel";
import { ManagementMemberCard } from "./components/manegement-member-card";

export const GeneralPage = () => {
  return (
    <main className={"flex flex-col gap-6"}>
      <h2 className={"text-2xl"}>一般</h2>
      <div className={"flex gap-8"}>
        <div className={"flex flex-col gap-4"}>
          <EventNamePanelCard />
          <ManagementMemberCard />
        </div>
        <div className={"flex justify-start gap-4"}>
          <EventQrPanel />
          <EventDefaultImageSetPanel />
        </div>
      </div>
    </main>
  );
};

export default GeneralPage;
