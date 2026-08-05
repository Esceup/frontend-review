import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";
import CodeEditor from "./CodeEditor";
import allTasks from "../data/tasks";

function deepEqual(a, b) {
  if (a === b) return true;
  if (a === null || b === null) return a === b;
  if (typeof a !== typeof b) return false;
  if (typeof a === "number" && isNaN(a) && isNaN(b)) return true;
  if (Array.isArray(a)) {
    if (!Array.isArray(b) || a.length !== b.length) return false;
    return a.every((val, i) => deepEqual(val, b[i]));
  }
  if (typeof a === "object") {
    const keysA = Object.keys(a);
    const keysB = Object.keys(b);
    if (keysA.length !== keysB.length) return false;
    return keysA.every((key) => deepEqual(a[key], b[key]));
  }
  return false;
}

function formatValue(val) {
  if (val === undefined) return "undefined";
  if (val === null) return "null";
  if (typeof val === "number" && isNaN(val)) return "NaN";
  try {
    return JSON.stringify(val);
  } catch {
    return String(val);
  }
}

const difficultyConfig = {
  easy: { label: "Easy", color: "bg-lvl-3/10 text-lvl-3 border-lvl-3/30" },
  medium: { label: "Medium", color: "bg-lvl-1/10 text-lvl-1 border-lvl-1/30" },
  hard: { label: "Hard", color: "bg-lvl-0/10 text-lvl-0 border-lvl-0/30" },
};

