import { NextResponse } from "next/server";
import { createDefaultRows } from "@/lib/defaults";
import { getReportRows, getSalespeople, setReportRows, setSalespeople } from "@/lib/kv";
import { REPORT_COLUMNS, type ReportRow } from "@/lib/types";

export async function GET(_: Request, { params }: { params: { salespersonId: string } }) {
  const rows = await getReportRows(params.salespersonId);
  const payload = rows.length ? rows : createDefaultRows();
  return NextResponse.json(payload);
}

export async function POST(req: Request, { params }: { params: { salespersonId: string } }) {
  const body = (await req.json()) as { rows: ReportRow[] };
  if (!Array.isArray(body.rows)) {
    return NextResponse.json({ error: "Rows must be an array" }, { status: 400 });
  }

  const sanitized = body.rows.map((row) =>
    REPORT_COLUMNS.reduce((acc, col) => {
      acc[col] = `${row[col] ?? ""}`.toUpperCase();
      return acc;
    }, {} as ReportRow)
  );

  await setReportRows(params.salespersonId, sanitized);

  const salespeople = await getSalespeople();
  const updated = salespeople.map((person) =>
    person.id === params.salespersonId ? { ...person, rows: sanitized } : person
  );
  await setSalespeople(updated);

  return NextResponse.json({ ok: true });
}
