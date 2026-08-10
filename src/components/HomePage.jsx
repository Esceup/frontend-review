import { Link } from "react-router-dom";
import { useProgress } from "../context/ProgressContext";

export default function HomePage() {
  const { stats } = useProgress();

  return (
    <div>
      <div className="card relative mb-6 overflow-hidden p-6 md:p-8">
        <div
          className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full opacity-20 blur-3xl"
          style={{
            background: "radial-gradient(circle, #43d2ff, transparent 70%)",
          }}
        />
        {/* <p className="mb-3 font-mono text-xs text-lvl-3">
          // spaced repetition · anki mode
        </p> */}
        <h1 className="mb-3 font-display text-2xl font-bold md:text-3xl">
          Выжимка к <span className="text-accent-css">frontend</span>{" "}
          <span className="text-accent-html">собеседованию</span>
        </h1>
        <p className="mb-6 max-w-xl text-sm leading-relaxed text-mist-400">
          Отвечай вслух, сверяйся с ответом, оценивай себя честно. Система сама
          подскажет, когда повторить: сразу → 2 дня → 3 дня → 7 дней.
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <Link
            to="/review"
            className="rounded-lg bg-accent-css px-6 py-3 font-display text-sm font-bold text-ink-950 shadow-lg shadow-accent-css/20 transition hover:-translate-y-0.5 hover:shadow-accent-css/40"
          >
             Повторить вопросы{stats.due > 0 ? ` (${stats.due})` : ""}
          </Link>
          <div className="flex gap-5 font-mono text-xs text-mist-500">
            <span>
              <b className="text-lvl-0">{stats.due}</b> созрело
            </span>
            <span>
              <b className="text-mist-300">{stats.fresh}</b> новых
            </span>
            <span>
              <b className="text-lvl-3">{stats.learned}</b> в очереди
            </span>
          </div>
        </div>
      </div>

      <h2 className="mb-3 font-mono text-xs uppercase tracking-widest text-mist-500">
        // разделы
      </h2>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {stats.sections.map((s) => {
          const seen = s.due + s.learned;
          const percent = s.total ? Math.round((seen / s.total) * 100) : 0;
          return (
            <Link
              key={s.id}
              to={`/section/${s.id}`}
              className="card group p-5 transition-all hover:-translate-y-1 hover:shadow-xl"
              style={{ borderTopWidth: 3, borderTopColor: s.accent }}
            >
              <div className="mb-3 flex items-center justify-between">
                <h3
                  className="font-display text-base font-semibold"
                  style={{ color: s.accent }}
                >
                  {s.title}
                </h3>
                {s.due > 0 && (
                  <span className="rounded-full bg-lvl-0/15 px-2 py-0.5 font-mono text-[11px] text-lvl-0">
                    {s.due} повторить
                  </span>
                )}
              </div>
              <div className="mb-3 flex items-center gap-2">
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-ink-700">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{ width: `${percent}%`, background: s.accent }}
                  />
                </div>
                <span className="font-mono text-xs text-mist-500">
                  {percent}%
                </span>
              </div>
              <p className="font-mono text-[11px] text-mist-500">
                {s.total} вопросов · {s.topics.length} тем
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
