// src/data/reactTrainer/bugPatterns.js
//
// Каждый паттерн:
//  - slots: в какие слоты шаблона может быть вставлен
//  - buggyCode / fixedCode используют плейсхолдеры {{VAR}}
//  - validation.mustContain / mustNotContain — строки-regex с плейсхолдерами,
//    которые резолвятся в генераторе под конкретные имена переменных.

export const BUG_PATTERNS = [
  // ═══════════════════════════════════════════
  //  УТЕЧКИ ПАМЯТИ
  // ═══════════════════════════════════════════
  {
    id: "leak-interval",
    category: "memory-leak",
    severity: "medium",
    slots: ["SLOT_TIMER"],
    title: "Интервал без очистки",
    description: "setInterval создан в useEffect, но cleanup не возвращён.",
    hint: "Верните из useEffect функцию, которая вызовет clearInterval.",
    hintCode: `useEffect(() => {
  const {{TIMER}} = setInterval(() => {{SET_NUMBER}}(p => p + 1), 1000);
  return () => clearInterval({{TIMER}});
}, []);`,
    fixExplanation:
      "Без cleanup интервал продолжает работать после размонтирования — утечка памяти.",
    buggyCode: `useEffect(() => {
  const {{TIMER}} = setInterval(() => {
    {{SET_NUMBER}}((prev) => prev + 1);
  }, 1000);
}, []);`,
    fixedCode: `useEffect(() => {
  const {{TIMER}} = setInterval(() => {
    {{SET_NUMBER}}((prev) => prev + 1);
  }, 1000);
  return () => clearInterval({{TIMER}});
}, []);`,
    validation: {
      mustContain: ["return\\s*\\(\\)\\s*=>\\s*clearInterval\\({{TIMER}}\\)"],
      mustNotContain: [],
    },
  },
  {
    id: "leak-timeout",
    category: "memory-leak",
    severity: "easy",
    slots: ["SLOT_TIMER"],
    title: "Таймаут без отмены",
    description: "setTimeout не очищается при размонтировании.",
    hint: "Верните cleanup с clearTimeout.",
    hintCode: `useEffect(() => {
  const {{TIMER}} = setTimeout(() => {{SET_NUMBER}}(p => p + 1), {{DELAY}});
  return () => clearTimeout({{TIMER}});
}, []);`,
    fixExplanation:
      "Если компонент размонтируется до срабатывания таймера, setState вызовется на мёртвом компоненте.",
    buggyCode: `useEffect(() => {
  const {{TIMER}} = setTimeout(() => {
    {{SET_NUMBER}}((prev) => prev + 1);
  }, {{DELAY}});
}, []);`,
    fixedCode: `useEffect(() => {
  const {{TIMER}} = setTimeout(() => {
    {{SET_NUMBER}}((prev) => prev + 1);
  }, {{DELAY}});
  return () => clearTimeout({{TIMER}});
}, []);`,
    validation: {
      mustContain: ["clearTimeout\\({{TIMER}}\\)"],
      mustNotContain: [],
    },
  },
  {
    id: "leak-listener",
    category: "memory-leak",
    severity: "medium",
    slots: ["SLOT_LISTENER"],
    title: "Событие без отписки",
    description: "addEventListener есть, removeEventListener — нет.",
    hint: "Каждый addEventListener должен иметь пару removeEventListener в cleanup.",
    hintCode: `useEffect(() => {
  const {{HANDLER}} = () => {{SET_NUMBER}}(window.innerWidth);
  window.addEventListener("resize", {{HANDLER}});
  return () => window.removeEventListener("resize", {{HANDLER}});
}, []);`,
    fixExplanation:
      "Колбэк остаётся в памяти браузера и вызывается для уже мёртвого компонента.",
    buggyCode: `useEffect(() => {
  const {{HANDLER}} = () => {{SET_NUMBER}}(window.innerWidth);
  window.addEventListener("resize", {{HANDLER}});
}, []);`,
    fixedCode: `useEffect(() => {
  const {{HANDLER}} = () => {{SET_NUMBER}}(window.innerWidth);
  window.addEventListener("resize", {{HANDLER}});
  return () => window.removeEventListener("resize", {{HANDLER}});
}, []);`,
    validation: {
      mustContain: ["removeEventListener\\("],
      mustNotContain: [],
    },
  },
  {
    id: "leak-subscription",
    category: "memory-leak",
    severity: "hard",
    slots: ["SLOT_SUB"],
    title: "Подписка без отписки",
    description: "Компонент подписывается на события, но не отписывается.",
    hint: "Верните cleanup, который вызовет unsubscribe.",
    hintCode: `useEffect(() => {
  const {{SUBSCRIPTION}} = eventBus.subscribe("{{EVENT_NAME}}", cb);
  return () => {{SUBSCRIPTION}}.unsubscribe();
}, []);`,
    fixExplanation:
      "Подписка держит ссылку на колбэк — сборщик мусора не может освободить компонент.",
    buggyCode: `useEffect(() => {
  const {{SUBSCRIPTION}} = eventBus.subscribe("{{EVENT_NAME}}", (data) => {
    {{SET_ARRAY}}((prev) => [...prev, data]);
  });
}, []);`,
    fixedCode: `useEffect(() => {
  const {{SUBSCRIPTION}} = eventBus.subscribe("{{EVENT_NAME}}", (data) => {
    {{SET_ARRAY}}((prev) => [...prev, data]);
  });
  return () => {{SUBSCRIPTION}}.unsubscribe();
}, []);`,
    validation: {
      mustContain: ["unsubscribe\\(\\)"],
      mustNotContain: [],
    },
  },
  {
    id: "leak-websocket",
    category: "memory-leak",
    severity: "hard",
    slots: ["SLOT_SUB"],
    title: "WebSocket без close",
    description: "Сокет открыт, но не закрывается при размонтировании.",
    hint: "Верните cleanup с вызовом socket.close().",
    hintCode: `useEffect(() => {
  const {{SUBSCRIPTION}} = new WebSocket(url);
  return () => {{SUBSCRIPTION}}.close();
}, []);`,
    fixExplanation:
      "Открытый сокет держит соединение и обработчики — утечка и лишняя нагрузка на сервер.",
    buggyCode: `useEffect(() => {
  const {{SUBSCRIPTION}} = new WebSocket("wss://example.com/{{EVENT_NAME}}");
  {{SUBSCRIPTION}}.onmessage = (e) => {
    {{SET_ARRAY}}((prev) => [...prev, e.data]);
  };
}, []);`,
    fixedCode: `useEffect(() => {
  const {{SUBSCRIPTION}} = new WebSocket("wss://example.com/{{EVENT_NAME}}");
  {{SUBSCRIPTION}}.onmessage = (e) => {
    {{SET_ARRAY}}((prev) => [...prev, e.data]);
  };
  return () => {{SUBSCRIPTION}}.close();
}, []);`,
    validation: {
      mustContain: ["\\.close\\(\\)"],
      mustNotContain: [],
    },
  },

  // ═══════════════════════════════════════════
  //  МУТАЦИЯ STATE
  // ═══════════════════════════════════════════
  {
    id: "mutate-push",
    category: "state-mutation",
    severity: "medium",
    slots: ["SLOT_ADD"],
    title: "push() в массив state",
    description: "Массив мутируется через push — React не увидит изменение.",
    hint: "Создайте новый массив: setX(prev => [...prev, item]).",
    hintCode: `const {{FN_ADD}} = (item) => {
  {{SET_ARRAY}}((prev) => [...prev, item]);
};`,
    fixExplanation:
      "push меняет тот же массив — ссылка та же — ре-рендер не произойдёт.",
    buggyCode: `const {{FN_ADD}} = (newItem) => {
  {{ARRAY}}.push(newItem);
  {{SET_ARRAY}}({{ARRAY}});
};`,
    fixedCode: `const {{FN_ADD}} = (newItem) => {
  {{SET_ARRAY}}((prev) => [...prev, newItem]);
};`,
    validation: {
      mustContain: ["\\.\\.\\."],
      mustNotContain: ["{{ARRAY}}\\.push"],
    },
  },
  {
    id: "mutate-pop",
    category: "state-mutation",
    severity: "medium",
    slots: ["SLOT_REMOVE"],
    title: "pop() вместо удаления",
    description: "pop() мутирует исходный массив state.",
    hint: "Используйте filter для создания нового массива.",
    hintCode: `const {{FN_REMOVE}} = (id) => {
  {{SET_ARRAY}}((prev) => prev.filter(({{ITEM}}) => {{ITEM}}.id !== id));
};`,
    fixExplanation: "pop изменяет исходный массив. filter создаёт новый.",
    buggyCode: `const {{FN_REMOVE}} = (id) => {
  {{ARRAY}}.pop();
  {{SET_ARRAY}}({{ARRAY}});
};`,
    fixedCode: `const {{FN_REMOVE}} = (id) => {
  {{SET_ARRAY}}((prev) => prev.filter(({{ITEM}}) => {{ITEM}}.id !== id));
};`,
    validation: {
      mustContain: ["filter\\("],
      mustNotContain: ["\\.pop\\(\\)"],
    },
  },
  {
    id: "mutate-splice",
    category: "state-mutation",
    severity: "medium",
    slots: ["SLOT_REMOVE"],
    title: "splice для удаления",
    description: "splice мутирует исходный массив.",
    hint: "Замените splice на filter.",
    hintCode: `const {{FN_REMOVE}} = (id) => {
  {{SET_ARRAY}}((prev) => prev.filter(({{ITEM}}) => {{ITEM}}.id !== id));
};`,
    fixExplanation: "splice изменяет массив на месте. filter возвращает новый.",
    buggyCode: `const {{FN_REMOVE}} = (id) => {
  const index = {{ARRAY}}.findIndex(({{ITEM}}) => {{ITEM}}.id === id);
  {{ARRAY}}.splice(index, 1);
  {{SET_ARRAY}}({{ARRAY}});
};`,
    fixedCode: `const {{FN_REMOVE}} = (id) => {
  {{SET_ARRAY}}((prev) => prev.filter(({{ITEM}}) => {{ITEM}}.id !== id));
};`,
    validation: {
      mustContain: ["filter\\("],
      mustNotContain: ["splice\\("],
    },
  },
  {
    id: "mutate-object-field",
    category: "state-mutation",
    severity: "medium",
    slots: ["SLOT_UPDATE"],
    title: "Прямая запись в объект state",
    description: "Поле объекта в state меняется напрямую.",
    hint: "Используйте spread: setX(prev => ({ ...prev, field: value })).",
    hintCode: `const {{FN_UPDATE}} = (value) => {
  {{SET_OBJECT}}((prev) => ({ ...prev, {{FIELD}}: value }));
};`,
    fixExplanation:
      "Прямое присваивание меняет существующий объект — ссылка не меняется.",
    buggyCode: `const {{FN_UPDATE}} = (value) => {
  {{OBJECT}}.{{FIELD}} = value;
  {{SET_OBJECT}}({{OBJECT}});
};`,
    fixedCode: `const {{FN_UPDATE}} = (value) => {
  {{SET_OBJECT}}((prev) => ({ ...prev, {{FIELD}}: value }));
};`,
    validation: {
      mustContain: ["\\.\\.\\."],
      mustNotContain: ["{{OBJECT}}\\.{{FIELD}}\\s*="],
    },
  },
  {
    id: "mutate-nested",
    category: "state-mutation",
    severity: "hard",
    slots: ["SLOT_UPDATE"],
    title: "Мутация вложенного объекта",
    description:
      "Вложенное свойство меняется без новых ссылок на каждом уровне.",
    hint: "Создайте новый объект на каждом уровне вложенности через spread.",
    hintCode: `const {{FN_UPDATE}} = (value) => {
  {{SET_OBJECT}}((prev) => ({
    ...prev,
    {{NESTED}}: { ...prev.{{NESTED}}, {{NESTED_FIELD}}: value },
  }));
};`,
    fixExplanation:
      "Нужна новая ссылка на каждом уровне: новый объект и новый вложенный объект.",
    buggyCode: `const {{FN_UPDATE}} = (value) => {
  {{OBJECT}}.{{NESTED}}.{{NESTED_FIELD}} = value;
  {{SET_OBJECT}}({{OBJECT}});
};`,
    fixedCode: `const {{FN_UPDATE}} = (value) => {
  {{SET_OBJECT}}((prev) => ({
    ...prev,
    {{NESTED}}: { ...prev.{{NESTED}}, {{NESTED_FIELD}}: value },
  }));
};`,
    validation: {
      mustContain: ["\\.\\.\\."],
      mustNotContain: ["{{OBJECT}}\\.{{NESTED}}\\.{{NESTED_FIELD}}\\s*="],
    },
  },
  {
    id: "mutate-shallow-nested",
    category: "state-mutation",
    severity: "hard",
    slots: ["SLOT_UPDATE"],
    title: "Поверхностная копия + мутация вложенного",
    description:
      "Сделан spread верхнего уровня, но вложенный объект всё ещё общий и мутирует.",
    hint: "Spread копирует только первый уровень. Вложенный объект тоже нужно скопировать.",
    hintCode: `const {{FN_UPDATE}} = (value) => {
  {{SET_OBJECT}}((prev) => ({
    ...prev,
    {{NESTED}}: { ...prev.{{NESTED}}, {{NESTED_FIELD}}: value },
  }));
};`,
    fixExplanation:
      "{...obj} делает поверхностную копию: вложенный объект остаётся тем же. Его мутируют — меняется и оригинал.",
    buggyCode: `const {{FN_UPDATE}} = (value) => {
  const updated = { ...{{OBJECT}} };
  updated.{{NESTED}}.{{NESTED_FIELD}} = value;
  {{SET_OBJECT}}(updated);
};`,
    fixedCode: `const {{FN_UPDATE}} = (value) => {
  {{SET_OBJECT}}((prev) => ({
    ...prev,
    {{NESTED}}: { ...prev.{{NESTED}}, {{NESTED_FIELD}}: value },
  }));
};`,
    validation: {
      mustContain: ["\\.\\.\\."],
      mustNotContain: ["updated\\.{{NESTED}}\\.{{NESTED_FIELD}}\\s*="],
    },
  },
  {
    id: "mutate-delete",
    category: "state-mutation",
    severity: "hard",
    slots: ["SLOT_UPDATE"],
    title: "delete на поле state",
    description: "Оператор delete мутирует объект state.",
    hint: "Вместо delete создайте новый объект без поля через деструктуризацию и rest.",
    hintCode: `const {{FN_UPDATE}} = () => {
  {{SET_OBJECT}}((prev) => {
    const { {{FIELD}}, ...rest } = prev;
    return rest;
  });
};`,
    fixExplanation:
      "delete изменяет существующий объект. Нужно создать новый без этого поля.",
    buggyCode: `const {{FN_UPDATE}} = () => {
  delete {{OBJECT}}.{{FIELD}};
  {{SET_OBJECT}}({{OBJECT}});
};`,
    fixedCode: `const {{FN_UPDATE}} = () => {
  {{SET_OBJECT}}((prev) => {
    const { {{FIELD}}, ...rest } = prev;
    return rest;
  });
};`,
    validation: {
      mustContain: ["\\.\\.\\."],
      mustNotContain: ["delete\\s+{{OBJECT}}\\.{{FIELD}}"],
    },
  },

  // ═══════════════════════════════════════════
  //  STALE CLOSURE / ЗАВИСИМОСТИ
  // ═══════════════════════════════════════════
  {
    id: "missing-dep",
    category: "stale-closure",
    severity: "medium",
    slots: ["SLOT_FETCH"],
    title: "Пропущенная зависимость useEffect",
    description: "Эффект использует значение, но массив зависимостей пуст.",
    hint: "Добавьте используемое значение в массив зависимостей.",
    hintCode: `useEffect(() => {
  fetchUser({{DEP}}).then((r) => r.json()).then({{SET_OBJECT}});
}, [{{DEP}}]);`,
    fixExplanation:
      "С пустым [] эффект выполнится один раз и запомнит начальное значение.",
    buggyCode: `useEffect(() => {
  fetchUser({{DEP}})
    .then((res) => res.json())
    .then((data) => {{SET_OBJECT}}(data));
}, []);`,
    fixedCode: `useEffect(() => {
  fetchUser({{DEP}})
    .then((res) => res.json())
    .then((data) => {{SET_OBJECT}}(data));
}, [{{DEP}}]);`,
    validation: {
      mustContain: ["\\[{{DEP}}\\]"],
      mustNotContain: [],
    },
  },
  {
    id: "stale-interval",
    category: "stale-closure",
    severity: "hard",
    slots: ["SLOT_TIMER"],
    title: "Stale closure в setInterval",
    description: "Интервал замкнул начальное значение и всегда видит его.",
    hint: "Добавьте значение в зависимости useEffect.",
    hintCode: `useEffect(() => {
  const {{TIMER}} = setInterval(() => console.log({{NUMBER}}), 1000);
  return () => clearInterval({{TIMER}});
}, [{{NUMBER}}]);`,
    fixExplanation:
      "С пустым [] колбэк навсегда запоминает значение из первого рендера.",
    buggyCode: `useEffect(() => {
  const {{TIMER}} = setInterval(() => {
    console.log("Значение:", {{NUMBER}});
  }, 1000);
  return () => clearInterval({{TIMER}});
}, []);`,
    fixedCode: `useEffect(() => {
  const {{TIMER}} = setInterval(() => {
    console.log("Значение:", {{NUMBER}});
  }, 1000);
  return () => clearInterval({{TIMER}});
}, [{{NUMBER}}]);`,
    validation: {
      mustContain: ["\\[{{NUMBER}}\\]"],
      mustNotContain: [],
    },
  },
  {
    id: "stale-timeout",
    category: "stale-closure",
    severity: "hard",
    slots: ["SLOT_TIMER"],
    title: "Stale closure в setTimeout",
    description: "Таймаут использует устаревшее значение из замыкания.",
    hint: "Либо добавьте значение в зависимости, либо используйте функциональный сеттер.",
    hintCode: `useEffect(() => {
  const {{TIMER}} = setTimeout(() => {{SET_NUMBER}}({{NUMBER}} + 1), {{DELAY}});
  return () => clearTimeout({{TIMER}});
}, [{{NUMBER}}]);`,
    fixExplanation:
      "Колбэк setTimeout запоминает значение на момент создания эффекта.",
    buggyCode: `useEffect(() => {
  const {{TIMER}} = setTimeout(() => {
    {{SET_NUMBER}}({{NUMBER}} + 1);
  }, {{DELAY}});
  return () => clearTimeout({{TIMER}});
}, []);`,
    fixedCode: `useEffect(() => {
  const {{TIMER}} = setTimeout(() => {
    {{SET_NUMBER}}({{NUMBER}} + 1);
  }, {{DELAY}});
  return () => clearTimeout({{TIMER}});
}, [{{NUMBER}}]);`,
    validation: {
      mustContain: [
        "(\\[{{NUMBER}}\\]|{{SET_NUMBER}}\\(\\s*\\(\\s*\\w+\\s*\\)\\s*=>)",
      ],
      mustNotContain: [],
    },
  },
  {
    id: "stale-event-handler",
    category: "stale-closure",
    severity: "hard",
    slots: ["SLOT_LISTENER"],
    title: "Устаревший обработчик события",
    description: "Обработчик зарегистрирован один раз и видит старое значение.",
    hint: "Добавьте значение в зависимости, чтобы переподписываться при изменении.",
    hintCode: `useEffect(() => {
  const {{HANDLER}} = () => console.log({{NUMBER}});
  window.addEventListener("click", {{HANDLER}});
  return () => window.removeEventListener("click", {{HANDLER}});
}, [{{NUMBER}}]);`,
    fixExplanation:
      "С пустым [] подписка создаётся один раз и навсегда замыкает начальное значение.",
    buggyCode: `useEffect(() => {
  const {{HANDLER}} = () => console.log({{NUMBER}});
  window.addEventListener("click", {{HANDLER}});
  return () => window.removeEventListener("click", {{HANDLER}});
}, []);`,
    fixedCode: `useEffect(() => {
  const {{HANDLER}} = () => console.log({{NUMBER}});
  window.addEventListener("click", {{HANDLER}});
  return () => window.removeEventListener("click", {{HANDLER}});
}, [{{NUMBER}}]);`,
    validation: {
      mustContain: ["\\[{{NUMBER}}\\]"],
      mustNotContain: [],
    },
  },
  {
    id: "stale-usecallback",
    category: "stale-closure",
    severity: "hard",
    slots: ["SLOT_CALLBACK"],
    title: "useCallback с пустыми зависимостями",
    description:
      "Колбэк в useCallback использует значение, но зависимости пусты.",
    hint: "Добавьте используемое значение в массив зависимостей useCallback.",
    hintCode: `const handleClick = useCallback(() => {
  {{SET_NUMBER}}({{NUMBER}} + 1);
}, [{{NUMBER}}]);`,
    fixExplanation: "useCallback с [] запоминает начальное значение навсегда.",
    buggyCode: `const handleClick = useCallback(() => {
  {{SET_NUMBER}}({{NUMBER}} + 1);
}, []);`,
    fixedCode: `const handleClick = useCallback(() => {
  {{SET_NUMBER}}({{NUMBER}} + 1);
}, [{{NUMBER}}]);`,
    validation: {
      mustContain: ["\\[{{NUMBER}}\\]"],
      mustNotContain: [],
    },
  },
  {
    id: "stale-usememo",
    category: "stale-closure",
    severity: "hard",
    slots: ["SLOT_MEMO"],
    title: "useMemo с пустыми зависимостями",
    description: "useMemo не пересчитывается при изменении исходных данных.",
    hint: "Перечислите в зависимостях все значения, которые использует вычисление.",
    hintCode: `const filtered = useMemo(
  () => {{ARRAY}}.filter(({{ITEM}}) => {{ITEM}}.name.includes({{TEXT}})),
  [{{ARRAY}}, {{TEXT}}]
);`,
    fixExplanation:
      "С пустым [] результат вычисляется один раз и больше не обновляется.",
    buggyCode: `const filtered = useMemo(
  () => {{ARRAY}}.filter(({{ITEM}}) => {{ITEM}}.name.includes({{TEXT}})),
  []
);`,
    fixedCode: `const filtered = useMemo(
  () => {{ARRAY}}.filter(({{ITEM}}) => {{ITEM}}.name.includes({{TEXT}})),
  [{{ARRAY}}, {{TEXT}}]
);`,
    validation: {
      mustContain: ["\\[{{ARRAY}},\\s*{{TEXT}}\\]"],
      mustNotContain: [],
    },
  },

  // ═══════════════════════════════════════════
  //  РЕНДЕРИНГ
  // ═══════════════════════════════════════════
  {
    id: "missing-key",
    category: "rendering",
    severity: "easy",
    slots: ["SLOT_LIST"],
    title: "Отсутствие key в списке",
    description: "Элементы списка рендерятся без key.",
    hint: "Добавьте key={item.id} к каждому элементу в map.",
    hintCode: `{filtered.map(({{ITEM}}) => (
  <li key={ {{ITEM}}.id }>...</li>
))}`,
    fixExplanation:
      "Без key React не понимает, какой элемент изменился, и может перепутать состояния.",
    buggyCode: `{filtered.map(({{ITEM}}) => (
  <li className="row">
    <span>{ {{ITEM}}.name }</span>
    <button onClick={() => {{FN_TOGGLE}}({{ITEM}}.id)}>✓</button>
    <button onClick={() => {{FN_REMOVE}}({{ITEM}}.id)}>✕</button>
  </li>
))}`,
    fixedCode: `{filtered.map(({{ITEM}}) => (
  <li key={ {{ITEM}}.id } className="row">
    <span>{ {{ITEM}}.name }</span>
    <button onClick={() => {{FN_TOGGLE}}({{ITEM}}.id)}>✓</button>
    <button onClick={() => {{FN_REMOVE}}({{ITEM}}.id)}>✕</button>
  </li>
))}`,
    validation: {
      mustContain: ["key=\\{"],
      mustNotContain: [],
    },
  },
  {
    id: "index-key",
    category: "rendering",
    severity: "medium",
    slots: ["SLOT_LIST"],
    title: "Индекс массива как key",
    description: "key={index} ломается при удалении/сортировке/фильтрации.",
    hint: "Замените key={index} на key={item.id}.",
    hintCode: `{filtered.map(({{ITEM}}) => (
  <li key={ {{ITEM}}.id }>...</li>
))}`,
    fixExplanation:
      "При удалении элемента индексы сдвигаются, и React путает элементы и их состояние.",
    buggyCode: `{filtered.map(({{ITEM}}, index) => (
  <li key={index} className="row">
    <span>{ {{ITEM}}.name }</span>
    <button onClick={() => {{FN_TOGGLE}}({{ITEM}}.id)}>✓</button>
    <button onClick={() => {{FN_REMOVE}}({{ITEM}}.id)}>✕</button>
  </li>
))}`,
    fixedCode: `{filtered.map(({{ITEM}}) => (
  <li key={ {{ITEM}}.id } className="row">
    <span>{ {{ITEM}}.name }</span>
    <button onClick={() => {{FN_TOGGLE}}({{ITEM}}.id)}>✓</button>
    <button onClick={() => {{FN_REMOVE}}({{ITEM}}.id)}>✕</button>
  </li>
))}`,
    validation: {
      mustContain: ["key=\\{\\s*{{ITEM}}\\.id"],
      mustNotContain: ["key=\\{index\\}"],
    },
  },
  {
    id: "zero-and",
    category: "rendering",
    severity: "medium",
    slots: ["SLOT_BADGE"],
    title: "Число && в рендере",
    description:
      "Выражение {count && <div/>} при count=0 отрендерит «0», а не ничего.",
    hint: "Приведите условие к boolean: {count > 0 && <div/>}.",
    hintCode: `{ {{NUMBER}} > 0 && <div className="badge">...</div> }`,
    fixExplanation:
      "0 — falsy, но React рендерит его как текст. Нужно явное булево условие.",
    buggyCode: `{ {{NUMBER}} && <div className="badge">Выполнено: { {{NUMBER}} }</div> }`,
    fixedCode: `{ {{NUMBER}} > 0 && <div className="badge">Выполнено: { {{NUMBER}} }</div> }`,
    validation: {
      mustContain: ["{{NUMBER}}\\s*>\\s*0\\s*&&"],
      mustNotContain: ["\\{\\s*{{NUMBER}}\\s*&&"],
    },
  },

  // ═══════════════════════════════════════════
  //  ПРАВИЛА ХУКОВ
  // ═══════════════════════════════════════════
  {
    id: "hook-in-condition",
    category: "hooks-rules",
    severity: "medium",
    slots: ["SLOT_HOOKCOND"],
    title: "Хук внутри условия",
    description: "useState вызывается внутри if — нарушает правила хуков.",
    hint: "Хуки должны вызываться на верхнем уровне, вне условий и циклов.",
    hintCode: `const [{{LOCAL_A}}, {{SET_LOCAL_A}}] = useState("");`,
    fixExplanation:
      "Порядок хуков должен быть одинаковым на каждом рендере. if ломает этот порядок.",
    buggyCode: `if ({{FLAG}}) {
  const [{{LOCAL_A}}, {{SET_LOCAL_A}}] = useState("");
}`,
    fixedCode: `const [{{LOCAL_A}}, {{SET_LOCAL_A}}] = useState("");`,
    validation: {
      mustContain: ["useState\\("],
      mustNotContain: ["if\\s*\\([^{]*\\{[^}]*useState"],
    },
  },

  // ═══════════════════════════════════════════
  //  АСИНХРОННОСТЬ
  // ═══════════════════════════════════════════
  {
    id: "async-useeffect",
    category: "async",
    severity: "medium",
    slots: ["SLOT_FETCH"],
    title: "async прямо в useEffect",
    description:
      "Колбэк useEffect сделан async — он вернёт промис вместо cleanup.",
    hint: "Создайте внутреннюю async-функцию и вызовите её, либо используйте .then().",
    hintCode: `useEffect(() => {
  const load = async () => {
    const data = await fetchUser({{DEP}});
    {{SET_OBJECT}}(data);
  };
  load();
}, [{{DEP}}]);`,
    fixExplanation:
      "useEffect ожидает функцию или cleanup, а async-функция возвращает промис.",
    buggyCode: `useEffect(async () => {
  const data = await fetchUser({{DEP}});
  {{SET_OBJECT}}(data);
}, [{{DEP}}]);`,
    fixedCode: `useEffect(() => {
  const load = async () => {
    const data = await fetchUser({{DEP}});
    {{SET_OBJECT}}(data);
  };
  load();
}, [{{DEP}}]);`,
    validation: {
      mustContain: ["useEffect\\s*\\(\\s*\\(\\)\\s*=>"],
      mustNotContain: ["useEffect\\s*\\(\\s*async"],
    },
  },
  {
    id: "race-condition",
    category: "async",
    severity: "hard",
    slots: ["SLOT_FETCH"],
    title: "Race condition при смене зависимости",
    description:
      "Быстрые смены зависимости приводят к тому, что старый ответ перезаписывает новый.",
    hint: "Используйте AbortController или флаг ignore, чтобы отбрасывать устаревшие ответы.",
    hintCode: `useEffect(() => {
  let ignore = false;
  fetchUser({{DEP}}).then((d) => { if (!ignore) {{SET_OBJECT}}(d); });
  return () => { ignore = true; };
}, [{{DEP}}]);`,
    fixExplanation:
      "Запросы завершаются в непредсказуемом порядке. Без отмены старый ответ может прийти позже нового.",
    buggyCode: `useEffect(() => {
  fetchUser({{DEP}})
    .then((res) => res.json())
    .then((data) => {{SET_OBJECT}}(data));
}, [{{DEP}}]);`,
    fixedCode: `useEffect(() => {
  let ignore = false;
  fetchUser({{DEP}})
    .then((res) => res.json())
    .then((data) => {
      if (!ignore) {{SET_OBJECT}}(data);
    });
  return () => {
    ignore = true;
  };
}, [{{DEP}}]);`,
    validation: {
      mustContain: ["(ignore\\s*=\\s*true|abort\\(\\))"],
      mustNotContain: [],
    },
  },
  {
    id: "no-error-handling",
    category: "async",
    severity: "easy",
    slots: ["SLOT_FETCH"],
    title: "Нет обработки ошибки запроса",
    description: "Promise-цепочка без catch — ошибка проглатывается.",
    hint: "Добавьте .catch() для обработки ошибки.",
    hintCode: `fetch(url)
  .then((r) => r.json())
  .then({{SET_ARRAY}})
  .catch((err) => console.error(err));`,
    fixExplanation:
      "Без catch ошибка запроса остаётся необработанной и может уронить логику.",
    buggyCode: `useEffect(() => {
  fetch("/api/{{ARRAY}}")
    .then((res) => res.json())
    .then((data) => {{SET_ARRAY}}(data));
}, []);`,
    fixedCode: `useEffect(() => {
  fetch("/api/{{ARRAY}}")
    .then((res) => res.json())
    .then((data) => {{SET_ARRAY}}(data))
    .catch((err) => console.error(err));
}, []);`,
    validation: {
      mustContain: ["\\.catch\\s*\\("],
      mustNotContain: [],
    },
  },
];

export const CATEGORIES = [
  { id: "memory-leak", label: "Утечки памяти", icon: "💧" },
  { id: "state-mutation", label: "Мутация state", icon: "🔒" },
  { id: "stale-closure", label: "Stale closure", icon: "⏰" },
  { id: "rendering", label: "Рендеринг", icon: "🖥️" },
  { id: "hooks-rules", label: "Правила хуков", icon: "📏" },
  { id: "async", label: "Асинхронность", icon: "⚡" },
];
