import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function SaveToLocal(data: object): Promise<void> {
  const historyRaw = localStorage.getItem("history");
  let history: object[] = [];

  if (historyRaw) {
    try {
      history = JSON.parse(historyRaw);
      if (!Array.isArray(history)) {
        history = [];
      }
    } catch {
      history = [];
    }
  }

  history.push(data);
  localStorage.setItem("history", JSON.stringify(history));
}


export async function GetLocal(key: string) {
  const data = localStorage.getItem(key);
  return data;
}

export async function RemoveFromLocal(key: string) {
  localStorage.removeItem(key);
}
