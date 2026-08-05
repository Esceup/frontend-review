import { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import {
  SECTIONS,
  allQuestions,
  getSection,
  getTopic,
  DATA
} from "../data/questions/index";
import { useProgress, formatNext } from "../context/ProgressContext";
import Answer from "./Answer";
import RateButtons from "./RateButtons";

const STATUS = {
  new: { label: "новая", cls: "border-ink-600 text-mist-400" },
  due: { label: "созрела", cls: "border-lvl-0/50 text-lvl-0" },
  scheduled: { label: "в очереди", cls: "border-lvl-2/40 text-lvl-2" },
};

function QuestionRow({ q, accent }) {
  const { statusOf, rateCard, cards } = useProgress();
  const [open, setOpen] = useState(false);
  const st = statusOf(q.id);
  const card = cards[q.id];

  return (
    <div
      className={`card overflow-hidden transition-colors ${
        open ? "border-[color:var(--acc)]" : "hover:border-ink-500"
      }`}
      style={{ "--acc": accent, borderLeftWidth: 3, borderLeftColor: accent }}
    >
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-start gap-3 px-4 py-3.5 text-left"
      >
        {q.hot && (
          <span className="mt-0.5 text-sm" title="Часто спрашивают">
            🔥
          </span>
        )}
        <div className="min-w-0 flex-1">
          <p className="font-semibold leading-snug text-mist-100">{q.q}</p>
          <div className="mt-1.5 flex flex-wrap items-center gap-2 font-mono text-[11px]">
            <span
              className={`rounded-full border px-2 py-0.5 ${STATUS[st].cls}`}
            >
              {STATUS[st].label}
            </span>
            {card && (
              <span className="text-mist-500">
                повтор: {formatNext(card.next)}
              </span>
            )}
          </div>
        </div>
        <span
          className={`mt-1 text-mist-500 transition-transform ${open ? "rotate-180" : ""}`}
        >
          ▾
        </span>
      </button>

      {open && (
        <div className="space-y-4 border-t border-dashed border-ink-600 px-4 pb-4 pt-3">
          <Answer text={q.a} />
          <RateButtons onRate={(lvl) => rateCard(q.id, lvl)} />
        </div>
      )}
    </div>
  );
}

export default function SectionDetail() {
  const { section: sectionId, topic: topicId } = useParams();
  const { stats } = useProgress();
  const data = DATA.sections.find((s) => s.id === sectionId);

  if (!data) return <Navigate to="/" replace />;

  const sStats = stats.sections.find((s) => s.id === sectionId);
  const activeTopic = topicId
    ? data.topics.find((t) => t.id === topicId)
    : null;

  // Режим темы: список вопросов
  if (activeTopic) {
    return (
      <div>
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="mb-1 font-display text-xl font-bold">
              <span style={{ color: data.accent }}>{data.title}</span> /{" "}
              {activeTopic.title}
            </h1>
            <p className="font-mono text-xs text-mist-500">
              {activeTopic.questions.length} вопросов ·{" "}
              {activeTopic.questions.filter((q) => q.hot).length} 🔥 важных
            </p>
          </div>
          <Link
            to={`/review/${data.id}/${activeTopic.id}`}
            className="rounded-lg border border-ink-600 bg-ink-750 px-4 py-2 text-sm font-medium transition hover:border-[color:var(--acc)]"
            style={{ "--acc": data.accent }}
          >
            ▶ Учить тему
          </Link>
        </div>

        <div className="space-y-2.5">
          {activeTopic.questions.map((q) => (
            <QuestionRow key={q.id} q={q} accent={data.accent} />
          ))}
        </div>
      </div>
    );
  }

  // Режим секции: сетка тем
  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1
            className="mb-1 font-display text-2xl font-bold"
            style={{ color: data.accent }}
          >
            {data.title}
          </h1>
          <p className="font-mono text-xs text-mist-500">
            {sStats.total} вопросов · выучено {sStats.learned} · созрело{" "}
            {sStats.due}
          </p>
        </div>
        <Link
          to={`/review/${data.id}`}
          className="rounded-lg px-5 py-2.5 font-display text-sm font-bold text-ink-950 transition hover:-translate-y-0.5"
          style={{ background: data.accent }}
        >
          🔁 Повторять раздел
        </Link>
      </div>

      {data.topics.length === 0 ? (
        <p className="card p-6 text-center font-mono text-sm text-mist-500">
          Раздел в разработке — вопросы появятся позже
        </p>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {data.topics.map((t) => {
            const ts = sStats.topics.find((x) => x.id === t.id);
            const seen = ts.due + ts.learned;
            const percent = t.questions.length
              ? Math.round((seen / t.questions.length) * 100)
              : 0;
            return (
              <Link
                key={t.id}
                to={`/section/${data.id}/${t.id}`}
                className="card group p-4 transition-all hover:-translate-y-1 hover:border-[color:var(--acc)]"
                style={{ "--acc": data.accent }}
              >
                <div className="mb-2 flex items-center justify-between gap-2">
                  <h3 className="font-semibold leading-tight group-hover:text-[color:var(--acc)]">
                    {t.title}
                  </h3>
                  {ts.due > 0 && (
                    <span className="shrink-0 rounded-full bg-lvl-0/15 px-2 py-0.5 font-mono text-[10px] text-lvl-0">
                      {ts.due} 🔔
                    </span>
                  )}
                </div>
                <div className="mb-2 h-1.5 overflow-hidden rounded-full bg-ink-700">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${percent}%`, background: data.accent }}
                  />
                </div>
                <p className="font-mono text-[11px] text-mist-500">
                  {t.questions.length} вопросов
                  {ts.hot > 0 && (
                    <span className="text-lvl-1"> · 🔥 {ts.hot}</span>
                  )}
                </p>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
