"use client";

import type { FC } from "react";

import * as Tooltip from "@radix-ui/react-tooltip";
import { useAtom } from "jotai";
import Image from "next/image";
import Link from "next/link";

import { selectEventAtom } from "@/domain/event/store/atom";
import { Icon } from "@/ux-domain/shared-ui/icon";

type NavigationIconButtonProps = {
  href: string;
  text: string;
  icon: string;
};

const NavigationIconButton: FC<NavigationIconButtonProps> = ({
  icon,
  href,
  text,
}) => {
  return (
    <Tooltip.Provider delayDuration={300}>
      <Tooltip.Root>
        <Tooltip.Trigger>
          <Link href={href}>
            <Icon
              width={24}
              height={24}
              icon={icon}
              className={"hover:text-deepBlue"}
            />
          </Link>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            sideOffset={5}
            alignOffset={10}
            className={"rounded-lg bg-white p-3 shadow-xl"}
          >
            {text}
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};

export const EventConsoleHeader = () => {
  const [selectEvent] = useAtom(selectEventAtom);
  return (
    <header
      className={"flex h-12 w-full items-center justify-between bg-white px-4"}
    >
      <Link href={"/dashboard"}>
        <Image src={"/icon.png"} alt="repaintのロゴ" width={44} height={44} />
      </Link>
      <h1>{selectEvent?.name}</h1>
      <nav className={"flex justify-center gap-2"}>
        <NavigationIconButton
          href={"./general"}
          icon={"ri:file-list-2-line"}
          text={"一般設定"}
        />
        <NavigationIconButton
          icon={"ri:arrow-left-right-fill"}
          href={"./move"}
          text={"回遊施策"}
        />
        <NavigationIconButton
          icon={"ri:wifi-fill"}
          href={"./beacon"}
          text={"ビーコン設定"}
        />
        <NavigationIconButton
          icon={"ri:settings-5-line"}
          href={"./settings"}
          text={"その他"}
        />
      </nav>
    </header>
  );
};
