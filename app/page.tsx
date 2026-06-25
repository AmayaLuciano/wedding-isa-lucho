import FloralDivider from "@/components/FloralDivider";
import Countdown from "@/components/Countdown";
import RsvpForm from "@/components/RsvpForm";
import Link from "next/link";
import Image from "next/image";

const WEDDING_DATE = "2026-11-21T16:00:00-03:00";

export default function Home() {
  return (
    <main className="min-h-screen bg-cream overflow-x-hidden">

      {/* HERO */}
      <section className="relative flex flex-col items-center justify-center text-center px-6 pt-20 pb-4">
        {/* Decoración botánica arriba */}
        <div className="absolute top-0 left-0 right-0 h-48 overflow-hidden pointer-events-none">
          <Image
            src="/arch-party.jpg"
            alt=""
            width={640}
            height={860}
            className="w-full object-cover object-top opacity-40"
            aria-hidden
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-cream" />
        </div>

        {/* Contenido */}
        <div className="relative z-10 mt-24">
          <p className="text-sm tracking-[0.3em] text-olive-light uppercase mb-6">
            Con mucha alegría te invitamos a compartir
          </p>
          <h1 className="font-script text-7xl sm:text-8xl text-olive leading-none">
            Isabella y Luciano
          </h1>
          <p className="mt-6 text-lg tracking-[0.25em] text-gold uppercase">
            21 de Noviembre de 2026
          </p>
        </div>
      </section>

      {/* CONTADOR — fuera de la imagen, sobre fondo limpio */}
      <div className="flex justify-center gap-10 pb-10 bg-cream">
        <Countdown targetDate={WEDDING_DATE} />
      </div>

      <FloralDivider />

      {/* CRONOGRAMA */}
      <section className="px-6 py-20 text-center">
        <p className="text-xs tracking-[0.4em] text-olive-light uppercase mb-2">Ese día</p>
        <h2 className="font-script text-5xl text-olive">Programa</h2>
        <div className="mx-auto mt-12 max-w-xs space-y-10">
          <div>
            <p className="text-xs tracking-[0.4em] text-gold uppercase">16:00 hs</p>
            <p className="mt-2 text-lg text-ink">Ceremonia</p>
            <p className="mt-1 text-sm text-olive-light">Iglesia Evangélica Bautista de Haedo</p>
            <p className="text-sm text-olive-light">Chacabuco 289, Haedo</p>
          </div>
          <div className="w-px h-10 bg-olive/20 mx-auto" />
          <div>
            <p className="text-xs tracking-[0.4em] text-gold uppercase">18:00 hs</p>
            <p className="mt-2 text-lg text-ink">Celebración · Brindis</p>
            <p className="mt-1 text-sm text-olive-light">Agrelo 1013, Francisco Álvarez</p>
          </div>
        </div>
      </section>

      <FloralDivider />

      {/* VESTIMENTA */}
      <section className="px-6 py-20 text-center">
        <p className="text-xs tracking-[0.4em] text-olive-light uppercase mb-2">El código de vestimenta es</p>
        <p className="font-script text-6xl text-olive mt-2">Elegante</p>
      </section>

      <FloralDivider />

      {/* RSVP */}
      <section id="rsvp" className="px-6 py-20 text-center">
        <p className="text-xs tracking-[0.4em] text-olive-light uppercase mb-2">Te esperamos</p>
        <h2 className="font-script text-5xl text-olive">Confirmá tu asistencia</h2>
        <RsvpForm />
      </section>

      <FloralDivider />

      {/* REGALOS + ALIAS */}
      <section className="px-6 py-20 text-center">
        <p className="text-xs tracking-[0.4em] text-olive-light uppercase mb-2">Un obsequio</p>
        <h2 className="font-script text-5xl text-olive">Lista de regalos</h2>
        <p className="mt-6 max-w-sm mx-auto text-base text-ink leading-relaxed">
          Si está en tu corazón hacernos un obsequio, preparamos una lista para que sea más fácil elegir.
        </p>
        <Link
          href="/regalos"
          className="mt-8 inline-block rounded-full border border-olive px-10 py-3 text-sm tracking-widest text-olive uppercase transition hover:bg-olive hover:text-cream"
        >
          Ver lista
        </Link>

        <div className="mt-16 max-w-xs mx-auto border-t border-olive/20 pt-10">
          <p className="text-xs tracking-[0.4em] text-olive-light uppercase">O por transferencia</p>
          <p className="mt-4 font-script text-5xl text-olive">amaya.luciano</p>
          <p className="mt-2 text-sm text-olive-light">Alias · Banco Galicia</p>
        </div>
      </section>

      {/* Footer con imagen decorativa */}
      <div className="relative h-40 overflow-hidden">
        <Image
          src="/arch-botanical.jpg"
          alt=""
          width={640}
          height={860}
          className="w-full object-cover object-top opacity-25"
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-b from-cream to-transparent" />
      </div>

      <footer className="pb-10 text-center text-sm text-olive-light">
        Isabella &amp; Luciano · 21/11/2026
      </footer>
    </main>
  );
}
