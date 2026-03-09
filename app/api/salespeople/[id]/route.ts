import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Función para crear filas default (opcional, si quieres simular lo que hacías con KV)
function createDefaultRows() {
  return [
    { name: "Row 1", value: "" },
    { name: "Row 2", value: "" },
  ];
}

// GET: traer todos los vendedores con sus reports
export async function GET() {
  try {
    const salespeople = await prisma.salesPerson.findMany({
      include: { reports: true }, // incluimos reports
    });
    return NextResponse.json(salespeople);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch salespeople" }, { status: 500 });
  }
}

// POST: crear un nuevo vendedor
export async function POST(req: Request) {
  try {
    const body = (await req.json()) as { name: string; color?: string };
    if (!body.name?.trim()) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    const newSalesperson = await prisma.salesPerson.create({
      data: {
        name: body.name.trim(),
        color: body.color || "#B8D4FF",
        // reports: [] // por defecto sin reports
      },
      include: { reports: true }, // opcional, para devolver en la respuesta
    });

    return NextResponse.json(newSalesperson, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create salesperson" }, { status: 500 });
  }
}

// PUT: actualizar vendedores
export async function PUT(req: Request) {
  try {
    const body = (await req.json()) as { salespeople: { id: number; name: string; color: string }[] };
    if (!Array.isArray(body.salespeople)) {
      return NextResponse.json({ error: "salespeople array required" }, { status: 400 });
    }

    // Actualizamos cada vendedor individualmente
    for (const sp of body.salespeople) {
      await prisma.salesPerson.update({
        where: { id: sp.id },
        data: {
          name: sp.name,
          color: sp.color,
        },
      });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to update salespeople" }, { status: 500 });
  }
}