import { NextResponse } from "next/server";

// URL del Web App de Google Apps Script (definida en variables de entorno).
const SHEET_URL = process.env.GIFTS_SHEET_URL;

// Sin caché: la lista y las reservas tienen que verse siempre al día.
export const dynamic = "force-dynamic";

/** Lista de regalos. */
export async function GET() {
  if (!SHEET_URL) {
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }
  try {
    const res = await fetch(SHEET_URL, { cache: "no-store" });
    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "fetch_failed" }, { status: 502 });
  }
}

/** Reservar un regalo: { id, reservado_por }. */
export async function POST(req: Request) {
  if (!SHEET_URL) {
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });
  }
  try {
    const body = await req.json();
    // Content-Type text/plain evita el preflight CORS hacia Apps Script.
    const res = await fetch(SHEET_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({ id: body.id, reservado_por: body.reservado_por }),
      redirect: "follow",
    });
    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ ok: false, error: "fetch_failed" }, { status: 502 });
  }
}
