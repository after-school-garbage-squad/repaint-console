import { DashBoardHeader } from "./components/header";

import { ProjectCard } from "@/ux-domain/dashboard/project-card";

export const eventList = {
  event: [
    {
      id: "id1",
      url: "https://google.com",
      beacons: [
        {
          iBeacon: {
            uuid: "uuid1",
            major: 1,
            minor: 1,
          },
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
  return (
    <>
      <DashBoardHeader />
      <main className={"grid gap-4 px-4"}>
        <h1 className={"pt-8 text-2xl"}>プロジェクト一覧</h1>
        <div>
          {eventList.event.map((event) => {
            return (
              <ProjectCard key={event.id} name={event.name} id={event.id} />
            );
          })}
        </div>
      </main>
    </>
  );
}
