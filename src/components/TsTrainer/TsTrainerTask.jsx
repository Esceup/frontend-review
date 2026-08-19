// src/components/TsTrainer/TsTrainerTask.jsx
import { useState, useCallback, useEffect } from "react";
import CodeEditor from "../CodeEditor";
import {
  isTsAvailable,
  validateWithRegex,
  compileWithTS,
} from "../../data/tsTrainer/validator";


export default function TsTrainerTask({ challenge }) {
  const [code, setCode] = useState(challenge.starterCode);
  const [validation, setValidation] = useState(null);
  const [tsResult, setTsResult] = useState(null);
  const [visibleHints, setVisibleHints] = useState(0);
  const [showSolution, setShowSolution] = useState(false);
  const [isCompiling, setIsCompiling] = useState(false);

  // Сброс при смене задания
  useEffect(() => {
    setCode(challenge.starterCode);
    setValidation(null);
    setTsResult(null);
    setVisibleHints(0);
    setShowSolution(false);
    setIsCompiling(false);
  }, [challenge.id, challenge.starterCode]);

  const checkCode = useCallback(() => {
    const result = validateWithRegex(code, challenge);
    setValidation(result);
  }, [code, challenge]);

  const compileCode = useCallback(async () => {
    setIsCompiling(true);
    setTsResult(null);
    try {
      const result = await compileWithTS(code);
      setTsResult(result);
    } catch (e) {
      setTsResult({
        success: false,
        errors: [{ message: e.message, line: 0, code: 0, category: "error" }],
      });
    } finally {
      setIsCompiling(false);
    }
  }, [code]);

  const levelIcon =
    challenge.level === 1 ? "🟢" : challenge.level === 2 ? "🟡" : "🔴";

  return (
    <div className="space-y-5">
      {/* ═══ Задание ═══ */}
      <div className="card p-5">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold text-accent-ts">
            {levelIcon} {challenge.title}
          </h2>
          <span className="rounded-full border border-accent-ts/30 bg-accent-ts/10 px-3 py-1 font-mono text-xs text-accent-ts">
            {challenge.category}
          </span>
        </div>
        <div className="space-y-1 text-sm leading-relaxed text-mist-300">
          {challenge.task.map((line, i) => (
            <p
              key={i}
              className={
                line.startsWith("```") ? "font-mono text-xs text-mist-500" : ""
              }
            >
              {line}
            </p>
          ))}
        </div>
      </div>

      {/* ═══ Редактор ═══ */}
      <div className="card overflow-hidden p-4">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="font-mono text-sm text-mist-400">💻 Напиши код:</h3>
          <span className="font-mono text-xs text-mist-500">
            Подсказки: {visibleHints}/{challenge.hints.length}
          </span>
        </div>
        <CodeEditor value={code} onChange={setCode} height="280px" />
      </div>

      {/* ═══ Кнопки ═══ */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={checkCode}
          className="rounded-lg bg-lvl-3 px-5 py-2.5 font-display text-sm font-bold text-ink-950 transition hover:-translate-y-0.5"
        >
          ▶ Проверить
        </button>
        <button
          onClick={compileCode}
          disabled={isCompiling || !isTsAvailable()}
          className="rounded-lg bg-accent-ts px-5 py-2.5 font-display text-sm font-bold text-ink-950 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {!isTsAvailable()
            ? "⚠️ TS не загружен"
            : isCompiling
              ? "⏳ Компилирую..."
              : "🔍 Компилировать (TS)"}
        </button>
        {visibleHints < challenge.hints.length && (
          <button
            onClick={() => setVisibleHints((v) => v + 1)}
            className="rounded-lg border border-lvl-1/30 bg-lvl-1/10 px-4 py-2.5 text-sm text-lvl-1 transition hover:bg-lvl-1/20"
          >
            💡 Подсказка ({visibleHints + 1}/{challenge.hints.length})
          </button>
        )}
        <button
          onClick={() => setShowSolution((s) => !s)}
          className="rounded-lg border border-ink-600 px-4 py-2.5 text-sm text-mist-400 transition hover:border-mist-400"
        >
          {showSolution ? "🙈 Скрыть решение" : "📋 Решение"}
        </button>
      </div>

      {/* ═══ Результат regex-проверки ═══ */}
      {validation && (
        <div className="card p-5">
          <h3 className="mb-3 font-display text-lg font-semibold">
            Результат проверки
          </h3>

          {/* Прогресс-бар */}
          <div className="mb-4 h-3 overflow-hidden rounded-full bg-ink-700">
            <div
              className={`h-full rounded-full transition-all ${
                validation.allPassed ? "bg-lvl-3" : "bg-lvl-1"
              }`}
              style={{
                width: `${(validation.passedCount / validation.totalCount) * 100}%`,
              }}
            />
          </div>

          {/* Список проверок */}
          <div className="space-y-2">
            {validation.results.map((r, i) => (
              <div
                key={i}
                className={`flex items-center gap-2 rounded-lg border p-3 text-sm ${
                  r.passed
                    ? "border-lvl-3/30 bg-lvl-3/5"
                    : "border-lvl-0/30 bg-lvl-0/5"
                }`}
              >
                <span>{r.passed ? "✅" : "❌"}</span>
                <span className="font-mono text-xs text-mist-400">
                  {r.type === "mustContain"
                    ? "Должно содержать:"
                    : "Не должно содержать:"}
                </span>
                <code className="rounded bg-ink-850 px-2 py-0.5 font-mono text-xs text-accent-ts">
                  /{r.pattern}/
                </code>
              </div>
            ))}
          </div>

          {validation.allPassed && (
            <div className="mt-4 rounded-lg border border-lvl-3/30 bg-lvl-3/10 p-4 text-center">
              <p className="text-2xl">🎉</p>
              <p className="font-display font-bold text-lvl-3">
                Все проверки пройдены!
              </p>
            </div>
          )}
        </div>
      )}

      {/* ═══ Результат TS-компиляции ═══ */}
      {tsResult && (
        <div className="card p-5">
          <h3 className="mb-3 font-display text-lg font-semibold">
            🔍 Компиляция TypeScript
          </h3>

          {tsResult.success ? (
            <div className="rounded-lg border border-lvl-3/30 bg-lvl-3/10 p-4 text-center">
              <p className="text-2xl">✅</p>
              <p className="font-display font-bold text-lvl-3">
                Код компилируется без ошибок!
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {tsResult.errors.map((err, i) => (
                <div
                  key={i}
                  className={`rounded-lg border p-3 ${
                    err.category === "error"
                      ? "border-lvl-0/30 bg-lvl-0/5"
                      : "border-lvl-1/30 bg-lvl-1/5"
                  }`}
                >
                  <p className="font-mono text-xs text-mist-500">
                    TS{err.code} · Строка {err.line}
                  </p>
                  <p className="mt-1 text-sm text-mist-300">{err.message}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ═══ Подсказки ═══ */}
      {visibleHints > 0 && (
        <div className="card p-5">
          <h3 className="mb-3 font-display text-lg font-semibold text-lvl-1">
            💡 Подсказки ({visibleHints}/{challenge.hints.length})
          </h3>
          <div className="space-y-2">
            {challenge.hints.slice(0, visibleHints).map((hint, i) => (
              <div
                key={i}
                className="rounded-lg border border-lvl-1/20 bg-lvl-1/5 p-3 text-sm text-mist-300"
              >
                <span className="mr-2 font-bold text-lvl-1">{i + 1}.</span>
                {hint}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ═══ Эталонное решение ═══ */}
      {showSolution && (
        <div className="card border-2 border-lvl-3/30 p-5">
          <h3 className="mb-3 font-display text-lg font-semibold text-lvl-3">
            📋 Эталонное решение
          </h3>
          <CodeEditor
            value={challenge.solution}
            onChange={() => {}}
            readOnly
            height="200px"
          />
        </div>
      )}
    </div>
  );
}
