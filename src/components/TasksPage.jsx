import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";
import allTasks from "../data/tasks";

const difficultyConfig = {
  easy: {
    label: "Easy",
    color: "bg-lvl-3/10 text-lvl-3 border-lvl-3/30",
    dot: "bg-lvl-3",
  },
  medium: {
    label: "Medium",
    color: "bg-lvl-1/10 text-lvl-1 border-lvl-1/30",
    dot: "bg-lvl-1",
  },
  hard: {
    label: "Hard",
    color: "bg-lvl-0/10 text-lvl-0 border-lvl-0/30",
    dot: "bg-lvl-0",
  },
};

export default function TasksPage() {
  const { user } = useAuth();
  const [progress, setProgress] = useState({});
  const [filterTopic, setFilterTopic] = useState("all");
  const [filterDifficulty, setFilterDifficulty] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  // ✅ РЕАКТИВНАЯ ПОДПИСКА на все задачи пользователя
  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    console.log(" TasksPage: подписываемся на прогресс пользователя", user.uid);
    const unsubscribers = [];

    // Подписываемся на каждую задачу параллельно
    allTasks.forEach((task) => {
      const ref = doc(db, "users", user.uid, "tasks_progress", task.id);
      const unsub = onSnapshot(
        ref,
        (snap) => {
          setProgress((prev) => {
            const newProgress = { ...prev };
            if (snap.exists() && snap.data().completed) {
              newProgress[task.id] = true;
            } else {
              delete newProgress[task.id];
            }
            return newProgress;
          });
        },
        (err) => {
          console.error(`❌ Ошибка подписки на задачу ${task.id}:`, err);
        },
      );
      unsubscribers.push(unsub);
    });

    setLoading(false);

    return () => {
      unsubscribers.forEach((unsub) => unsub());
    };
  }, [user]);

  const topics = useMemo(() => {
    const map = new Map();
    allTasks.forEach((t) => {
      if (!map.has(t.topic)) map.set(t.topic, t.topicName);
    });
    return Array.from(map.entries());
  }, []);

  const filteredTasks = useMemo(() => {
    return allTasks.filter((task) => {
      if (filterTopic !== "all" && task.topic !== filterTopic) return false;
      if (filterDifficulty !== "all" && task.difficulty !== filterDifficulty)
        return false;
      if (filterStatus === "solved" && !progress[task.id]) return false;
      if (filterStatus === "unsolved" && progress[task.id]) return false;
      if (
        searchQuery &&
        !task.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
        return false;
      return true;
    });
  }, [filterTopic, filterDifficulty, filterStatus, searchQuery, progress]);

  const stats = useMemo(
    () => ({
      total: allTasks.length,
      solved: Object.values(progress).filter(Boolean).length,
    }),
    [progress],
  );

  const groupedTasks = useMemo(() => {
    const groups = {};
    filteredTasks.forEach((task) => {
      if (!groups[task.topicName]) groups[task.topicName] = [];
      groups[task.topicName].push(task);
    });
    return groups;
  }, [filteredTasks]);

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="font-mono text-mist-400">Загрузка прогресса...</div>
      </div>
    );
  }

  return (
    <div>
      {/* Шапка со статистикой */}
      <div className="card mb-6 p-6">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="mb-1 font-display text-2xl font-bold text-mist-100">
              💻 Практика алгоритмов
            </h1>
            <p className="font-mono text-sm text-mist-400">
              Решайте задачи и прокачивайте паттерны для собеседований
            </p>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-center">
              <div className="font-display text-3xl font-bold text-accent-js">
                {stats.solved}
              </div>
              <div className="font-mono text-xs text-mist-500">
                из {stats.total}
              </div>
            </div>
            <div className="relative h-20 w-20">
              <svg viewBox="0 0 36 36" className="h-20 w-20 -rotate-90">
                <circle
                  cx="18"
                  cy="18"
                  r="15.9"
                  fill="none"
                  stroke="#21324f"
                  strokeWidth="3"
                />
                <circle
                  cx="18"
                  cy="18"
                  r="15.9"
                  fill="none"
                  stroke="#ffc857"
                  strokeWidth="3"
                  strokeDasharray={`${(stats.solved / Math.max(stats.total, 1)) * 100}, 100`}
                  strokeLinecap="round"
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center font-mono text-sm font-bold text-mist-100">
                {Math.round((stats.solved / Math.max(stats.total, 1)) * 100)}%
              </span>
            </div>
          </div>
        </div>

        {/* Фильтры */}
        <div className="flex flex-wrap gap-3">
          <input
            type="text"
            placeholder="🔍 Поиск задач..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="field min-w-[200px] flex-1"
          />
          <select
            value={filterTopic}
            onChange={(e) => setFilterTopic(e.target.value)}
            className="field w-auto"
          >
            <option value="all">Все темы</option>
            {topics.map(([key, name]) => (
              <option key={key} value={key}>
                {name}
              </option>
            ))}
          </select>
          <select
            value={filterDifficulty}
            onChange={(e) => setFilterDifficulty(e.target.value)}
            className="field w-auto"
          >
            <option value="all">Все сложности</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="field w-auto"
          >
            <option value="all">Все</option>
            <option value="solved">✅ Решённые</option>
            <option value="unsolved">⬜ Нерешённые</option>
          </select>
        </div>
      </div>

      {/* Список задач */}
      {Object.keys(groupedTasks).length === 0 ? (
        <div className="card p-12 text-center">
          <div className="mb-3 text-5xl">🔍</div>
          <p className="font-mono text-mist-400">Задачи не найдены</p>
          <button
            onClick={() => {
              setFilterTopic("all");
              setFilterDifficulty("all");
              setFilterStatus("all");
              setSearchQuery("");
            }}
            className="mt-4 font-mono text-sm text-accent-js transition hover:underline"
          >
            Сбросить фильтры
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {Object.entries(groupedTasks).map(([topicName, topicTasks]) => {
            const solvedInTopic = topicTasks.filter(
              (t) => progress[t.id],
            ).length;
            const percent = Math.round(
              (solvedInTopic / topicTasks.length) * 100,
            );
            return (
              <div key={topicName} className="card overflow-hidden">
                <div className="border-b border-ink-600 p-5">
                  <div className="mb-2 flex items-center gap-3">
                    <h2 className="font-display text-lg font-semibold text-mist-100">
                      {topicName}
                    </h2>
                    <span className="font-mono text-xs text-mist-500">
                      {solvedInTopic}/{topicTasks.length}
                    </span>
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-ink-700">
                      <div
                        className="h-full rounded-full bg-accent-js transition-all"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-3 p-5 md:grid-cols-2">
                  {topicTasks.map((task) => {
                    const diff = difficultyConfig[task.difficulty];
                    const solved = progress[task.id];
                    return (
                      <Link
                        key={task.id}
                        to={`/tasks/${task.id}`}
                        className={`group block rounded-lg border-2 p-4 transition-all hover:-translate-y-0.5 hover:shadow-lg ${
                          solved
                            ? "border-lvl-3/30 bg-lvl-3/5 hover:border-lvl-3/60"
                            : "border-ink-600 bg-ink-800 hover:border-accent-js/50"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0 flex-1">
                            <div className="mb-1.5 flex items-center gap-2">
                              <span
                                className={`h-2 w-2 rounded-full ${diff.dot}`}
                              />
                              <span
                                className={`rounded border px-2 py-0.5 font-mono text-[11px] ${diff.color}`}
                              >
                                {diff.label}
                              </span>
                            </div>
                            <h3
                              className={`truncate font-semibold transition-colors ${
                                solved
                                  ? "text-lvl-3"
                                  : "text-mist-100 group-hover:text-accent-js"
                              }`}
                            >
                              {task.title}
                            </h3>
                          </div>
                          <div className="text-xl text-mist-500 transition-colors group-hover:text-accent-js">
                            {solved ? "✅" : "→"}
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
