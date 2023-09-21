"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export const DashBoardHeader = () => {
  const router = useRouter();

  const logout = () => {
    router.push("/api/auth/logout");
  };

  return (
    <header className={"flex h-24 items-center gap-4 bg-white px-8"}>
      <Image
        alt="repaintのロゴ"
        src={"/repaint-logo.svg"}
        width={180}
        height={70}
      />
      <div className="flex flex-auto items-center justify-between">
        <div className={"flex flex-col gap-2"}>
          <p>ログイン中のアカウント</p>
          <p>メールアドレス</p>
        </div>
        <button
          onClick={logout}
          className={"rounded-lg bg-deepBlue px-4 py-2 text-white"}
        >
          ログアウト
        </button>
      </div>
    </header>
  );
};
