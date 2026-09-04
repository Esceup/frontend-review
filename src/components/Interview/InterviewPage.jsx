// src/components/Interview/InterviewPage.jsx
import { useState, useCallback, Fragment } from "react";
import { INTERVIEW_SECTIONS } from "../../data/interview";
import CodePreview from "./CodePreview";

// ─── Рендер контента ответа ───────────────────────
function renderInline(str) {
  if (!str) return null;
  const parts = str.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
  return parts.map((p, i) => {
    if (p.startsWith("**") && p.endsWith("**"))
      return (
        <strong key={i} className="font-semibold text-mist-100">
          {p.slice(2, -2)}
        </strong>
      );
    if (p.startsWith("`") && p.endsWith("`"))
      return (
        <code
          key={i}
          className="rounded border border-ink-600 bg-ink-850 px-1.5 py-0.5 font-mono text-[13px] text-accent-css"
        >
          {p.slice(1, -1)}
        </code>
      );
    return p;
  });
}

function AnswerBlock({ block }) {
  switch (block.type) {
    case "text":
      return (
        <div className="space-y-3">
          {block.content.split("\n\n").map((para, i) => (
            <p key={i} className="text-[14px] leading-relaxed text-mist-300">
              {renderInline(para)}
            </p>
          ))}
        </div>
      );
    case "bullets":
      return (
        <ul className="space-y-2">
          {block.items.map((item, i) => (
            <li
              key={i}
              className="flex gap-2 text-[14px] leading-relaxed text-mist-300"
            >
              <span className="mt-0.5 text-accent-css">▸</span>
              <span>{renderInline(item)}</span>
            </li>
          ))}
        </ul>
      );
    case "code":
      return (
        <CodePreview
          code={block.content}
          title={block.title}
          lang={block.lang}
        />
      );
    case "tip":
      return (
        <div className="rounded-lg border border-lvl-1/30 bg-lvl-1/10 p-4">
          <p className="mb-1 font-mono text-[11px] font-bold uppercase tracking-wider text-lvl-1">
            💡 Важно
          </p>
          <p className="text-[13px] leading-relaxed text-mist-300">
            {renderInline(block.content)}
          </p>
        </div>
      );
    default:
      return null;
  }
}

