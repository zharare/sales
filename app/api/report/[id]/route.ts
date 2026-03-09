import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

const base = path.join(process.cwd(), "data/reports")

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const file = path.join(base, `${params.id}.json`)

  if (!fs.existsSync(file)) {
    return NextResponse.json([])
  }

  const data = JSON.parse(fs.readFileSync(file, "utf8"))

  return NextResponse.json(data)
}

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  const body = await req.json()

  if (!fs.existsSync(base)) {
    fs.mkdirSync(base, { recursive: true })
  }

  const file = path.join(base, `${params.id}.json`)

  fs.writeFileSync(file, JSON.stringify(body.rows, null, 2))

  return NextResponse.json({ ok: true })
}