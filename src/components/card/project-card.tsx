import Link from "next/link";

export const ProjectCard = () => {
  return (
    <div className={"h-24 w-64 rounded-lg border-2 border-gray bg-white p-4"}>
      <Link href={""} className={"hover:text-deepBlue"}>
        プロジェクト名
      </Link>
    </div>
  );
};
