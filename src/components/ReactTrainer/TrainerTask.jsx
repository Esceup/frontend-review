// src/components/ReactTrainer/TrainerTask.jsx

import { useState, useCallback } from "react";
import CodeEditor from "../CodeEditor";
import { validateFixes } from "../../data/reactTrainer/generator";

export default function TrainerTask({ task, onRegenerate }) {
  const [code, setCode] = useState(task.code);
  const [validation, setValidation] = useState(null);
  const [visibleHints, setVisibleHints] = useState(0);
  const [showSolution, setShowSolution] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const checkCode = useCallback(() => {
    const result = validateFixes(code, task.bugs);
    setValidation(result);
    setAttempts((a) => a + 1);
  }, [code, task.bugs]);

  const fixedBugs = validation?.fixedCount ?? 0;
  const totalBugs = task.bugCount;

  return (
    <div className="space-y-6">
      {/* Шапка задачи */}
      <div className="card flex items-center justify-between p-4">
        <div className="flex items-center gap-4">
          <span className="font-display text-lg font-bold text-accent-react">
            {task.componentName}
          </span>
          <span className="font-mono text-sm text-mist-500">
            🐛 {totalBugs} баг
            {totalBugs === 1 ? "" : totalBugs < 5 ? "а" : "ов"}
          </span>
          {validation && (
            <span
              className={`font-mono text-sm font-bold ${
                validation.allFixed ? "text-lvl-3" : "text-lvl-1"
              }`}
            >
              ✅ {fixedBugs}/{totalBugs} исправлено
            </span>
          )}
        </div>
        <div className="flex gap-2">
          <button
            onClick={checkCode}
            className="rounded-lg bg-lvl-3 px-4 py-2 text-sm font-bold text-ink-950"
          >
            ▶ Проверить
          </button>
          <button
            onClick={onRegenerate}
            className="rounded-lg border border-ink-600 px-4 py-2 text-sm text-mist-400"
          >
            🔄 Новая задача
          </button>
        </div>
      </div>

      {/* Редактор кода */}
      <div className="card overflow-hidden p-4">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="font-mono text-sm text-mist-400">
            💻 Найди и исправь {totalBugs} проблем:
          </h3>
          <div className="flex gap-2 font-mono text-xs text-mist-500">
            <span>
              Подсказки: {visibleHints}/{totalBugs}
            </span>
          </div>
        </div>
        <CodeEditor value={code} onChange={setCode} height="450px" />
      </div>

      {/* Результаты проверки */}
      {validation && (
        <div className="card p-5">
          <h3 className="mb-3 font-display text-lg font-semibold">
            Результаты проверки
          </h3>

          {/* Прогресс-бар */}
          <div className="mb-4 h-3 overflow-hidden rounded-full bg-ink-700">
            <div
              className="h-full rounded-full bg-lvl-3 transition-all"
              style={{ width: `${(fixedBugs / totalBugs) * 100}%` }}
            />
          </div>

          {/* Детали по каждому багу */}
          <div className="space-y-2">
            {validation.results.map((result, i) => (
              <div
                key={result.bugId}
                className={`rounded-lg border p-3 ${
                  result.fixed
                    ? "border-lvl-3/30 bg-lvl-3/5"
                    : "border-lvl-0/30 bg-lvl-0/5"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span>{result.fixed ? "✅" : "❌"}</span>
                  <span className="text-sm font-medium">{result.title}</span>
                </div>
                {!result.fixed && visibleHints > i && (
                  <p className="mt-2 pl-6 text-xs text-mist-400">
                    💡 {task.bugs[i].fixExplanation}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Кнопка подсказки */}
          {visibleHints < totalBugs && !validation.allFixed && (
            <button
              onClick={() => setVisibleHints((v) => v + 1)}
              className="mt-4 rounded-lg border border-lvl-1/30 bg-lvl-1/10 px-4 py-2 text-sm text-lvl-1"
            >
              💡 Показать подсказку ({visibleHints + 1}/{totalBugs})
            </button>
          )}

          {/* Успех! */}
          {validation.allFixed && (
            <div className="mt-4 rounded-lg border border-lvl-3/30 bg-lvl-3/10 p-4 text-center">
              <p className="text-2xl">🎉</p>
              <p className="font-display font-bold text-lvl-3">
                Все баги исправлены за {attempts} попыт
                {attempts === 1 ? "ку" : "ки"}!
              </p>
              <button
                onClick={() => setShowSolution(true)}
                className="mt-2 text-xs text-mist-400 underline"
              >
                Показать эталонное решение
              </button>
            </div>
          )}
        </div>
      )}

      {/* Панель подсказок (отдельная) */}
      {visibleHints > 0 && (
        <div className="card p-5">
          <h3 className="mb-3 font-display text-lg font-semibold text-lvl-1">
            💡 Подсказки ({visibleHints}/{totalBugs})
          </h3>
          <div className="space-y-3">
            {task.bugs.slice(0, visibleHints).map((bug, i) => (
              <div
                key={bug.id}
                className="rounded-lg border border-lvl-1/20 bg-lvl-1/5 p-4"
              >
                <p className="mb-1 text-sm font-semibold text-lvl-1">
                  Баг #{i + 1}: {bug.title}
                </p>
                <p className="text-sm text-mist-300">{bug.hint}</p>
                <p className="mt-2 text-xs font-mono text-mist-500">
                  Категория: {bug.category} · Сложность: {bug.severity}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Эталонное решение */}
      {showSolution && (
        <div className="card border-2 border-lvl-3/30 p-5">
          <h3 className="mb-3 font-display text-lg font-semibold text-lvl-3">
            📋 Эталонное решение
          </h3>
          <CodeEditor
            value={task.solution}
            onChange={() => {}}
            readOnly
            height="400px"
          />
        </div>
      )}
    </div>
  );
}
