/**
 * Ilustraciones botánicas line-art, al estilo del "croquelado" de la
 * invitación física. Trazo fino, sin relleno, hereda el color vía
 * currentColor para poder teñirlas con la paleta oliva de forma sutil.
 */

// —— Primitivas reutilizables ——————————————————————————

function Flower({ cx, cy, s = 1, rot = 0 }: { cx: number; cy: number; s?: number; rot?: number }) {
  const petal = "M0 0 C -10 -12 -8 -31 0 -38 C 8 -31 10 -12 0 0 Z";
  return (
    <g transform={`translate(${cx} ${cy}) rotate(${rot}) scale(${s})`}>
      {[0, 72, 144, 216, 288].map((a) => (
        <path key={a} d={petal} transform={`rotate(${a})`} />
      ))}
      <circle cx="0" cy="0" r="6.5" />
      {[30, 150, 270, 90, 210, 330].map((a, i) => {
        const r = 3.2;
        const x = Math.cos((a * Math.PI) / 180) * r;
        const y = Math.sin((a * Math.PI) / 180) * r;
        return <circle key={i} cx={x} cy={y} r="0.9" />;
      })}
    </g>
  );
}

function Leaf({ x, y, rot = 0, s = 1 }: { x: number; y: number; rot?: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
      <path d="M0 0 C -9 -9 -9 -23 0 -31 C 9 -23 9 -9 0 0 Z" />
      <path d="M0 -3 L0 -29" />
      <path d="M0 -11 L -5 -16 M0 -16 L -6 -21 M0 -11 L 5 -16 M0 -16 L 6 -21" strokeWidth="0.7" />
    </g>
  );
}

function Bud({ x, y, rot = 0, s = 1 }: { x: number; y: number; rot?: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
      <path d="M0 0 C -6 -6 -6 -19 0 -25 C 6 -19 6 -6 0 0 Z" />
      <path d="M0 0 C -3 -5 -3 -9 0 -12 M0 0 C 3 -5 3 -9 0 -12" strokeWidth="0.7" />
    </g>
  );
}

// —— Composiciones ————————————————————————————————————

/** Ramo de esquina — para enmarcar sutilmente las esquinas de una sección. */
export function BotanicalCorner({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.1"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* tallos */}
      <path d="M4 40 C 40 55 70 55 110 40 C 135 30 150 22 168 12" />
      <path d="M40 49 C 45 70 42 92 30 112" />
      <path d="M92 45 C 108 60 118 78 120 100" />
      <Leaf x={30} y={112} rot={200} s={0.9} />
      <Leaf x={120} y={100} rot={150} s={0.85} />
      <Leaf x={150} y={26} rot={40} s={0.8} />
      <Bud x={168} y={12} rot={35} s={0.9} />
      <Flower cx={62} cy={44} s={1.05} rot={-10} />
      <Flower cx={112} cy={62} s={0.7} rot={20} />
    </svg>
  );
}

/** Rama vertical — acento delicado en los bordes laterales. */
export function BotanicalBranch({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 110 460"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.1"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M55 460 C 40 380 70 320 55 250 C 42 195 70 140 58 80 C 52 50 55 25 55 8" />
      <Leaf x={55} y={410} rot={-55} s={1} />
      <Leaf x={55} y={360} rot={60} s={0.95} />
      <Bud x={57} y={300} rot={-25} s={1} />
      <Flower cx={55} cy={235} s={1.1} rot={0} />
      <Leaf x={55} y={185} rot={-60} s={0.95} />
      <Leaf x={55} y={140} rot={55} s={0.9} />
      <Flower cx={56} cy={85} s={0.8} rot={15} />
      <Bud x={55} y={30} rot={10} s={0.9} />
    </svg>
  );
}

/** Ramita horizontal pequeña — acento centrado bajo los títulos. */
export function BotanicalSprig({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 160 50"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.1"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M10 25 C 40 25 55 25 80 25 C 105 25 120 25 150 25" strokeWidth="0.8" />
      <Leaf x={52} y={25} rot={-90} s={0.7} />
      <Leaf x={108} y={25} rot={90} s={0.7} />
      <Flower cx={80} cy={25} s={0.62} />
    </svg>
  );
}
