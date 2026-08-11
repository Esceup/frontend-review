// src/components/ReactTrainer/ReactTrainerPage.jsx

import { useState } from "react";
import { generateTask } from "../../data/reactTrainer/generator";
import TrainerTask from "./TrainerTask";

const DIFFICULTIES = [
  { id: "easy",   label: "Лёгкая",  icon: "🟢", bugs: "1 баг" },
  { id: "medium", label: "Средняя", icon: "🟡", bugs: "2 бага" },
  { id: "hard",   label: "Сложная", icon: "🔴", bugs: "4 бага" },
  { id: "insane", label: "Хардкор", icon: "💀", bugs: "6 багов" },
  { id: "mixed",  label: "Микс",    icon: "🎲", bugs: "3–5"},
];

export default function ReactTrainerPage() {
  const [task, setTask] = useState(null);
  const [difficulty, setDifficulty] = useState("mixed");

  const generate = () => {
    setTask(generateTask({ difficulty }));
  };

  return (
    <div>
      <div className="card mb-6 p-6">
        <h1 className="mb-2 font-display text-2xl font-bold text-accent-react">
          ⚛️ React Code Trainer
        </h1>
        <p className="mb-4 text-sm text-mist-400">
          Найди баги в реальном коде. Исправь их и проверь результат.
        </p>

        <div className="mb-4">
          <label className="mb-2 block text-xs text-mist-500">Сложность:</label>
          <div className="flex flex-wrap gap-2">
            {DIFFICULTIES.map((d) => (
              <button
                key={d.id}
                onClick={() => setDifficulty(d.id)}
                className={`rounded-lg border px-4 py-2 text-sm transition ${
                  difficulty === d.id
                    ? "border-accent-react bg-accent-react/10 text-accent-react"
                    : "border-ink-600 text-mist-400 hover:border-mist-400"
                }`}
              >
                {d.icon} {d.label}
                <span className="ml-2 font-mono text-xs text-mist-500">
                  {d.bugs}
                </span>
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={generate}
          className="rounded-lg bg-accent-react px-6 py-3 font-display text-sm font-bold text-ink-950 transition hover:-translate-y-0.5"
        >
          {task ? "🔄 Сгенерировать заново" : "🎯 Начать тренировку"}
        </button>
      </div>

      {task && (
        <TrainerTask key={task.id} task={task} onRegenerate={generate} />
      )}
    </div>
  );
}
