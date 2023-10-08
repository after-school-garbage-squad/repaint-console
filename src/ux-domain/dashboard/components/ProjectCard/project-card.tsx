"use client";

import Link from "next/link";

export type ProjectCardProps = {
  name: string;
  eventid: string;
};

export const ProjectCard = ({ name, eventid }: ProjectCardProps) => {
  return (
    <div className={"h-24 w-64 rounded-lg border-2 border-gray bg-white p-4"}>
      <Link
        href={`/event/${eventid}/general`}
        className={"hover:text-deepBlue"}
      >
        {name}
      </Link>
    </div>
  );
};
