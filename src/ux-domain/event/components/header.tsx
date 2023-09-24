import Image from "next/image";

import { Icon } from "@/components/Icon";

export const EventConsoleHeader = () => {
  return (
    <header
      className={"flex h-12 w-full items-center justify-between bg-white px-4"}
    >
      <Image src={"/icon.png"} alt="repaintのロゴ" width={44} height={44} />
      <h1>イベントタイトル</h1>
      <div className={"flex justify-center gap-2"}>
        <Icon width={24} height={24} icon={"ri:file-list-2-line"} />
        <Icon width={24} height={24} icon={"ri:arrow-left-right-fill"} />
        <Icon width={24} height={24} icon={"ri:wifi-fill"} />
        <Icon width={24} height={24} icon={"ri:settings-5-line"} />
      </div>
    </header>
  );
};
