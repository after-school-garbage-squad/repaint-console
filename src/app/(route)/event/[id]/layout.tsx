import { EventConsoleHeader } from "@/ux-domain/event/components/header";

export default function EventLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  return (
    <div>
      <EventConsoleHeader selectEventId={params.id} />
      <div className={"mx-4 mt-4 pb-4"}>{children}</div>
    </div>
  );
}
