import { DeleteEventPanel } from "./components/delete-event-panel";
import { EventSettingPanel } from "./components/event-setting-panel";

const EventSettingPage = () => {
  return (
    <main className={"flex flex-col gap-6"}>
      <h2 className={"text-2xl"}>その他設定</h2>
      <DeleteEventPanel />
      <EventSettingPanel />
    </main>
  );
};

export default EventSettingPage;
