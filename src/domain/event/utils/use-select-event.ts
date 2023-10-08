import { useEventList } from "./use-event-list";

export const useSelectEvent = (eventId: string) => {
  const { data, ...rest } = useEventList();

  if (!data) {
    return { selectEvent: null, ...rest };
  }
  const selectEvent = data.find((event) => event.eventId === eventId);

  return { selectEvent, ...rest };
};
