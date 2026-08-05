import { LEVELS } from "../context/ProgressContext";

export default function RateButtons({ onRate }) {
  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
      {LEVELS.map((l) => (
        <button
          key={l.key}
          onClick={() => onRate(l.key)}
          className="rounded-lg border px-3 py-2.5 text-left transition-all hover:-translate-y-0.5 hover:shadow-lg"
          style={{ borderColor: l.color + "55", background: l.color + "0d" }}
        >
          <span className="block text-sm font-semibold" style={{ color: l.color }}>
            {l.label}
          </span>
          <span className="block font-mono text-[11px] text-mist-500">
            повтор через {l.days} дн.
          </span>
        </button>
      ))}
    </div>
  );
}