export default function TaskPage() {
  const { taskId } = useParams();
  const { user } = useAuth();
  const task = useMemo(() => allTasks.find((t) => t.id === taskId), [taskId]);

  const [code, setCode] = useState("");
  const [testResults, setTestResults] = useState(null);
  const [showSolution, setShowSolution] = useState(false);
  const [visibleHints, setVisibleHints] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [consoleLogs, setConsoleLogs] = useState([]);
  const [attempts, setAttempts] = useState(0);
  const [savedSolution, setSavedSolution] = useState(null);
  const [loadingProgress, setLoadingProgress] = useState(true);

  useEffect(() => {
    if (!user || !task) return;
    loadProgress();
  }, [user, task]);

  useEffect(() => {
    if (task) {
      if (savedSolution) setCode(savedSolution);
      else setCode(task.starterCode);
    }
  }, [task, savedSolution]);

  const loadProgress = async () => {
    try {
      const ref = doc(db, "users", user.uid, "tasks_progress", taskId);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        const data = snap.data();
        setIsCompleted(data.completed || false);
        setSavedSolution(data.userSolution || null);
        setAttempts(data.attemptsCount || 0);
        if (data.completed) setShowSolution(true);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingProgress(false);
    }
  };

  const saveProgress = async (data) => {
    if (!user) return;
    try {
      const ref = doc(db, "users", user.uid, "tasks_progress", taskId);
      await setDoc(ref, data, { merge: true });
    } catch (err) {
      console.error(err);
    }
  };

  const extractFunctionName = (codeStr) => {
    const match = codeStr.match(/function\s+([a-zA-Z_$][\w$]*)\s*\(/);
    if (match) return match[1];
    const constMatch = codeStr.match(/(?:const|let|var)\s+([a-zA-Z_$][\w$]*)\s*=/);
    if (constMatch) return constMatch[1];
    return "solution";
  };

  const runTests = useCallback(() => {
    if (!task || isRunning) return;
    setIsRunning(true);
    setTestResults(null);
    setConsoleLogs([]);

    const logs = [];
    const results = [];
    let allPassed = true;
    const newAttempts = attempts + 1;
    setAttempts(newAttempts);

    const originalLog = console.log;
    console.log = (...args) => {
      logs.push(args.map((a) => (typeof a === "object" ? JSON.stringify(a) : String(a))).join(" "));
      originalLog.apply(console, args);
    };

    try {
      const fnName = extractFunctionName(code);
      const wrappedCode = `${code}\nreturn typeof ${fnName} === 'function' ? ${fnName} : null;`;
      let userFunc;
      try {
        userFunc = new Function(wrappedCode)();
      } catch {
        userFunc = null;
      }

      if (!userFunc || typeof userFunc !== "function") {
        setTestResults([{ index: 0, description: "Компиляция", passed: false, error: "Не удалось найти функцию. Проверьте синтаксис." }]);
        setIsRunning(false);
        console.log = originalLog;
        return;
      }

      for (let i = 0; i < task.testCases.length; i++) {
        const tc = task.testCases[i];
        try {
          const result = userFunc(...tc.input);
          const passed = deepEqual(result, tc.expected);
          results.push({ index: i, description: tc.description, passed, expected: tc.expected, actual: result });
          if (!passed) allPassed = false;
        } catch (error) {
          results.push({ index: i, description: tc.description, passed: false, error: error.message });
          allPassed = false;
        }
      }
    } catch (error) {
      results.push({ index: 0, description: "Ошибка выполнения", passed: false, error: error.message });
      allPassed = false;
    }

    console.log = originalLog;
    setConsoleLogs(logs);
    setTestResults(results);

    if (allPassed && results.length > 0) {
      setIsCompleted(true);
      setShowSolution(true);
      saveProgress({ completed: true, userSolution: code, solvedAt: new Date().toISOString(), attemptsCount: newAttempts });
    } else {
      saveProgress({ completed: false, lastCode: code, attemptsCount: newAttempts });
    }
    setIsRunning(false);
  }, [code, task, attempts, user, taskId]);

  const resetTask = async () => {
    if (!confirm("Сбросить задачу? Ваше решение будет удалено.")) return;
    setCode(task.starterCode);
    setTestResults(null);
    setShowSolution(false);
    setVisibleHints(0);
    setIsCompleted(false);
    setConsoleLogs([]);
    setAttempts(0);
    setSavedSolution(null);
    if (user) {
      const ref = doc(db, "users", user.uid, "tasks_progress", taskId);
      await setDoc(ref, { completed: false, userSolution: null, attemptsCount: 0 });
    }
  };

  if (!task) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center">
        <div className="mb-4 text-5xl">❓</div>
        <h1 className="mb-2 font-display text-xl font-bold text-mist-100">Задача не найдена</h1>
        <Link to="/tasks" className="font-mono text-sm text-accent-js transition hover:underline">
          ← Назад к задачам
        </Link>
      </div>
    );
  }

  if (loadingProgress) {
    return <div className="flex min-h-[50vh] items-center justify-center font-mono text-mist-400">Загрузка...</div>;
  }

  const diff = difficultyConfig[task.difficulty];
  const passedCount = testResults?.filter((r) => r.passed).length || 0;
  const totalCount = task.testCases.length;

  return (
    <div className="space-y-6">
      {/* ===== ШАПКА ЗАДАЧИ ===== */}
      <div className="card flex flex-wrap items-center justify-between gap-3 p-5">
        <div>
          <div className="mb-1 flex flex-wrap items-center gap-2">
            <span className={`rounded border px-2 py-1 font-mono text-xs font-medium ${diff.color}`}>
              {diff.label}
            </span>
            {isCompleted && (
              <span className="rounded border border-lvl-3/30 bg-lvl-3/10 px-2 py-1 font-mono text-xs font-medium text-lvl-3">
                ✅ Решено
              </span>
            )}
            {attempts > 0 && (
              <span className="font-mono text-xs text-mist-500">Попыток: {attempts}</span>
            )}
          </div>
          <h1 className="font-display text-2xl font-bold text-mist-100">{task.title}</h1>
          <p className="mt-1 font-mono text-sm text-mist-400">{task.topicName}</p>
        </div>
        <Link
          to="/tasks"
          className="rounded-lg border border-ink-600 bg-ink-800 px-4 py-2 font-mono text-sm text-mist-400 transition hover:border-accent-js hover:text-accent-js"
        >
          ← К списку задач
        </Link>
      </div>

      {/* ===== УСЛОВИЕ ЗАДАЧИ (сверху) ===== */}
      <div className="card p-5">
        <h2 className="mb-3 flex items-center gap-2 font-display text-lg font-semibold text-mist-100">
          📋 Условие задачи
        </h2>
        <div className="whitespace-pre-line text-sm leading-relaxed text-mist-300">
          {task.description}
        </div>

        {/* Примеры тестов */}
        <div className="mt-5 border-t border-ink-600 pt-5">
          <h3 className="mb-3 font-mono text-xs font-semibold uppercase tracking-widest text-mist-500">
            Примеры тестов
          </h3>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {task.testCases.slice(0, 6).map((tc, i) => (
              <div key={i} className="rounded-lg border border-ink-600 bg-ink-850 p-3 font-mono text-xs">
                <div>
                  <span className="text-mist-500">Вход: </span>
                  <span className="text-accent-js">{JSON.stringify(tc.input)}</span>
                </div>
                <div>
                  <span className="text-mist-500">Выход: </span>
                  <span className="text-lvl-3">{JSON.stringify(tc.expected)}</span>
                </div>
                <div className="mt-1 text-mist-500">// {tc.description}</div>
              </div>
            ))}
          </div>
          {task.testCases.length > 6 && (
            <div className="mt-2 py-1 text-center font-mono text-xs text-mist-500">
              + ещё {task.testCases.length - 6} тестов (скрыты)
            </div>
          )}
        </div>
      </div>

      {/* ===== РЕДАКТОР КОДА (во всю ширину, большой) ===== */}
      <div className="card overflow-hidden p-5">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="font-mono text-sm font-semibold uppercase tracking-widest text-mist-400">
            💻 Редактор кода
          </h3>
          <div className="flex items-center gap-3 font-mono text-[11px] text-mist-500">
            <span><kbd className="rounded bg-ink-700 px-1.5 py-0.5 text-mist-300">Tab</kbd> отступ</span>
            <span><kbd className="rounded bg-ink-700 px-1.5 py-0.5 text-mist-300">Shift+Tab</kbd> убрать</span>
            <span><kbd className="rounded bg-ink-700 px-1.5 py-0.5 text-mist-300">Enter</kbd> авто-отступ</span>
          </div>
        </div>

        <CodeEditor value={code} onChange={setCode} height="400px" />

        {/* Кнопки управления */}
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <button
            onClick={runTests}
            disabled={isRunning}
            className="flex-1 rounded-lg bg-accent-js px-6 py-3 font-display text-sm font-bold text-ink-950 transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 sm:flex-none sm:min-w-[200px]"
          >
            {isRunning ? "⏳ Проверяю..." : "▶ Запустить тесты"}
          </button>
          {isCompleted && (
            <button
              onClick={resetTask}
              className="rounded-lg border border-ink-600 bg-ink-800 px-4 py-3 font-display text-sm font-semibold text-mist-300 transition hover:border-lvl-0 hover:text-lvl-0"
            >
              🔄 Сброс
            </button>
          )}
        </div>
      </div>

      {/* ===== РЕЗУЛЬТАТЫ ТЕСТОВ ===== */}
      {testResults && (
        <div className="card p-5">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold text-mist-100">
              Результаты тестов
            </h2>
            <span className={`font-mono text-sm font-bold ${passedCount === totalCount ? "text-lvl-3" : "text-lvl-0"}`}>
              {passedCount}/{totalCount}
            </span>
          </div>
          <div className="mb-4 h-2 w-full overflow-hidden rounded-full bg-ink-700">
            <div
              className={`h-full transition-all ${passedCount === totalCount ? "bg-lvl-3" : "bg-lvl-1"}`}
              style={{ width: `${(passedCount / totalCount) * 100}%` }}
            />
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            {testResults.map((result, i) => (
              <div
                key={i}
                className={`rounded-lg border-2 p-3 text-sm ${
                  result.passed ? "border-lvl-3/30 bg-lvl-3/5" : "border-lvl-0/30 bg-lvl-0/5"
                }`}
              >
                <div className="flex items-center gap-2 font-semibold">
                  <span>{result.passed ? "✅" : "❌"}</span>
                  <span className="text-mist-100">{result.description}</span>
                </div>
                {!result.passed && (
                  <div className="mt-2 space-y-1 pl-6 font-mono text-xs text-mist-300">
                    {result.error ? (
                      <div className="text-lvl-0">Ошибка: {result.error}</div>
                    ) : (
                      <>
                        <div>
                          Ожидалось: <span className="text-lvl-3">{formatValue(result.expected)}</span>
                        </div>
                        <div>
                          Получено: <span className="text-lvl-0">{formatValue(result.actual)}</span>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
          {consoleLogs.length > 0 && (
            <div className="mt-4 border-t border-ink-600 pt-4">
              <h4 className="mb-2 font-mono text-xs font-semibold uppercase tracking-widest text-mist-500">
                Console Output
              </h4>
              <div className="max-h-40 overflow-auto rounded-lg bg-ink-950 p-3 font-mono text-xs text-mist-300">
                {consoleLogs.map((log, i) => (
                  <div key={i}>&gt; {log}</div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ===== НИЖНИЙ БЛОК: ПОДСКАЗКИ + РЕШЕНИЕ (в 2 колонки) ===== */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Подсказки */}
        <div className="card p-5">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="flex items-center gap-2 font-display text-lg font-semibold text-mist-100">
              💡 Подсказки
              <span className="font-mono text-sm font-normal text-mist-500">
                ({visibleHints}/{task.hints.length})
              </span>
            </h2>
            <button
              onClick={() => setVisibleHints((v) => Math.min(v + 1, task.hints.length))}
              disabled={visibleHints >= task.hints.length}
              className="rounded-lg border border-lvl-1/30 bg-lvl-1/10 px-3 py-1.5 font-mono text-sm text-lvl-1 transition hover:bg-lvl-1/20 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Показать подсказку
            </button>
          </div>
          {visibleHints === 0 ? (
            <p className="text-sm text-mist-400">
              Застряли? Нажмите кнопку, чтобы получить наводящую подсказку.
            </p>
          ) : (
            <div className="space-y-2">
              {task.hints.slice(0, visibleHints).map((hint, i) => (
                <div key={i} className="rounded-lg border border-lvl-1/30 bg-lvl-1/5 p-3 text-sm text-mist-200">
                  <span className="mr-2 font-bold text-lvl-1">{i + 1}.</span>
                  {hint}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Эталонное решение */}
        {showSolution && isCompleted ? (
          <div className="card border-2 border-lvl-3/30 p-5">
            <h2 className="mb-3 flex items-center gap-2 font-display text-lg font-semibold text-lvl-3">
              🎉 Эталонное решение
            </h2>
            <div className="overflow-auto rounded-lg bg-ink-950 p-4">
              <pre className="whitespace-pre-wrap font-mono text-sm text-mist-300">{task.solution}</pre>
            </div>
            {task.explanation && (
              <div className="mt-4 rounded-lg border border-accent-js/30 bg-accent-js/5 p-4">
                <h4 className="mb-2 font-semibold text-accent-js">📖 Объяснение</h4>
                <p className="text-sm leading-relaxed text-mist-300">{task.explanation}</p>
              </div>
            )}
          </div>
        ) : (
          <div className="card flex items-center justify-center p-5">
            <p className="text-center font-mono text-sm text-mist-500">
              🔒 Решите задачу, чтобы увидеть эталонное решение
            </p>
          </div>
        )}
      </div>
    </div>
  );
}