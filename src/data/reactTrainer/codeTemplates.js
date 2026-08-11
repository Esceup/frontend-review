// src/data/reactTrainer/codeTemplates.js

// Случайные имена для промежуточных переменных (таймеры, обработчики и т.д.)
// вынесены в генератор. Здесь — общий каркас и темы.

const SHARED_SLOTS = {
  SLOT_TIMER: {
    default: `useEffect(() => {
  const {{TIMER}} = setInterval(() => {
    {{SET_NUMBER}}((prev) => prev + 1);
  }, 1000);
  return () => clearInterval({{TIMER}});
}, []);`,
  },
  SLOT_LISTENER: {
    default: `useEffect(() => {
  const {{HANDLER}} = () => {{SET_NUMBER}}(window.innerWidth);
  window.addEventListener("resize", {{HANDLER}});
  return () => window.removeEventListener("resize", {{HANDLER}});
}, []);`,
  },
  SLOT_SUB: {
    default: `useEffect(() => {
  const {{SUBSCRIPTION}} = eventBus.subscribe("{{EVENT_NAME}}", (data) => {
    {{SET_ARRAY}}((prev) => [...prev, data]);
  });
  return () => {{SUBSCRIPTION}}.unsubscribe();
}, []);`,
  },
  SLOT_FETCH: {
    default: `useEffect(() => {
  const {{CONTROLLER}} = new AbortController();
  fetchUser({{DEP}}, { signal: {{CONTROLLER}}.signal })
    .then((res) => res.json())
    .then((data) => {{SET_OBJECT}}(data))
    .catch((err) => {
      if (err.name !== "AbortError") console.error(err);
    });
  return () => {{CONTROLLER}}.abort();
}, [{{DEP}}]);`,
  },
  SLOT_ADD: {
    default: `const {{FN_ADD}} = (newItem) => {
  {{SET_ARRAY}}((prev) => [...prev, newItem]);
};`,
  },
  SLOT_REMOVE: {
    default: `const {{FN_REMOVE}} = (id) => {
  {{SET_ARRAY}}((prev) => prev.filter(({{ITEM}}) => {{ITEM}}.id !== id));
};`,
  },
  SLOT_UPDATE: {
    default: `const {{FN_UPDATE}} = (value) => {
  {{SET_OBJECT}}((prev) => ({ ...prev, {{FIELD}}: value }));
};`,
  },
  SLOT_TOGGLE: {
    default: `const {{FN_TOGGLE}} = (id) => {
  {{SET_ARRAY}}((prev) =>
    prev.map(({{ITEM}}) =>
      {{ITEM}}.id === id ? { ...{{ITEM}}, done: !{{ITEM}}.done } : {{ITEM}}
    )
  );
};`,
  },
  SLOT_MEMO: {
    default: `const filtered = useMemo(
  () => {{ARRAY}}.filter(({{ITEM}}) => {{ITEM}}.name.includes({{TEXT}})),
  [{{ARRAY}}, {{TEXT}}]
);`,
  },
  SLOT_CALLBACK: {
    default: `const handleClick = useCallback(() => {
  {{SET_NUMBER}}({{NUMBER}} + 1);
}, [{{NUMBER}}]);`,
  },
  SLOT_HOOKCOND: {
    default: `const [{{LOCAL_A}}, {{SET_LOCAL_A}}] = useState("");`,
  },
  SLOT_BADGE: {
    default: `{ {{NUMBER}} > 0 && <div className="badge">Выполнено: { {{NUMBER}} }</div> }`,
  },
  SLOT_LIST: {
    default: `{filtered.map(({{ITEM}}) => (
  <li key={ {{ITEM}}.id } className="row">
    <span>{ {{ITEM}}.name }</span>
    <button onClick={() => {{FN_TOGGLE}}({{ITEM}}.id)}>✓</button>
    <button onClick={() => {{FN_REMOVE}}({{ITEM}}.id)}>✕</button>
  </li>
))}`,
  },
};

