const tasks = [
  // ==================== 1. ЗАМЫКАНИЯ И ФУНКЦИИ ====================
  {
    id: "task-debounce",
    topic: "closures",
    topicName: "Замыкания и функции",
    difficulty: "medium",
    title: "Реализация Debounce",
    description: `Напишите функцию \`debounce(func, delay)\`, которая задерживает вызов функции до тех пор, пока не пройдёт \`delay\` миллисекунд с момента последнего вызова.
**Требования:**
- Возвращает новую функцию
- Если вызовы идут чаще, чем \`delay\`, таймер сбрасывается
- Функция должна сохранять контекст \`this\` и принимать аргументы`,
    starterCode: `function debounce(func, delay) {
  // ваш код здесь
}`,
    hints: [
      "Вам понадобится переменная для хранения ID таймера (setTimeout) в замыкании",
      "При каждом вызове возвращаемой функции очищайте предыдущий таймер через clearTimeout",
      "Затем устанавливайте новый таймер, который вызовет func через delay мс",
      "Используйте apply для сохранения контекста this и передачи аргументов",
    ],
    testCases: [
      {
        input: [() => "test", 100],
        expected: "function",
        description: "Возвращает функцию",
      },
    ],
    solution: `function debounce(func, delay) {
  let timerId;
  return function(...args) {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}`,
    explanation:
      "Классическое замыкание. Мы храним timerId в области видимости возвращаемой функции. Каждый новый вызов сбрасывает старый таймер, гарантируя, что func выполнится только после паузы в `delay` мс. Идеально для обработки ввода в поиске, ресайза окна, скролла.",
  },
  {
    id: "task-throttle",
    topic: "closures",
    topicName: "Замыкания и функции",
    difficulty: "medium",
    title: "Реализация Throttle",
    description: `Напишите функцию \`throttle(func, limit)\`, которая ограничивает вызов функции: она выполняется не чаще, чем раз в \`limit\` миллисекунд.
**Требования:**
- В отличие от debounce, функция вызывается регулярно, но с ограничением частоты
- Первый вызов должен сработать сразу`,
    starterCode: `function throttle(func, limit) {
  // ваш код здесь
}`,
    hints: [
      "Используйте флаг inThrottle или переменную lastCallTime для отслеживания последнего вызова",
      "При каждом вызове проверяйте, прошло ли достаточно времени с последнего выполнения",
      "Если нет — игнорируйте вызов, если да — выполните и обновите время",
    ],
    testCases: [
      {
        input: [() => "test", 100],
        expected: "function",
        description: "Возвращает функцию",
      },
    ],
    solution: `function throttle(func, limit) {
  let lastCall = 0;
  return function(...args) {
    const now = Date.now();
    if (now - lastCall >= limit) {
      lastCall = now;
      func.apply(this, args);
    }
  };
}`,
    explanation:
      "Throttle гарантирует, что функция выполнится не чаще раза в `limit` мс. В отличие от debounce (который ждёт окончания серии вызовов), throttle вызывает функцию регулярно. Используется для обработки скролла, движения мыши, resize.",
  },
  {
    id: "task-curry",
    topic: "closures",
    topicName: "Замыкания и функции",
    difficulty: "medium",
    title: "Каррирование функции (Curry)",
    description: `Напишите функцию \`curry(fn)\`, которая превращает функцию от N аргументов в цепочку функций от одного аргумента.
**Требования:**
- \`curry((a, b, c) => a + b + c)(1)(2)(3)\` → \`6\`
- \`curry((a, b, c) => a + b + c)(1, 2)(3)\` → \`6\`
- Работает для любого количества аргументов`,
    starterCode: `function curry(fn) {
  // ваш код здесь
}`,
    hints: [
      "Используйте fn.length для получения ожидаемого количества аргументов",
      "Возвращайте функцию, которая собирает аргументы в массив",
      "Когда набрано достаточно аргументов — вызывайте fn, иначе возвращайте новую функцию",
    ],
    testCases: [
      {
        input: [(a, b) => a + b],
        expected: "function",
        description: "Возвращает функцию",
      },
    ],
    solution: `function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    }
    return function(...moreArgs) {
      return curried.apply(this, args.concat(moreArgs));
    };
  };
}`,
    explanation:
      "Каррирование превращает f(a, b, c) в f(a)(b)(c). Мы проверяем, набрано ли достаточно аргументов (args.length >= fn.length). Если да — вызываем оригинальную функцию, если нет — возвращаем новую функцию, которая добавит ещё аргументов. Полезно для частичного применения функций.",
  },
  {
    id: "task-compose",
    topic: "closures",
    topicName: "Замыкания и функции",
    difficulty: "medium",
    title: "Композиция функций (Compose)",
    description: `Напишите функцию \`compose(...funcs)\`, которая принимает набор функций и возвращает новую функцию, представляющую их композицию (вычисление справа налево).
**Требования:**
- \`compose(f, g, h)(x)\` равно \`f(g(h(x)))\`
- Если функций нет, вернуть функцию, возвращающую аргумент`,
    starterCode: `function compose(...funcs) {
  // ваш код здесь
}`,
    hints: [
      "Используйте Array.prototype.reduceRight для применения функций справа налево",
      "Если массив функций пуст, верните функцию, которая просто возвращает свой аргумент (arg => arg)",
      "Каждая функция принимает результат предыдущей",
    ],
    testCases: [
      {
        input: [(x => x + 1), (x => x * 2)],
        expected: 7,
        description: "compose(f, g)(3) = f(g(3)) = f(6) = 7",
      },
      {
        input: [],
        expected: 42,
        description: "Пустой массив функций",
      },
    ],
    solution: `function compose(...funcs) {
  if (funcs.length === 0) return arg => arg;
  if (funcs.length === 1) return funcs[0];
  return funcs.reduceRight((a, b) => (...args) => a(b(...args)));
}`,
    explanation:
      "reduceRight идеально подходит для композиции, так как применяет функции от последней к первой. Мы возвращаем новую функцию, которая пробрасывает аргументы через цепочку вызовов. Используется в Redux для создания middleware цепочек.",
  },
  {
    id: "task-memoize",
    topic: "closures",
    topicName: "Замыкания и функции",
    difficulty: "medium",
    title: "Мемоизация функции (Memoize)",
    description: `Напишите функцию \`memoize(fn)\`, которая кэширует результаты вызовов функции для одинаковых аргументов.
**Требования:**
- При повторном вызове с теми же аргументами возвращать кэшированный результат
- Аргументы преобразовывать в строку для использования как ключ кэша
- Работает для функций с любым количеством аргументов`,
    starterCode: `function memoize(fn) {
  // ваш код здесь
}`,
    hints: [
      "Используйте Map или обычный объект для хранения кэша",
      "Преобразуйте аргументы в строку через JSON.stringify для создания ключа",
      "Проверяйте наличие ключа в кэше: если есть — возвращайте, если нет — вычисляйте и сохраняйте",
    ],
    testCases: [
      {
        input: [x => x * 2],
        expected: "function",
        description: "Возвращает функцию",
      },
    ],
    solution: `function memoize(fn) {
  const cache = new Map();
  return function(...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}`,
    explanation:
      "Мемоизация — это оптимизация, которая запоминает результаты дорогих вычислений. При повторном вызове с теми же аргументами функция не выполняется, а возвращает кэшированный результат. Критично для рекурсивных функций (Фибоначчи) и тяжёлых вычислений.",
  },

  // ==================== 2. АСИНХРОННОСТЬ ====================
  {
    id: "task-promise-all",
    topic: "async",
    topicName: "Асинхронность",
    difficulty: "hard",
    title: "Полифил Promise.all",
    description: `Реализуйте свою версию \`PromiseAll(promises)\`, которая работает аналогично встроенному \`Promise.all\`.
**Требования:**
- Принимает массив промисов (или значений)
- Возвращает промис, который резолвится массивом результатов в том же порядке
- Если любой промис реджектится, весь PromiseAll должен немедленно реджектиться с этой ошибкой`,
    starterCode: `function PromiseAll(promises) {
  // ваш код здесь
}`,
    hints: [
      "Верните новый Promise",
      "Создайте массив results той же длины, что и promises, и счётчик resolvedCount = 0",
      "Пройдитесь по promises с помощью forEach (важно сохранить индексы!), вызывая Promise.resolve на каждом элементе",
      "В .then() записывайте результат по индексу и увеличивайте счётчик. Если счётчик == length, делайте resolve(results)",
      "В .catch() сразу делайте reject(error)",
    ],
    testCases: [
      {
        input: [[Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)]],
        expected: [1, 2, 3],
        description: "Все успешно",
      },
      {
        input: [[Promise.resolve(1), Promise.reject("Error"), Promise.resolve(3)]],
        expected: "Error",
        description: "Один реджект",
      },
    ],
    solution: `function PromiseAll(promises) {
  return new Promise((resolve, reject) => {
    const results = [];
    let completed = 0;
    if (promises.length === 0) return resolve(results);
    promises.forEach((p, index) => {
      Promise.resolve(p)
        .then(value => {
          results[index] = value;
          completed++;
          if (completed === promises.length) resolve(results);
        })
        .catch(reject);
    });
  });
}`,
    explanation:
      "Ключевой момент — использование forEach для сохранения исходных индексов в массиве results, так как промисы могут завершаться в произвольном порядке. Promise.resolve гарантирует, что обычные значения тоже будут обработаны корректно. Одна из самых частых задач на собеседованиях!",
  },
  {
    id: "task-sleep",
    topic: "async",
    topicName: "Асинхронность",
    difficulty: "easy",
    title: "Функция Sleep (задержка)",
    description: `Напишите функцию \`sleep(ms)\`, которая возвращает промис, резолвящийся через \`ms\` миллисекунд.
**Требования:**
- Используется с async/await: \`await sleep(1000)\`
- Должна работать как пауза в асинхронном коде`,
    starterCode: `function sleep(ms) {
  // ваш код здесь
}`,
    hints: [
      "Верните новый Promise",
      "Внутри используйте setTimeout с resolve",
      "setTimeout выполнится через ms миллисекунд и резолвит промис",
    ],
    testCases: [
      {
        input: [100],
        expected: "object",
        description: "Возвращает промис",
      },
    ],
    solution: `function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}`,
    explanation:
      "Простейший паттерн для создания задержек в асинхронном коде. Вместо колбэков setTimeout теперь можно писать чистый async/await код: await sleep(1000). Используется для тестов, анимаций, rate limiting.",
  },

  // ==================== 3. ПОЛИФИЛЫ МЕТОДОВ ====================
  {
    id: "task-bind-polyfill",
    topic: "polyfills",
    topicName: "Полифилы встроенных методов",
    difficulty: "hard",
    title: "Полифил Function.prototype.bind",
    description: `Реализуйте свой метод \`myBind(context, ...args)\` для функций, который работает как нативный \`bind\`.
**Требования:**
- Возвращает новую функцию с привязанным контекстом \`this\`
- Поддерживает частичное применение аргументов
- Работает с оператором \`new\` (если вызвана как конструктор)`,
    starterCode: `Function.prototype.myBind = function(context, ...boundArgs) {
  // ваш код здесь
};`,
    hints: [
      "Сохраните ссылку на оригинальную функцию через const fn = this",
      "Возвращайте функцию, которая вызывает fn.apply(context, [...boundArgs, ...newArgs])",
      "Для поддержки new проверяйте instanceof: если this instanceof fn, не привязывайте контекст",
    ],
    testCases: [
      {
        input: [function() { return this; }, {a: 1}],
        expected: "function",
        description: "Возвращает функцию",
      },
    ],
    solution: `Function.prototype.myBind = function(context, ...boundArgs) {
  const fn = this;
  return function(...newArgs) {
    if (this instanceof fn) {
      return new fn(...boundArgs, ...newArgs);
    }
    return fn.apply(context, [...boundArgs, ...newArgs]);
  };
};`,
    explanation:
      "bind создаёт новую функцию с жёстко привязанным this. Ключевой момент — проверка instanceof: если функция вызвана через new, контекст должен быть новым объектом, а не тем, что передали в bind. Это частая задача на Senior позициях.",
  },
  {
    id: "task-call-polyfill",
    topic: "polyfills",
    topicName: "Полифилы встроенных методов",
    difficulty: "medium",
    title: "Полифил Function.prototype.call",
    description: `Реализуйте свой метод \`myCall(context, ...args)\`, который работает как нативный \`call\`.
**Требования:**
- Вызывает функцию с указанным контекстом \`this\`
- Передаёт аргументы
- Возвращает результат выполнения функции`,
    starterCode: `Function.prototype.myCall = function(context, ...args) {
  // ваш код здесь
};`,
    hints: [
      "Добавьте функцию как временное свойство объекта context (например, context.fn = this)",
      "Вызовите context.fn(...args) — теперь this внутри функции будет context",
      "Удалите временное свойство и верните результат",
      "Обработайте случай, когда context === null или undefined (используйте глобальный объект)",
    ],
    testCases: [
      {
        input: [function(a, b) { return this.x + a + b; }, {x: 10}, 1, 2],
        expected: 13,
        description: "call с контекстом и аргументами",
      },
    ],
    solution: `Function.prototype.myCall = function(context, ...args) {
  context = context ?? globalThis;
  const fn = Symbol('fn');
  context[fn] = this;
  const result = context[fn](...args);
  delete context[fn];
  return result;
};`,
    explanation:
      "call временно добавляет функцию как метод объекта, вызывая её. Используем Symbol для уникального ключа, чтобы не перезаписать существующие свойства. После вызова удаляем временное свойство. Аналогично реализуется apply (разница только в передаче аргументов массивом).",
  },
  {
    id: "task-array-flat",
    topic: "polyfills",
    topicName: "Полифилы встроенных методов",
    difficulty: "medium",
    title: "Полифил Array.prototype.flat",
    description: `Реализуйте свой метод \`myFlat(depth = 1)\` для массивов, который выпрямляет вложенные массивы.
**Требования:**
- \`[1, [2, [3]]].myFlat()\` → \`[1, 2, [3]]\` (по умолчанию глубина 1)
- \`[1, [2, [3]]].myFlat(2)\` → \`[1, 2, 3]\`
- \`[1, [2, [3]]].myFlat(Infinity)\` → \`[1, 2, 3]\``,
    starterCode: `Array.prototype.myFlat = function(depth = 1) {
  // ваш код здесь
};`,
    hints: [
      "Используйте reduce для накопления результата",
      "Если элемент — массив и depth > 0, рекурсивно вызывайте myFlat с depth - 1",
      "Иначе просто добавляйте элемент в аккумулятор",
    ],
    testCases: [
      {
        input: [[1, [2, [3]]]],
        expected: [1, 2, [3]],
        description: "Глубина 1 по умолчанию",
      },
    ],
    solution: `Array.prototype.myFlat = function(depth = 1) {
  return this.reduce((acc, val) => {
    if (Array.isArray(val) && depth > 0) {
      return acc.concat(val.myFlat(depth - 1));
    }
    return acc.concat(val);
  }, []);
};`,
    explanation:
      "flat использует рекурсию с уменьшением глубины. reduce накапливает результат, конкатенируя либо сам элемент, либо рекурсивно выпрямленный массив. При depth = Infinity рекурсия идёт до полного выпрямления. Часто спрашивают вместе с flatMap.",
  },
  {
    id: "task-instanceof-polyfill",
    topic: "polyfills",
    topicName: "Полифилы встроенных методов",
    difficulty: "medium",
    title: "Полифил оператора instanceof",
    description: `Напишите функцию \`myInstanceof(obj, Constructor)\`, которая работает как оператор \`instanceof\`.
**Требования:**
- Проверяет, есть ли Constructor.prototype в цепочке прототипов obj
- Возвращает true/false
- Работает через __proto__ или Object.getPrototypeOf`,
    starterCode: `function myInstanceof(obj, Constructor) {
  // ваш код здесь
}`,
    hints: [
      "Получите прототип объекта через Object.getPrototypeOf(obj)",
      "Получите prototype конструктора через Constructor.prototype",
      "Идите по цепочке __proto__, пока не найдёте совпадение или не дойдёте до null",
    ],
    testCases: [
      {
        input: [[], Array],
        expected: true,
        description: "Массив является экземпляром Array",
      },
      {
        input: [{}, Array],
        expected: false,
        description: "Объект не является экземпляром Array",
      },
    ],
    solution: `function myInstanceof(obj, Constructor) {
  let proto = Object.getPrototypeOf(obj);
  const prototype = Constructor.prototype;
  while (proto !== null) {
    if (proto === prototype) return true;
    proto = Object.getPrototypeOf(proto);
  }
  return false;
}`,
    explanation:
      "instanceof проверяет всю цепочку прототипов. Мы поднимаемся от объекта к его прототипу, затем к прототипу прототипа, пока не найдём Constructor.prototype или не дойдём до null (конец цепочки). Это демонстрирует понимание прототипного наследования в JS.",
  },

  // ==================== 4. АЛГОРИТМЫ ====================
  {
    id: "task-quick-sort",
    topic: "algorithms",
    topicName: "Алгоритмы и сортировки",
    difficulty: "medium",
    title: "Быстрая сортировка (Quick Sort)",
    description: `Реализуйте алгоритм быстрой сортировки \`quickSort(arr)\`.
**Требования:**
- Выберите опорный элемент (pivot), например, средний
- Разделите массив на три части: меньше pivot, равно pivot, больше pivot
- Рекурсивно отсортируйте части и объедините их`,
    starterCode: `function quickSort(arr) {
  // ваш код здесь
}`,
    hints: [
      "Базовый случай рекурсии: если длина массива <= 1, верните его",
      "Выберите pivot (например, arr[Math.floor(arr.length / 2)])",
      "Используйте filter для создания массивов left, middle и right",
    ],
    testCases: [
      {
        input: [[3, 1, 4, 1, 5, 9, 2, 6]],
        expected: [1, 1, 2, 3, 4, 5, 6, 9],
        description: "Случайный массив",
      },
      {
        input: [[]],
        expected: [],
        description: "Пустой массив",
      },
      {
        input: [[1]],
        expected: [1],
        description: "Один элемент",
      },
    ],
    solution: `function quickSort(arr) {
  if (arr.length <= 1) return arr;
  const pivot = arr[Math.floor(arr.length / 2)];
  const left = arr.filter(x => x < pivot);
  const middle = arr.filter(x => x === pivot);
  const right = arr.filter(x => x > pivot);
  return [...quickSort(left), ...middle, ...quickSort(right)];
}`,
    explanation:
      "Это декларативная версия Quick Sort. Она менее эффективна по памяти (O(n) из-за filter), но идеально читается и демонстрирует понимание принципа 'разделяй и властвуй'. Средняя сложность O(n log n), худшая O(n²).",
  },
  {
    id: "task-binary-search",
    topic: "algorithms",
    topicName: "Алгоритмы и сортировки",
    difficulty: "medium",
    title: "Бинарный поиск",
    description: `Напишите функцию \`binarySearch(arr, target)\`, которая ищет индекс элемента в **отсортированном** массиве.
**Требования:**
- Если элемент найден, верните его индекс
- Если не найден, верните \`-1\`
- Сложность должна быть O(log n)`,
    starterCode: `function binarySearch(arr, target) {
  // ваш код здесь
}`,
    hints: [
      "Используйте два указателя: left = 0, right = arr.length - 1",
      "В цикле while (left <= right) находите mid = Math.floor((left + right) / 2)",
      "Если arr[mid] === target, верните mid. Если arr[mid] < target, сдвиньте left = mid + 1. Иначе right = mid - 1",
    ],
    testCases: [
      {
        input: [[1, 3, 5, 7, 9, 11], 5],
        expected: 2,
        description: "Элемент в середине",
      },
      {
        input: [[1, 3, 5, 7, 9, 11], 1],
        expected: 0,
        description: "Первый элемент",
      },
      {
        input: [[1, 3, 5, 7, 9, 11], 11],
        expected: 5,
        description: "Последний элемент",
      },
      {
        input: [[1, 3, 5, 7, 9, 11], 4],
        expected: -1,
        description: "Элемента нет",
      },
    ],
    solution: `function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}`,
    explanation:
      "Бинарный поиск делит пространство поиска пополам на каждом шаге, что даёт логарифмическую сложность O(log n). Это стандарт для поиска в отсортированных данных. Важно: массив должен быть отсортирован!",
  },
  {
    id: "task-two-sum",
    topic: "algorithms",
    topicName: "Алгоритмы и сортировки",
    difficulty: "medium",
    title: "Два числа (Two Sum)",
    description: `Дан массив чисел \`nums\` и целевое число \`target\`. Найдите индексы двух чисел, которые в сумме дают \`target\`.
**Требования:**
- Предположите, что решение всегда существует
- Нельзя использовать один и тот же элемент дважды
- Решите за O(n) (один проход)`,
    starterCode: `function twoSum(nums, target) {
  // ваш код здесь
}`,
    hints: [
      "Вместо вложенных циклов (O(n²)), используйте хэш-таблицу (Map или обычный объект) для хранения уже просмотренных чисел",
      "На каждой итерации вычисляйте complement = target - currentNum",
      "Проверяйте, есть ли complement в вашей хэш-таблице. Если да — вы нашли пару",
    ],
    testCases: [
      {
        input: [[2, 7, 11, 15], 9],
        expected: [0, 1],
        description: "Базовый случай",
      },
      {
        input: [[3, 2, 4], 6],
        expected: [1, 2],
        description: "Числа не в начале",
      },
      {
        input: [[3, 3], 6],
        expected: [0, 1],
        description: "Одинаковые числа",
      },
    ],
    solution: `function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
}`,
    explanation:
      "Использование Map позволяет искать нужное дополнение за O(1). Мы делаем всего один проход по массиву, что даёт общую сложность O(n) по времени и O(n) по памяти. Классическая задача LeetCode #1.",
  },
  {
    id: "task-valid-parentheses",
    topic: "algorithms",
    topicName: "Алгоритмы и сортировки",
    difficulty: "medium",
    title: "Валидные скобки (Valid Parentheses)",
    description: `Напишите функцию \`isValid(s)\`, которая проверяет, правильно ли расставлены скобки в строке.
**Требования:**
- Открытые скобки должны закрываться правильным типом скобок
- Открытые скобки должны закрываться в правильном порядке
- Поддерживаются: \`()\`, \`{}\`, \`[]\``,
    starterCode: `function isValid(s) {
  // ваш код здесь
}`,
    hints: [
      "Используйте стек (массив): при открытой скобке добавляйте в стек, при закрытой — проверяйте и удаляйте",
      "Создайте маппинг закрывающих скобок на открывающие: { ')': '(', '}': '{', ']': '[' }",
      "Если стек пуст при закрытой скобке или тип не совпадает — return false. В конце стек должен быть пуст",
    ],
    testCases: [
      {
        input: ["()"],
        expected: true,
        description: "Простые скобки",
      },
      {
        input: ["()[]{}"],
        expected: true,
        description: "Несколько типов",
      },
      {
        input: ["(]"],
        expected: false,
        description: "Неправильный порядок",
      },
      {
        input: ["([)]"],
        expected: false,
        description: "Неправильная вложенность",
      },
      {
        input: ["{[]}"],
        expected: true,
        description: "Вложенные скобки",
      },
    ],
    solution: `function isValid(s) {
  const stack = [];
  const map = { ')': '(', '}': '{', ']': '[' };
  for (const char of s) {
    if (map[char]) {
      const top = stack.pop();
      if (top !== map[char]) return false;
    } else {
      stack.push(char);
    }
  }
  return stack.length === 0;
}`,
    explanation:
      "Стек идеально подходит для проверки вложенности. При открытой скобке добавляем в стек, при закрытой — проверяем, что верх стека соответствует. Если в конце стек не пуст — есть незакрытые скобки. LeetCode #20.",
  },

  // ==================== 5. ОБЪЕКТЫ И СТРУКТУРЫ ДАННЫХ ====================
  {
    id: "task-deep-clone",
    topic: "objects",
    topicName: "Объекты и рекурсия",
    difficulty: "medium",
    title: "Глубокое клонирование (Deep Clone)",
    description: `Напишите функцию \`deepClone(obj)\`, которая создаёт полную независимую копию объекта или массива.
**Требования:**
- Поддержка вложенных объектов и массивов
- Не используйте \`JSON.parse(JSON.stringify())\` (он ломает Date, undefined, функции)
- Примитивы возвращайте как есть`,
    starterCode: `function deepClone(obj) {
  // ваш код здесь
}`,
    hints: [
      "Сначала обработайте базовые случаи: null, примитивы, Date, RegExp",
      "Определите, является ли объект массивом (Array.isArray) или обычным объектом",
      "Создайте пустую структуру того же типа и рекурсивно скопируйте в неё все ключи/элементы",
    ],
    testCases: [
      {
        input: [{ a: 1, b: { c: 2 } }],
        expected: { a: 1, b: { c: 2 } },
        description: "Вложенный объект",
      },
      {
        input: [[1, [2, 3]]],
        expected: [1, [2, 3]],
        description: "Вложенный массив",
      },
      {
        input: [null],
        expected: null,
        description: "Null",
      },
    ],
    solution: `function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') return obj;
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof RegExp) return new RegExp(obj);
  const clone = Array.isArray(obj) ? [] : {};
  for (let key in obj) {
    if (Object.hasOwn(obj, key)) {
      clone[key] = deepClone(obj[key]);
    }
  }
  return clone;
}`,
    explanation:
      "Мы проверяем тип на каждом шаге. Для Date и RegExp создаём новые экземпляры. Для массивов и объектов создаём пустые аналоги и рекурсивно заполняем их, проверяя hasOwn, чтобы не копировать прототип. Это классическая задача на понимание рекурсии и типов.",
  },
  {
    id: "task-flatten-array",
    topic: "objects",
    topicName: "Объекты и рекурсия",
    difficulty: "medium",
    title: "Выпрямление массива (Flatten)",
    description: `Напишите функцию \`flattenArray(arr)\`, которая превращает многомерный массив любой вложенности в одномерный.
**Требования:**
- Не используйте встроенный \`Array.prototype.flat()\`
- \`[1, [2, [3, [4]], 5]]\` → \`[1, 2, 3, 4, 5]\``,
    starterCode: `function flattenArray(arr) {
  // ваш код здесь
}`,
    hints: [
      "Используйте рекурсию или стек",
      "Проверяйте каждый элемент: если это массив (Array.isArray), рекурсивно вызывайте функцию для него",
      "Иначе просто добавляйте элемент в результирующий массив",
    ],
    testCases: [
      {
        input: [[1, 2, [3, 4]]],
        expected: [1, 2, 3, 4],
        description: "Двухуровневая вложенность",
      },
      {
        input: [[1, [2, [3, [4]]]]],
        expected: [1, 2, 3, 4],
        description: "Глубокая вложенность",
      },
      {
        input: [[[[]]]],
        expected: [],
        description: "Пустые массивы",
      },
    ],
    solution: `function flattenArray(arr) {
  return arr.reduce((acc, val) => 
    Array.isArray(val) ? acc.concat(flattenArray(val)) : acc.concat(val), 
  []);
}`,
    explanation:
      "Метод reduce аккуратно накапливает результат. Если элемент — массив, мы рекурсивно его выпрямляем и конкатенируем. Это классический пример рекурсивного паттерна. Альтернатива — использование стека (iterative approach).",
  },
  {
    id: "task-flatten-object",
    topic: "objects",
    topicName: "Объекты и рекурсия",
    difficulty: "medium",
    title: "Выпрямление объекта (Flatten Object)",
    description: `Напишите функцию \`flattenObject(obj)\`, которая превращает вложенный объект в плоский, используя точки в ключах.
**Требования:**
- \`{ a: 1, b: { c: 2, d: { e: 3 } } }\` → \`{ a: 1, 'b.c': 2, 'b.d.e': 3 }\`
- Массивы внутри объекта считаем значениями (не выпрямляем их ключи)`,
    starterCode: `function flattenObject(obj, prefix = '') {
  // ваш код здесь
}`,
    hints: [
      "Используйте рекурсию с аккумулятором (объектом result)",
      "Передавайте текущий путь (prefix) в рекурсивный вызов",
      "Если значение — объект (и не null, и не массив), рекурсивно вызывайте функцию, добавляя ключ к prefix через точку",
    ],
    testCases: [
      {
        input: [{ a: 1, b: { c: 2 } }],
        expected: { a: 1, "b.c": 2 },
        description: "Базовый случай",
      },
      {
        input: [{ a: { b: { c: 3 } } }],
        expected: { "a.b.c": 3 },
        description: "Глубокая вложенность",
      },
      {
        input: [{ a: 1, b: [1, 2] }],
        expected: { a: 1, b: [1, 2] },
        description: "Массив как значение",
      },
    ],
    solution: `function flattenObject(obj, prefix = '') {
  const result = {};
  for (const key in obj) {
    if (Object.hasOwn(obj, key)) {
      const newKey = prefix ? \`\${prefix}.\${key}\` : key;
      if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
        Object.assign(result, flattenObject(obj[key], newKey));
      } else {
        result[newKey] = obj[key];
      }
    }
  }
  return result;
}`,
    explanation:
      "Рекурсивный обход с накоплением пути. Мы проверяем, является ли значение чистым объектом. Если да — идём глубже, иначе записываем значение по сформированному ключу. Используется для подготовки данных к отправке в API или хранения в плоских БД.",
  },
  {
    id: "task-event-emitter",
    topic: "objects",
    topicName: "Объекты и рекурсия",
    difficulty: "hard",
    title: "EventEmitter (Pub-Sub паттерн)",
    description: `Реализуйте класс \`EventEmitter\` с методами \`on\`, \`off\`, \`emit\`.
**Требования:**
- \`on(event, callback)\` — подписка на событие
- \`off(event, callback)\` — отписка от события
- \`emit(event, ...args)\` — вызов всех подписчиков события с аргументами
- Поддержка нескольких подписчиков на одно событие`,
    starterCode: `class EventEmitter {
  constructor() {
    // ваш код здесь
  }
  on(event, callback) {
    // ваш код здесь
  }
  off(event, callback) {
    // ваш код здесь
  }
  emit(event, ...args) {
    // ваш код здесь
  }
}`,
    hints: [
      "Используйте Map или объект для хранения событий: ключ — имя события, значение — массив колбэков",
      "on добавляет колбэк в массив, off удаляет конкретный колбэк через filter или indexOf",
      "emit проходит по всем колбэкам события и вызывает каждый с переданными аргументами",
    ],
    testCases: [
      {
        input: [],
        expected: "object",
        description: "Создаёт экземпляр",
      },
    ],
    solution: `class EventEmitter {
  constructor() {
    this.events = new Map();
  }
  on(event, callback) {
    if (!this.events.has(event)) {
      this.events.set(event, []);
    }
    this.events.get(event).push(callback);
  }
  off(event, callback) {
    const callbacks = this.events.get(event);
    if (callbacks) {
      this.events.set(event, callbacks.filter(cb => cb !== callback));
    }
  }
  emit(event, ...args) {
    const callbacks = this.events.get(event);
    if (callbacks) {
      callbacks.forEach(cb => cb(...args));
    }
  }
}`,
    explanation:
      "EventEmitter — основа событийной архитектуры в Node.js и браузере. Map хранит события как ключи и массивы колбэков как значения. on подписывает, off отписывает (фильтрует массив), emit вызывает все колбэки. Используется в Redux, React, Node.js streams.",
  },

  // ==================== 6. СТРОКИ ====================
  {
    id: "task-palindrome",
    topic: "strings",
    topicName: "Строки и массивы",
    difficulty: "easy",
    title: "Проверка палиндрома",
    description: `Напишите функцию \`isPalindrome(str)\`, которая проверяет, является ли строка палиндромом (читается одинаково слева направо и справа налево).
**Требования:**
- Игнорировать регистр и небуквенные символы (пробелы, знаки препинания)
- \`"A man, a plan, a canal: Panama"\` → \`true\`
- \`"race a car"\` → \`false\``,
    starterCode: `function isPalindrome(str) {
  // ваш код здесь
}`,
    hints: [
      "Используйте регулярное выражение, чтобы удалить все неалфавитные символы: str.replace(/[^a-zA-Z0-9]/g, '')",
      "Приведите строку к нижнему регистру через toLowerCase()",
      "Сравните очищенную строку с её перевёрнутой версией (split('').reverse().join(''))",
    ],
    testCases: [
      {
        input: ["racecar"],
        expected: true,
        description: "Простой палиндром",
      },
      {
        input: ["A man, a plan, a canal: Panama"],
        expected: true,
        description: "С пробелами и знаками",
      },
      {
        input: ["hello"],
        expected: false,
        description: "Не палиндром",
      },
      {
        input: [" "],
        expected: true,
        description: "Пустая строка/пробелы",
      },
    ],
    solution: `function isPalindrome(str) {
  const clean = str.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
  return clean === clean.split('').reverse().join('');
}`,
    explanation:
      "Мы очищаем строку от всего, кроме букв и цифр, приводим к нижнему регистру и сравниваем с перевёрнутой копией. Это O(n) по времени и O(n) по памяти. Более оптимальный вариант — два указателя (слева и справа), но этот проще для понимания.",
  },
  {
    id: "task-anagram",
    topic: "strings",
    topicName: "Строки и массивы",
    difficulty: "easy",
    title: "Проверка анаграммы",
    description: `Напишите функцию \`isAnagram(str1, str2)\`, которая проверяет, являются ли две строки анаграммами (содержат одинаковые символы в любом порядке).
**Требования:**
- Игнорировать регистр и пробелы
- \`"listen"\` и \`"silent"\` → \`true\`
- \`"hello"\` и \`"world"\` → \`false\``,
    starterCode: `function isAnagram(str1, str2) {
  // ваш код здесь
}`,
    hints: [
      "Очистите строки от пробелов и приведите к нижнему регистру",
      "Если длины разные — сразу return false",
      "Отсортируйте символы обеих строк и сравните, ИЛИ используйте счётчик символов (Map/объект)",
    ],
    testCases: [
      {
        input: ["listen", "silent"],
        expected: true,
        description: "Классическая анаграмма",
      },
      {
        input: ["hello", "world"],
        expected: false,
        description: "Не анаграмма",
      },
      {
        input: ["Debit card", "Bad credit"],
        expected: true,
        description: "С пробелами и регистром",
      },
    ],
    solution: `function isAnagram(str1, str2) {
  const clean = s => s.replace(/\\s/g, '').toLowerCase();
  const s1 = clean(str1), s2 = clean(str2);
  if (s1.length !== s2.length) return false;
  const count = {};
  for (const char of s1) count[char] = (count[char] || 0) + 1;
  for (const char of s2) {
    if (!count[char]) return false;
    count[char]--;
  }
  return true;
}`,
    explanation:
      "Используем хэш-таблицу для подсчёта символов. Сначала считаем символы первой строки, затем вычитаем для второй. Если в конце все счётчики = 0 — строки анаграммы. O(n) по времени, O(k) по памяти (k — количество уникальных символов).",
  },

  // ==================== 7. МАССИВЫ ====================
  {
    id: "task-unique-array",
    topic: "arrays",
    topicName: "Массивы",
    difficulty: "easy",
    title: "Удаление дубликатов из массива",
    description: `Напишите функцию \`unique(arr)\`, которая возвращает новый массив без дубликатов.
**Требования:**
- Сохранять порядок первого вхождения элементов
- Работать с примитивами и объектами (по ссылке)
- \`[1, 2, 2, 3, 1]\` → \`[1, 2, 3]\``,
    starterCode: `function unique(arr) {
  // ваш код здесь
}`,
    hints: [
      "Используйте Set для хранения уникальных значений",
      "Или используйте filter с indexOf: элемент оставляем, если его индекс совпадает с первым вхождением",
      "Set автоматически удаляет дубликаты, затем конвертируйте обратно в массив через [...set] или Array.from",
    ],
    testCases: [
      {
        input: [[1, 2, 2, 3, 1]],
        expected: [1, 2, 3],
        description: "Числа с дубликатами",
      },
      {
        input: [["a", "b", "a", "c"]],
        expected: ["a", "b", "c"],
        description: "Строки",
      },
      {
        input: [[]],
        expected: [],
        description: "Пустой массив",
      },
    ],
    solution: `function unique(arr) {
  return [...new Set(arr)];
}`,
    explanation:
      "Set — это коллекция уникальных значений. Конструкция [...new Set(arr)] создаёт Set из массива (удаляя дубликаты), затем spread-оператор конвертирует обратно в массив. O(n) по времени. Альтернатива: arr.filter((item, idx) => arr.indexOf(item) === idx).",
  },
  {
    id: "task-group-by",
    topic: "arrays",
    topicName: "Массивы",
    difficulty: "medium",
    title: "Группировка массива (GroupBy)",
    description: `Напишите функцию \`groupBy(arr, key)\`, которая группирует массив объектов по значению указанного ключа.
**Требования:**
- Возвращает объект, где ключи — значения поля \`key\`, а значения — массивы объектов
- \`groupBy([{type: 'fruit', name: 'apple'}, {type: 'fruit', name: 'banana'}, {type: 'veg', name: 'carrot'}], 'type')\` → \`{ fruit: [...], veg: [...] }\``,
    starterCode: `function groupBy(arr, key) {
  // ваш код здесь
}`,
    hints: [
      "Используйте reduce для накопления результата в объект",
      "На каждой итерации получайте значение obj[key] как ключ группы",
      "Если группа ещё не существует, создайте пустой массив, затем добавляйте объект",
    ],
    testCases: [
      {
        input: [
          [
            { type: "fruit", name: "apple" },
            { type: "fruit", name: "banana" },
            { type: "veg", name: "carrot" },
          ],
          "type",
        ],
        expected: {
          fruit: [
            { type: "fruit", name: "apple" },
            { type: "fruit", name: "banana" },
          ],
          veg: [{ type: "veg", name: "carrot" }],
        },
        description: "Группировка по типу",
      },
    ],
    solution: `function groupBy(arr, key) {
  return arr.reduce((groups, obj) => {
    const group = obj[key];
    if (!groups[group]) groups[group] = [];
    groups[group].push(obj);
    return groups;
  }, {});
}`,
    explanation:
      "reduce накаплирует объект-результат. Для каждого объекта получаем значение поля key как ключ группы. Если группа не существует — создаём пустой массив, затем добавляем объект. Это аналог SQL GROUP BY. В ES2024 добавлен встроенный Object.groupBy().",
  },
  {
    id: "task-chunk",
    topic: "arrays",
    topicName: "Массивы",
    difficulty: "medium",
    title: "Разбиение массива на чанки (Chunk)",
    description: `Напишите функцию \`chunk(arr, size)\`, которая разбивает массив на группы по \`size\` элементов.
**Требования:**
- \`chunk([1, 2, 3, 4, 5], 2)\` → \`[[1, 2], [3, 4], [5]]\`
- Последний чанк может быть меньше \`size\`
- Если \`size\` <= 0, вернуть пустой массив`,
    starterCode: `function chunk(arr, size) {
  // ваш код здесь
}`,
    hints: [
      "Используйте цикл for с шагом size или slice в цикле while",
      "На каждой итерации берите slice от i до i + size",
      "Проверьте edge case: size <= 0 должен вернуть []",
    ],
    testCases: [
      {
        input: [[1, 2, 3, 4, 5], 2],
        expected: [[1, 2], [3, 4], [5]],
        description: "Разбиение на пары",
      },
      {
        input: [[1, 2, 3], 3],
        expected: [[1, 2, 3]],
        description: "Один чанк",
      },
      {
        input: [[1, 2, 3], 0],
        expected: [],
        description: "Нулевой размер",
      },
    ],
    solution: `function chunk(arr, size) {
  if (size <= 0) return [];
  const result = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}`,
    explanation:
      "Цикл for с шагом size. На каждой итерации берём slice от i до i + size. Если элементов не хватает — slice вернёт меньший массив. Используется для пагинации, батчинга запросов, отображения сеток.",
  },
];

export default tasks;