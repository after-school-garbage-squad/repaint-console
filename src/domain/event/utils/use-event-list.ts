"use client";

import useSWR from "swr";

import type { Event } from "../types";

const fetcher = async (url: string) => {
  const data = await fetch(url);
  const json = await data.json();
  return json as Event[];
};

export const useEventList = () => {
  const { data, isLoading, mutate, error } = useSWR(
    "/api/admin/event",
    fetcher,
  );

  return { data, isLoading, mutate, error };
};
