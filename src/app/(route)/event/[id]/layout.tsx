import { EventConsoleHeader } from "@/ux-domain/event/components/header";

export default function EventLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <EventConsoleHeader />
      <div className={"mx-4 mt-4 pb-4"}>{children}</div>
    </div>
  );
}
