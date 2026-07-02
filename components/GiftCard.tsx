"use client";

import { useState } from "react";
import { Regalo } from "@/lib/gifts";

export default function GiftCard({ regalo, onUpdated }: { regalo: Regalo; onUpdated: (r: Regalo) => void }) {
  const [open, setOpen] = useState(false);
  const [nombre, setNombre] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function reservar() {
    if (!nombre.trim()) {
      setError("Decinos tu nombre para reservar el regalo.");
      return;
    }
    setLoading(true);
    setError("");

    let result: { ok?: boolean; error?: string } = {};
    try {
      const res = await fetch("/api/regalos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: regalo.id, reservado_por: nombre.trim() }),
      });
      result = await res.json();
    } catch {
      result = { ok: false, error: "fetch_failed" };
    }

    setLoading(false);

    if (!result.ok) {
      setError(
        result.error === "ya_reservado"
          ? "Justo lo reservó otra persona. Recargá la página para ver la lista actualizada."
          : "No se pudo reservar. Intentá de nuevo en un momento."
      );
      return;
    }

    onUpdated({ ...regalo, reservado: true, reservado_por: nombre.trim() });
    setOpen(false);
  }

  return (
    <div className="rounded-2xl border border-olive/20 bg-white/40 p-5 text-left shadow-sm backdrop-blur-sm">
      {regalo.imagen && (
        <img
          src={regalo.imagen}
          alt={regalo.nombre}
          className="mb-4 h-40 w-full rounded-lg object-cover"
        />
      )}
      <h3 className="font-serif text-xl text-olive">{regalo.nombre}</h3>
      {regalo.descripcion && (
        <p className="text-sm text-ink/70">{regalo.descripcion}</p>
      )}
      {regalo.precio != null && (
        <p className="text-sm text-olive-light">${regalo.precio.toLocaleString("es-AR")}</p>
      )}

      {regalo.link && (
        <a
          href={regalo.link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-block text-sm text-gold underline underline-offset-2"
        >
          Ver producto
        </a>
      )}

      <div className="mt-4">
        {regalo.reservado ? (
          <p className="rounded-full bg-olive/10 px-4 py-2 text-center text-sm text-olive-light">
            Reservado por {regalo.reservado_por}
          </p>
        ) : open ? (
          <div className="space-y-2">
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Tu nombre"
              className="w-full rounded-lg border border-olive/30 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-olive"
            />
            {error && <p className="text-sm text-red-600">{error}</p>}
            <div className="flex gap-2">
              <button
                onClick={reservar}
                disabled={loading}
                className="flex-1 rounded-full bg-olive px-4 py-2 text-sm text-cream disabled:opacity-50"
              >
                {loading ? "Reservando..." : "Confirmar reserva"}
              </button>
              <button
                onClick={() => setOpen(false)}
                className="rounded-full border border-olive/30 px-4 py-2 text-sm text-olive"
              >
                Cancelar
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setOpen(true)}
            className="w-full rounded-full border border-olive px-4 py-2 text-sm text-olive transition hover:bg-olive hover:text-cream"
          >
            Reservar este regalo
          </button>
        )}
      </div>
    </div>
  );
}
