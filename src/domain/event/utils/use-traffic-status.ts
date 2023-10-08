"use server";

import { getSession } from "@auth0/nextjs-auth0";
import useSWR from "swr";

import type { Traffic } from "../types";

import { TokenError } from "@/domain/auth/error";

const fetcher = async (url: string) => {
  const session = await getSession();
  if (!session?.idToken) {
    throw new TokenError("idToken is not vertify");
  }

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.idToken}`,
    },
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  const { traffics } = await response.json();

  return traffics as Traffic[];
};

export const useTrafficStatus = (eventId: string) => {
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/event/${eventId}/traffic`,
    fetcher,
    {
      refreshInterval: 1000,
    },
  );
  return { data, error, isLoading };
};
