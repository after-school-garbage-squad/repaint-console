import { DeleteEventPanel } from "./components/delete-event-panel";
import { EventSettingPanel } from "./components/event-setting-panel";
import { InviteOperaotPanel } from "./components/invite-operator-panel";

const EventSettingPage = () => {
  return (
    <main className={"flex flex-col gap-6"}>
      <h2 className={"text-2xl"}>その他設定</h2>
      <InviteOperaotPanel />
      <EventSettingPanel />
      <DeleteEventPanel />
    </main>
  );
};

export default EventSettingPage;
