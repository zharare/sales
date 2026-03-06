import { NextResponse } from "next/server";
import { createDefaultRows } from "@/lib/defaults";
import { getSalespeople, setSalespeople } from "@/lib/kv";
import type { Salesperson } from "@/lib/types";

export async function GET() {
  const salespeople = await getSalespeople();
  return NextResponse.json(salespeople);
}

export async function POST(req: Request) {
  const body = (await req.json()) as Partial<Pick<Salesperson, "name" | "color">>;
  if (!body.name?.trim()) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }

  const salespeople = await getSalespeople();
  const newSalesperson: Salesperson = {
    id: crypto.randomUUID(),
    name: body.name.trim(),
    color: body.color || "#B8D4FF",
    rows: createDefaultRows()
  };

  await setSalespeople([...salespeople, newSalesperson]);
  return NextResponse.json(newSalesperson, { status: 201 });
}

export async function PUT(req: Request) {
  const body = (await req.json()) as { salespeople: Salesperson[] };
  if (!Array.isArray(body.salespeople)) {
    return NextResponse.json({ error: "salespeople array required" }, { status: 400 });
  }

  await setSalespeople(body.salespeople);
  return NextResponse.json({ ok: true });
}
