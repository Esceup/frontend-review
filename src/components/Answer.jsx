export default function Answer({ text = "", shortAnswer = "" }) {
  if (!text && !shortAnswer) return null;

  const renderInline = (str) => {
    const parts = str.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
    return parts.map((p, i) => {
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
    });
  };

  return (
    <div className="space-y-3">
      {shortAnswer && (
        <div className="rounded-lg border border-ink-600 bg-ink-850 px-4 py-3">
          <p className="mb-1.5 font-mono text-[11px] font-bold uppercase tracking-wider text-accent-css">
            Кратко
          </p>
          <p className="whitespace-pre-line text-[14px] leading-relaxed text-mist-200">
            {renderInline(shortAnswer)}
          </p>
        </div>
      )}
      {text && (
        <p className="whitespace-pre-line text-[15px] leading-relaxed text-mist-300">
          {renderInline(text)}
        </p>
      )}
    </div>
  );
}