const SHARED_TEMPLATE = `import { useState, useEffect, useMemo, useCallback } from "react";

function {{COMPONENT_NAME}}({ {{DEP}} = 1 }) {
  const [{{ARRAY}}, {{SET_ARRAY}}] = useState([
    { id: 1, name: "Настроить CI/CD", done: false },
    { id: 2, name: "Написать тесты", done: true },
    { id: 3, name: "Обновить зависимости", done: false },
  ]);
  const [{{OBJECT}}, {{SET_OBJECT}}] = useState({
    {{FIELD}}: "Иван Петров",
    email: "ivan@example.com",
    {{NESTED}}: { {{NESTED_FIELD}}: "Москва", street: "ул. Ленина, 1" },
  });
  const [{{TEXT}}, {{SET_TEXT}}] = useState("");
  const [{{NUMBER}}, {{SET_NUMBER}}] = useState(0);
  const [{{FLAG}}, {{SET_FLAG}}] = useState(true);

  {{SLOT_HOOKCOND}}

  {{SLOT_TIMER}}

  {{SLOT_LISTENER}}

  {{SLOT_SUB}}

  {{SLOT_FETCH}}

  {{SLOT_ADD}}

  {{SLOT_REMOVE}}

  {{SLOT_UPDATE}}

  {{SLOT_TOGGLE}}

  {{SLOT_MEMO}}

  {{SLOT_CALLBACK}}

  return (
    <div className="app">
      <header className="header">
        <h1>{{TITLE}}</h1>
        <span className="user">{ {{OBJECT}}.{{FIELD}} }</span>
        <span className="counter">Счётчик: { {{NUMBER}} }</span>
      </header>

      <input
        type="text"
        value={ {{TEXT}} }
        onChange={(e) => {{SET_TEXT}}(e.target.value)}
        placeholder="Поиск..."
      />

      <input
        type="text"
        value={ {{OBJECT}}.{{FIELD}} }
        onChange={(e) => {{FN_UPDATE}}(e.target.value)}
      />

      <button onClick={() => {{FN_ADD}}({ id: Date.now(), name: "Новый элемент", done: false })}>
        Добавить
      </button>

      <button onClick={handleClick}>+1</button>

      {{SLOT_BADGE}}

      <ul className="list">
        {{SLOT_LIST}}
      </ul>
    </div>
  );
}

export default {{COMPONENT_NAME}};`;

export const CODE_TEMPLATES = [
  {
    id: "task-manager",
    name: "Менеджер задач",
    template: SHARED_TEMPLATE,
    slots: SHARED_SLOTS,
    vars: {
      ARRAY: "tasks",
      SET_ARRAY: "setTasks",
      ITEM: "task",
      OBJECT: "profile",
      SET_OBJECT: "setProfile",
      FIELD: "name",
      NESTED: "address",
      NESTED_FIELD: "city",
      NUMBER: "seconds",
      SET_NUMBER: "setSeconds",
      TEXT: "query",
      SET_TEXT: "setQuery",
      DEP: "userId",
      FLAG: "isReady",
      SET_FLAG: "setIsReady",
      LOCAL_A: "draft",
      SET_LOCAL_A: "setDraft",
      FN_ADD: "addTask",
      FN_REMOVE: "removeTask",
      FN_TOGGLE: "toggleTask",
      FN_UPDATE: "updateName",
      TITLE: "Менеджер задач",
    },
  },
  {
    id: "user-dashboard",
    name: "Панель пользователей",
    template: SHARED_TEMPLATE,
    slots: SHARED_SLOTS,
    vars: {
      ARRAY: "users",
      SET_ARRAY: "setUsers",
      ITEM: "user",
      OBJECT: "account",
      SET_OBJECT: "setAccount",
      FIELD: "username",
      NESTED: "settings",
      NESTED_FIELD: "theme",
      NUMBER: "score",
      SET_NUMBER: "setScore",
      TEXT: "search",
      SET_TEXT: "setSearch",
      DEP: "accountId",
      FLAG: "isAdmin",
      SET_FLAG: "setIsAdmin",
      LOCAL_A: "note",
      SET_LOCAL_A: "setNote",
      FN_ADD: "addUser",
      FN_REMOVE: "removeUser",
      FN_TOGGLE: "toggleUser",
      FN_UPDATE: "updateUsername",
      TITLE: "Панель пользователей",
    },
  },
  {
    id: "notification-center",
    name: "Центр уведомлений",
    template: SHARED_TEMPLATE,
    slots: SHARED_SLOTS,
    vars: {
      ARRAY: "alerts",
      SET_ARRAY: "setAlerts",
      ITEM: "alert",
      OBJECT: "config",
      SET_OBJECT: "setConfig",
      FIELD: "label",
      NESTED: "push",
      NESTED_FIELD: "enabled",
      NUMBER: "unread",
      SET_NUMBER: "setUnread",
      TEXT: "filterText",
      SET_TEXT: "setFilterText",
      DEP: "channelId",
      FLAG: "isMuted",
      SET_FLAG: "setIsMuted",
      LOCAL_A: "message",
      SET_LOCAL_A: "setMessage",
      FN_ADD: "addAlert",
      FN_REMOVE: "removeAlert",
      FN_TOGGLE: "toggleAlert",
      FN_UPDATE: "updateLabel",
      TITLE: "Центр уведомлений",
    },
  },
];

export const COMPONENT_NAMES = [
  "TodoList",
  "UserProfile",
  "SettingsForm",
  "AnalyticsDashboard",
  "NotificationPanel",
  "SearchResults",
  "OrderTracker",
  "ProductCatalog",
  "ChatWidget",
  "TaskManager",
  "ActivityFeed",
  "MetricsView",
];
