import { ErrorAlertDialog } from "@/ux-domain/shared-ui/ErrorAlertDialog/error-alert-dialog";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={"mx-auto h-screen min-h-[100ivh] "}>
      <ErrorAlertDialog /> {children}
    </div>
  );
}
