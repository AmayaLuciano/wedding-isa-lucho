"use client";

import { useEffect, useState } from "react";

function getTimeLeft(target: string) {
  const diff = +new Date(target) - +new Date();
  if (diff <= 0) return null;
  return {
    días: Math.floor(diff / (1000 * 60 * 60 * 24)),
    horas: Math.floor((diff / (1000 * 60 * 60)) % 24),
    min: Math.floor((diff / 1000 / 60) % 60),
  };
}

export default function Countdown({ targetDate }: { targetDate: string }) {
  const [timeLeft, setTimeLeft] = useState<ReturnType<typeof getTimeLeft>>(null);

  useEffect(() => {
    setTimeLeft(getTimeLeft(targetDate));
    const id = setInterval(() => setTimeLeft(getTimeLeft(targetDate)), 60000);
    return () => clearInterval(id);
  }, [targetDate]);

  if (!timeLeft) return null;

  return (
    <div className="mt-4 flex gap-8 text-olive">
      {Object.entries(timeLeft).map(([label, value]) => (
        <div key={label} className="flex flex-col items-center">
          <span className="text-3xl font-medium">{value}</span>
          <span className="text-xs uppercase tracking-widest text-olive-light">{label}</span>
        </div>
      ))}
    </div>
  );
}
