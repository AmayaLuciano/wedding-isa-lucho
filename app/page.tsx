import FloralDivider from "@/components/FloralDivider";
import Countdown from "@/components/Countdown";
import RsvpForm from "@/components/RsvpForm";
import Link from "next/link";
import Image from "next/image";

const WEDDING_DATE = "2026-11-21T16:00:00-03:00";

export default function Home() {
  return (
    <main className="min-h-screen bg-cream">

      {/* HERO — arco con personas */}
      <section className="relative flex flex-col items-center justify-center text-center">
        <div className="relative w-full max-w-lg mx-auto">
          <Image
            src="/arch-party.jpg"
            alt="Isabella y Luciano"
            width={640}
            height={860}
            className="w-full"
            priority
          />
          {/* Texto superpuesto dentro del arco */}
          <div className="absolute inset-0 flex flex-col items-center justify-start pt-[18%] px-8">
            <p className="text-olive/80 text-base sm:text-lg leading-relaxed max-w-xs">
              Con mucha alegría te invitamos a compartir nuestro casamiento
            </p>
            <h1 className="font-script text-5xl sm:text-6xl text-olive mt-4 leading-tight">
              Isabella y Luciano
            </h1>
            <p className="mt-3 text-xl sm:text-2xl tracking-widest text-gold uppercase">
              21 de Noviembre de 2026
            </p>
            <div className="mt-4">
              <Countdown targetDate={WEDDING_DATE} />
            </div>
          </div>
        </div>
      </section>

      {/* CRONOGRAMA — arco botánico de fondo */}
      <section className="relative text-center">
        <div className="relative w-full max-w-lg mx-auto">
          <Image
            src="/arch-botanical.jpg"
            alt=""
            width={640}
            height={860}
            className="w-full"
            aria-hidden
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center px-16 pb-[15%]">
            <h2 className="font-script text-4xl sm:text-5xl text-olive">Programa</h2>
            <div className="mt-6 space-y-5 text-base sm:text-lg text-ink">
              <div>
                <p className="text-gold tracking-widest uppercase text-sm">16:00 hs</p>
                <p>Ceremonia</p>
                <p className="text-xs text-olive-light">Iglesia Evangélica Bautista de Haedo</p>
                <p className="text-xs text-olive-light">Chacabuco 289, Haedo</p>
              </div>
              <div>
                <p className="text-gold tracking-widest uppercase text-sm">18:00 hs</p>
                <p>Celebración · Brindis</p>
                <p className="text-xs text-olive-light">Agrelo 1013, Francisco Álvarez</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VESTIMENTA */}
      <section className="px-6 py-16 text-center">
        <p className="text-sm tracking-widest text-olive uppercase">El código de vestimenta es</p>
        <p className="font-script text-5xl text-olive mt-2">Elegante</p>
      </section>

      <FloralDivider />

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
        Isabella &amp; Luciano · 21/11/2026
      </footer>
    </main>
  );
}
