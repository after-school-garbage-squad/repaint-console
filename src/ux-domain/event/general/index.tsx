import { EventDefaultImageSetPanel } from "./components/event-default-image-set-panel";
import { EventNamePanelCard } from "./components/event-name-panel-card";
import { EventQrPanel } from "./components/event-qr-panel";
import { ManagementMemberCard } from "./components/manegement-member-card";

export const GeneralPage = () => {
  return (
    <main className={"flex flex-col gap-6"}>
      <h2 className={"text-2xl"}>一般</h2>
      <div className={"flex flex-col gap-4 md:flex-row"}>
        <div className={"flex flex-1 flex-col gap-4"}>
          <EventNamePanelCard />
          <ManagementMemberCard />
        </div>
        <div
          className={
            "flex flex-auto flex-col items-start justify-start gap-4 md:flex-row"
          }
        >
          <EventQrPanel />
          <EventDefaultImageSetPanel />
        </div>
      </div>
    </main>
  );
};

export default GeneralPage;
