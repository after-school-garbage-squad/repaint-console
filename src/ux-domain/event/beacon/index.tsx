import { BeaconSettingPanel } from "./components/beacon-setting-panel";

export const BeaconSettingPage = () => {
  return (
    <main>
      <h2 className={"text-2xl"}>ビーコン設定</h2>
      <BeaconSettingPanel />
    </main>
  );
};

export default BeaconSettingPage;
