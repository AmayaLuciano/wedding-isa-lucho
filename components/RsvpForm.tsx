"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function RsvpForm() {
  const [nombre, setNombre] = useState("");
  const [cantidad, setCantidad] = useState(1);
  const [estado, setEstado] = useState<"idle" | "loading" | "ok" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!nombre.trim()) return;
    setEstado("loading");

    const { error } = await supabase
      .from("invitados")
      .insert({ nombre: nombre.trim(), cantidad });

    setEstado(error ? "error" : "ok");
  }

  if (estado === "ok") {
    return (
      <div className="mt-6 text-olive">
        <p className="text-2xl font-script">¡Gracias, {nombre}!</p>
        <p className="mt-2 text-lg">Tu asistencia fue confirmada. ¡Los esperamos!</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 mx-auto max-w-sm space-y-4 text-left">
      <div>
        <label className="block text-sm text-olive mb-1">Tu nombre completo *</label>
        <input
          type="text"
          required
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Nombre y apellido"
          className="w-full rounded-lg border border-olive/30 bg-transparent px-4 py-2 text-ink placeholder:text-olive-light focus:outline-none focus:border-olive"
        />
      </div>
      <div>
        <label className="block text-sm text-olive mb-1">¿Cuántos asisten?</label>
        <select
          value={cantidad}
          onChange={(e) => setCantidad(Number(e.target.value))}
          className="w-full rounded-lg border border-olive/30 bg-transparent px-4 py-2 text-ink focus:outline-none focus:border-olive"
        >
          {[1, 2, 3, 4, 5].map((n) => (
            <option key={n} value={n}>{n} persona{n > 1 ? "s" : ""}</option>
          ))}
        </select>
      </div>
      {estado === "error" && (
        <p className="text-sm text-red-500">Hubo un error. Intentá de nuevo.</p>
      )}
      <button
        type="submit"
        disabled={estado === "loading"}
        className="w-full rounded-full bg-olive px-8 py-3 text-cream transition hover:bg-olive-light disabled:opacity-60"
      >
        {estado === "loading" ? "Enviando…" : "Confirmar asistencia"}
      </button>
    </form>
  );
}
