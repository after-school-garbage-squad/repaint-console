import { BeaconStatePanel } from "./componets/beacon-state-panel";
import { MoveSettingPanel } from "./componets/move-setting-panel";

export const MovePage = () => {
  return (
    <main>
      <MoveSettingPanel />
      <BeaconStatePanel />
    </main>
  );
};

export default MovePage;
