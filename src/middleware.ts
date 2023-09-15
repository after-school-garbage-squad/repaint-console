import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  console.log(req.nextUrl.searchParams.get("inviteId"));
}

export const config = {
  matchers: ["api/auth/signin"],
};
