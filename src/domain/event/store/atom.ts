import { atom } from "jotai";

import type { Event } from "../types";

export const eventListAtom = atom<Event[]>([]);

export const selectEventAtom = atom<Event | null>((get) => {
  const eventList = get(eventListAtom);
  const eventID = get(selectEventIDAtom);
  return eventList.find((event) => event.id === eventID) || null;
});

export const selectEventIDAtom = atom<string | null>(null);
