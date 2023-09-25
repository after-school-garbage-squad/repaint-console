"use client";

import { useEffect } from "react";

import { useAtom } from "jotai";

import { DashBoardHeader } from "./components/header";

import { eventListAtom } from "@/domain/event/store/atom";
import { ProjectCard } from "@/ux-domain/dashboard/components/project-card";

const eventListData = {
  event: [
    {
      id: "id1",
      url: "https://google.com",
      beacons: [
        {
          HWID: "hwid1",
          serviceUUID: "serviceUUID1",
        },
      ],
      image_id: ["image_id1"],
      name: "name1",
      contact: {
        name: "contact_name1",
        email: "contact_email1",
        phone: "contact_phone1",
      },
    },
  ],
};

export default function DashboardPage() {
  const [eventList, setEventList] = useAtom(eventListAtom);

  useEffect(() => {
    setEventList(eventListData.event);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <DashBoardHeader />
      <main className={"grid gap-4 px-4"}>
        <h1 className={"pt-8 text-2xl"}>プロジェクト一覧</h1>
        <div>
          {eventList.map((event) => {
            return (
              <ProjectCard key={event.id} name={event.name} id={event.id} />
            );
          })}
        </div>
      </main>
    </>
  );
}
