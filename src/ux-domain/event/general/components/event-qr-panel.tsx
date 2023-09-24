import Image from "next/image";

import { PanelCard } from "../../components/panel-card";

export const EventQrPanel = () => {
  return (
    <PanelCard>
      <div className={"flex items-center justify-between"}>
        <p className={"text-lg text-deepBlue"}>イベント管理者</p>
        <button className={"rounded-lg bg-deepBlue p-2 text-white"}>
          ダウンロード
        </button>
      </div>
      <div>
        <Image alt="repaintのロゴ" width={200} height={200} src={"/icon.png"} />
      </div>
    </PanelCard>
  );
};
