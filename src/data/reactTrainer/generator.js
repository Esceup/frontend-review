// src/data/reactTrainer/generator.js

import { BUG_PATTERNS } from "./bugPatterns";
import { CODE_TEMPLATES, COMPONENT_NAMES, RANDOM_VARS } from "./codeTemplates";

// Простой shuffle
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Рандомное значение из массива
function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Заменяет {{VAR}} на рандомные значения
function randomizeVars(code) {
  let result = code;
  for (const [varName, values] of Object.entries(RANDOM_VARS)) {
    result = result.replace(new RegExp(`{{${varName}}}`, "g"), pick(values));
  }
  return result;
}

/**
 * Главная функция генерации задачи
 * @param {Object} options
 * @param {number} options.bugCount - количество багов (1-4)
 * @param {string[]} options.categories - фильтр по категориям (пустой = все)
 * @param {string} options.difficulty - 'easy' | 'medium' | 'hard' | 'mixed'
 * @returns {Object} сгенерированная задача
 */
export function generateTask(options = {}) {
  const { bugCount = 3, categories = [], difficulty = "mixed" } = options;

  // 1. Выбираем случайный шаблон
  const template = pick(CODE_TEMPLATES);
  const componentName = pick(COMPONENT_NAMES);

  // 2. Фильтруем баг-паттерны
  let availablePatterns = [...BUG_PATTERNS];

  if (categories.length > 0) {
    availablePatterns = availablePatterns.filter((p) =>
      categories.includes(p.category),
    );
  }

  if (difficulty !== "mixed") {
    availablePatterns = availablePatterns.filter(
      (p) => p.severity === difficulty,
    );
  }

  // 3. Рандомно выбираем N багов
  const selectedPatterns = shuffle(availablePatterns).slice(
    0,
    Math.min(bugCount, availablePatterns.length),
  );

  // 4. Определяем доступные слоты в шаблоне
  const slotRegex = /\{\{BUG_SLOT_(\d+)\}\}/g;
  const slots = [...template.template.matchAll(slotRegex)].map((m) => m[0]);
  const shuffledSlots = shuffle(slots).slice(0, selectedPatterns.length);

  // 5. Собираем код
  let buggyCode = template.template;
  let fixedCode = template.template;

  // Заменяем имя компонента
  buggyCode = buggyCode.replace(/\{\{COMPONENT_NAME\}\}/g, componentName);
  fixedCode = fixedCode.replace(/\{\{COMPONENT_NAME\}\}/g, componentName);

  // Вставляем баги в слоты
  const bugsPlaced = [];

  selectedPatterns.forEach((pattern, idx) => {
    const slot = shuffledSlots[idx];
    if (!slot) return;

    // Рандомизируем переменные внутри паттерна
    const buggySnippet = randomizeVars(pattern.buggyCode);
    const fixedSnippet = randomizeVars(pattern.fixedCode);

    buggyCode = buggyCode.replace(slot, buggySnippet);
    fixedCode = fixedCode.replace(slot, fixedSnippet);

    bugsPlaced.push({
      id: pattern.id,
      category: pattern.category,
      severity: pattern.severity,
      title: pattern.title,
      description: pattern.description,
      hint: pattern.hint,
      fixExplanation: pattern.fixExplanation,
      validation: pattern.validation,
      slotIndex: idx + 1,
    });
  });

  // Удаляем оставшиеся пустые слоты
  buggyCode = buggyCode.replace(slotRegex, "// ...");
  fixedCode = fixedCode.replace(slotRegex, "// ...");

  // 6. Формируем результат
  return {
    id: `trainer-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    code: buggyCode, // Код с багами (показывается пользователю)
    solution: fixedCode, // Правильный код (для проверки/подсказки)
    bugs: bugsPlaced, // Метаданные багов
    bugCount: bugsPlaced.length,
    componentName,
    templateName: template.name,
    difficulty,
    generatedAt: new Date().toISOString(),
  };
}

/**
 * Валидация исправленного кода
 */
export function validateFixes(userCode, bugs) {
  const results = bugs.map((bug) => {
    const { mustContain, mustNotContain } = bug.validation;

    const containsAll = mustContain.every((pattern) => pattern.test(userCode));
    const containsNone = mustNotContain.every(
      (pattern) => !pattern.test(userCode),
    );

    return {
      bugId: bug.id,
      title: bug.title,
      fixed: containsAll && containsNone,
      details: {
        mustContain: mustContain.map((p) => ({
          pattern: p.toString(),
          found: p.test(userCode),
        })),
        mustNotContain: mustNotContain.map((p) => ({
          pattern: p.toString(),
          stillPresent: p.test(userCode),
        })),
      },
    };
  });

  const fixedCount = results.filter((r) => r.fixed).length;

  return {
    allFixed: fixedCount === bugs.length,
    fixedCount,
    totalBugs: bugs.length,
    results,
  };
}

