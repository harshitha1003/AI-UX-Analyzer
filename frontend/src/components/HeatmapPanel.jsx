import { useMemo } from "react";

const positions = [
  [24, 30],
  [50, 26],
  [76, 34],
  [28, 70],
  [54, 68],
  [78, 72],
];

export default function HeatmapPanel({ data = [] }) {
  const points = useMemo(() => {
    const max = Math.max(1, ...data.map((item) => Number(item.value) || 0));
    return data.map((item, index) => {
      const value = Number(item.value) || 0;
      const intensity = value / max;
      const [x, y] = positions[index] || [50, 50];
      return {
        ...item,
        x,
        y,
        value,
        size: 78 + intensity * 58,
        opacity: 0.14 + intensity * 0.52,
      };
    });
  }, [data]);

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft dark:border-slate-800 dark:bg-slate-900">
      <h3 className="mb-4 text-base font-bold">UX Problem Heatmap</h3>
      <div className="relative h-80 overflow-hidden rounded-lg border border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-950">
        <div className="absolute inset-0 grid grid-cols-3 grid-rows-2">
          {points.map((point) => (
            <div key={point.area} className="relative border border-slate-200/70 p-3 dark:border-slate-800/80">
              <span className="relative z-20 rounded bg-white/90 px-2 py-1 text-xs font-semibold text-slate-800 shadow-sm dark:bg-slate-900/90 dark:text-slate-100">
                {point.area}: {point.value}
              </span>
            </div>
          ))}
        </div>
        {points.map((point) => (
          <div
            key={`${point.area}-hotspot`}
            className="pointer-events-none absolute rounded-full blur-2xl"
            style={{
              left: `${point.x}%`,
              top: `${point.y}%`,
              width: `${point.size}px`,
              height: `${point.size}px`,
              opacity: point.opacity,
              transform: "translate(-50%, -50%)",
              background:
                point.value === 0
                  ? "#94a3b8"
                  : "radial-gradient(circle, #ef4444 0%, #f97316 42%, #facc15 78%, transparent 100%)",
            }}
          />
        ))}
      </div>
    </section>
  );
}
