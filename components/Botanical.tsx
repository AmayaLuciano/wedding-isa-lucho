/**
 * Ilustraciones botánicas line-art de LAVANDA, al tono oliva de la web.
 * Trazo fino, sin relleno de color, hereda el color vía currentColor.
 */

// —— Primitivas reutilizables ——————————————————————————

/** Espiga de lavanda: tallo con florcitas en la parte superior, apunta hacia arriba. */
function Lavender({ x, y, rot = 0, s = 1 }: { x: number; y: number; rot?: number; s?: number }) {
  // filas de florcitas (y, separación lateral, tamaño) — se afinan hacia la punta
  const rows: [number, number, number][] = [
    [-22, 5.0, 3.1],
    [-27, 5.1, 3.1],
    [-32, 4.7, 2.9],
    [-37, 4.2, 2.6],
    [-42, 3.6, 2.4],
    [-47, 2.9, 2.1],
    [-51, 2.2, 1.8],
    [-55, 1.4, 1.6],
  ];
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
      {/* tallo */}
      <path d="M0 0 C -1.5 -8 1.5 -16 0 -24" strokeWidth="1" />
      {/* punta */}
      <path d="M0 -55 C -1.4 -58 1.4 -58 0 -61" strokeWidth="0.9" />
      {rows.map(([fy, dx, r], i) => (
        <g key={i}>
          <ellipse cx={-dx} cy={fy} rx={r * 0.62} ry={r} transform={`rotate(-28 ${-dx} ${fy})`} />
          <ellipse cx={dx} cy={fy} rx={r * 0.62} ry={r} transform={`rotate(28 ${dx} ${fy})`} />
        </g>
      ))}
      {/* florcita en la punta */}
      <ellipse cx={0} cy={-58} rx={1.1} ry={1.7} />
    </g>
  );
}

/** Hoja angosta de lavanda. */
function Leaf({ x, y, rot = 0, s = 1 }: { x: number; y: number; rot?: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
      <path d="M0 0 C -3.5 -16 -3.5 -34 0 -44 C 3.5 -34 3.5 -16 0 0 Z" />
      <path d="M0 -3 L0 -40" strokeWidth="0.7" />
    </g>
  );
}

/** Ramillete de lavanda: abanico de espigas + hojas, base en (0,0), apunta hacia arriba. */
function LavenderBunch({ s = 1 }: { s?: number }) {
  return (
    <g transform={`scale(${s})`}>
      <Leaf x={-2} y={2} rot={-34} s={0.72} />
      <Leaf x={2} y={2} rot={32} s={0.72} />
      <Lavender x={0} y={0} rot={-20} s={0.95} />
      <Lavender x={0} y={0} rot={-6} s={1.12} />
      <Lavender x={0} y={0} rot={9} s={1.0} />
      <Lavender x={0} y={0} rot={22} s={0.88} />
    </g>
  );
}

// —— Composiciones ————————————————————————————————————

/** Ramillete de esquina — enmarca sutilmente las esquinas de una sección. */
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
      <g transform="translate(52 170) rotate(28)">
        <LavenderBunch s={1.7} />
      </g>
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
      <g transform="translate(55 250)">
        <LavenderBunch s={2.6} />
      </g>
    </svg>
  );
}

/** Ramita horizontal pequeña — acento centrado bajo los títulos. */
export function BotanicalSprig({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 160 60"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.1"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M14 46 C 45 46 58 46 80 46 C 102 46 115 46 146 46" strokeWidth="0.8" />
      <Leaf x={60} y={46} rot={-92} s={0.6} />
      <Leaf x={100} y={46} rot={92} s={0.6} />
      <g transform="translate(80 48)">
        <Lavender x={-7} y={0} rot={-18} s={0.62} />
        <Lavender x={0} y={0} rot={0} s={0.72} />
        <Lavender x={7} y={0} rot={18} s={0.62} />
      </g>
    </svg>
  );
}
