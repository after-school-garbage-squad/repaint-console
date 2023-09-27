import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

import type { Event } from "../types";

export const eventListAtom = atomWithStorage<Event[]>("eventList", []);

export const selectEventAtom = atom<Event | null>((get) => {
  const eventList = get(eventListAtom);
  const eventID = get(selectEventIDAtom);
  return eventList.find((event) => event.eventId === eventID) || null;
});

export const selectEventIDAtom = atomWithStorage<string | null>(
  "selectEventId",
  null
);
