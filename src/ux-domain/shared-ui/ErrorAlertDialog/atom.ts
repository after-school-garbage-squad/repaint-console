import { atom } from "jotai";

import type { TokenError } from "@/domain/auth/error";

export const alertDialogStateAtom = atom<{
  isOpen: boolean;
  error: TokenError | TypeError;
} | null>(null);
