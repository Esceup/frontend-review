import React, { useRef, useState, useCallback } from "react";

const KEYWORDS = [
  "function",
  "const",
  "let",
  "var",
  "return",
  "if",
  "else",
  "for",
  "while",
  "switch",
  "case",
  "break",
  "continue",
  "new",
  "this",
  "class",
  "extends",
  "import",
  "export",
  "default",
  "from",
  "async",
  "await",
  "try",
  "catch",
  "finally",
  "throw",
  "typeof",
  "instanceof",
  "in",
  "of",
  "yield",
  "delete",
  "void",
  "do",
  "with",
  "debugger",
];

const CONSTANTS = ["true", "false", "null", "undefined", "NaN", "Infinity"];
const BUILTINS = [
  "console",
  "Math",
  "Array",
  "Object",
  "String",
  "Number",
  "Boolean",
  "Promise",
  "Map",
  "Set",
  "Date",
  "RegExp",
  "Error",
  "JSON",
  "Symbol",
  "parseInt",
  "parseFloat",
  "isNaN",
  "isFinite",
  "setTimeout",
  "setInterval",
  "clearTimeout",
  "clearInterval",
  "document",
  "window",
  "fetch",
];

// Токенизатор: разбивает код на токены, чтобы избежать конфликтов регулярок
function tokenize(code) {
  const tokens = [];
  let i = 0;

  while (i < code.length) {
    // Комментарии //
    if (code[i] === "/" && code[i + 1] === "/") {
      let end = code.indexOf("\n", i);
      if (end === -1) end = code.length;
      tokens.push({ type: "comment", value: code.slice(i, end) });
      i = end;
      continue;
    }

    // Комментарии /* */
    if (code[i] === "/" && code[i + 1] === "*") {
      let end = code.indexOf("*/", i + 2);
      if (end === -1) end = code.length;
      else end += 2;
      tokens.push({ type: "comment", value: code.slice(i, end) });
      i = end;
      continue;
    }

    // Строки в двойных кавычках
    if (code[i] === '"') {
      let j = i + 1;
      while (j < code.length && !(code[j] === '"' && code[j - 1] !== "\\")) j++;
      tokens.push({ type: "string", value: code.slice(i, j + 1) });
      i = j + 1;
      continue;
    }

    // Строки в одинарных кавычках
    if (code[i] === "'") {
      let j = i + 1;
      while (j < code.length && !(code[j] === "'" && code[j - 1] !== "\\")) j++;
      tokens.push({ type: "string", value: code.slice(i, j + 1) });
      i = j + 1;
      continue;
    }

    // Template literals
    if (code[i] === "`") {
      let j = i + 1;
      while (j < code.length && !(code[j] === "`" && code[j - 1] !== "\\")) j++;
      tokens.push({ type: "string", value: code.slice(i, j + 1) });
      i = j + 1;
      continue;
    }

    // Числа
    if (/\d/.test(code[i])) {
      let j = i;
      while (j < code.length && /[\d.]/.test(code[j])) j++;
      tokens.push({ type: "number", value: code.slice(i, j) });
      i = j;
      continue;
    }

    // Идентификаторы (ключевые слова, функции, переменные)
    if (/[a-zA-Z_$]/.test(code[i])) {
      let j = i;
      while (j < code.length && /[\w$]/.test(code[j])) j++;
      const word = code.slice(i, j);

      if (KEYWORDS.includes(word)) {
        tokens.push({ type: "keyword", value: word });
      } else if (CONSTANTS.includes(word)) {
        tokens.push({ type: "constant", value: word });
      } else if (BUILTINS.includes(word)) {
        tokens.push({ type: "builtin", value: word });
      } else {
        // Проверяем, это функция? (следом идёт "(")
        let k = j;
        while (k < code.length && /\s/.test(code[k])) k++;
        if (code[k] === "(") {
          tokens.push({ type: "function", value: word });
        } else {
          tokens.push({ type: "plain", value: word });
        }
      }
      i = j;
      continue;
    }

    // Всё остальное (пробелы, операторы, скобки)
    tokens.push({ type: "plain", value: code[i] });
    i++;
  }

  return tokens;
}

