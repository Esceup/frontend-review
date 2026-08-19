// src/data/tsTrainer/validator.js
// ═══════════════════════════════════════════
//  REGEX-ВАЛИДАЦИЯ (быстрая, основная)
// ═══════════════════════════════════════════
export function validateWithRegex(code, challenge) {
  const { mustContain = [], mustNotContain = [] } = challenge.validation;
  const results = [];

  for (const regex of mustContain) {
    results.push({
      type: "mustContain",
      pattern: regex.source,
      passed: regex.test(code),
    });
  }

  for (const regex of mustNotContain) {
    results.push({
      type: "mustNotContain",
      pattern: regex.source,
      passed: !regex.test(code),
    });
  }

  const allPassed = results.every((r) => r.passed);
  const passedCount = results.filter((r) => r.passed).length;

  return { allPassed, passedCount, totalCount: results.length, results };
}

// ═══════════════════════════════════════════
//  TS COMPILER API (полная проверка типов)
// ═══════════════════════════════════════════
let libContent = null;

async function loadLibDts() {
  if (!libContent) {
    const response = await fetch(
      "https://cdn.jsdelivr.net/npm/typescript@5.3.3/lib/lib.es5.d.ts",
    );
    libContent = await response.text();
  }
  return libContent;
}

function getTs() {
  return window.ts;
}

export async function compileWithTS(code) {
  const ts = getTs();
  if (!ts) {
    return {
      success: false,
      errors: [
        {
          message:
            "TypeScript не загружен. Проверьте подключение к интернету и перезагрузите страницу.",
          line: 0,
          code: 0,
          category: "error",
        },
      ],
    };
  }

  try {
    const lib = await loadLibDts();
    const fileName = "user.ts";
    const libFileName = "lib.d.ts";

    // ИСПРАВЛЕНИЕ: noLib: true отключает попытку TS загрузить lib.decorators.d.ts и другие
    const compilerOptions = {
      strict: true,
      noEmit: true,
      target: ts.ScriptTarget.ES2020,
      module: ts.ModuleKind.ESNext,
      noLib: true,
    };

    // Виртуальная файловая система
    const host = {
      getSourceFile: (name) => {
        if (name === fileName) {
          return ts.createSourceFile(name, code, ts.ScriptTarget.Latest, true);
        }
        if (name === libFileName || name === "lib.es5.d.ts") {
          return ts.createSourceFile(name, lib, ts.ScriptTarget.Latest, true);
        }
        // Заглушка: отдаем пустой файл, чтобы TS не падал с TS6053
        if (name.startsWith("lib.") && name.endsWith(".d.ts")) {
          return ts.createSourceFile(name, "", ts.ScriptTarget.Latest, true);
        }
        return undefined;
      },
      getDefaultLibFileName: () => libFileName,
      writeFile: () => {},
      getCurrentDirectory: () => "/",
      getCanonicalFileName: (f) => f,
      useCaseSensitiveFileNames: () => true,
      getNewLine: () => "\n",
      fileExists: (name) =>
        name === fileName ||
        name === libFileName ||
        name === "lib.es5.d.ts" ||
        (name.startsWith("lib.") && name.endsWith(".d.ts")),
      readFile: () => "",
    };

    // ИСПРАВЛЕНИЕ: добавляем libFileName в корневые файлы, так как noLib: true
    const program = ts.createProgram(
      [fileName, libFileName],
      compilerOptions,
      host,
    );

    let diagnostics = ts.getPreEmitDiagnostics(program);

    // Дополнительная страховка: фильтруем TS6053 (File not found) для библиотек
    diagnostics = diagnostics.filter((d) => {
      if (d.code === 6053) {
        const msg = ts.flattenDiagnosticMessageText(d.messageText, "\n");
        if (msg.includes("lib.") && msg.includes(".d.ts")) {
          return false;
        }
      }
      return true;
    });

    return {
      success: diagnostics.length === 0,
      errors: diagnostics.map((d) => ({
        message: ts.flattenDiagnosticMessageText(d.messageText, "\n"),
        line:
          d.file && d.start !== undefined
            ? d.file.getLineAndCharacterOfPosition(d.start).line + 1
            : 0,
        code: d.code,
        category:
          d.category === ts.DiagnosticCategory.Error ? "error" : "warning",
      })),
    };
  } catch (error) {
    return {
      success: false,
      errors: [
        {
          message: `Ошибка компиляции: ${error.message}`,
          line: 0,
          code: 0,
          category: "error",
        },
      ],
    };
  }
}

// Проверка что TS загружен (для UI)
export function isTsAvailable() {
  return !!window.ts;
}
