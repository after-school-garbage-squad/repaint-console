import { PanelCard } from "../../components/panel-card";

export const EventImageSetPanel = () => {
  return (
    <PanelCard>
      <div className={"flex items-center justify-between"}>
        <p className={"text-lg text-deepBlue"}>デフォルト画像の設定</p>
        <button className={"rounded-lg bg-deepBlue p-2 text-white"}>
          設定する
        </button>
      </div>
      <div></div>
    </PanelCard>
  );
};
