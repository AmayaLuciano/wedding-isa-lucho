export default function Monogram({ size = 120, color = "#8B9485" }: { size?: number; color?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <text
        x="38"
        y="120"
        fontFamily="var(--font-script), cursive"
        fontSize="110"
        fill={color}
      >
        I
      </text>
      <text
        x="92"
        y="150"
        fontFamily="var(--font-script), cursive"
        fontSize="90"
        fill={color}
      >
        L
      </text>
    </svg>
  );
}
