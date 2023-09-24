import { PanelCard } from "../../components/panel-card";

export const ManagementMemberCard = () => {
  return (
    <PanelCard className={"w-80"}>
      <p className={"text-lg text-deepBlue"}>イベント管理者</p>
      <ul className={"flex flex-col gap-2"}>
        <li className={"border-b-2 border-gray px-2 text-lg"}>
          xxx@exmaple.com
        </li>
        <li className={"border-b-2 border-gray px-2 text-lg"}>
          xxx@exmaple.com
        </li>
        <li className={"border-b-2 border-gray px-2 text-lg"}>
          xxx@exmaple.com
        </li>
        <li className={"border-b-2 border-gray px-2 text-lg"}>
          xxx@exmaple.com
        </li>
      </ul>
    </PanelCard>
  );
};
