import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

import type { Event } from "../types";

export const eventListAtom = atomWithStorage<Event[]>("eventList", []);

export const selectEventAtom = atom<Event | null>((get) => {
  const eventList = get(eventListAtom);
  const eventId = get(selectEventIdAtom);
  return eventList.find((event) => event.eventId === eventId) || null;
});

export const selectEventIdAtom = atomWithStorage<string>("selectEventId", "");
