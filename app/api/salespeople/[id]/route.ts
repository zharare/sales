import { NextResponse } from "next/server";
import { deleteReportRows, getSalespeople, setSalespeople } from "@/lib/kv";

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const salespeople = await getSalespeople();
  const filtered = salespeople.filter((person) => person.id !== params.id);

  if (filtered.length === salespeople.length) {
    return NextResponse.json({ error: "Salesperson not found" }, { status: 404 });
  }

  await setSalespeople(filtered);
  await deleteReportRows(params.id);
  return NextResponse.json({ ok: true });
}
