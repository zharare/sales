import type { Salesperson } from "./types";

let salespeople: Salesperson[] = [];

export async function getSalespeople(): Promise<Salesperson[]> {
  return salespeople;
}

export async function setSalespeople(data: Salesperson[]) {
  salespeople = data;
}

export async function deleteReportRows(_: string) {
  return;
}