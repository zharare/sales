import { kv } from "@vercel/kv";
import { defaultSalespeople } from "@/lib/defaults";
import type { Salesperson } from "@/lib/types";

const SALESPEOPLE_KEY = "salespeople";

export const getSalespeople = async (): Promise<Salesperson[]> => {
  const salespeople = await kv.get<Salesperson[]>(SALESPEOPLE_KEY);
  if (salespeople?.length) {
    return salespeople;
  }

  const seed = defaultSalespeople();
  await kv.set(SALESPEOPLE_KEY, seed);
  for (const person of seed) {
    await kv.set(`report:${person.id}`, person.rows);
  }
  return seed;
};

export const setSalespeople = async (salespeople: Salesperson[]) => {
  await kv.set(SALESPEOPLE_KEY, salespeople);
};

export const getReportRows = async (salespersonId: string) => {
  const rows = await kv.get<Salesperson["rows"]>(`report:${salespersonId}`);
  return rows ?? [];
};

export const setReportRows = async (salespersonId: string, rows: Salesperson["rows"]) => {
  await kv.set(`report:${salespersonId}`, rows);
};

export const deleteReportRows = async (salespersonId: string) => {
  await kv.del(`report:${salespersonId}`);
};
