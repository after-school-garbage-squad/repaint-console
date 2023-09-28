import { PanelCard } from "../../components/panel-card";

import { Icon } from "@/components/Icon";
import { Dialog } from "@/components/dialog";

const EventNameEditDialog = () => {
  return (
    <Dialog
      trigger={
        <button aria-label="イベントの名前を演習する">
          <Icon height={24} width={24} icon={"ri:edit-2-fill"} />
        </button>
      }
    >
      <div className={"flex flex-col gap-4"}>
        <p className={"text-lg text-deepBlue"}>イベント名を変更する</p>
        <form>
          <label htmlFor="event-name">イベント名</label>
          <input
            id="event-name"
            type="text"
            className={"mt-2 w-full rounded-lg border-2 border-deepBlue"}
          />
          <button
            className={
              "absolute bottom-4 right-4 rounded-lg bg-deepBlue px-4 py-2 text-white"
            }
            type="submit"
          >
            変更
          </button>
        </form>
      </div>
    </Dialog>
  );
};

export const EventNamePanelCard = () => {
  return (
    <PanelCard title={"イベント名"}>
      <p className={"text-lg text-deepBlue"}>イベント名</p>
      <div className={"flex items-center justify-between gap-2"}>
        <p className={"text-xl"}>This is event name</p>
        <EventNameEditDialog />
      </div>
    </PanelCard>
  );
};
