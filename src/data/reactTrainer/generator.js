// src/data/reactTrainer/generator.js
import { BUG_PATTERNS } from "./bugPatterns";
import { CODE_TEMPLATES, COMPONENT_NAMES } from "./codeTemplates";

// Пулы случайных имён для промежуточных переменных
const VAR_POOLS = {
  TIMER: [
    "timerId",
    "intervalRef",
    "pollTimer",
    "tickHandle",
    "loopId",
    "ticker",
    "pulseId",
    "heartbeat",
  ],
  HANDLER: [
    "handleResize",
    "onWindowChange",
    "resizeCallback",
    "viewportHandler",
    "onLayoutShift",
    "screenWatcher",
  ],
  SUBSCRIPTION: [
    "subscription",
    "listener",
    "channel",
    "connection",
    "stream",
    "observer",
  ],
  CONTROLLER: [
    "controller",
    "abortRef",
    "cancelToken",
    "signalRef",
    "killSwitch",
  ],
  EVENT_NAME: [
    "message",
    "update",
    "notification",
    "data_change",
    "sync",
    "broadcast",
  ],
  DELAY: [500, 800, 1000, 1500, 2000, 3000],
};

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
const shuffle = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

function generateVarMap() {
  const map = {};
  for (const [key, pool] of Object.entries(VAR_POOLS)) map[key] = pick(pool);
  return map;
}

// Подстановка {{VAR}} в строку (код или regex-паттерн)
function applyVarMap(str, varMap) {
  let result = str;
  for (const [key, value] of Object.entries(varMap)) {
    result = result.split(`{{${key}}}`).join(value);
  }
  return result;
}

const BUGS_BY_DIFFICULTY = {
  easy: { count: 1, severities: ["easy"] },
  medium: { count: 2, severities: ["easy", "medium"] },
  hard: { count: 4, severities: ["medium", "hard"] },
  insane: { count: 6, severities: ["medium", "hard"] },
  mixed: { count: () => pick([3, 4, 5]), severities: null },
};

export function generateTask(options = {}) {
  const { difficulty = "mixed", categories = [] } = options;
  const cfg = BUGS_BY_DIFFICULTY[difficulty] || BUGS_BY_DIFFICULTY.mixed;
  const requested = typeof cfg.count === "function" ? cfg.count() : cfg.count;

  const template = pick(CODE_TEMPLATES);
  const componentName = pick(COMPONENT_NAMES);

  // Пул подходящих багов
  let pool = [...BUG_PATTERNS];
  if (categories.length)
    pool = pool.filter((p) => categories.includes(p.category));
  if (cfg.severities)
    pool = pool.filter((p) => cfg.severities.includes(p.severity));
  const selected = shuffle(pool).slice(0, Math.min(requested, pool.length));

  // Общий varMap: имена темы + случайные промежуточные имена + имя компонента
  const varMap = {
    ...template.vars,
    ...generateVarMap(),
    COMPONENT_NAME: componentName,
  };

  // Раскладка багов по совместимым свободным слотам
  const freeSlots = new Set(Object.keys(template.slots));
  const placements = [];
  for (const bug of selected) {
    const slot = (bug.slots || []).find((s) => freeSlots.has(s));
    if (slot) {
      freeSlots.delete(slot);
      placements.push({ bug, slot });
    }
  }

  let buggyCode = applyVarMap(template.template, varMap);
  let fixedCode = buggyCode;

  for (const slotName of Object.keys(template.slots)) {
    const placement = placements.find((p) => p.slot === slotName);
    const defaultSnippet = applyVarMap(
      template.slots[slotName].default,
      varMap,
    );
    if (placement) {
      buggyCode = buggyCode.replace(
        `{{${slotName}}}`,
        applyVarMap(placement.bug.buggyCode, varMap),
      );
      fixedCode = fixedCode.replace(
        `{{${slotName}}}`,
        applyVarMap(placement.bug.fixedCode, varMap),
      );
    } else {
      buggyCode = buggyCode.replace(`{{${slotName}}}`, defaultSnippet);
      fixedCode = fixedCode.replace(`{{${slotName}}}`, defaultSnippet);
    }
  }

  const bugsPlaced = placements.map(({ bug }) => ({
    id: bug.id,
    category: bug.category,
    severity: bug.severity,
    title: bug.title,
    description: bug.description,
    hint: bug.hint,
    hintCode: applyVarMap(bug.hintCode, varMap),
    fixExplanation: bug.fixExplanation,
    validation: {
      mustContain: (bug.validation.mustContain || []).map(
        (p) => new RegExp(applyVarMap(p, varMap)),
      ),
      mustNotContain: (bug.validation.mustNotContain || []).map(
        (p) => new RegExp(applyVarMap(p, varMap)),
      ),
    },
  }));

  return {
    id: `trainer-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    code: buggyCode,
    solution: fixedCode,
    bugs: bugsPlaced,
    bugCount: bugsPlaced.length,
    componentName,
    templateName: template.name,
    difficulty,
    generatedAt: new Date().toISOString(),
  };
}

export function validateFixes(userCode, bugs) {
  const results = bugs.map((bug) => {
    const { mustContain, mustNotContain } = bug.validation;
    const containsAll = mustContain.every((p) => p.test(userCode));
    const containsNone = mustNotContain.every((p) => !p.test(userCode));
    return {
      bugId: bug.id,
      title: bug.title,
      fixed: containsAll && containsNone,
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
