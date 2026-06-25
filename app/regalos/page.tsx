"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase, Regalo } from "@/lib/supabase";
import GiftCard from "@/components/GiftCard";
import FloralDivider from "@/components/FloralDivider";

export default function RegalosPage() {
  const [regalos, setRegalos] = useState<Regalo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    supabase
      .from("regalos")
      .select("*")
      .order("nombre", { ascending: true })
      .then(({ data }) => {
        if (active && data) setRegalos(data as Regalo[]);
        setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  function handleUpdated(updated: Regalo) {
    setRegalos((prev) => prev.map((r) => (r.id === updated.id ? updated : r)));
  }

  return (
    <main className="min-h-screen px-6 py-16">
      <div className="text-center">
        <Link href="/" className="text-sm text-olive-light underline">
          ← Volver a la invitación
        </Link>
        <h1 className="mt-4 font-script text-5xl text-olive">Lista de regalos</h1>
        <FloralDivider />
        <p className="mx-auto mt-2 max-w-md text-ink">
          Elegí un regalo y reservalo con tu nombre para que nadie repita.
        </p>
      </div>

      {loading ? (
        <p className="mt-10 text-center text-olive-light">Cargando regalos...</p>
      ) : regalos.length === 0 ? (
        <p className="mt-10 text-center text-olive-light">
          Todavía no hay regalos cargados. Agregalos desde Supabase.
        </p>
      ) : (
        <div className="mx-auto mt-10 grid max-w-4xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {regalos.map((r) => (
            <GiftCard key={r.id} regalo={r} onUpdated={handleUpdated} />
          ))}
        </div>
      )}
    </main>
  );
}
