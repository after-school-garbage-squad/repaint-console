import { UserProvider } from "@auth0/nextjs-auth0/client";
import { Noto_Sans_JP } from "next/font/google";

import type { Metadata } from "next";

import { StoreProvider } from "@/domain/event/provider";
import "./globals.css";

const font = Noto_Sans_JP({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Re:paint",
  description: "Re:paintは、イベントの参加者を可視化するサービスです。",
};

export const dynamic = "force-dynamic";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <UserProvider>
        <StoreProvider>
          <body className={`${font.className} bg-background`}>{children}</body>
        </StoreProvider>
      </UserProvider>
    </html>
  );
}