function escapeHtml(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function highlightCode(code) {
  const tokens = tokenize(code);
  return tokens
    .map((token) => {
      const escaped = escapeHtml(token.value);
      switch (token.type) {
        case "keyword":
          return `<span class="ce-keyword">${escaped}</span>`;
        case "string":
          return `<span class="ce-string">${escaped}</span>`;
        case "number":
          return `<span class="ce-number">${escaped}</span>`;
        case "comment":
          return `<span class="ce-comment">${escaped}</span>`;
        case "constant":
          return `<span class="ce-constant">${escaped}</span>`;
        case "builtin":
          return `<span class="ce-builtin">${escaped}</span>`;
        case "function":
          return `<span class="ce-function">${escaped}</span>`;
        default:
          return escaped;
      }
    })
    .join("");
}

export default function CodeEditor({
  value,
  onChange,
  readOnly = false,
  height = "400px",
}) {
  const textareaRef = useRef(null);
  const highlightRef = useRef(null);
  const lineNumbersRef = useRef(null);

  const getLineCount = (text) => text.split("\n").length;

  const syncScroll = useCallback(() => {
    if (textareaRef.current && highlightRef.current && lineNumbersRef.current) {
      highlightRef.current.scrollTop = textareaRef.current.scrollTop;
      highlightRef.current.scrollLeft = textareaRef.current.scrollLeft;
      lineNumbersRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  }, []);

  const handleKeyDown = (e) => {
    const textarea = textareaRef.current;
    const { selectionStart, selectionEnd, value: val } = textarea;

    // Tab → 3 пробела
    if (e.key === "Tab") {
      e.preventDefault();

      if (e.shiftKey) {
        const lineStart = val.lastIndexOf("\n", selectionStart - 1) + 1;
        const lineText = val.substring(lineStart, selectionStart);
        const spacesToRemove = lineText.match(/^ {1,3}/)?.[0]?.length || 0;

        if (spacesToRemove > 0) {
          const newVal =
            val.substring(0, lineStart) +
            val.substring(lineStart + spacesToRemove);
          onChange(newVal);
          setTimeout(() => {
            textarea.selectionStart = textarea.selectionEnd =
              selectionStart - spacesToRemove;
          }, 0);
        }
      } else {
        const newVal =
          val.substring(0, selectionStart) +
          "   " +
          val.substring(selectionEnd);
        onChange(newVal);
        setTimeout(() => {
          textarea.selectionStart = textarea.selectionEnd = selectionStart + 3;
        }, 0);
      }
      return;
    }

    // Enter → авто-отступ
    if (e.key === "Enter") {
      e.preventDefault();

      const lineStart = val.lastIndexOf("\n", selectionStart - 1) + 1;
      const currentLine = val.substring(lineStart, selectionStart);
      const indent = currentLine.match(/^(\s*)/)[1];

      const trimmedLine = currentLine.trimEnd();
      const extraIndent =
        trimmedLine.endsWith("{") ||
        trimmedLine.endsWith("(") ||
        trimmedLine.endsWith("[")
          ? "   "
          : "";

      const afterCursor = val.substring(selectionEnd);
      const nextChar = afterCursor[0];
      const shouldCloseBrace = trimmedLine.endsWith("{") && nextChar === "}";

      let insertion;
      if (shouldCloseBrace) {
        insertion = "\n" + indent + extraIndent + "\n" + indent;
        const newVal =
          val.substring(0, selectionStart) +
          insertion +
          val.substring(selectionEnd);
        onChange(newVal);
        setTimeout(() => {
          textarea.selectionStart = textarea.selectionEnd =
            selectionStart + 1 + indent.length + extraIndent.length;
        }, 0);
      } else {
        insertion = "\n" + indent + extraIndent;
        const newVal =
          val.substring(0, selectionStart) +
          insertion +
          val.substring(selectionEnd);
        onChange(newVal);
        setTimeout(() => {
          textarea.selectionStart = textarea.selectionEnd =
            selectionStart + insertion.length;
        }, 0);
      }
      return;
    }

    // Автозакрытие ТОЛЬКО скобок (без кавычек!)
    const bracketPairs = { "(": ")", "[": "]", "{": "}" };
    if (bracketPairs[e.key] && selectionStart === selectionEnd) {
      e.preventDefault();
      const newVal =
        val.substring(0, selectionStart) +
        e.key +
        bracketPairs[e.key] +
        val.substring(selectionEnd);
      onChange(newVal);
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = selectionStart + 1;
      }, 0);
      return;
    }

    // Пропуск закрывающей скобки, если она уже есть
    const closingBrackets = [")", "]", "}"];
    if (closingBrackets.includes(e.key) && val[selectionStart] === e.key) {
      e.preventDefault();
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = selectionStart + 1;
      }, 0);
      return;
    }

    // Backspace: удаление пары скобок, если курсор между ними
    if (
      e.key === "Backspace" &&
      selectionStart === selectionEnd &&
      selectionStart > 0
    ) {
      const prevChar = val[selectionStart - 1];
      const nextChar = val[selectionStart];
      if (
        (prevChar === "(" && nextChar === ")") ||
        (prevChar === "[" && nextChar === "]") ||
        (prevChar === "{" && nextChar === "}")
      ) {
        e.preventDefault();
        const newVal =
          val.substring(0, selectionStart - 1) +
          val.substring(selectionStart + 1);
        onChange(newVal);
        setTimeout(() => {
          textarea.selectionStart = textarea.selectionEnd = selectionStart - 1;
        }, 0);
        return;
      }
    }
  };

  const lines = getLineCount(value);

  return (
    <div className="code-editor-container" style={{ height }}>
      <style>{`
        .code-editor-container {
          position: relative;
          border-radius: 12px;
          overflow: hidden;
          background: #1e1e2e;
          border: 1px solid #313244;
          font-family: 'JetBrains Mono', 'Fira Code', 'Cascadia Code', 'Consolas', monospace;
          font-size: 14px;
          line-height: 1.6;
        }
        .code-editor-container:focus-within {
          border-color: #89b4fa;
          box-shadow: 0 0 0 3px rgba(137, 180, 250, 0.15);
        }
        .ce-line-numbers {
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 48px;
          padding: 16px 8px 16px 0;
          text-align: right;
          color: #585b70;
          background: #181825;
          border-right: 1px solid #313244;
          overflow: hidden;
          user-select: none;
          z-index: 2;
          font-size: 13px;
        }
        .ce-highlight {
          position: absolute;
          left: 48px;
          top: 0;
          right: 0;
          bottom: 0;
          padding: 16px;
          overflow: hidden;
          white-space: pre;
          color: #cdd6f4;
          pointer-events: none;
          z-index: 1;
        }
        .ce-textarea {
          position: relative;
          width: 100%;
          height: 100%;
          padding: 16px 16px 16px 64px;
          background: transparent;
          color: transparent;
          caret-color: #f5e0dc;
          border: none;
          outline: none;
          resize: none;
          font-family: inherit;
          font-size: inherit;
          line-height: inherit;
          white-space: pre;
          overflow: auto;
          z-index: 3;
          tab-size: 3;
        }
        .ce-textarea::selection {
          background: rgba(137, 180, 250, 0.3);
          color: transparent;
        }
        .ce-keyword { color: #cba6f7; font-weight: 600; }
        .ce-string { color: #a6e3a1; }
        .ce-number { color: #fab387; }
        .ce-comment { color: #6c7086; font-style: italic; }
        .ce-constant { color: #f38ba8; }
        .ce-builtin { color: #89dceb; }
        .ce-function { color: #89b4fa; }
      `}</style>

      <div ref={lineNumbersRef} className="ce-line-numbers">
        {Array.from({ length: Math.max(lines, 15) }, (_, i) => (
          <div key={i} style={{ height: "1.6em" }}>
            {i + 1}
          </div>
        ))}
      </div>

      <div
        ref={highlightRef}
        className="ce-highlight"
        dangerouslySetInnerHTML={{ __html: highlightCode(value) + "\n" }}
      />

      <textarea
        ref={textareaRef}
        className="ce-textarea"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        onScroll={syncScroll}
        readOnly={readOnly}
        spellCheck={false}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
      />
    </div>
  );
}
