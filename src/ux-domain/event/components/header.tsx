"use client";

import { useAtom } from "jotai";
import Image from "next/image";
import Link from "next/link";

import { selectEventAtom } from "@/domain/event/store/atom";
import { Icon } from "@/ux-domain/shared-ui/icon";

export const EventConsoleHeader = () => {
  const [selectEvent] = useAtom(selectEventAtom);
  return (
    <header
      className={"flex h-12 w-full items-center justify-between bg-white px-4"}>
      <Link href={"/dashboard"}>
        <Image src={"/icon.png"} alt="repaintのロゴ" width={44} height={44} />
      </Link>
      <h1>{selectEvent?.name}</h1>
      <div className={"flex justify-center gap-2"}>
        <Link href={"./general"}>
          <Icon
            width={24}
            height={24}
            icon={"ri:file-list-2-line"}
            className={"hover:text-deepBlue"}
          />
        </Link>
        <Link href={"./move"}>
          <Icon
            width={24}
            height={24}
            icon={"ri:arrow-left-right-fill"}
            className={"hover:text-deepBlue"}
          />
        </Link>
        <Link href={"./beacon"}>
          <Icon
            width={24}
            height={24}
            icon={"ri:wifi-fill"}
            className={"hover:text-deepBlue"}
          />
        </Link>
        <Link href={"./settings"}>
          <Icon
            width={24}
            height={24}
            icon={"ri:settings-5-line"}
            className={"hover:text-deepBlue"}
          />
        </Link>
      </div>
    </header>
  );
};
