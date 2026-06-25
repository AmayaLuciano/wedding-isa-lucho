"use client";

import { useEffect, useState } from "react";
import { supabase, Invitado, Transferencia, Regalo } from "@/lib/supabase";

type Tab = "invitados" | "regalos" | "transferencias";

export default function AdminPanel() {
  const [tab, setTab] = useState<Tab>("invitados");

  return (
    <main className="min-h-screen px-4 py-10 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <p className="font-script text-4xl text-olive">Panel de novios</p>
        <form action="/api/admin-logout" method="POST">
          <button className="text-sm text-olive-light underline">Salir</button>
        </form>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-8 border-b border-olive/20">
        {(["invitados", "regalos", "transferencias"] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 text-sm capitalize transition ${
              tab === t
                ? "border-b-2 border-olive text-olive font-medium"
                : "text-olive-light hover:text-olive"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "invitados" && <InvitadosTab />}
      {tab === "regalos" && <RegalosTab />}
      {tab === "transferencias" && <TransferenciasTab />}
    </main>
  );
}

/* ─────────────── INVITADOS ─────────────── */

function InvitadosTab() {
  const [invitados, setInvitados] = useState<Invitado[]>([]);
  const [loading, setLoading] = useState(true);

  // form agregar manual
  const [nombre, setNombre] = useState("");
  const [cantidad, setCantidad] = useState(1);
  const [nota, setNota] = useState("");
  const [confirmado, setConfirmado] = useState(true);

  async function cargar() {
    const { data } = await supabase
      .from("invitados")
      .select("*")
      .order("created_at", { ascending: false });
    setInvitados(data ?? []);
    setLoading(false);
  }

  useEffect(() => { cargar(); }, []);

  async function agregar(e: React.FormEvent) {
    e.preventDefault();
    if (!nombre.trim()) return;
    await supabase.from("invitados").insert({
      nombre: nombre.trim(), cantidad, nota: nota.trim() || null, confirmado,
    });
    setNombre(""); setCantidad(1); setNota(""); setConfirmado(true);
    cargar();
  }

  async function toggleConfirmado(inv: Invitado) {
    await supabase.from("invitados").update({ confirmado: !inv.confirmado }).eq("id", inv.id);
    cargar();
  }

  async function eliminar(id: string) {
    if (!confirm("¿Eliminar este invitado?")) return;
    await supabase.from("invitados").delete().eq("id", id);
    cargar();
  }

  const total = invitados.reduce((s, i) => s + i.cantidad, 0);
  const confirmados = invitados.filter((i) => i.confirmado).reduce((s, i) => s + i.cantidad, 0);

  return (
    <div>
      {/* Resumen */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <StatCard label="Total respuestas" value={invitados.length} />
        <StatCard label="Personas confirmadas" value={confirmados} />
        <StatCard label="Total personas" value={total} />
      </div>

      {/* Formulario agregar */}
      <form onSubmit={agregar} className="mb-8 p-4 rounded-xl border border-olive/20 space-y-3">
        <p className="text-sm font-medium text-olive mb-1">Agregar invitado manualmente</p>
        <div className="flex gap-2 flex-wrap">
          <input
            value={nombre} onChange={(e) => setNombre(e.target.value)}
            placeholder="Nombre y apellido" required
            className="flex-1 min-w-40 rounded-lg border border-olive/30 bg-transparent px-3 py-2 text-sm text-ink placeholder:text-olive-light focus:outline-none focus:border-olive"
          />
          <select
            value={cantidad} onChange={(e) => setCantidad(Number(e.target.value))}
            className="rounded-lg border border-olive/30 bg-transparent px-3 py-2 text-sm text-ink focus:outline-none"
          >
            {[1,2,3,4,5].map((n) => <option key={n} value={n}>{n} persona{n>1?"s":""}</option>)}
          </select>
          <label className="flex items-center gap-1 text-sm text-olive cursor-pointer">
            <input type="checkbox" checked={confirmado} onChange={(e) => setConfirmado(e.target.checked)} />
            Confirmado
          </label>
        </div>
        <input
          value={nota} onChange={(e) => setNota(e.target.value)}
          placeholder="Nota (opcional)"
          className="w-full rounded-lg border border-olive/30 bg-transparent px-3 py-2 text-sm text-ink placeholder:text-olive-light focus:outline-none focus:border-olive"
        />
        <button type="submit" className="rounded-full bg-olive px-6 py-2 text-sm text-cream hover:bg-olive-light transition">
          Agregar
        </button>
      </form>

      {/* Tabla */}
      {loading ? (
        <p className="text-olive-light text-sm">Cargando…</p>
      ) : invitados.length === 0 ? (
        <p className="text-olive-light text-sm">Todavía no hay invitados registrados.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-olive-light border-b border-olive/10">
                <th className="pb-2 pr-4">Nombre</th>
                <th className="pb-2 pr-4">Personas</th>
                <th className="pb-2 pr-4">Nota</th>
                <th className="pb-2 pr-4">Estado</th>
                <th className="pb-2"></th>
              </tr>
            </thead>
            <tbody>
              {invitados.map((inv) => (
                <tr key={inv.id} className="border-b border-olive/5 hover:bg-olive/5">
                  <td className="py-2 pr-4 text-ink">{inv.nombre}</td>
                  <td className="py-2 pr-4 text-ink">{inv.cantidad}</td>
                  <td className="py-2 pr-4 text-olive-light">{inv.nota ?? "—"}</td>
                  <td className="py-2 pr-4">
                    <button
                      onClick={() => toggleConfirmado(inv)}
                      className={`rounded-full px-3 py-0.5 text-xs ${
                        inv.confirmado
                          ? "bg-olive/20 text-olive"
                          : "bg-red-50 text-red-400"
                      }`}
                    >
                      {inv.confirmado ? "Confirmado" : "Pendiente"}
                    </button>
                  </td>
                  <td className="py-2 text-right">
                    <button onClick={() => eliminar(inv.id)} className="text-olive-light hover:text-red-400 text-xs">
                      ✕
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

/* ─────────────── REGALOS ─────────────── */

function RegalosTab() {
  const [regalos, setRegalos] = useState<Regalo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from("regalos").select("*").order("nombre").then(({ data }) => {
      setRegalos(data ?? []);
      setLoading(false);
    });
  }, []);

  const reservados = regalos.filter((r) => r.reservado).length;

  return (
    <div>
      <div className="grid grid-cols-3 gap-4 mb-8">
        <StatCard label="Total regalos" value={regalos.length} />
        <StatCard label="Reservados" value={reservados} />
        <StatCard label="Disponibles" value={regalos.length - reservados} />
      </div>

      {loading ? (
        <p className="text-olive-light text-sm">Cargando…</p>
      ) : regalos.length === 0 ? (
        <p className="text-olive-light text-sm">No hay regalos cargados todavía.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-olive-light border-b border-olive/10">
                <th className="pb-2 pr-4">Regalo</th>
                <th className="pb-2 pr-4">Precio</th>
                <th className="pb-2 pr-4">Estado</th>
                <th className="pb-2">Reservado por</th>
              </tr>
            </thead>
            <tbody>
              {regalos.map((r) => (
                <tr key={r.id} className="border-b border-olive/5 hover:bg-olive/5">
                  <td className="py-2 pr-4 text-ink">
                    {r.link ? (
                      <a href={r.link} target="_blank" rel="noopener noreferrer" className="underline hover:text-olive">
                        {r.nombre}
                      </a>
                    ) : r.nombre}
                  </td>
                  <td className="py-2 pr-4 text-olive-light">
                    {r.precio ? `$${r.precio.toLocaleString("es-AR")}` : "—"}
                  </td>
                  <td className="py-2 pr-4">
                    <span className={`rounded-full px-3 py-0.5 text-xs ${r.reservado ? "bg-olive/20 text-olive" : "bg-cream text-olive-light border border-olive/20"}`}>
                      {r.reservado ? "Reservado" : "Disponible"}
                    </span>
                  </td>
                  <td className="py-2 text-olive-light">{r.reservado_por ?? "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

/* ─────────────── TRANSFERENCIAS ─────────────── */

function TransferenciasTab() {
  const [transferencias, setTransferencias] = useState<Transferencia[]>([]);
  const [loading, setLoading] = useState(true);

  const [nombre, setNombre] = useState("");
  const [monto, setMonto] = useState("");
  const [nota, setNota] = useState("");
  const [fecha, setFecha] = useState(new Date().toISOString().split("T")[0]);

  async function cargar() {
    const { data } = await supabase
      .from("transferencias")
      .select("*")
      .order("fecha", { ascending: false });
    setTransferencias(data ?? []);
    setLoading(false);
  }

  useEffect(() => { cargar(); }, []);

  async function agregar(e: React.FormEvent) {
    e.preventDefault();
    if (!nombre.trim() || !monto) return;
    await supabase.from("transferencias").insert({
      nombre: nombre.trim(),
      monto: Number(monto),
      nota: nota.trim() || null,
      fecha,
    });
    setNombre(""); setMonto(""); setNota(""); setFecha(new Date().toISOString().split("T")[0]);
    cargar();
  }

  async function eliminar(id: string) {
    if (!confirm("¿Eliminar esta transferencia?")) return;
    await supabase.from("transferencias").delete().eq("id", id);
    cargar();
  }

  const total = transferencias.reduce((s, t) => s + t.monto, 0);

  return (
    <div>
      <div className="grid grid-cols-2 gap-4 mb-8">
        <StatCard label="Transferencias" value={transferencias.length} />
        <StatCard label="Total recibido" value={`$${total.toLocaleString("es-AR")}`} />
      </div>

      {/* Formulario */}
      <form onSubmit={agregar} className="mb-8 p-4 rounded-xl border border-olive/20 space-y-3">
        <p className="text-sm font-medium text-olive mb-1">Registrar transferencia</p>
        <div className="flex gap-2 flex-wrap">
          <input
            value={nombre} onChange={(e) => setNombre(e.target.value)}
            placeholder="Nombre" required
            className="flex-1 min-w-40 rounded-lg border border-olive/30 bg-transparent px-3 py-2 text-sm text-ink placeholder:text-olive-light focus:outline-none focus:border-olive"
          />
          <input
            type="number" value={monto} onChange={(e) => setMonto(e.target.value)}
            placeholder="Monto $" required min="1"
            className="w-36 rounded-lg border border-olive/30 bg-transparent px-3 py-2 text-sm text-ink placeholder:text-olive-light focus:outline-none focus:border-olive"
          />
          <input
            type="date" value={fecha} onChange={(e) => setFecha(e.target.value)}
            className="rounded-lg border border-olive/30 bg-transparent px-3 py-2 text-sm text-ink focus:outline-none focus:border-olive"
          />
        </div>
        <input
          value={nota} onChange={(e) => setNota(e.target.value)}
          placeholder="Nota (opcional)"
          className="w-full rounded-lg border border-olive/30 bg-transparent px-3 py-2 text-sm text-ink placeholder:text-olive-light focus:outline-none focus:border-olive"
        />
        <button type="submit" className="rounded-full bg-olive px-6 py-2 text-sm text-cream hover:bg-olive-light transition">
          Registrar
        </button>
      </form>

      {/* Tabla */}
      {loading ? (
        <p className="text-olive-light text-sm">Cargando…</p>
      ) : transferencias.length === 0 ? (
        <p className="text-olive-light text-sm">Todavía no hay transferencias registradas.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-olive-light border-b border-olive/10">
                <th className="pb-2 pr-4">Nombre</th>
                <th className="pb-2 pr-4">Monto</th>
                <th className="pb-2 pr-4">Fecha</th>
                <th className="pb-2 pr-4">Nota</th>
                <th className="pb-2"></th>
              </tr>
            </thead>
            <tbody>
              {transferencias.map((t) => (
                <tr key={t.id} className="border-b border-olive/5 hover:bg-olive/5">
                  <td className="py-2 pr-4 text-ink">{t.nombre}</td>
                  <td className="py-2 pr-4 text-olive font-medium">${t.monto.toLocaleString("es-AR")}</td>
                  <td className="py-2 pr-4 text-olive-light">{t.fecha}</td>
                  <td className="py-2 pr-4 text-olive-light">{t.nota ?? "—"}</td>
                  <td className="py-2 text-right">
                    <button onClick={() => eliminar(t.id)} className="text-olive-light hover:text-red-400 text-xs">✕</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

/* ─────────────── STAT CARD ─────────────── */

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-xl border border-olive/20 p-4 text-center">
      <p className="text-2xl font-medium text-olive">{value}</p>
      <p className="text-xs text-olive-light mt-1">{label}</p>
    </div>
  );
}
