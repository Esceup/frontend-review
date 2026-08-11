// src/components/ReactTrainer/ReactTrainerPage.jsx

import { useState } from "react";
import { generateTask } from "../../data/reactTrainer/generator";
import TrainerTask from "./TrainerTask";

const DIFFICULTIES = [
  { id: "easy", label: "Лёгкие", icon: "🟢" },
  { id: "medium", label: "Средние", icon: "🟡" },
  { id: "hard", label: "Сложные", icon: "🔴" },
  { id: "mixed", label: "Микс", icon: "🎲" },
];

const CATEGORIES = [
  { id: "memory-leak", label: "Утечки памяти" },
  { id: "state-mutation", label: "Мутация state" },
  { id: "stale-closure", label: "Stale closure" },
  { id: "rendering", label: "Рендеринг" },
];

export default function ReactTrainerPage() {
  const [task, setTask] = useState(null);
  const [settings, setSettings] = useState({
    bugCount: 3,
    difficulty: "mixed",
    categories: [],
  });

  const generate = () => {
    const newTask = generateTask(settings);
    setTask(newTask);
  };

  return (
    <div>
      <div className="card mb-6 p-6">
        <h1 className="mb-2 font-display text-2xl font-bold text-accent-react">
          ⚛️ React Code Trainer
        </h1>
        <p className="mb-4 text-sm text-mist-400">
          Случайно сгенерированный код с багами. Найди и исправь все нарушения!
        </p>

        {/* Настройки генерации */}
        <div className="mb-4 flex flex-wrap gap-4">
          {/* Количество багов */}
          <div>
            <label className="mb-1 block text-xs text-mist-500">Багов:</label>
            <select
              className="field w-auto"
              value={settings.bugCount}
              onChange={(e) =>
                setSettings((s) => ({ ...s, bugCount: +e.target.value }))
              }
            >
              {[1, 2, 3, 4].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>

          {/* Сложность */}
          <div>
            <label className="mb-1 block text-xs text-mist-500">
              Сложность:
            </label>
            <select
              className="field w-auto"
              value={settings.difficulty}
              onChange={(e) =>
                setSettings((s) => ({ ...s, difficulty: e.target.value }))
              }
            >
              {DIFFICULTIES.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.icon} {d.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          onClick={generate}
          className="rounded-lg bg-accent-react px-6 py-3 font-display text-sm font-bold text-ink-950 transition hover:-translate-y-0.5"
        >
          {task ? "🔄 Сгенерировать заново" : "🎯 Начать тренировку"}
        </button>
      </div>

      {task && <TrainerTask task={task} onRegenerate={generate} />}
    </div>
  );
}
