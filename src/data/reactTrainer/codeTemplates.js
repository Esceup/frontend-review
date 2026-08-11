// src/data/reactTrainer/codeTemplates.js

export const CODE_TEMPLATES = [
  {
    id: "counter-component",
    name: "Счётчик",
    // Позиции куда можно вставить баг-паттерн
    // {{BUG_SLOT_1}}, {{BUG_SLOT_2}} — маркеры для вставки
    template: `import { useState, useEffect } from "react";

function {{COMPONENT_NAME}}() {
  const [count, setCount] = useState(0);
  const [items, setItems] = useState([]);
  const [width, setWidth] = useState(window.innerWidth);

  {{BUG_SLOT_1}}

  {{BUG_SLOT_2}}

  const addItem = (newItem) => {
    {{BUG_SLOT_3}}
  };

  return (
    <div>
      <h1>{{COMPONENT_NAME}}: {count}</h1>
      <p>Width: {width}</p>
      <button onClick={() => addItem({ id: Date.now(), name: "Item" })}>
        Add
      </button>
      <ul>
        {{BUG_SLOT_4}}
      </ul>
    </div>
  );
}

export default {{COMPONENT_NAME}};`,
    // Какие слоты обязательны (минимум)
    requiredSlots: ["BUG_SLOT_1"],
  },

  {
    id: "data-fetcher",
    name: "Загрузка данных",
    template: `import { useState, useEffect } from "react";

function {{COMPONENT_NAME}}() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(1);

  {{BUG_SLOT_1}}

  {{BUG_SLOT_2}}

  return (
    <div>
      {loading ? <Spinner /> : <DataView data={data} />}
      <button onClick={() => setUserId(prev => prev + 1)}>
        Next User
      </button>
    </div>
  );
}

export default {{COMPONENT_NAME}};`,
    requiredSlots: ["BUG_SLOT_1"],
  },

  {
    id: "list-manager",
    name: "Список элементов",
    template: `import { useState, useEffect } from "react";

function {{COMPONENT_NAME}}({ items: initialItems }) {
  const [items, setItems] = useState(initialItems);
  const [filter, setFilter] = useState("");

  {{BUG_SLOT_1}}

  const removeItem = (id) => {
    {{BUG_SLOT_2}}
  };

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <input value={filter} onChange={e => setFilter(e.target.value)} />
      <ul>
        {{BUG_SLOT_3}}
      </ul>
    </div>
  );
}

export default {{COMPONENT_NAME}};`,
    requiredSlots: ["BUG_SLOT_3"],
  },

  {
    id: "form-handler",
    name: "Форма",
    template: `import { useState } from "react";

function {{COMPONENT_NAME}}({ onSubmit }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: { city: "", street: "" },
  });

  const updateField = (field, value) => {
    {{BUG_SLOT_1}}
  };

  const updateCity = (city) => {
    {{BUG_SLOT_2}}
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={form.name}
        onChange={e => updateField("name", e.target.value)}
      />
      <input
        value={form.address.city}
        onChange={e => updateCity(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
}

export default {{COMPONENT_NAME}};`,
    requiredSlots: ["BUG_SLOT_1"],
  },
];

// Имена компонентов для рандомизации
export const COMPONENT_NAMES = [
  "Dashboard",
  "UserProfile",
  "TodoList",
  "ChatWidget",
  "NotificationPanel",
  "SearchResults",
  "SettingsForm",
  "ProductCard",
  "OrderTracker",
  "AnalyticsView",
];

// Названия переменных/событий для рандомизации
export const RANDOM_VARS = {
  EVENT_NAME: ["message", "update", "notification", "data_change", "sync"],
  DELAY: [500, 1000, 1500, 2000, 3000],
  INCREMENT: [1, 2, 5, 10],
};
