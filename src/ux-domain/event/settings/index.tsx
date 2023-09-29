import { DeleteEventPanel } from "./components/delete-event-panel";

const EventSettingPage = () => {
  return (
    <main>
      <h2 className={"text-2xl"}>その他設定</h2>
      <DeleteEventPanel />
    </main>
  );
};

export default EventSettingPage;
