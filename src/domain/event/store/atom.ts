import { atom } from "jotai";

import type { Event } from "../types";

export const selectEventAtom = atom<Event | null>(null);
