"use client";

import { useEffect } from "react";

import { useAtom } from "jotai";

import { EventCreateDialog } from "./components/craete-event-dialog";
import { DashBoardHeader } from "./components/header";

import type { Event } from "@/domain/event/types";

import { eventListAtom } from "@/domain/event/store/atom";
import { ProjectCard } from "@/ux-domain/dashboard/components/project-card";

// mockdataを埋める
const eventListData: Event[] = [
  {
    eventId: "id1",
    name: "イベント名1",
    spots: [
      {
        hwId: "hwId1",
        name: "ビーコン名1",
        serviceUuid: "serviceUuid1",
        spotID: "spotID1",
        isPick: false,
        bonus: false,
      },
      {
        hwId: "hwId1",
        name: "ビーコン名1",
        serviceUuid: "serviceUuid1",
        spotID: "spotID1",
        isPick: false,
        bonus: true,
      },
      {
        hwId: "hwId1",
        name: "ビーコン名1",
        serviceUuid: "serviceUuid1",
        spotID: "spotID1",
        isPick: false,
        bonus: true,
      },
    ],
    hpUrl: "https://www.google.com/",
    image_id: ["/rap"],
    contact: {
      name: "担当者名1",
      email: "xxx@example.com",
      phone: "090-1234-5678",
    },
  },
  {
    eventId: "id2",
    name: "イベント名1",
    spots: [
      {
        hwId: "hwId1",
        name: "ビーコン名1",
        serviceUuid: "serviceUuid1",
        spotID: "spotID1",
        isPick: false,
        bonus: true,
      },
    ],
    hpUrl: "https://www.google.com/",
    image_id: ["/rap"],
    contact: {
      name: "担当者名1",
      email: "xxx@example.com",
      phone: "090-1234-5678",
    },
  },
  {
    eventId: "id3",
    name: "イベント名1",
    spots: [
      {
        hwId: "hwId1",
        name: "ビーコン名1",
        serviceUuid: "serviceUuid1",
        spotID: "spotID1",
        isPick: false,
        bonus: true,
      },
    ],
    hpUrl: "https://www.google.com/",
    image_id: ["/rap"],
    contact: {
      name: "担当者名1",
      email: "xxx@example.com",
      phone: "090-1234-5678",
    },
  },
];

export default function DashboardPage() {
  const [eventList, setEventList] = useAtom(eventListAtom);

  useEffect(() => {
    setEventList(eventListData);
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
