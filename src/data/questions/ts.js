export default {
  id: "ts",
  title: "TypeScript",
  accent: "#4a9eff",
  topics: [
    {
      id: "basics",
      title: "Основы TypeScript",
      questions: [
        {
          id: "ts-01",
          hot: true,
          q: "Что такое TypeScript и зачем он нужен?",
          a:
            "TypeScript - типизированное надмножество JavaScript.\n" +
            "Любой валидный JS является валидным TS.\n\n" +
            "Польза:\n" +
            "- ошибки ловятся на этапе компиляции\n" +
            "- автодополнение в IDE\n" +
            "- безопасный рефакторинг\n" +
            "- код самодокументируется\n\n" +
            "TS компилируется в чистый JS.\n" +
            "Работает в любом браузере и Node.js.\n" +
            "Типы существуют только на этапе компиляции.",
        },
        {
          id: "ts-02",
          hot: true,
          q: "Какие базовые типы есть в TypeScript?",
          a:
            "Примитивы:\n" +
            "`string`, `number`, `boolean`, `bigint`, `symbol`, `null`, `undefined`\n\n" +
            "Специальные:\n" +
            "- `any` - отключает проверку типов\n" +
            "- `unknown` - безопасный аналог any\n" +
            "- `void` - функция ничего не возвращает\n" +
            "- `never` - функция никогда не завершается\n\n" +
            "Составные:\n" +
            "- `Array<T>` или `T[]` - массив\n" +
            "- `object` - объект\n" +
            "- union: `string | number`\n" +
            "- intersection: `A & B`\n\n" +
            "Также: enum, tuple, литеральные типы.",
        },
        {
          id: "ts-03",
          hot: true,
          q: "В чем разница между interface и type?",
          a:
            "Оба создают именованные типы.\n\n" +
            "interface:\n" +
            "- идеален для объектов и классов\n" +
            "- поддерживает extends\n" +
            "- declaration merging: если объявить дважды, поля объединятся\n" +
            "- можно расширять сторонние библиотеки\n\n" +
            "type:\n" +
            "- более гибкий\n" +
            "- может описывать примитивы: `type ID = string | number`\n" +
            "- union и intersection типы\n" +
            "- кортежи\n" +
            "- mapped types\n\n" +
            "Оба удаляются при компиляции.\n" +
            "Выбор: interface для API объектов, type для всего остального.",
        },
        {
          id: "ts-10",
          hot: true,
          q: "Какие ключевые опции есть в tsconfig.json?",
          a:
            "`target` - ECMAScript-версия вывода.\n" +
            "ES5, ES2020, ESNext.\n\n" +
            "`module` - система модулей.\n" +
            "CommonJS для Node.js, ESNext для бандлеров.\n\n" +
            "`strict: true` - включает все строгие проверки.\n" +
            "Обязательно для production.\n\n" +
            "Внутри strict:\n" +
            "- `strictNullChecks` - null и undefined не совместимы с другими типами\n" +
            "- `noImplicitAny` - запрещает неявный any\n" +
            "- `strictFunctionTypes` - строгая проверка типов функций\n\n" +
            "`paths` и `baseUrl` - алиасы импортов.\n" +
            "`esModuleInterop` - совместимость CommonJS и ESM.",
        },
      ],
    },
    {
      id: "generics",
      title: "Дженерики и операторы типов",
      questions: [
        {
          id: "ts-05",
          hot: true,
          q: "Что такое дженерики и зачем они нужны?",
          a:
            "Дженерики позволяют создавать переиспользуемые компоненты.\n" +
            "Тип определяется при вызове, а не при объявлении.\n\n" +
            "Пример:\n" +
            "`function identity<T>(arg: T): T { return arg; }`\n" +
            "`identity<string>('hello')` - T становится string\n\n" +
            "Без дженериков пришлось бы использовать any.\n" +
            "И терять типизацию.\n\n" +
            "Ограничения:\n" +
            "`<T extends Comparable>` - T должен быть сравнимым\n\n" +
            "Значения по умолчанию:\n" +
            "`<T = string>` - если тип не указан\n\n" +
            "Дженерики работают в функциях, классах, интерфейсах.",
        },
        {
          id: "ts-08",
          hot: true,
          q: "Что делают операторы keyof и typeof?",
          a:
            "`keyof` - оператор на уровне типов.\n" +
            "Возвращает union всех ключей объекта.\n" +
            "`type UserKeys = keyof User;` даст `'name' | 'age'`\n\n" +
            "Использование:\n" +
            "`function getProperty<T, K extends keyof T>(obj: T, key: K): T[K]`\n" +
            "TS знает что вернется тип поля key.\n\n" +
            "`typeof` в типах - извлекает тип из значения.\n" +
            "`type UserType = typeof user;`\n\n" +
            "Комбинация:\n" +
            "`type Keys = keyof typeof configObject;`\n" +
            "Получить ключи из реального объекта.",
        },
        {
          id: "ts-25",
          hot: true,
          q: "Что такое Utility Types (Partial, Pick, Omit, Record)?",
          a:
            "Встроенные типы для трансформации существующих.\n\n" +
            "`Partial<User>` - все поля становятся необязательными.\n" +
            "Полезно для обновления: обновляем только часть полей.\n\n" +
            "`Required<User>` - все поля становятся обязательными.\n\n" +
            "`Readonly<User>` - все поля только для чтения.\n\n" +
            "`Pick<User, 'name' | 'age'>` - новый тип только с указанными полями.\n\n" +
            "`Omit<User, 'password'>` - все поля кроме указанных.\n\n" +
            "`Record<string, User>` - словарь с ключами string и значениями User.\n\n" +
            "`ReturnType<typeof fn>` - тип возврата функции.\n\n" +
            "Они избавляют от дублирования интерфейсов.",
        },
      ],
    },
    {
      id: "advanced",
      title: "Продвинутые типы",
      questions: [
        {
          id: "ts-12",
          hot: true,
          q: "В чем разница между unknown и any?",
          a:
            "`any` - отключает все проверки типов.\n" +
            "Можно делать что угодно: `anyVar.foo.bar()`\n" +
            "Скомпилируется, но упадет в рантайме.\n\n" +
            "`unknown` - безопасный аналог.\n" +
            "TS не даст выполнить операцию пока не сузите тип.\n" +
            "`if (typeof x === 'string') { x.toUpperCase(); }`\n\n" +
            "Использование unknown:\n" +
            "- catch-блоки: `catch (e: unknown)`\n" +
            "- парсинг внешних данных: JSON.parse\n" +
            "- API где тип заранее неизвестен\n\n" +
            "Правило: никогда не используйте any без крайней необходимости.",
        },
        {
          id: "ts-18",
          hot: true,
          q: "Что такое Type Guards?",
          a:
            "Type Guard сужает тип внутри блока кода.\n\n" +
            "Встроенные:\n" +
            "- `typeof x === 'string'` - для примитивов\n" +
            "- `x instanceof Date` - для классов\n" +
            "- `'name' in x` - проверка наличия свойства\n\n" +
            "Пользовательский guard:\n" +
            "`function isUser(x: any): x is User { return 'name' in x; }`\n" +
            "Конструкция `x is User` говорит TS:\n" +
            "если функция вернула true, то x имеет тип User.\n\n" +
            "Это ключевой механизм работы с union-типами.\n" +
            "Без него TS не знает какое поле доступно.",
        },
        {
          id: "ts-19",
          hot: true,
          q: "Что такое Discriminated Unions?",
          a:
            "Union-тип с общим полем-дискриминатором.\n\n" +
            "Пример:\n" +
            "`type Result<T> = { status: 'success'; data: T } | { status: 'error'; error: Error };`\n\n" +
            "Поле `status` - дискриминатор.\n\n" +
            "В коде:\n" +
            "`if (result.status === 'success') { result.data; }`\n" +
            "TS знает что в этой ветке есть `data`.\n\n" +
            "В switch с exhaustiveness checking:\n" +
            "Если добавить новый вариант в union,\n" +
            "компилятор заставит его обработать.\n\n" +
            "Используется в Redux actions, result-типах, состояниях UI.",
        },
        {
          id: "ts-23",
          hot: true,
          q: "Что делает as const?",
          a:
            "`as const` делает значение максимально узким и readonly.\n\n" +
            "Без as const:\n" +
            "`const arr = [1, 2, 3]` имеет тип `number[]`\n\n" +
            "С as const:\n" +
            "`const arr = [1, 2, 3] as const` имеет тип `readonly [1, 2, 3]`\n\n" +
            "Для объектов:\n" +
            "`const config = { mode: 'dark' } as const`\n" +
            "Дает тип `{ readonly mode: 'dark' }`, а не `{ mode: string }`\n\n" +
            "Использование:\n" +
            "- создание enum-подобных структур\n" +
            "- вывод литеральных типов\n" +
            "- типобезопасные конфиги\n\n" +
            "Важно: делает readonly верхний уровень и вложенные объекты.",
        },
        {
          id: "ts-24",
          q: "Что делает оператор satisfies?",
          a:
            "`satisfies` проверяет соответствие типу, но сохраняет узкий вывод.\n\n" +
            "Проблема без satisfies:\n" +
            "`const palette: Record<string, string | number[]> = { ... }`\n" +
            "TS забудет что red - массив, а green - строка.\n\n" +
            "С satisfies:\n" +
            "`const palette = { ... } satisfies Record<string, string | number[]>;`\n" +
            "TS проверит соответствие, но сохранит узкие типы.\n" +
            "`palette.red[0]` работает, `palette.green.toUpperCase()` работает.\n\n" +
            "Идеально для конфигов и маппингов.\n" +
            "Появился в TypeScript 4.9.",
        },
      ],
    },
    {
      id: "modules",
      title: "Модули и declaration файлы",
      questions: [
        {
          id: "ts-15",
          q: "Что такое .d.ts файлы?",
          a:
            "Файлы деклараций типов (.d.ts) содержат только типы.\n" +
            "Без реализации.\n\n" +
            "Используются для:\n" +
            "- описания типов JS-библиотек\n" +
            "- браузерных API\n" +
            "- глобальных переменных\n\n" +
            "Ключевое слово `declare`:\n" +
            "`declare const $: JQueryStatic;`\n" +
            "`declare function myGlobalFn(): void;`\n\n" +
            "Сообщество публикует тысячи .d.ts файлов в DefinitelyTyped.\n" +
            "`@types/react`, `@types/lodash`, `@types/node`\n\n" +
            "Можно писать свои для CSS-модулей, изображений, глобальных переменных.",
        },
        {
          id: "ts-26",
          q: "Что такое Function Overloads?",
          a:
            "Перегрузка позволяет функции иметь несколько сигнатур.\n\n" +
            "Пример:\n" +
            "`function createElement(tag: 'img'): HTMLImageElement;`\n" +
            "`function createElement(tag: 'input'): HTMLInputElement;`\n" +
            "`function createElement(tag: string): HTMLElement { ... }`\n\n" +
            "При вызове `createElement('img')`\n" +
            "TS знает что вернется HTMLImageElement.\n" +
            "Даст доступ к специфичным свойствам.\n\n" +
            "Реализация функции должна быть совместима со всеми сигнатурами.\n\n" +
            "Используется в document.querySelector и подобных API.",
        },
      ],
    },
  ],
};
