"use client";

import { useEffect } from "react";

import { useAtom } from "jotai";

import { EventCreateDialog } from "./components/craete-event-dialog";
import { DashBoardHeader } from "./components/header";

import { getIdToken } from "@/domain/auth/api/get-id-token";
import { getEventList } from "@/domain/event/api/get-event-list";
import { eventListAtom } from "@/domain/event/store/atom";
import { ProjectCard } from "@/ux-domain/dashboard/components/project-card";

export default function DashboardPage() {
  const [eventList, setEventList] = useAtom(eventListAtom);

  useEffect(() => {
    let isMounted = false;
    const fetchEventList = async () => {
      try {
        const idToken = await getIdToken();
        const response = await getEventList(idToken);
        if (!isMounted) {
          setEventList(response);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchEventList();
    return () => {
      isMounted = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <DashBoardHeader />
      <main className={"grid gap-4 px-4"}>
        <div className={"mt-8 flex items-center justify-between"}>
          <h1 className={"text-2xl"}>プロジェクト一覧</h1>
          <EventCreateDialog />
        </div>
        <div className={"flex flex-wrap gap-4"}>
          {eventList.map((event) => {
            return (
              <ProjectCard
                key={event.eventId}
                id={event.eventId}
                name={event.name}
              />
            );
          })}
        </div>
      </main>
    </>
  );
}
