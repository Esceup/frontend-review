// src/components/Interview/CodePreview.jsx
import { useMemo } from "react";

const KEYWORDS = new Set([
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
  "interface",
  "type",
  "enum",
  "implements",
  "private",
  "public",
  "readonly",
  "static",
  "get",
  "set",
  "keyof",
  "infer",
  "declare",
  "namespace",
  "module",
  "as",
  "is",
  "satisfies",
]);

const CONSTANTS = new Set([
  "true",
  "false",
  "null",
  "undefined",
  "NaN",
  "Infinity",
]);

const BUILTINS = new Set([
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
  "setTimeout",
  "setInterval",
  "clearTimeout",
  "clearInterval",
  "document",
  "window",
  "fetch",
  "React",
  "useState",
  "useEffect",
  "useMemo",
  "useCallback",
  "useRef",
  "useSelector",
  "useDispatch",
  "createApi",
  "createSlice",
  "configureStore",
  "createAsyncThunk",
  "fetchBaseQuery",
  "List",
  "AutoSizer",
  "Provider",
  "Route",
  "useNavigate",
  "useParams",
  "BrowserRouter",
  "HashRouter",
  "Routes",
]);

function tokenize(code) {
  const tokens = [];
  let i = 0;
  while (i < code.length) {
    // line comment
    if (code[i] === "/" && code[i + 1] === "/") {
      let end = code.indexOf("\n", i);
      if (end === -1) end = code.length;
      tokens.push({ type: "comment", value: code.slice(i, end) });
      i = end;
      continue;
    }
    // block comment
    if (code[i] === "/" && code[i + 1] === "*") {
      let end = code.indexOf("*/", i + 2);
      end = end === -1 ? code.length : end + 2;
      tokens.push({ type: "comment", value: code.slice(i, end) });
      i = end;
      continue;
    }
    // strings
    if (code[i] === '"' || code[i] === "'" || code[i] === "`") {
      const quote = code[i];
      let j = i + 1;
      while (j < code.length && !(code[j] === quote && code[j - 1] !== "\\"))
        j++;
      tokens.push({ type: "string", value: code.slice(i, j + 1) });
      i = j + 1;
      continue;
    }
    // numbers
    if (/\d/.test(code[i])) {
      let j = i;
      while (j < code.length && /[\d.xXbBoOeE_a-fA-F]/.test(code[j])) j++;
      tokens.push({ type: "number", value: code.slice(i, j) });
      i = j;
      continue;
    }
    // identifiers
    if (/[a-zA-Z_$]/.test(code[i])) {
      let j = i;
      while (j < code.length && /[\w$]/.test(code[j])) j++;
      const word = code.slice(i, j);
      if (KEYWORDS.has(word)) tokens.push({ type: "keyword", value: word });
      else if (CONSTANTS.has(word))
        tokens.push({ type: "constant", value: word });
      else if (BUILTINS.has(word))
        tokens.push({ type: "builtin", value: word });
      else {
        let k = j;
        while (k < code.length && /\s/.test(code[k])) k++;
        tokens.push({
          type: code[k] === "(" ? "function" : "plain",
          value: word,
        });
      }
      i = j;
      continue;
    }
    // operators / punctuation
    if (/[{}[\]()=<>+\-*/%!&|^~?:;,.]/.test(code[i])) {
      tokens.push({ type: "operator", value: code[i] });
      i++;
      continue;
    }
    tokens.push({ type: "plain", value: code[i] });
    i++;
  }
  return tokens;
}

const COLORS = {
  keyword: "#cba6f7",
  string: "#a6e3a1",
  number: "#fab387",
  comment: "#6c7086",
  constant: "#f38ba8",
  builtin: "#89dceb",
  function: "#89b4fa",
  operator: "#94e2d5",
  plain: "#cdd6f4",
};

function escapeHtml(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export default function CodePreview({ code, title, height }) {
  const html = useMemo(() => {
    const tokens = tokenize(code.trim());
    return tokens
      .map(
        (t) =>
          `<span style="color:${COLORS[t.type]}">${escapeHtml(t.value)}</span>`,
      )
      .join("");
  }, [code]);

  const lines = code.trim().split("\n");

  return (
    <div
      className="overflow-hidden rounded-lg border border-ink-600 bg-[#1e1e2e]"
      style={height ? { maxHeight: height, overflow: "auto" } : undefined}
    >
      {/* title bar */}
      <div className="flex items-center gap-2 border-b border-ink-600 bg-[#181825] px-4 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-[#f38ba8]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#fab387]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#a6e3a1]" />
        <span className="ml-2 font-mono text-[11px] text-mist-500">
          {title || "example.ts"}
        </span>
      </div>
      {/* code body */}
      <div className="flex overflow-x-auto p-4">
        {/* line numbers */}
        <div className="mr-4 select-none text-right font-mono text-[13px] leading-[1.6] text-[#585b70]">
          {lines.map((_, i) => (
            <div key={i}>{i + 1}</div>
          ))}
        </div>
        {/* highlighted code */}
        <pre
          className="flex-1 font-mono text-[13px] leading-[1.6]"
          style={{ whiteSpace: "pre", tabSize: 2 }}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </div>
  );
}
