import Image from "next/image";

import { ProjectCard } from "@/components/card/project-card";

export default function DashboardPage() {
  return (
    <>
      <header className={"flex h-24 items-center gap-4 bg-white px-8"}>
        <Image
          alt="repaintのロゴ"
          src={"/repaint-logo.svg"}
          width={180}
          height={70}
        />
        <div className={"flex flex-col gap-2"}>
          <p>ログイン中のアカウント</p>
          <p>メールアドレス</p>
        </div>
      </header>
      <main className={"grid gap-4 px-4"}>
        <h1 className={"pt-8 text-2xl"}>プロジェクト一覧</h1>
        <div>
          <ProjectCard />
        </div>
      </main>
    </>
  );
}
