import { atomWithStorage } from "jotai/utils";

export const inviteTokenAtom = atomWithStorage<string | null>(
  "inviteToken",
  null,
);
