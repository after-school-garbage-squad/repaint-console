"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  return (
    <div className={"grid h-full place-items-center"}>
      <div className={"relative flex flex-col items-center gap-8"}>
        <Image
          alt="repaintのロゴ"
          src={"/repaint-logo.svg"}
          width={300}
          height={200}
        />
        <button
          onClick={() => router.push("/api/auth/login")}
          className={"h-12 w-48 rounded-lg bg-deepBlue text-white"}
        >
          ログイン
        </button>
        <button
          onClick={() => router.push("/api/auth/logout")}
          className={"h-12 w-48 rounded-lg bg-deepBlue text-white"}
        >
          ログアウト
        </button>
      </div>
    </div>
  );
}
