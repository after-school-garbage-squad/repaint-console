export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className={"mx-auto h-screen min-h-screen max-w-[1200px]"}>
      {children}
    </main>
  );
}
