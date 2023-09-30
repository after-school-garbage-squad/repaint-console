import { BeaconStatePanel } from "./componets/beacon-state-panel";
import { MoveSettingPanel } from "./componets/move-setting-panel";

export const MovePage = () => {
  return (
    <main className={"flex flex-col gap-6"}>
      <h2 className={"text-2xl"}>回遊施策</h2>
      <div className="flex flex-col gap-4">
        <MoveSettingPanel />
        <BeaconStatePanel />
      </div>
    </main>
  );
};

export default MovePage;
