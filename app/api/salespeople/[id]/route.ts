import { NextResponse } from "next/server";
import { getSalespeople, setSalespeople } from "@/lib/kv";

export async function GET(
  _: Request,
  { params }: { params: { id: string } }
) {
  try {
    const salespeople = await getSalespeople();

    const person = salespeople.find((p) => p.id === params.id);

    if (!person) {
      return NextResponse.json(
        { error: "Salesperson not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(person.rows || []);
  } catch (err) {
    console.error("GET report error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const rows = await req.json();

    const salespeople = await getSalespeople();

    const index = salespeople.findIndex((p) => p.id === params.id);

    if (index === -1) {
      return NextResponse.json(
        { error: "Salesperson not found" },
        { status: 404 }
      );
    }

    salespeople[index].rows = rows;

    await setSalespeople(salespeople);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("PUT report error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}