// ─── Follow-up вопрос ─────────────────────────────
function FollowUp({ fu }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-lg border border-ink-600 bg-ink-850">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-start gap-2 px-4 py-3 text-left"
      >
        <span className="text-lvl-0">🔥</span>
        <span className="flex-1 text-[13px] font-medium text-mist-200">
          {fu.question}
        </span>
        <span
          className={`mt-0.5 text-mist-500 transition-transform ${open ? "rotate-180" : ""}`}
        >
          ▾
        </span>
      </button>
      {open && (
        <div className="border-t border-dashed border-ink-600 px-4 py-3">
          <p className="text-[13px] leading-relaxed text-mist-400">
            {renderInline(fu.answer)}
          </p>
          {fu.code && (
            <div className="mt-3">
              <CodePreview code={fu.code} title="follow-up.ts" />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Карточка вопроса ─────────────────────────────
function InterviewCard({ q, accent }) {
  const [open, setOpen] = useState(false);
  const [showFollowUps, setShowFollowUps] = useState(false);

  return (
    <div
      className={`card overflow-hidden transition-colors ${
        open ? "border-[color:var(--acc)]" : "hover:border-ink-500"
      }`}
      style={{ "--acc": accent, borderLeftWidth: 3, borderLeftColor: accent }}
    >
      {/* Заголовок */}
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-start gap-3 px-4 py-4 text-left"
      >
        {q.hot && <span className="mt-0.5 text-sm">🔥</span>}
        <div className="min-w-0 flex-1">
          <div className="mb-1.5 flex flex-wrap items-center gap-2">
            {q.tag && (
              <span
                className={`rounded-full px-2 py-0.5 font-mono text-[10px] font-bold ${
                  q.tag === "amoCRM"
                    ? "bg-lvl-2/15 text-lvl-2"
                    : "bg-lvl-3/15 text-lvl-3"
                }`}
              >
                {q.tag}
              </span>
            )}
          </div>
          <h3 className="font-semibold leading-snug text-mist-100">
            {q.question}
          </h3>
          {open && (
            <p className="mt-2 text-[13px] leading-relaxed text-mist-400">
              {q.summary}
            </p>
          )}
        </div>
        <span
          className={`mt-1 text-mist-500 transition-transform ${open ? "rotate-180" : ""}`}
        >
          ▾
        </span>
      </button>

      {/* Развёрнутый ответ */}
      {open && (
        <div className="space-y-4 border-t border-dashed border-ink-600 px-4 pb-5 pt-4">
          {q.details.map((block, i) => (
            <AnswerBlock key={i} block={block} />
          ))}

          {/* Ключевые слова */}
          {q.keywords && q.keywords.length > 0 && (
            <div className="rounded-lg border border-ink-600 bg-ink-850 p-3">
              <p className="mb-2 font-mono text-[11px] uppercase tracking-wider text-mist-500">
                🎯 Ключевые слова для ответа
              </p>
              <div className="flex flex-wrap gap-1.5">
                {q.keywords.map((kw, i) => (
                  <span
                    key={i}
                    className="rounded-full bg-ink-700 px-2.5 py-1 font-mono text-[11px] text-mist-300"
                  >
                    {kw}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Follow-ups */}
          {q.followUps && q.followUps.length > 0 && (
            <div>
              <button
                onClick={() => setShowFollowUps(!showFollowUps)}
                className="mb-2 flex items-center gap-2 font-mono text-xs text-lvl-0 transition hover:text-lvl-1"
              >
                🔥 Прожарка: {q.followUps.length} follow-up вопрос
                {q.followUps.length > 1 ? "а" : ""} {showFollowUps ? "▲" : "▼"}
              </button>
              {showFollowUps && (
                <div className="space-y-2">
                  {q.followUps.map((fu, i) => (
                    <FollowUp key={i} fu={fu} />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Главная страница ─────────────────────────────
export default function InterviewPage() {
  const [activeSection, setActiveSection] = useState(
    INTERVIEW_SECTIONS[0]?.id || null,
  );
  const section = INTERVIEW_SECTIONS.find((s) => s.id === activeSection);

  return (
    <div>
      {/* Заголовок */}
      <div className="card relative mb-6 overflow-hidden p-6">
        <div
          className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full opacity-20 blur-3xl"
          style={{
            background: "radial-gradient(circle, #ff8a3d, transparent 70%)",
          }}
        />
        <p className="mb-2 font-mono text-xs text-mist-500">
          // прожарка резюме · follow-up · STAR
        </p>
        <h1 className="mb-2 font-display text-2xl font-bold">
          🎤 <span className="text-accent-html">Интервью</span> по{" "}
          <span className="text-accent-css">резюме</span>
        </h1>
        <p className="max-w-xl text-sm leading-relaxed text-mist-400">
          Вопросы из твоего реального опыта. Развернутые ответы с кодом,
          каверзные follow-up'ы и ключевые слова. Отвечай вслух, потом сверяйся.
        </p>
      </div>

      {/* Табы секций */}
      <div className="mb-6 flex flex-wrap gap-2">
        {INTERVIEW_SECTIONS.map((s) => (
          <button
            key={s.id}
            onClick={() => setActiveSection(s.id)}
            className={`rounded-lg border px-4 py-2.5 text-sm font-medium transition-all ${
              activeSection === s.id
                ? "border-[color:var(--acc)] bg-[color:var(--acc)]/10 text-[color:var(--acc)]"
                : "border-ink-600 text-mist-400 hover:border-mist-400 hover:text-mist-100"
            }`}
            style={{ "--acc": s.accent }}
          >
            {s.icon} {s.title}
            <span className="ml-2 font-mono text-[11px] opacity-60">
              {s.questions.length}
            </span>
          </button>
        ))}
      </div>

      {/* Вопросы секции */}
      {section && (
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2
              className="font-display text-lg font-semibold"
              style={{ color: section.accent }}
            >
              {section.icon} {section.title}
            </h2>
            <span className="font-mono text-xs text-mist-500">
              {section.questions.length} вопросов
            </span>
          </div>
          <div className="space-y-3">
            {section.questions.map((q) => (
              <InterviewCard key={q.id} q={q} accent={section.accent} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
