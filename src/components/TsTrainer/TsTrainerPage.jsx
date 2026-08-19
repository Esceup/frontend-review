// src/components/TsTrainer/TsTrainerPage.jsx
import { useState } from "react";
import { CHALLENGES, CATEGORIES } from "../../data/tsTrainer/challenges";
import TsTrainerTask from "./TsTrainerTask";
import { isTsAvailable } from "../../data/tsTrainer/validator";

export default function TsTrainerPage() {
  const [category, setCategory] = useState("all");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [started, setStarted] = useState(false);

  const filtered =
    category === "all"
      ? CHALLENGES
      : CHALLENGES.filter((c) => c.category === category);

  const current = filtered[currentIndex];

  const selectCategory = (id) => {
    setCategory(id);
    setCurrentIndex(0);
    setStarted(false);
  };

  return (
    <div>
      {/* ═══ Шапка ═══ */}
      <div className="card mb-6 p-6">
        <h1 className="mb-2 font-display text-2xl font-bold text-accent-ts">
          🔷 TypeScript Trainer
        </h1>
        <p className="mb-4 text-sm text-mist-400">
          Пиши интерфейсы, типы и функции с нуля. Набей руку на синтаксисе TS!
        </p>

        {/* Категории */}
        <div className="mb-4 flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              onClick={() => selectCategory(c.id)}
              className={`rounded-lg border px-4 py-2 text-sm transition ${
                category === c.id
                  ? "border-accent-ts bg-accent-ts/10 text-accent-ts"
                  : "border-ink-600 text-mist-400 hover:border-mist-400"
              }`}
            >
              {c.icon} {c.label}
            </button>
          ))}
        </div>

        {!started && (
          <button
            onClick={() => setStarted(true)}
            className="rounded-lg bg-accent-ts px-6 py-3 font-display text-sm font-bold text-ink-950 transition hover:-translate-y-0.5"
          >
            🎯 Начать тренировку ({filtered.length} задач)
          </button>
        )}
      </div>

      {/* ═══ Задача ═══ */}
      {started && current && (
        <>
          <TsTrainerTask key={current.id} challenge={current} />

          {/* Навигация между задачами */}
          <div className="mt-6 flex items-center justify-between">
            <button
              onClick={() => setCurrentIndex((i) => Math.max(i - 1, 0))}
              disabled={currentIndex === 0}
              className="rounded-lg border border-ink-600 px-4 py-2 text-sm text-mist-400 transition hover:border-mist-400 disabled:opacity-30"
            >
              ← Предыдущее
            </button>

            <span className="font-mono text-sm text-mist-500">
              {currentIndex + 1} / {filtered.length}
            </span>

            <button
              onClick={() =>
                setCurrentIndex((i) => Math.min(i + 1, filtered.length - 1))
              }
              disabled={currentIndex === filtered.length - 1}
              className="rounded-lg border border-ink-600 px-4 py-2 text-sm text-mist-400 transition hover:border-mist-400 disabled:opacity-30"
            >
              Следующее →
            </button>
          </div>
        </>
      )}
    </div>
  );
}
