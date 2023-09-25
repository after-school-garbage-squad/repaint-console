"use client";

import type { ReactNode } from "react";
import type React from "react";

import { Provider } from "jotai";

export const StoreProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  return <Provider>{children}</Provider>;
};
