export default function Answer({ text = "" }) {
  // Дополнительная страховка: если передали явно null или undefined
  if (!text) return null;

  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);

  return (
    <p className="text-[15px] leading-relaxed text-mist-300">
      {parts.map((p, i) => {
        if (p.startsWith("**") && p.endsWith("**")) {
          return (
            <strong key={i} className="font-semibold text-mist-100">
              {p.slice(2, -2)}
            </strong>
          );
        }
        if (p.startsWith("`") && p.endsWith("`")) {
          return (
            <code
              key={i}
              className="rounded border border-ink-600 bg-ink-850 px-1.5 py-0.5 font-mono text-[13px] text-accent-css"
            >
              {p.slice(1, -1)}
            </code>
          );
        }
        return p;
      })}
    </p>
  );
}
