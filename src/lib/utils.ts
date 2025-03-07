import { clsx, type ClassValue } from "clsx";
import _ from "lodash";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const proofObject = (obj: Record<string, unknown>) =>
  _.omitBy(
    obj,
    (v: string | null | undefined) =>
      v === null || v === "" || v === undefined || v?.length === 0
  );
