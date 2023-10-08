"use client";

import useSWR from "swr";

import type { Traffic } from "../types";

const fetcher = async (url: string) => {
  const res = await fetch(url);
  const data = await res.json();
  return data.traffics as Traffic[];
};

export const useTrafficStatus = (eventId: string) => {
  const { data, error, isLoading } = useSWR(
    `/api/admin/spot?eventId=${eventId}`,
    fetcher,
    {
      refreshInterval: 1000,
    },
  );
  return { data, error, isLoading };
};
