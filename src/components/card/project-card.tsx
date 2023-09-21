import Link from "next/link";

export type ProjectCardProps = {
  name: string;
  id: string;
};

export const ProjectCard = ({ name, id }: ProjectCardProps) => {
  return (
    <div className={"h-24 w-64 rounded-lg border-2 border-gray bg-white p-4"}>
      <Link href={`/event/${id}`} className={"hover:text-deepBlue"}>
        {name}
      </Link>
    </div>
  );
};
