"use client";

import { useAtom } from "jotai";
import useSWR from "swr";

import type { Event } from "../types";

import { alertDialogStateAtom } from "@/ux-domain/shared-ui/ErrorAlertDialog/atom";

const fetcher = async (url: string) => {
  const data = await fetch(url);
  const json = await data.json();
  return json as Event[];
};

export const useEventList = () => {
  const setDialogState = useAtom(alertDialogStateAtom)[1];

  const { data, isLoading, mutate, error } = useSWR(
    "/api/admin/event",
    fetcher,
  );

  if (error) {
    setDialogState({
      isOpen: true,
      error,
    });
  }

  return { data, isLoading, mutate, error };
};
