import Monogram from "@/components/Monogram";
import FloralDivider from "@/components/FloralDivider";
import Countdown from "@/components/Countdown";
import RsvpForm from "@/components/RsvpForm";
import Link from "next/link";

const WEDDING_DATE = "2026-03-14T16:00:00-03:00";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* HERO */}
      <section className="flex flex-col items-center justify-center px-6 py-24 text-center">
        <Monogram size={140} />
        <p className="reveal mt-8 max-w-md text-xl text-olive leading-relaxed">
          Con mucha alegría te invitamos a compartir nuestro casamiento
        </p>
        <h1 className="reveal mt-6 font-script text-6xl text-olive sm:text-7xl">
          Isabella y Luciano
        </h1>
        <p className="reveal mt-6 text-3xl text-gold">14 de marzo de 2026</p>
        <FloralDivider />
        <Countdown targetDate={WEDDING_DATE} />
      </section>

      {/* CRONOGRAMA */}
      <section className="px-6 py-16 text-center">
        <h2 className="font-script text-4xl text-olive">Programa</h2>
        <FloralDivider />
        <div className="mx-auto mt-8 max-w-md space-y-6 text-lg text-ink">
          <div>
            <p className="text-gold text-xl">16:00 hs</p>
            <p>Ceremonia · Iglesia Evangélica Bautista de Haedo</p>
            <p className="text-sm text-olive-light">Chacabuco 289, Haedo</p>
          </div>
          <div>
            <p className="text-gold text-xl">18:00 hs</p>
            <p>Celebración</p>
            <p className="text-sm text-olive-light">Agrelo 1013, Francisco Álvarez</p>
          </div>
        </div>
      </section>

      {/* VESTIMENTA */}
      <section className="bg-olive/5 px-6 py-16 text-center">
        <h2 className="text-2xl tracking-widest text-olive">EL CÓDIGO DE VESTIMENTA ES</h2>
        <p className="font-script text-5xl text-olive mt-2">Elegante</p>
      </section>

      {/* RSVP */}
      <section id="rsvp" className="px-6 py-16 text-center">
        <h2 className="font-script text-4xl text-olive">Confirmá tu asistencia</h2>
        <FloralDivider />
        <RsvpForm />
      </section>

      {/* LINK A REGALOS + ALIAS */}
      <section className="px-6 py-20 text-center">
        <FloralDivider />
        <p className="mt-6 max-w-md mx-auto text-lg text-ink">
          Si está en tu corazón el hacernos un obsequio, preparamos una lista para que sea más fácil elegir.
        </p>
        <Link
          href="/regalos"
          className="mt-8 inline-block rounded-full border border-olive px-8 py-3 text-olive transition hover:bg-olive hover:text-cream"
        >
          Ver lista de regalos
        </Link>
        <div className="mt-10 border-t border-olive/20 pt-10">
          <p className="text-sm tracking-widest text-olive-light uppercase">También podés hacernos una transferencia</p>
          <p className="mt-3 font-script text-4xl text-olive">amaya.luciano</p>
          <p className="mt-1 text-sm text-olive-light">Alias CBU · Banco Galicia</p>
        </div>
      </section>

      <footer className="pb-10 text-center text-sm text-olive-light">
        Isabella &amp; Luciano · 14/03/2026
      </footer>
    </main>
  );
}
