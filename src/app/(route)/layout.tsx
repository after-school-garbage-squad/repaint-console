import { SessionAlertDialog } from "@/ux-domain/shared-ui/session-alert-dialog";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={"mx-auto h-screen min-h-screen "}>
      <SessionAlertDialog />
      {children}
    </div>
  );
}
