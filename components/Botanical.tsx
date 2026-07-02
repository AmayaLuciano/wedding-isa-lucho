/**
 * Ilustraciones botánicas line-art — ramilletes de florcitas delicadas
 * sobre tallos aireados (punto medio entre espigas de lavanda y flores).
 * Trazo fino, sin color, hereda el tono oliva vía currentColor.
 */

// —— Primitivas ————————————————————————————————————————

/** Florcita de 5 pétalos, pequeña y delicada. */
function Floret({ x, y, s = 1, rot = 0 }: { x: number; y: number; s?: number; rot?: number }) {
  const petal = "M0 0 C -3.4 -4 -3 -10 0 -12 C 3 -10 3.4 -4 0 0 Z";
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
      {[0, 72, 144, 216, 288].map((a) => (
        <path key={a} d={petal} transform={`rotate(${a})`} />
      ))}
      <circle cx="0" cy="0" r="1.8" />
    </g>
  );
}

/** Capullo cerrado. */
function Bud({ x, y, rot = 0, s = 1 }: { x: number; y: number; rot?: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
      <path d="M0 0 C -2.6 -3 -2.6 -8 0 -11 C 2.6 -8 2.6 -3 0 0 Z" />
      <path d="M0 0 C -1.4 -2.5 -1.4 -5 0 -7 M0 0 C 1.4 -2.5 1.4 -5 0 -7" strokeWidth="0.7" />
    </g>
  );
}

/** Hoja angosta. */
function Leaf({ x, y, rot = 0, s = 1 }: { x: number; y: number; rot?: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
      <path d="M0 0 C -3.5 -14 -3.5 -30 0 -40 C 3.5 -30 3.5 -14 0 0 Z" />
      <path d="M0 -3 L0 -36" strokeWidth="0.7" />
    </g>
  );
}

/** Ramillete de florcitas: abanico de tallos con flores, capullos y hojas. Base (0,0), apunta arriba. */
function FlowerSpray({ s = 1 }: { s?: number }) {
  return (
    <g transform={`scale(${s})`}>
      {/* hojas en la base */}
      <Leaf x={-3} y={2} rot={-38} s={0.7} />
      <Leaf x={3} y={2} rot={36} s={0.7} />
      {/* tallos */}
      <path d="M0 0 C -1 -20 1 -40 0 -55" />
      <path d="M0 0 C -5 -16 -11 -30 -13 -46" />
      <path d="M0 0 C 5 -16 11 -30 13 -46" />
      <path d="M0 0 C -2 -12 -6 -22 -7 -32" />
      <path d="M0 0 C 2 -12 6 -22 7 -32" />
      {/* capullos en los tallos internos */}
      <Bud x={-7} y={-32} rot={-18} s={1} />
      <Bud x={7} y={-32} rot={18} s={1} />
      {/* flores en las puntas */}
      <Floret x={-13} y={-46} s={0.92} rot={-12} />
      <Floret x={13} y={-46} s={0.92} rot={12} />
      <Floret x={0} y={-55} s={1.08} />
    </g>
  );
}

// —— Composiciones ————————————————————————————————————

/** Ramillete de esquina. */
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
      <g transform="translate(50 172) rotate(26)">
        <FlowerSpray s={1.9} />
      </g>
    </svg>
  );
}

/** Rama vertical para bordes laterales. */
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
      <g transform="translate(55 260)">
        <FlowerSpray s={2.8} />
      </g>
    </svg>
  );
}

/** Ramita horizontal centrada bajo los títulos. */
export function BotanicalSprig({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 160 56"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.1"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M14 40 C 45 40 58 40 80 40 C 102 40 115 40 146 40" strokeWidth="0.8" />
      <Leaf x={58} y={40} rot={-92} s={0.55} />
      <Leaf x={102} y={40} rot={92} s={0.55} />
      <Bud x={72} y={30} rot={-14} s={0.9} />
      <Bud x={88} y={30} rot={14} s={0.9} />
      <Floret x={80} y={26} s={1.05} />
    </svg>
  );
}
