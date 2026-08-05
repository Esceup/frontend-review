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
a: "TypeScript (разработка Microsoft) — это типизированное надмножество JS. Любой валидный JS-код является валидным TS-кодом. Главная польза: **статическая типизация** (ошибки ловятся на этапе компиляции, а не в рантайме), **улучшенная поддержка IDE** (автодополнение, рефакторинг, переход к определениям), **самодокументируемость** кода и безопасный рефакторинг больших проектов. TS компилируется (транспилируется) в чистый JS, который может выполняться в любом браузере или Node.js.",
},
{
id: "ts-02",
hot: true,
q: "Какие базовые типы есть в TypeScript?",
a: 'Примитивы: `string`, `number`, `boolean`, `bigint`, `symbol`, `null`, `undefined`. Специальные: `any` (отключает проверку типов, "дыра" в системе), `unknown` (безопасный аналог any, требует проверки), `void` (функция ничего не возвращает), `never` (функция никогда не завершается). Составные: `object`, `Array<T>` (или `T[]`), `tuple` (кортеж), `enum` (перечисление), `union` (A | B), `intersection` (A & B). Также есть литеральные типы и типы-интерфейсы.',
},
{
id: "ts-03",
hot: true,
q: "Что такое интерфейсы (interface) и типы (type) в TS?",
a: "Оба способа создают именованные типы. **interface** идеален для описания API объектов и классов: поддерживает `extends`, declaration merging (если объявить interface User дважды, поля объединятся), что полезно для расширения сторонних библиотек. **type** — более гибкий: может описывать примитивы (`type ID = string | number`), union/intersection типы, кортежи, mapped types. Оба полностью удаляются при компиляции в JS (не существуют в рантайме).",
},
{
id: "ts-04",
q: "В чём ключевое отличие `interface` от `type` при дублировании объявлений?",
a: 'Declaration merging — уникальная особенность interface. Пример: `interface User { name: string } interface User { age: number }` — в итоге User будет иметь оба поля. Это активно используется для расширения типов сторонних библиотек (например, добавить поле в `Express.Request`). Type так не умеет: `type User = { name: string }; type User = { age: number };` вызовет ошибку компиляции. Type можно "объединить" только явно через пересечение: `type User = BaseUser & ExtraFields`.',
},
{
id: "ts-10",
q: "Какие ключевые опции есть в tsconfig.json?",
a: '`target` задаёт ECMAScript-версию вывода (ES5, ES2020, ESNext). `module` — систему модулей (CommonJS для Node.js, ESNext для современных бандлеров). `strict: true` включает `strictNullChecks`, `noImplicitAny`, `strictFunctionTypes` и другие — **обязательно для production**. `esModuleInterop` позволяет импортировать CommonJS-модули как ES-модули (`import x from "pkg"`). `paths` и `baseUrl` настраивают алиасы (`@/components/...`). `extends` позволяет наследовать конфиги (например, из `@tsconfig/node20`).',
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
q: "Что такое дженерики (generics) и зачем они нужны?",
a: 'Пример: `function identity<T>(arg: T): T { return arg; }`. При вызове `identity<string>("hello")` T становится string, и TS знает, что вернётся строка. Без дженериков пришлось бы использовать `any` и терять типизацию. Generics поддерживаются в функциях, классах, интерфейсах и типах. Можно задавать ограничения: `<T extends Comparable>`, значения по умолчанию: `<T = string>`, и несколько параметров: `<T, U>`.',
},
{
id: "ts-08",
hot: true,
q: "Что делают операторы `keyof` и `typeof`?",
a: '**`keyof`** — оператор на уровне типов: `type UserKeys = keyof User; // "name" | "age"`. Идеально для создания типобезопасных функций: `function getProperty<T, K extends keyof T>(obj: T, key: K): T[K]`. **`typeof`** в TS имеет два контекста: в JS-коде это обычный оператор (`typeof x === "string"`), а в типах — извлечение типа (`type UserType = typeof user;`). Их комбинация — мощный инструмент: `type Keys = keyof typeof configObject`.',
},
],
},
{
id: "union",
title: "Union, Intersection и Literal типы",
questions: [
{
id: "ts-13",
hot: true,
q: "Что такое объединение (union) и пересечение (intersection) типов?",
a: '**Union** (`string | number`) — значение может быть строкой ИЛИ числом. Перед использованием нужно сузить тип через typeof или type guard. **Intersection** (`User & Admin`) — объект должен иметь поля И User, И Admin (объединение полей). Используется для композиции: `type AuthenticatedRequest = Request & { user: User }`. Важный нюанс: пересечение строковых литералов даёт never: `"a" & "b"` = `never` (значение не может быть одновременно двумя разными строками).',
},
{
id: "ts-16",
q: "Что такое Literal Types (литеральные типы)?",
a: 'Вместо `type Method = string` можно написать `type Method = "GET" | "POST" | "PUT" | "DELETE"`. Тогда при передаче `"PATCH"` компилятор выдаст ошибку. Литералы бывают строковые, числовые и булевы (`true | false` — это то же самое, что `boolean`). В сочетании с `as const` литеральные типы извлекаются из обычных объектов и массивов. Мощно работают в discriminated unions и для создания типобезопасных конфигов.',
},
{
id: "ts-19",
hot: true,
q: "Что такое Discriminated Unions (размеченные объединения)?",
a: 'Классический пример: `type Result<T> = { status: "success"; data: T } | { status: "error"; error: Error };`. Поле `status` — дискриминатор. В коде: `if (result.status === "success") { result.data; }` — TS знает, что в этой ветке есть `data`. В switch с exhaustiveness checking это даёт 100% покрытие всех вариантов. Активно используется в Redux (actions), в result-типах (аналог Result в Rust), для моделирования состояний UI (loading/success/error).',
},
],
},
{
id: "advanced",
title: "Продвинутые типы",
questions: [
{
id: "ts-11",
q: "Что такое тип `never` и когда он возникает?",
a: "`never` — это bottom type, у него нет значений. Возникает в трёх случаях: 1) функция всегда бросает: `function fail(): never { throw new Error(); }`. 2) Бесконечный цикл: `while (true) {}`. 3) **Исчерпывающие проверки (exhaustiveness checking)**: в switch с union-типом, если обработаны все варианты, в default можно написать `const _exhaustive: never = value;` — при добавлении нового варианта в union компилятор выдаст ошибку, заставляя его обработать.",
},
{
id: "ts-12",
hot: true,
q: "В чём разница между `unknown` и `any`?",
a: 'С `any` можно делать что угодно: `anyVar.foo.bar()` скомпилируется, но упадёт в рантайме. С `unknown` TS не даст выполнить никакую операцию, пока вы не сузите тип: `if (typeof x === "string") { x.toUpperCase(); }` или через Type Guard. Это делает `unknown` идеальным для: 1) catch-блоков (`catch (e: unknown)`), 2) парсинга внешних данных (JSON.parse), 3) API, где тип заранее неизвестен. Правило: **никогда не используйте any без крайней необходимости**.',
},
{
id: "ts-17",
q: "Что такое Tuple (кортеж) в TypeScript?",
a: 'Пример: `type Point = [number, number];` или `type User = [id: number, name: string];` (с именованными элементами, TS 4.0+). В отличие от массива `Array<string | number>`, где каждый элемент может быть чем угодно, tuple гарантирует: первый элемент — number, второй — string. Часто возвращается из функций (как в Python) и используется в хуках React: `const [state, setState] = useState()` — это tuple. Добавление `as const` к массиву делает его readonly tuple: `const x = [1, 2] as const` имеет тип `readonly [1, 2]`.',
},
{
id: "ts-18",
hot: true,
q: "Что такое Type Guards и какие они бывают?",
a: 'Когда у вас `x: string | number`, TS не даст вызвать `x.toUpperCase()`. Type guard сужает тип: `if (typeof x === "string") { x.toUpperCase(); }`. Встроенные: **typeof** (для примитивов), **instanceof** (для классов), **in** (для проверки наличия свойства). Пользовательский guard: `function isUser(x: any): x is User { return "name" in x; }` — конструкция `x is User` говорит TS, что если функция вернула true, то x имеет тип User. Это ключевой механизм работы с union-типами.',
},
{
id: "ts-20",
q: "Что такое Conditional Types (условные типы)?",
a: 'Синтаксис: `type IsString<T> = T extends string ? true : false;`. `IsString<"hello">` даст `true`, `IsString<123>` — `false`. Они распределяются (distribute) по union-типам: `IsString<string | number>` даст `true | false`. В сочетании с `infer` позволяют извлекать типы (например, тип возврата функции). Лежат в основе большинства utility types (`Exclude`, `Extract`, `ReturnType`). Пример реального использования: `type NonNullable<T> = T extends null | undefined ? never : T;`.',
},
{
id: "ts-21",
q: "Что такое Mapped Types (сопоставленные типы)?",
a: 'Синтаксис: `type Readonly<T> = { readonly [K in keyof T]: T[K] };`. Это как `Array.map()`, но для типов. Можно менять модификаторы (`+readonly`, `-?` для удаления optional), изменять типы значений, фильтровать ключи через `as` (key remapping, TS 4.1): `type Getters<T> = { [K in keyof T as \`get${Capitalize<string & K>}\`]: () => T[K] }`. Позволяет создавать мощные трансформации: превращать все поля в функции-геттеры, добавлять префиксы, делать snake_case в camelCase на уровне типов.',
},
{
id: "ts-22",
hot: true,
q: "Что делает ключевое слово `infer` в Conditional Types?",
a: '`infer` используется только в `extends`-части conditional type. Пример: `type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any;`. Здесь `infer R` "захватывает" тип возврата функции в переменную R, которую можно использовать в true-ветке. Другие примеры: `type UnpackPromise<T> = T extends Promise<infer U> ? U : T;` (распаковка промиса), `type FirstElement<T> = T extends [infer First, ...any[]] ? First : never;` (первый элемент кортежа). Это основа продвинутого type-level программирования.',
},
{
id: "ts-23",
hot: true,
q: "Что делает оператор `as const` (const assertion)?",
a: 'Без `as const`: `const arr = [1, 2, 3]` имеет тип `number[]`. С `as const`: `const arr = [1, 2, 3] as const` имеет тип `readonly [1, 2, 3]` (кортеж с конкретными числами). Аналогично для объектов: `const config = { mode: "dark" } as const` даёт тип `{ readonly mode: "dark" }`, а не `{ mode: string }`. Это мощнейший инструмент для: 1) создания константных enum-подобных структур, 2) вывода литеральных типов для discriminated unions, 3) типобезопасных конфигов. Важно: `as const` делает readonly только верхний уровень, вложенные объекты тоже, но массивы не становятся "глубоко замороженными".',
},
{
id: "ts-24",
hot: true,
q: "Что делает оператор `satisfies` (появился в TS 4.9)?",
a: 'До satisfies была дилемма: `const palette = { red: [255, 0, 0], green: "#00ff00" };` — TS выведет точные типы. Но если добавить `: Record<string, string | number[]>`, то TS забудет, что `red` — это именно массив, а `green` — строка. Решение: `const palette = { red: [255, 0, 0], green: "#00ff00" } satisfies Record<string, string | number[]>;`. Теперь TS проверит соответствие, но сохранит узкие типы: `palette.red[0]` работает, `palette.green.toUpperCase()` работает. Идеально для конфигов и маппингов.',
},
],
},
{
id: "utility",
title: "Utility types",
questions: [
{
id: "ts-09",
hot: true,
q: "Что такое утилитарные типы (Partial, Required, Readonly, Pick, Omit)?",
a: 'Это **mapped types**, встроенные в TS. `Partial<User>` — все поля становятся `?:`. `Required<User>` — убирает `?`. `Readonly<User>` — все поля только для чтения. `Pick<User, "name" | "age">` — новый тип только с указанными полями. `Omit<User, "password">` — все поля, кроме указанных. Также популярны: `Record<K, V>` (словарь), `Exclude/Extract` (для union типов), `ReturnType<T>` (тип возврата функции). Они избавляют от дублирования интерфейсов.',
},
{
id: "ts-28",
q: "Что делают utility types `ReturnType`, `Parameters` и `Record`?",
a: '**`ReturnType<typeof fn>`** — использует `infer` внутри conditional type: `type Ret = ReturnType<typeof fetchData>` даст тип, который возвращает `fetchData`. **`Parameters<typeof fn>`** — кортеж аргументов: `[userId: number, options: Options]`. Идеально для создания типобезопасных обёрток и моков. **`Record<K, V>`** — удобная замена `{ [key: string]: any }`: `Record<string, User>` — словарь пользователей. Другие полезные: `ConstructorParameters<T>` (аргументы конструктора), `InstanceType<T>` (тип экземпляра класса), `Awaited<T>` (распаковка Promise).',
},
],
},
{
id: "classes-modules",
title: "Классы, модули и декораторы",
questions: [
{
id: "ts-25",
hot: true,
q: "Какие есть модификаторы доступа в классах TypeScript?",
a: "Эти модификаторы существуют **только на этапе компиляции** и полностью удаляются из JS-кода. В рантайме все поля остаются публичными! Для реальной приватности в современном JS/TS используйте `#privateField` (ECMAScript private fields) — они защищены на уровне движка. `readonly` позволяет присвоить значение только в объявлении или конструкторе. `protected` методы и свойства доступны в наследниках, что полезно для шаблонного паттерна (Template Method). Краткий синтаксис: `constructor(private name: string)` автоматически создаёт поле.",
},
{
id: "ts-06",
q: "Как работают декораторы в TypeScript?",
a: 'Декораторы — это экспериментальная фича (стандарт Stage 3 ECMAScript), включаемая флагом `experimentalDecorators` в tsconfig. Они выполняются **один раз при инициализации класса**, а не при каждом вызове метода. Примеры использования: `@Injectable()` в NestJS для DI, `@Column()` в TypeORM для маппинга БД, `@log` для логирования вызовов методов. В новом стандарте TC39 декораторы имеют другой синтаксис и возможности, TS поддерживает обе версии.',
},
{
id: "ts-07",
q: "Что такое enum и почему его часто не рекомендуют использовать?",
a: 'Числовой `enum Status { Active, Inactive }` компилируется в объект с **обратным маппингом** (`Status[0] === "Active"`), что может приводить к багам. Строковый enum не имеет обратного маппинга, но всё равно генерирует реальный JS-объект, существующий в рантайме. Современная альтернатива: `const status = { Active: "active", Inactive: "inactive" } as const; type Status = typeof status[keyof typeof status];` — это даёт те же возможности, но без лишнего рантайм-кода и с полным type-safety.',
},
{
id: "ts-14",
q: "Что делает оператор `as` (type assertion)?",
a: '`const el = document.getElementById("app") as HTMLDivElement;` — TS знает, что `getElementById` возвращает `HTMLElement | null`, но мы уверены, что это div. **Важно**: `as` не выполняет проверок и преобразований в рантайме. Если вы напишете `"hello" as number`, компилятор может ругаться (нельзя приводить несовместимые типы), но двойной каст `"hello" as unknown as number` скомпилируется и упадёт при использовании. Для реальных преобразований используйте функции, а для проверок — Type Guards.',
},
{
id: "ts-15",
q: "Что такое модули в TypeScript и как они работают?",
a: 'Современный TS полностью совместим с ES-модулями: `export const x = 1; import { x } from "./file";`. При импорте можно опускать расширение `.ts` — бандлер сам найдёт файл. TS также поддерживает: 1) `import type` — импорт только типов (удаляется при компиляции), 2) `import()` динамический импорт для code splitting, 3) `namespace` (устаревший способ группировки без создания реального модуля). Опция `module` в tsconfig определяет, во что TS будет компилировать импорты: CommonJS, ESNext, AMD и т.д.',
},
{
id: "ts-26",
q: "Что такое Function Overloads (перегрузка функций)?",
a: 'Пример: `function createElement(tag: "img"): HTMLImageElement; function createElement(tag: "input"): HTMLInputElement; function createElement(tag: string): HTMLElement { ... }`. При вызове `createElement("img")` TS знает, что вернётся `HTMLImageElement`, и даст доступ к специфичным свойствам. Реализация функции должна быть совместима со всеми сигнатурами и обычно использует union-типы. Это нужно для типобезопасного API, где поведение зависит от типа аргументов (например, `document.querySelector`).',
},
{
id: "ts-27",
q: "Что такое `.d.ts` файлы и ключевое слово `declare`?",
a: 'Когда вы используете JS-библиотеку (например, jQuery) или браузерные API (`window.myGlobal`), TS не знает их типов. Файл `jquery.d.ts` содержит только сигнатуры функций без реализации. `declare` используется внутри таких файлов: `declare const $: JQueryStatic;` или `declare function myGlobalFn(): void;`. Это называется **ambient declarations**. Сообщество публикует тысячи .d.ts файлов в DefinitelyTyped (`@types/react`, `@types/lodash`). Можно писать свои `.d.ts` для описания глобальных переменных, CSS-модулей, изображений и т.д.',
},
],
},
],
};