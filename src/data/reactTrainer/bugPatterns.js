// src/data/reactTrainer/bugPatterns.js

export const BUG_PATTERNS = [
  {
    id: "memory-leak-interval",
    category: "memory-leak",
    severity: "hard",
    title: "Утечка памяти: setInterval без очистки",
    description: "useEffect создаёт интервал, но не возвращает cleanup-функцию",
    hint: "Подумайте: что произойдёт при размонтировании компонента? Интервал продолжит работать. Нужно вернуть функцию очистки из useEffect.",
    fixExplanation:
      "Добавьте return () => clearInterval(timerId) в конце useEffect",
    // Шаблон с багом ({{VAR}} — переменные для рандомизации)
    buggyCode: `useEffect(() => {
  const timerId = setInterval(() => {
    setCount(prev => prev + {{INCREMENT}});
  }, {{DELAY}});
}, []);`,
    // Правильный вариант
    fixedCode: `useEffect(() => {
  const timerId = setInterval(() => {
    setCount(prev => prev + {{INCREMENT}});
  }, {{DELAY}});
  return () => clearInterval(timerId);
}, []);`,
    // Паттерны для валидации
    validation: {
      mustContain: [/return\s*\(\)\s*=>\s*clearInterval/, /clearInterval\s*\(/],
      mustNotContain: [],
    },
  },

  {
    id: "memory-leak-listener",
    category: "memory-leak",
    severity: "medium",
    title: "Утечка памяти: addEventListener без removeEventListener",
    description: "Событие подписано, но не отписано при размонтировании",
    hint: "Каждый addEventListener должен иметь пару removeEventListener. Где в useEffect должна быть функция очистки?",
    fixExplanation:
      "Верните cleanup: return () => window.removeEventListener('resize', handler)",
    buggyCode: `useEffect(() => {
  const handleResize = () => {
    setWidth(window.innerWidth);
  };
  window.addEventListener("resize", handleResize);
}, []);`,
    fixedCode: `useEffect(() => {
  const handleResize = () => {
    setWidth(window.innerWidth);
  };
  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
}, []);`,
    validation: {
      mustContain: [/removeEventListener/, /return\s*\(\)\s*=>/],
      mustNotContain: [],
    },
  },

  {
    id: "memory-leak-subscription",
    category: "memory-leak",
    severity: "hard",
    title: "Утечка памяти: подписка без отписки",
    description: "Подписка на WebSocket/EventEmitter не очищается",
    hint: "Подписка создаёт постоянную связь. При размонтировании нужно отписаться, иначе колбэк будет вызываться для мёртвого компонента.",
    fixExplanation: "Верните cleanup: return () => subscription.unsubscribe()",
    buggyCode: `useEffect(() => {
  const subscription = eventBus.subscribe("{{EVENT_NAME}}", (data) => {
    setMessages(prev => [...prev, data]);
  });
}, []);`,
    fixedCode: `useEffect(() => {
  const subscription = eventBus.subscribe("{{EVENT_NAME}}", (data) => {
    setMessages(prev => [...prev, data]);
  });
  return () => subscription.unsubscribe();
}, []);`,
    validation: {
      mustContain: [/unsubscribe/, /return\s*\(\)\s*=>/],
      mustNotContain: [],
    },
  },

  {
    id: "direct-state-mutation-array",
    category: "state-mutation",
    severity: "medium",
    title: "Прямая мутация state: push в массив",
    description: "Массив в state мутируется через push вместо создания нового",
    hint: "React не увидит изменение, потому что ссылка на массив не поменялась. Нужно создать НОВЫЙ массив.",
    fixExplanation: "Замените items.push(x) на setItems(prev => [...prev, x])",
    buggyCode: `const addItem = (newItem) => {
  items.push(newItem);
  setItems(items);
};`,
    fixedCode: `const addItem = (newItem) => {
  setItems(prev => [...prev, newItem]);
};`,
    validation: {
      mustContain: [/\.\.\./, /setItems/],
      mustNotContain: [/items\.push/],
    },
  },

  {
    id: "direct-state-mutation-object",
    category: "state-mutation",
    severity: "medium",
    title: "Прямая мутация state: изменение свойства объекта",
    description: "Объект в state мутируется напрямую",
    hint: "user.name = 'x' меняет тот же объект. React сравнивает ссылки — ре-рендер не произойдёт. Создайте новый объект через spread.",
    fixExplanation: "Замените на setUser(prev => ({ ...prev, name: value }))",
    buggyCode: `const updateName = (value) => {
  user.name = value;
  setUser(user);
};`,
    fixedCode: `const updateName = (value) => {
  setUser(prev => ({ ...prev, name: value }));
};`,
    validation: {
      mustContain: [/setUser/, /\.\.\./],
      mustNotContain: [/user\.name\s*=/],
    },
  },

  {
    id: "direct-state-mutation-nested",
    category: "state-mutation",
    severity: "hard",
    title: "Мутация вложенного объекта в state",
    description: "Изменяется вложенное свойство без создания новых ссылок",
    hint: "Нужно создать новый объект на КАЖДОМ уровне вложенности, где есть изменения. Используйте spread или structuredClone.",
    fixExplanation:
      "setForm(prev => ({ ...prev, address: { ...prev.address, city } }))",
    buggyCode: `const updateCity = (city) => {
  form.address.city = city;
  setForm(form);
};`,
    fixedCode: `const updateCity = (city) => {
  setForm(prev => ({
    ...prev,
    address: { ...prev.address, city },
  }));
};`,
    validation: {
      mustContain: [/setForm/, /\.\.\.prev/],
      mustNotContain: [/form\.address\.city\s*=/],
    },
  },

  {
    id: "stale-closure",
    category: "stale-closure",
    severity: "hard",
    title: "Stale closure в useEffect",
    description: "Эффект замкнул начальное значение state",
    hint: "С пустым массивом зависимостей [] колбэк навсегда запомнит count = 0. Добавьте count в зависимости или используйте функциональный сеттер.",
    fixExplanation:
      "Добавьте [count] в зависимости или используйте setCount(c => c + 1)",
    buggyCode: `useEffect(() => {
  const id = setInterval(() => {
    console.log("Count:", count);
  }, 1000);
  return () => clearInterval(id);
}, []);`,
    fixedCode: `useEffect(() => {
  const id = setInterval(() => {
    console.log("Count:", count);
  }, 1000);
  return () => clearInterval(id);
}, [count]);`,
    validation: {
      mustContain: [/\[count\]/],
      mustNotContain: [],
    },
  },

  {
    id: "missing-key",
    category: "rendering",
    severity: "easy",
    title: "Отсутствие key при рендере списка",
    description: "Элементы списка рендерятся без атрибута key",
    hint: "React использует key для идентификации элементов при reconciliation. Без него обновления будут некорректными.",
    fixExplanation: "Добавьте key={item.id} к каждому элементу списка",
    buggyCode: `{items.map(item => (
  <div className="item">
    {item.name}
  </div>
))}`,
    fixedCode: `{items.map(item => (
  <div key={item.id} className="item">
    {item.name}
  </div>
))}`,
    validation: {
      mustContain: [/key=\{/],
      mustNotContain: [],
    },
  },

  {
    id: "index-as-key",
    category: "rendering",
    severity: "medium",
    title: "Индекс массива как key",
    description: "Используется index как key для динамического списка",
    hint: "При сортировке/фильтрации индексы смещаются, и React путает элементы. Используйте уникальный ID из данных.",
    fixExplanation: "Замените key={index} на key={item.id}",
    buggyCode: `{items.map((item, index) => (
  <div key={index} className="item">
    {item.name}
  </div>
))}`,
    fixedCode: `{items.map(item => (
  <div key={item.id} className="item">
    {item.name}
  </div>
))}`,
    validation: {
      mustContain: [/key=\{item\.id\}/],
      mustNotContain: [/key=\{index\}/],
    },
  },

  {
    id: "infinite-rerender",
    category: "rendering",
    severity: "medium",
    title: "Бесконечный ре-рендер",
    description: "setState вызывается прямо в теле рендера",
    hint: "Если setX() вызывается не в обработчике и не в useEffect, а прямо в JSX/теле функции — каждый рендер вызовет новый рендер.",
    fixExplanation: "Оберните в useEffect или в обработчик события",
    buggyCode: `function Counter() {
  const [count, setCount] = useState(0);
  setCount(count + 1); // ← вызов в теле рендера!
  return <div>{count}</div>;
}`,
    fixedCode: `function Counter() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    setCount(count + 1);
  }, []);
  return <div>{count}</div>;
}`,
    validation: {
      mustContain: [/useEffect/],
      mustNotContain: [],
    },
  },

  {
    id: "mutating-props",
    category: "state-mutation",
    severity: "medium",
    title: "Мутация props",
    description: "Компонент напрямую изменяет полученный prop",
    hint: "Props иммутабельны. Для изменения вызовите колбэк из props, чтобы родитель обновил свой state.",
    fixExplanation: "Замените props.x = y на вызов props.onChange(y)",
    buggyCode: `function Child({ data, onUpdate }) {
  const handleClick = () => {
    data.value = "changed";
  };
  return <button onClick={handleClick}>Update</button>;
}`,
    fixedCode: `function Child({ data, onUpdate }) {
  const handleClick = () => {
    onUpdate({ ...data, value: "changed" });
  };
  return <button onClick={handleClick}>Update</button>;
}`,
    validation: {
      mustContain: [/onUpdate/],
      mustNotContain: [/data\.value\s*=/],
    },
  },

  {
    id: "async-state-after-unmount",
    category: "memory-leak",
    severity: "hard",
    title: "setState после размонтирования",
    description:
      "Асинхронный запрос завершается после размонтирования компонента",
    hint: "Если компонент размонтируется до завершения fetch, setState вызовется на мёртвом компоненте. Используйте AbortController или флаг isMounted.",
    fixExplanation: "Добавьте AbortController и очищайте в cleanup",
    buggyCode: `useEffect(() => {
  fetch("/api/data")
    .then(res => res.json())
    .then(data => setData(data));
}, []);`,
    fixedCode: `useEffect(() => {
  const controller = new AbortController();
  fetch("/api/data", { signal: controller.signal })
    .then(res => res.json())
    .then(data => setData(data))
    .catch(err => {
      if (err.name !== "AbortError") throw err;
    });
  return () => controller.abort();
}, []);`,
    validation: {
      mustContain: [/AbortController|isMounted|return\s*\(\)/],
      mustNotContain: [],
    },
  },

  {
    id: "missing-deps-effect",
    category: "stale-closure",
    severity: "medium",
    title: "Пропущенная зависимость useEffect",
    description: "Эффект использует переменную, но не указал её в зависимостях",
    hint: "Если эффект читает userId, он должен перезапускаться при изменении userId. Добавьте в массив зависимостей.",
    fixExplanation: "Добавьте [userId] вместо []",
    buggyCode: `useEffect(() => {
  fetchUser(userId).then(data => setUser(data));
}, []);`,
    fixedCode: `useEffect(() => {
  fetchUser(userId).then(data => setUser(data));
}, [userId]);`,
    validation: {
      mustContain: [/\[userId\]/],
      mustNotContain: [],
    },
  },
];

// Категории для фильтрации
export const CATEGORIES = [
  { id: "memory-leak", label: "Утечки памяти", icon: "💧" },
  { id: "state-mutation", label: "Мутация state/props", icon: "🔒" },
  { id: "stale-closure", label: "Stale closure", icon: "⏰" },
  { id: "rendering", label: "Рендеринг", icon: "🖥️" },
];
