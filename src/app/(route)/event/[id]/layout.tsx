import { EventConsoleHeader } from "@/ux-domain/event/components/header";

export default function EventLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <EventConsoleHeader />
      {children}
    </div>
  );
}
