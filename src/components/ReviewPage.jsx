import { useMemo, useState } from "react";
import { useProgress } from "../context/ProgressContext";
import { allQuestions } from "../data/questions/index";

const ACCENT_TEXT = {
  html: "text-accent-html",
  css: "text-accent-css",
  js: "text-accent-js",
  javascript: "text-accent-js",
  http: "text-accent-http",
  ts: "text-accent-ts",
  typescript: "text-accent-ts",
  react: "text-accent-react",
  redux: "text-accent-redux",
};

export default function ReviewPage() {
  const { statusOf, rateCard } = useProgress();
  
  // Режим "учить вперёд" (включает запланированные вопросы)
  const [reviewScheduled, setReviewScheduled] = useState(false);

  // Фильтруем вопросы: всегда берём "due", а "scheduled" только если включён режим
  const questions = useMemo(
    () => allQuestions.filter((item) => {
      const status = statusOf(item.id);
      return status === "due" || (reviewScheduled && status === "scheduled");
    }),
    [allQuestions, statusOf, reviewScheduled],
  );

  // Считаем статистику для UI
  const stats = useMemo(() => {
    let due = 0;
    let scheduled = 0;
    allQuestions.forEach((q) => {
      const st = statusOf(q.id);
      if (st === "due") due++;
      else if (st === "scheduled") scheduled++;
    });
    return { due, scheduled };
  }, [allQuestions, statusOf]);

  const [index, setIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  // Если нет ни созревших, ни запланированных вопросов
  if (stats.due === 0 && stats.scheduled === 0) {
    return (
      <div className="card mx-auto max-w-2xl p-10 text-center">
        <div className="mb-4 text-5xl">🎉</div>
        <h2 className="font-display text-xl font-semibold text-mist-100">
          Все вопросы выучены!
        </h2>
        <p className="mt-2 text-sm text-mist-400">
          Вы прошли всю базу. Отличная работа!
        </p>
      </div>
    );
  }

  // Если нет созревших, но есть запланированные
  if (stats.due === 0 && !reviewScheduled)
    return (
      <div className="card mx-auto max-w-2xl p-10 text-center">
        <div className="mb-4 text-5xl">📅</div>
        <h2 className="font-display text-xl font-semibold text-mist-100">
          На сегодня вопросов нет
        </h2>
        <p className="mt-2 text-sm text-mist-400">
          Вы ответили на все созревшие вопросы. 
          Но у вас есть <b className="text-accent-js">{stats.scheduled}</b> вопросов, запланированных на будущее.
        </p>
        <button
          onClick={() => setReviewScheduled(true)}
          className="mt-6 rounded-lg bg-accent-js px-6 py-3 font-display text-sm font-bold text-ink-950 shadow-lg shadow-accent-js/20 transition hover:-translate-y-0.5 hover:shadow-accent-js/40"
        >
          🚀 Учить запланированные вперёд
        </button>
      </div>
    );

  const safeIndex = Math.min(index, questions.length - 1);
  const q = questions[safeIndex];

  const title = q.q ?? q.question ?? q.title ?? "";
  const full = q.a ?? q.fullAnswer ?? q.answer ?? "";
  const accent = ACCENT_TEXT[q.section] ?? "text-accent-css";
  const isScheduled = statusOf(q.id) === "scheduled";

  const next = () => {
    setShowAnswer(false);
    setIndex((safeIndex + 1) % questions.length);
  };

  const prev = () => {
    setShowAnswer(false);
    setIndex((safeIndex - 1 + questions.length) % questions.length);
  };

  const handleRate = async (lvl) => {
    setShowAnswer(false);
    await rateCard(q.id, lvl);
    if(lvl === 0) {
      next();
    }
    
  };

  return (
    <div className="mx-auto max-w-2xl">
      {/* Шапка с переключателем */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3 text-sm">
        <span className="text-mist-400">
          Вопрос{" "}
          <span className="font-mono font-bold text-mist-100">
            {safeIndex + 1}/{questions.length}
          </span>
          {reviewScheduled && (
            <span className="ml-2 rounded bg-accent-js/20 px-1.5 py-0.5 text-[11px] font-bold text-accent-js">
              ВПЕРЁД
            </span>
          )}
        </span>

        {/* Кнопка переключения режима, если есть запланированные */}
        {stats.scheduled > 0 && (
          <button
            onClick={() => {
              setReviewScheduled(!reviewScheduled);
              setIndex(0); // Сбрасываем индекс при смене режима
              setShowAnswer(false);
            }}
            className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition ${
              reviewScheduled
                ? "border-accent-js bg-accent-js/10 text-accent-js"
                : "border-ink-600 text-mist-400 hover:border-mist-400 hover:text-mist-100"
            }`}
          >
            {reviewScheduled
              ? "✕ Только созревшие"
              : `📅 +${stats.scheduled} запланированных`}
          </button>
        )}
      </div>

      {/* Карточка вопроса */}
      <div className="card overflow-hidden">
        <button
          type="button"
          onClick={() => setShowAnswer((v) => !v)}
          className="block w-full p-5 text-left transition-colors hover:bg-ink-750"
        >
          <h2 className="font-display text-lg font-semibold leading-snug text-mist-100">
            {title}
          </h2>
          <p className="mt-3 font-mono text-xs text-mist-500">
            {showAnswer ? "▲ скрыть ответ" : "▼ показать ответ"}
            {isScheduled && !showAnswer && (
              <span className="ml-2 text-accent-js">(запланировано)</span>
            )}
          </p>
        </button>
        <div className="mt-4 flex justify-between">
          <button
            type="button"
            onClick={prev}
            className="rounded-lg px-3 py-2 text-sm text-mist-400 transition hover:text-mist-100"
          >
            ← Назад
          </button>
          .
          <button
            type="button"
            onClick={next}
            className="rounded-lg px-3 py-2 text-sm text-mist-400 transition hover:text-mist-100"
          >
            Пропустить →
          </button>
        </div>
        {showAnswer && (
          <div className="border-t border-ink-600 bg-ink-850 p-5">
            {full && (
              <p className="whitespace-pre-line text-sm leading-relaxed text-mist-300">
                {full}
              </p>
            )}

            {/* Кнопки оценки (4 уровня) */}
            <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {[
                { lvl: 0, label: "Не знаю", color: "#ff6b6b" },
                { lvl: 1, label: "Немного", color: "#ffc857" },
                { lvl: 2, label: "Хорошо", color: "#43d2ff" },
                { lvl: 3, label: "Отлично", color: "#3dd68c" },
              ].map((btn) => (
                <button
                  key={btn.lvl}
                  type="button"
                  onClick={() => handleRate(btn.lvl)}
                  className="rounded-lg border px-3 py-2.5 text-left transition-all hover:-translate-y-0.5 hover:shadow-lg"
                  style={{
                    borderColor: btn.color + "55",
                    background: btn.color + "0d",
                  }}
                >
                  <span
                    className="block text-sm font-semibold"
                    style={{ color: btn.color }}
                  >
                    {btn.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <p className="mt-6 font-mono text-xs text-mist-500">
        // отвечай вслух → сверяйся → оценивай себя честно
      </p>
    </div>
  );
}