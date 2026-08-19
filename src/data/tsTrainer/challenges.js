// src/data/tsTrainer/challenges.js

export const CHALLENGES = [
  // ═══════════════════════════════════════════
  //  1. ОПИСАНИЕ API-МОДЕЛИ
  // ═══════════════════════════════════════════
  {
    id: "ts-api-user",
    category: "interfaces",
    level: 1,
    title: "API-модель User",
    task: [
      "Бэкенд возвращает объект пользователя.",
      "Опиши интерфейс `User` со следующими полями:",
      "• `id` — число",
      "• `name` — строка",
      "• `email` — строка",
      "• `age` — число (может отсутствовать)",
      "• `isActive` — булево",
      "• `createdAt` — строка (ISO-дата)",
    ],
    starterCode: "// Опиши интерфейс User\n",
    hints: [
      "Обязательные поля без `?`, опциональные с `?`",
      "`age` может отсутствовать → `age?: number`",
      "Дата от сервера приходит как строка, а не Date",
    ],
    solution: `interface User {
  id: number;
  name: string;
  email: string;
  age?: number;
  isActive: boolean;
  createdAt: string;
}`,
    validation: {
      mustContain: [
        /interface\s+User\s*\{/,
        /id\s*:\s*number/,
        /name\s*:\s*string/,
        /email\s*:\s*string/,
        /age\s*\?\s*:\s*number/,
        /isActive\s*:\s*boolean/,
        /createdAt\s*:\s*string/,
      ],
      mustNotContain: [/\bany\b/],
    },
  },

  // ═══════════════════════════════════════════
  //  2. UPDATE DTO ЧЕРЕЗ PARTIAL + PICK
  // ═══════════════════════════════════════════
  {
    id: "ts-update-dto",
    category: "utility-types",
    level: 2,
    title: "UpdateDTO через Partial",
    task: [
      "Дан интерфейс `User` (уже написан ниже).",
      "Для PATCH-запроса нужно отправить только часть полей:",
      "`name`, `email`, `age` — все необязательные.",
      "Создай тип `UpdateUser` через `Partial` и `Pick`.",
    ],
    starterCode: `interface User {
  id: number;
  name: string;
  email: string;
  age?: number;
  isActive: boolean;
  createdAt: string;
}

// Создай UpdateUser — только name, email, age; все опциональные
`,
    hints: [
      "`Pick<User, 'name' | 'email' | 'age'>` — оставляет только нужные поля",
      "`Partial<...>` — делает все поля необязательными",
      "Итого: `type UpdateUser = Partial<Pick<User, 'name' | 'email' | 'age'>>`",
    ],
    solution: `type UpdateUser = Partial<Pick<User, 'name' | 'email' | 'age'>>;`,
    validation: {
      mustContain: [
        /type\s+UpdateUser\s*=\s*Partial\s*<\s*Pick\s*<\s*User\s*,/,
        /['"]name['"]/,
        /['"]email['"]/,
        /['"]age['"]/,
      ],
      mustNotContain: [/\bany\b/],
    },
  },

  // ═══════════════════════════════════════════
  //  3. INTERSECTION: РАСШИРЕНИЕ МОДЕЛИ
  // ═══════════════════════════════════════════
  {
    id: "ts-intersection",
    category: "type-aliases",
    level: 2,
    title: "Admin = User & Permissions",
    task: [
      "У нас есть базовая модель `User` (уже написана).",
      "Админ — это пользователь с дополнительными полями:",
      "• `permissions` — массив строк",
      "• `department` — строка",
      "Создай тип `Admin` через intersection (`&`).",
      "Сначала объяви интерфейс или тип `AdminFields`, затем пересечение.",
    ],
    starterCode: `interface User {
  id: number;
  name: string;
  email: string;
  isActive: boolean;
}

// Создай тип Admin = User + { permissions: string[]; department: string }
`,
    hints: [
      "Можно объявить отдельный интерфейс `AdminFields`",
      "Intersection: `type Admin = User & AdminFields`",
      "Или сразу: `type Admin = User & { permissions: string[]; department: string }`",
    ],
    solution: `type Admin = User & {
  permissions: string[];
  department: string;
};`,
    validation: {
      mustContain: [
        /type\s+Admin\s*=\s*User\s*&/,
        /permissions\s*:\s*string\[\]/,
        /department\s*:\s*string/,
      ],
      mustNotContain: [/\bany\b/],
    },
  },

  // ═══════════════════════════════════════════
  //  4. ДЖЕНЕРИК ДЛЯ API-ОТВЕТА
  // ═══════════════════════════════════════════
  {
    id: "ts-api-response",
    category: "generics",
    level: 2,
    title: "ApiResponse<T> для запросов",
    task: [
      "Все API-запросы возвращают ответ в едином формате.",
      "Создай дженерик-интерфейс `ApiResponse<T>` с полями:",
      "• `data` — типа `T` (данные)",
      "• `error` — строка или `null`",
      "• `isLoading` — булево",
      "• `statusCode` — число",
    ],
    starterCode: "// Создай interface ApiResponse<T>\n",
    hints: [
      "Дженерик-интерфейс: `interface ApiResponse<T> { ... }`",
      "`error` может быть строкой или null: `error: string | null`",
      "`data` принимает параметр типа: `data: T`",
    ],
    solution: `interface ApiResponse<T> {
  data: T;
  error: string | null;
  isLoading: boolean;
  statusCode: number;
}`,
    validation: {
      mustContain: [
        /interface\s+ApiResponse\s*<\s*T\s*>\s*\{/,
        /data\s*:\s*T/,
        /error\s*:\s*string\s*\|\s*null/,
        /isLoading\s*:\s*boolean/,
        /statusCode\s*:\s*number/,
      ],
      mustNotContain: [/\bany\b/],
    },
  },

  // ═══════════════════════════════════════════
  //  5. ФОРМА ИЗ МОДЕЛИ (OMIT)
  // ═══════════════════════════════════════════
  {
    id: "ts-form-type",
    category: "utility-types",
    level: 2,
    title: "Тип формы из модели",
    task: [
      "Дан интерфейс `User` (уже написан).",
      "Форма редактирования не содержит `id` и `createdAt`",
      "(они не редактируются пользователем).",
      "Создай тип `UserForm` через `Omit`.",
      "Все остальные поля должны быть обязательными.",
    ],
    starterCode: `interface User {
  id: number;
  name: string;
  email: string;
  age?: number;
  isActive: boolean;
  createdAt: string;
}

// Создай UserForm без id и createdAt
`,
    hints: [
      "`Omit<User, 'id' | 'createdAt'>` убирает указанные поля",
      "Остальные поля останутся как в оригинале",
      "`age?` останется опциональным",
    ],
    solution: `type UserForm = Omit<User, 'id' | 'createdAt'>;`,
    validation: {
      mustContain: [
        /type\s+UserForm\s*=\s*Omit\s*<\s*User\s*,/,
        /['"]id['"]/,
        /['"]createdAt['"]/,
      ],
      mustNotContain: [/\bany\b/],
    },
  },

  // ═══════════════════════════════════════════
  //  6. RECORD ДЛЯ КЭША
  // ═══════════════════════════════════════════
  {
    id: "ts-record-cache",
    category: "utility-types",
    level: 2,
    title: "Record для кэша сущностей",
    task: [
      "В Redux-сторе сущности хранятся как словарь:",
      "ключ — id (число), значение — объект `User`.",
      "Дан интерфейс `User` (уже написан).",
      "Создай тип `UserCache` через `Record`.",
    ],
    starterCode: `interface User {
  id: number;
  name: string;
  email: string;
}

// Создай тип UserCache: ключ — number, значение — User
`,
    hints: [
      "`Record<KeyType, ValueType>` создаёт словарь",
      "Ключи — числа: `Record<number, User>`",
      "В Redux часто используют `Record<string, T>`, но тут id числовой",
    ],
    solution: `type UserCache = Record<number, User>;`,
    validation: {
      mustContain: [
        /type\s+UserCache\s*=\s*Record\s*<\s*number\s*,\s*User\s*>/,
      ],
      mustNotContain: [/\bany\b/],
    },
  },

  // ═══════════════════════════════════════════
  //  7. TYPE GUARD ДЛЯ API-ДАННЫХ
  // ═══════════════════════════════════════════
  {
    id: "ts-type-guard",
    category: "type-guards",
    level: 3,
    title: "Type Guard для проверки User",
    task: [
      "Данные из API приходят как `unknown`.",
      "Нужна функция `isUser`, которая проверяет,",
      "что значение является объектом `User`.",
      "Проверь: `id` — число, `name` — строка, `email` — строка.",
      "Верни type predicate: `x is User`.",
    ],
    starterCode: `interface User {
  id: number;
  name: string;
  email: string;
}

// Напиши функцию isUser(x: unknown): x is User
`,
    hints: [
      "Сначала проверь `typeof x === 'object' && x !== null`",
      "Затем проверяй поля: `typeof (x as User).id === 'number'`",
      "Или: `'id' in x && typeof x.id === 'number'`",
    ],
    solution: `function isUser(x: unknown): x is User {
  return (
    typeof x === 'object' &&
    x !== null &&
    typeof (x as User).id === 'number' &&
    typeof (x as User).name === 'string' &&
    typeof (x as User).email === 'string'
  );
}`,
    validation: {
      mustContain: [
        /function\s+isUser\s*\(\s*x\s*:\s*unknown\s*\)\s*:\s*x\s+is\s+User/,
        /typeof\s+x\s*===\s*['"]object['"]/,
        /x\s*!==\s*null/,
      ],
      mustNotContain: [/\bany\b/],
    },
  },

  // ═══════════════════════════════════════════
  //  8. DISCRIMINATED UNION ДЛЯ СТАТУСА
  // ═══════════════════════════════════════════
  {
    id: "ts-request-status",
    category: "unions",
    level: 3,
    title: "Статусы запроса (Discriminated Union)",
    task: [
      "Состояние запроса может быть одним из:",
      "• `idle` — ничего не происходит",
      "• `loading` — запрос идёт",
      "• `success` — данные получены (поле `data: T`)",
      "• `error` — ошибка (поле `message: string`)",
      "Создай дженерик-тип `RequestState<T>` с дискриминатором `status`.",
    ],
    starterCode: "// Создай type RequestState<T> с дискриминатором status\n",
    hints: [
      "Это union из четырёх объектов",
      "Каждый объект имеет поле `status` с литеральным типом",
      "`{ status: 'success'; data: T } | { status: 'error'; message: string } | ...`",
    ],
    solution: `type RequestState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; message: string };`,
    validation: {
      mustContain: [
        /type\s+RequestState\s*<\s*T\s*>\s*=/,
        /status\s*:\s*['"]idle['"]/,
        /status\s*:\s*['"]loading['"]/,
        /status\s*:\s*['"]success['"]/,
        /status\s*:\s*['"]error['"]/,
        /data\s*:\s*T/,
        /message\s*:\s*string/,
      ],
      mustNotContain: [/\bany\b/],
    },
  },

  // ═══════════════════════════════════════════
  //  9. КОНФИГ ПРИЛОЖЕНИЯ
  // ═══════════════════════════════════════════
  {
    id: "ts-app-config",
    category: "advanced",
    level: 2,
    title: "Конфиг приложения (as const)",
    task: [
      "Создай объект `appConfig` с полями:",
      "• `apiUrl` — строка `'https://api.example.com'`",
      "• `timeout` — число `5000`",
      "• `retries` — число `3`",
      "• `features` — объект `{ darkMode: true, beta: false }`",
      "Используй `as const` для иммутабельности и литеральных типов.",
    ],
    starterCode: "// Создай appConfig с as const\n",
    hints: [
      "`as const` делает объект readonly на всех уровнях",
      "Тип `apiUrl` будет `'https://api.example.com'`, а не `string`",
      "Тип `features` будет `{ readonly darkMode: true; readonly beta: false }`",
    ],
    solution: `const appConfig = {
  apiUrl: 'https://api.example.com',
  timeout: 5000,
  retries: 3,
  features: {
    darkMode: true,
    beta: false,
  },
} as const;`,
    validation: {
      mustContain: [
        /const\s+appConfig\s*=\s*\{/,
        /apiUrl\s*:\s*['"`]https:\/\/api\.example\.com['"`]/,
        /timeout\s*:\s*5000/,
        /retries\s*:\s*3/,
        /darkMode\s*:\s*true/,
        /beta\s*:\s*false/,
        /\}\s*as\s+const/,
      ],
      mustNotContain: [/\bany\b/],
    },
  },

  // ═══════════════════════════════════════════
  //  10. ПУБЛИЧНАЯ МОДЕЛЬ (OMIT)
  // ═══════════════════════════════════════════
  {
    id: "ts-public-user",
    category: "utility-types",
    level: 3,
    title: "Публичная модель без секретов",
    task: [
      "Дан интерфейс `User` с полями `id`, `name`, `email`,",
      "`password`, `phone`.",
      "Для публичного API нужно скрыть `password` и `phone`.",
      "Создай тип `PublicUser` через `Omit`.",
    ],
    starterCode: `interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  phone: string;
}

// Создай PublicUser без password и phone
`,
    hints: [
      "`Omit<User, 'password' | 'phone'>` убирает секретные поля",
      "Остаются: `id`, `name`, `email`",
    ],
    solution: `type PublicUser = Omit<User, 'password' | 'phone'>;`,
    validation: {
      mustContain: [
        /type\s+PublicUser\s*=\s*Omit\s*<\s*User\s*,/,
        /['"]password['"]/,
        /['"]phone['"]/,
      ],
      mustNotContain: [/\bany\b/],
    },
  },
];

export const CATEGORIES = [
  { id: "all", label: "Все", icon: "📋" },
  { id: "interfaces", label: "Интерфейсы", icon: "🏗️" },
  { id: "type-aliases", label: "Типы", icon: "🔤" },
  { id: "utility-types", label: "Utility Types", icon: "🛠️" },
  { id: "generics", label: "Дженерики", icon: "🧬" },
  { id: "type-guards", label: "Type Guards", icon: "🛡️" },
  { id: "unions", label: "Unions", icon: "🔀" },
  { id: "advanced", label: "Продвинутое", icon: "🚀" },
];
