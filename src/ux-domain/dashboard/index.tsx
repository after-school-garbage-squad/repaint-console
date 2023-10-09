"use client";

import { CreateEventDialog } from "./components/CreateEventDialog";
import { DashBoardHeader } from "./components/DashboardHeader";
import { ProjectCard } from "./components/ProjectCard";

import { useEventList } from "@/domain/event/utils/use-event-list";

const DashboardPage = () => {
  const { data, isLoading } = useEventList();

  return (
    <>
      <DashBoardHeader />
      <main className={"grid gap-4 px-4"}>
        <div className={"mt-8 flex items-center justify-between"}>
          <h1 className={"text-2xl"}>プロジェクト一覧</h1>
          <CreateEventDialog />
        </div>
        <div className={"flex flex-wrap gap-4"}>
          {isLoading ? (
            <p>ロード中</p>
          ) : data?.length ? (
            data.map((event) => (
              <ProjectCard
                key={event.eventId}
                name={event.name}
                eventid={event.eventId}
              />
            ))
          ) : (
            <p>プロジェクトがありません</p>
          )}
        </div>
      </main>
    </>
  );
};

export default DashboardPage;
