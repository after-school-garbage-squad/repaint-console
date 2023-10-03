"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
import { EnvelopeClosedIcon } from "@radix-ui/react-icons";
import Image from "next/image";

export const DashBoardHeader = () => {
  const { user } = useUser();

  return (
    <header
      className={
        "flex min-h-[96px] flex-col items-center gap-4 bg-white px-8 py-2 md:flex-row"
      }
    >
      <Image
        alt="repaintのロゴ"
        src={"/repaint-logo.svg"}
        width={180}
        height={70}
      />
      <div className="flex w-full flex-auto items-center justify-between">
        <div className={"flex flex-col gap-2"}>
          <p>ログイン中のアカウント</p>
          <div className={"flex items-center gap-2"}>
            <EnvelopeClosedIcon width={16} height={16} />
            <p>{user?.email}</p>
          </div>
        </div>
        <a
          href="/api/auth/logout"
          className={"rounded-lg bg-deepBlue px-4 py-2 text-white"}
        >
          ログアウト
        </a>
      </div>
    </header>
  );
};
