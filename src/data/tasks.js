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
        input: [(x) => x + 1, (x) => x * 2],
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
        input: [(x) => x * 2],
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
        input: [
          [Promise.resolve(1), Promise.reject("Error"), Promise.resolve(3)],
        ],
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
        input: [
          function () {
            return this;
          },
          { a: 1 },
        ],
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
        input: [
          function (a, b) {
            return this.x + a + b;
          },
          { x: 10 },
          1,
          2,
        ],
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
    pattern: "Два указателя",
    approach: {
      recognize:
        "Нужно сравнить строку/массив с двух концов: палиндром, разворот, симметрия.",
      idea: "Указатели на концах очищенной строки идут навстречу друг другу. Если хоть одна пара символов не совпала — не палиндром.",
      steps: [
        "Очисти строку: убери всё, кроме букв и цифр, приведи к нижнему регистру",
        "left = 0, right = clean.length - 1",
        "while left < right: если clean[left] !== clean[right] → return false",
        "Иначе left++, right--. Дошли до центра → return true",
      ],
      skeleton: `let left = 0;
let right = s.length - 1;
while (left < right) {
  if (s[left] !== s[right]) return false;
  left++;
  right--;
}
return true;`,
      complexity: "O(n) время, O(1) доп. память (после очистки)",
    },
    hints: [
      {
        text: "Сначала очисти строку: оставь только буквы/цифры и приведи к нижнему регистру.",
        code: `const clean = str.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();`,
      },
      {
        text: "Два указателя: один с начала, другой с конца, идут навстречу.",
        code: `let left = 0;
let right = clean.length - 1;
while (left < right) { ... }`,
      },
      {
        text: "Если символы на указателях различаются — сразу return false.",
        code: `if (clean[left] !== clean[right]) return false;
left++;
right--;`,
      },
      {
        text: "Ленивая альтернатива (для самопроверки): сравнить строку с перевёрнутой.",
        code: `return clean === clean.split("").reverse().join("");`,
      },
    ],
    testCases: [
      { input: ["racecar"], expected: true, description: "Простой палиндром" },
      {
        input: ["A man, a plan, a canal: Panama"],
        expected: true,
        description: "С пробелами и знаками",
      },
      { input: ["hello"], expected: false, description: "Не палиндром" },
      { input: [" "], expected: true, description: "Пустая строка/пробелы" },
    ],
    solution: `function isPalindrome(str) {
  const clean = str.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
  let left = 0;
  let right = clean.length - 1;
  while (left < right) {
    if (clean[left] !== clean[right]) return false;
    left++;
    right--;
  }
  return true;
}`,
    explanation:
      "Это паттерн «два указателя»: очищаем строку и сравниваем символы с двух концов, двигаясь к центру. Достаточно n/2 сравнений и O(1) памяти. Старое решение через reverse() проще для понимания, но требует O(n) памяти на копию. На собеседовании лучше показать именно указатели.",
    similar: [
      "Reverse String (task-reverse-string)",
      "Two Sum в отсортированном массиве (task-two-sum-sorted)",
      "Валидация скобок — указатели + стек",
    ],
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
  // ==================== ДВА УКАЗАТЕЛЯ ====================
  {
    id: "task-reverse-string",
    topic: "two-pointers",
    topicName: "Два указателя",
    difficulty: "easy",
    title: "Реверс строки (Reverse String)",
    description: `Напишите функцию \`reverseString(str)\`, которая разворачивает строку задом наперёд.
**Требования:**
- Использовать технику двух указателей (встроенный \`reverse()\` не использовать)
- \`"hello"\` → \`"olleh"\``,
    starterCode: `function reverseString(str) {
// ваш код здесь
}`,
    pattern: "Два указателя",
    approach: {
      recognize:
        "Нужно развернуть строку/массив или сравнить элементы с двух концов.",
      idea: "Указатели на концах. Меняем элементы местами и сходимся к центру — каждый swap ставит два элемента на итоговые места.",
      steps: [
        "Строки в JS неизменяемы → преврати строку в массив символов",
        "left = 0, right = arr.length - 1",
        "while left < right: меняй arr[left] и arr[right] местами, затем left++, right--",
        "Собери массив обратно в строку",
      ],
      skeleton: `let left = 0;
let right = arr.length - 1;
while (left < right) {
  [arr[left], arr[right]] = [arr[right], arr[left]];
  left++;
  right--;
}`,
      complexity: "O(n) время, O(n) память на массив символов",
    },
    hints: [
      {
        text: "Строку нельзя менять по индексу — сначала преврати её в массив символов.",
        code: `const arr = str.split("");`,
      },
      {
        text: "Поставь указатели на оба конца и сдвигай их навстречу, пока не встретятся.",
        code: `let left = 0;
let right = arr.length - 1;
while (left < right) { ... }`,
      },
      {
        text: "Меняй элементы местами через деструктуризацию и двигай оба указателя.",
        code: `[arr[left], arr[right]] = [arr[right], arr[left]];
left++;
right--;`,
      },
      {
        text: "В конце собери массив обратно в строку.",
        code: `return arr.join("");`,
      },
    ],
    testCases: [
      { input: ["hello"], expected: "olleh", description: "Обычное слово" },
      { input: ["a"], expected: "a", description: "Один символ" },
      { input: [""], expected: "", description: "Пустая строка" },
      { input: ["ab"], expected: "ba", description: "Два символа" },
    ],
    solution: `function reverseString(str) {
  const arr = str.split("");
  let left = 0;
  let right = arr.length - 1;
  while (left < right) {
    [arr[left], arr[right]] = [arr[right], arr[left]];
    left++;
    right--;
  }
  return arr.join("");
}`,
    explanation:
      "Базовое применение двух указателей: сходимся с двух концов к центру, меняя элементы местами. Достаточно n/2 обменов. Тот же приём: палиндром, разворот массива, partition в quicksort.",
    similar: [
      "Палиндром (task-palindrome)",
      "Two Sum в отсортированном массиве (task-two-sum-sorted)",
    ],
  },
  {
    id: "task-two-sum-sorted",
    topic: "two-pointers",
    topicName: "Два указателя",
    difficulty: "medium",
    title: "Two Sum в отсортированном массиве",
    description: `Дан **отсортированный** массив чисел \`nums\` и цель \`target\`. Найди индексы двух чисел, дающих в сумме \`target\`.
**Требования:**
- Вернуть массив из двух индексов (0-based), любой подходящий вариант
- Если пары нет — вернуть \`[-1, -1]\`
- O(n) без хэш-таблицы — используй отсортированность (два указателя)`,
    starterCode: `function twoSumSorted(nums, target) {
// ваш код здесь
}`,
    pattern: "Два указателя",
    approach: {
      recognize:
        "Массив отсортирован + нужна пара с заданной суммой/разностью. Хэш-таблица не нужна!",
      idea: "Указатели на концах. Сумма мала — двигаем левый вправо (сумма растёт). Сумма велика — двигаем правый влево.",
      steps: [
        "left = 0, right = nums.length - 1",
        "while left < right: sum = nums[left] + nums[right]",
        "sum === target → return [left, right]",
        "sum < target → left++ (нужна сумма побольше)",
        "sum > target → right-- (нужна сумма поменьше)",
        "Цикл закончился → return [-1, -1]",
      ],
      skeleton: `let left = 0;
let right = nums.length - 1;
while (left < right) {
  const sum = nums[left] + nums[right];
  if (sum === target) return [left, right];
  if (sum < target) left++;
  else right--;
}
return [-1, -1];`,
      complexity: "O(n) время, O(1) память",
    },
    hints: [
      {
        text: "Отсортированность — главный подарок: поставь указатели на оба конца.",
        code: `let left = 0;
let right = nums.length - 1;`,
      },
      {
        text: "Сумма меньше цели? Единственный способ увеличить её — сдвинуть левый указатель вправо.",
        code: `if (sum < target) left++;`,
      },
      {
        text: "Сумма больше цели — сдвигай правый указатель влево.",
        code: `else right--;`,
      },
    ],
    testCases: [
      {
        input: [[1, 2, 4, 7, 11], 9],
        expected: [1, 3],
        description: "2 + 7 = 9",
      },
      { input: [[1, 2, 3], 10], expected: [-1, -1], description: "Пары нет" },
      {
        input: [[-3, 0, 2, 5], 2],
        expected: [0, 3],
        description: "Отрицательные числа",
      },
      { input: [[2, 3], 5], expected: [0, 1], description: "Два элемента" },
    ],
    solution: `function twoSumSorted(nums, target) {
  let left = 0;
  let right = nums.length - 1;
  while (left < right) {
    const sum = nums[left] + nums[right];
    if (sum === target) return [left, right];
    if (sum < target) left++;
    else right--;
  }
  return [-1, -1];
}`,
    explanation:
      "На отсортированном массиве два указателя бьют хэш-таблицу: O(1) памяти вместо O(n). Логика движения: сумма монотонно зависит от указателей, поэтому каждое сравнение отбрасывает целый класс вариантов. Если массив НЕ отсортирован — используй хэш-таблицу (как в task-two-sum).",
    similar: ["Two Sum (task-two-sum)", "Реверс строки (task-reverse-string)"],
  },

  // ==================== ПЛАВАЮЩЕЕ ОКНО ====================
  {
    id: "task-max-window-sum",
    topic: "sliding-window",
    topicName: "Плавающее окно",
    difficulty: "easy",
    title: "Максимальная сумма подмассива длины k",
    description: `Дан массив чисел \`nums\` и число \`k\`. Найди максимальную сумму среди всех НЕПРЕРЫВНЫХ подмассивов длины \`k\`.
**Требования:**
- \`[1, 4, 2, 7, 3], k = 2\` → \`10\` (7 + 3)
- O(n) за один проход, без вложенных циклов`,
    starterCode: `function maxWindowSum(nums, k) {
// ваш код здесь
}`,
    pattern: "Плавающее окно",
    approach: {
      recognize:
        "Непрерывный подмассив ФИКСИРОВАННОЙ длины k + максимум/минимум суммы.",
      idea: "Соседние окна пересекаются по k-1 элементу. Зачем пересчитывать? Вычти ушедший слева, прибавь пришедший справа.",
      steps: [
        "Посчитай сумму первых k элементов — это первое окно",
        "maxSum = эта сумма",
        "for i = k .. n-1: sum += nums[i] - nums[i - k]",
        "На каждом шаге обновляй maxSum",
      ],
      skeleton: `let sum = 0;
for (let i = 0; i < k; i++) sum += nums[i];
let maxSum = sum;
for (let i = k; i < nums.length; i++) {
  sum += nums[i] - nums[i - k];
  maxSum = Math.max(maxSum, sum);
}`,
      complexity: "O(n) время, O(1) память",
    },
    hints: [
      {
        text: "Не пересчитывай каждое окно с нуля — соседние окна отличаются лишь двумя элементами.",
        code: `// окно [i-k+1 .. i] отличается от [i-k .. i-1]
// только nums[i] (вошёл) и nums[i-k] (вышел)`,
      },
      {
        text: "При сдвиге окна: прибавь новый справа, вычти ушедший слева.",
        code: `sum += nums[i] - nums[i - k];`,
      },
      {
        text: "maxSum инициализируй суммой ПЕРВОГО окна, а не нулём (числа могут быть отрицательными).",
        code: `let maxSum = sum;`,
      },
    ],
    testCases: [
      { input: [[1, 4, 2, 7, 3], 2], expected: 10, description: "7 + 3" },
      {
        input: [[5, 2, 3], 3],
        expected: 10,
        description: "Окно = весь массив",
      },
      {
        input: [[-1, -2, -3, -4], 2],
        expected: -3,
        description: "Отрицательные",
      },
      { input: [[4], 1], expected: 4, description: "k = 1" },
    ],
    solution: `function maxWindowSum(nums, k) {
  let sum = 0;
  for (let i = 0; i < k; i++) sum += nums[i];
  let maxSum = sum;
  for (let i = k; i < nums.length; i++) {
    sum += nums[i] - nums[i - k];
    maxSum = Math.max(maxSum, sum);
  }
  return maxSum;
}`,
    explanation:
      "Фиксированное окно длины k: состояние окна (сумма) обновляется за O(1) при сдвиге. Это базовая версия sliding window — в средней задаче темы окно будет переменной длины.",
    similar: ["Подмассив с суммой k (префиксные суммы)", "Среднее в окне"],
  },
  {
    id: "task-longest-unique-substring",
    topic: "sliding-window",
    topicName: "Плавающее окно",
    difficulty: "medium",
    title: "Самая длинная подстрока без повторов",
    description: `Напишите функцию \`longestUniqueSubstring(s)\`, которая возвращает ДЛИНУ самой длинной подстроки без повторяющихся символов.
**Требования:**
- \`"abcabcbb"\` → \`3\` (\`"abc"\`)
- \`"pwwkew"\` → \`3\` (\`"wke"\`)
- O(n), один проход`,
    starterCode: `function longestUniqueSubstring(s) {
// ваш код здесь
}`,
    pattern: "Плавающее окно",
    approach: {
      recognize:
        "«Самая длинная подстрока, где выполняется условие» (уникальность символов) → окно переменной длины.",
      idea: "Держим окно [left..right] и Set символов в нём. Расширяем right; если символ уже в окне — сжимаем слева, пока дубликат не уйдёт.",
      steps: [
        "left = 0, set = new Set(), best = 0",
        "for right = 0..n-1:",
        "  while set.has(s[right]): удали s[left] из set, left++",
        "  добавь s[right] в set",
        "  best = max(best, right - left + 1)",
      ],
      skeleton: `const set = new Set();
let left = 0, best = 0;
for (let right = 0; right < s.length; right++) {
  while (set.has(s[right])) {
    set.delete(s[left]);
    left++;
  }
  set.add(s[right]);
  best = Math.max(best, right - left + 1);
}`,
      complexity:
        "O(n) время (каждый символ входит и выходит один раз), O(k) память",
    },
    hints: [
      {
        text: "Держи Set символов, которые сейчас лежат в окне [left..right].",
        code: `const set = new Set();
let left = 0, best = 0;`,
      },
      {
        text: "Если s[right] уже в окне — сдвигай left и удаляй символы, пока дубликат не исчезнет.",
        code: `while (set.has(s[right])) {
  set.delete(s[left]);
  left++;
}`,
      },
      {
        text: "После добавления символа окно валидно — обнови ответ длиной окна.",
        code: `set.add(s[right]);
best = Math.max(best, right - left + 1);`,
      },
    ],
    testCases: [
      { input: ["abcabcbb"], expected: 3, description: "abc" },
      { input: ["bbbbb"], expected: 1, description: "Все одинаковые" },
      { input: ["pwwkew"], expected: 3, description: "wke" },
      { input: [""], expected: 0, description: "Пустая строка" },
    ],
    solution: `function longestUniqueSubstring(s) {
  const set = new Set();
  let left = 0;
  let best = 0;
  for (let right = 0; right < s.length; right++) {
    while (set.has(s[right])) {
      set.delete(s[left]);
      left++;
    }
    set.add(s[right]);
    best = Math.max(best, right - left + 1);
  }
  return best;
}`,
    explanation:
      "Окно переменной длины: right расширяет, left сжимает при нарушении условия. Кажется, что вложенный while даёт O(n²), но нет: каждый символ попадает в окно и выходит из него ровно один раз → суммарно O(n). LeetCode #3.",
    similar: [
      "Макс. сумма окна длины k (task-max-window-sum)",
      "Подстрока с не более чем K различными",
    ],
  },
  // ==================== 8. БАЗОВЫЕ ЗАДАЧИ (ИЗ ТОП-10) ====================
  {
    id: "task-fizz-buzz",
    topic: "basics",
    topicName: "Базовые задачи",
    difficulty: "easy",
    title: "FizzBuzz",
    description: `Напишите функцию \`fizzBuzz(n)\`, которая возвращает массив строк от 1 до \`n\` по правилам:
**Требования:**
- Число делится на 3 → \`"Fizz"\`
- Число делится на 5 → \`"Buzz"\`
- Делится и на 3, и на 5 → \`"FizzBuzz"\`
- Иначе → строковое представление числа
- \`fizzBuzz(5)\` → \`["1", "2", "Fizz", "4", "Buzz"]\``,
    starterCode: `function fizzBuzz(n) {
// ваш код здесь
}`,
    pattern: "Условия и циклы",
    approach: {
      recognize:
        "Классическая разминочная задача на проверку базового владения языком. Если её не решают за 2 минуты — это красный флаг для интервьюера.",
      idea: "Цикл от 1 до n. КЛЮЧЕВОЙ момент: сначала проверяем делимость на 15 (и на 3, и на 5), иначе условие `n % 3 === 0` перехватит FizzBuzz раньше.",
      steps: [
        "Создай пустой массив result",
        "for (let i = 1; i <= n; i++)",
        "  если i % 15 === 0 → push('FizzBuzz')",
        "  иначе если i % 3 === 0 → push('Fizz')",
        "  иначе если i % 5 === 0 → push('Buzz')",
        "  иначе → push(String(i))",
      ],
      skeleton: `const res = [];
for (let i = 1; i <= n; i++) {
  if (i % 15 === 0) res.push("FizzBuzz");
  else if (i % 3 === 0) res.push("Fizz");
  else if (i % 5 === 0) res.push("Buzz");
  else res.push(String(i));
}
return res;`,
      complexity: "O(n) время, O(n) память",
    },
    hints: [
      {
        text: "Главная ловушка: проверяй ДЕЛИМОСТЬ НА 15 первой. Если сначала проверишь %3, число 15 попадёт в 'Fizz', а не в 'FizzBuzz'.",
        code: `if (i % 15 === 0) res.push("FizzBuzz");
else if (i % 3 === 0) res.push("Fizz");
else if (i % 5 === 0) res.push("Buzz");`,
      },
      {
        text: "Альтернатива без %15: складывай строки Fizz + Buzz, если обе проверки прошли.",
        code: `let s = "";
if (i % 3 === 0) s += "Fizz";
if (i % 5 === 0) s += "Buzz";
res.push(s || String(i));`,
      },
    ],
    testCases: [
      {
        input: [5],
        expected: ["1", "2", "Fizz", "4", "Buzz"],
        description: "n = 5",
      },
      {
        input: [15],
        expected: [
          "1",
          "2",
          "Fizz",
          "4",
          "Buzz",
          "Fizz",
          "7",
          "8",
          "Fizz",
          "Buzz",
          "11",
          "Fizz",
          "13",
          "14",
          "FizzBuzz",
        ],
        description: "n = 15 (есть FizzBuzz)",
      },
      { input: [1], expected: ["1"], description: "n = 1" },
      { input: [3], expected: ["1", "2", "Fizz"], description: "n = 3" },
    ],
    solution: `function fizzBuzz(n) {
  const res = [];
  for (let i = 1; i <= n; i++) {
    if (i % 15 === 0) res.push("FizzBuzz");
    else if (i % 3 === 0) res.push("Fizz");
    else if (i % 5 === 0) res.push("Buzz");
    else res.push(String(i));
  }
  return res;
}`,
    explanation:
      "FizzBuzz — задача-фильтр на собеседованиях. По статистике, ~60% кандидатов с CS-образованием не могут её решить сходу. Варианты усложнения:FizzBuzz до 100 без if (через объект {3:'Fizz', 5:'Buzz'}), FizzBuzz как генератор, обобщённый FizzBuzz для произвольных делителей.",
    similar: ["Fibonacci (task-fibonacci)", "Два указателя — базовые циклы"],
  },

  {
    id: "task-fibonacci",
    topic: "dp",
    topicName: "Динамическое программирование",
    difficulty: "easy",
    title: "Числа Фибоначчи",
    description: `Напишите функцию \`fib(n)\`, которая возвращает n-е число Фибоначчи.
**Требования:**
- \`fib(0) = 0\`, \`fib(1) = 1\`
- \`fib(n) = fib(n-1) + fib(n-2)\` для n >= 2
- \`fib(5)\` → \`5\`
- Должна работать быстро для \`n = 40\` (без экспоненциальной рекурсии)`,
    starterCode: `function fib(n) {
// ваш код здесь
}`,
    pattern: "Динамическое программирование",
    approach: {
      recognize:
        "Задача выражается через меньшие версии самой себя + перекрывающиеся подзадачи. fib(5) считает fib(3) дважды, fib(4) считает fib(3) ещё раз.",
      idea: "Наивная рекурсия fib(n) = fib(n-1) + fib(n-2) даёт O(2^n) — уже на fib(40) зависнет. ДП: считаем по очереди от 0 до n, запоминая только 2 последних значения. Это O(n) время и O(1) память.",
      steps: [
        "Базовые случаи: n === 0 → 0, n === 1 → 1",
        "Заведи две переменные: a = 0 (fib(0)), b = 1 (fib(1))",
        "for i = 2 .. n: [a, b] = [b, a + b]",
        "Верни b",
      ],
      skeleton: `if (n <= 1) return n;
let a = 0, b = 1;
for (let i = 2; i <= n; i++) {
  [a, b] = [b, a + b];
}
return b;`,
      complexity: "O(n) время, O(1) память (или O(n) если хранить весь массив)",
    },
    hints: [
      {
        text: "Наивная рекурсия `return fib(n-1) + fib(n-2)` даёт O(2^n). fib(40) будет считаться секунды. Нужен итеративный подход.",
        code: `// ПЛОХО:
// function fib(n) {
//   if (n < 2) return n;
//   return fib(n-1) + fib(n-2);
// }`,
      },
      {
        text: "Храни только два последних значения — этого достаточно, чтобы вычислить следующее.",
        code: `let a = 0, b = 1;
for (let i = 2; i <= n; i++) {
  const next = a + b;
  a = b;
  b = next;
}`,
      },
      {
        text: "Или ещё короче через деструктуризацию: меняй обе переменные за одну строку.",
        code: `[a, b] = [b, a + b];`,
      },
    ],
    testCases: [
      { input: [0], expected: 0, description: "fib(0)" },
      { input: [1], expected: 1, description: "fib(1)" },
      { input: [2], expected: 1, description: "fib(2)" },
      { input: [5], expected: 5, description: "fib(5) = 0,1,1,2,3,5" },
      { input: [10], expected: 55, description: "fib(10)" },
      { input: [20], expected: 6765, description: "fib(20)" },
    ],
    solution: `function fib(n) {
  if (n <= 1) return n;
  let a = 0;
  let b = 1;
  for (let i = 2; i <= n; i++) {
    [a, b] = [b, a + b];
  }
  return b;
}`,
    explanation:
      "Фибоначчи — вводная задача в ДП. Три варианта решения: (1) наивная рекурсия O(2^n) — не используй, (2) мемоизация сверху вниз O(n) память O(n), (3) итеративный bottom-up O(n) время O(1) память — оптимум. Тот же паттерн работает в задачах «лесенка», «количество способов добраться», «покраска заббора».",
    similar: ["Лестница (climbing stairs)", "Максимальный подмассив — Kadane"],
  },

  {
    id: "task-merge-sort",
    topic: "algorithms",
    topicName: "Алгоритмы и сортировки",
    difficulty: "medium",
    title: "Сортировка слиянием (Merge Sort)",
    description: `Реализуйте алгоритм сортировки слиянием \`mergeSort(arr)\`.
**Требования:**
- Использовать принцип «разделяй и властвуй» (НЕ \`arr.sort()\`)
- Гарантированная сложность O(n log n)
- Стабильная сортировка (равные элементы сохраняют относительный порядок)
- \`[38, 27, 43, 3, 9, 82, 10]\` → \`[3, 9, 10, 27, 38, 43, 82]\``,
    starterCode: `function mergeSort(arr) {
// ваш код здесь
}`,
    pattern: "Разделяй и властвуй",
    approach: {
      recognize:
        "Нужна стабильная сортировка с гарантированной O(n log n) (у quicksort худший случай O(n²)). Или явно просят «реализовать merge sort».",
      idea: "Делим массив пополам, пока не останутся куски длины 1 (они уже отсортированы). Затем РЕКУРСИВНО сливаем соседние отсортированные половины, сравнивая элементы по очереди.",
      steps: [
        "Базовый случай: if (arr.length <= 1) return arr",
        "Найди середину mid, разрежь на left и right",
        "Рекурсивно отсортируй left и right",
        "Слей два отсортированных массива в один (функция merge)",
        "В merge: два указателя на начало каждого массива, меньший элемент кладём в результат",
      ],
      skeleton: `function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  return merge(left, right);
}

function merge(left, right) {
  const res = [];
  let i = 0, j = 0;
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) res.push(left[i++]);
    else res.push(right[j++]);
  }
  // докидываем хвост
  while (i < left.length) res.push(left[i++]);
  while (j < right.length) res.push(right[j++]);
  return res;
}`,
      complexity: "O(n log n) всегда, O(n) памяти на временные массивы",
    },
    hints: [
      {
        text: "Два этапа: (1) разрезать массив пополам рекурсивно, (2) слить две отсортированные половины.",
        code: `const mid = Math.floor(arr.length / 2);
const left  = mergeSort(arr.slice(0, mid));
const right = mergeSort(arr.slice(mid));
return merge(left, right);`,
      },
      {
        text: "Функция merge: два указателя на началах двух отсортированных массивов, берём меньший.",
        code: `function merge(left, right) {
  const res = [];
  let i = 0, j = 0;
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) res.push(left[i++]);
    else res.push(right[j++]);
  }
  // добавить остаток
  return res.concat(left.slice(i)).concat(right.slice(j));
}`,
      },
      {
        text: "Базовый случай рекурсии: массив длины 0 или 1 уже отсортирован.",
        code: `if (arr.length <= 1) return arr;`,
      },
    ],
    testCases: [
      {
        input: [[38, 27, 43, 3, 9, 82, 10]],
        expected: [3, 9, 10, 27, 38, 43, 82],
        description: "Классический пример",
      },
      {
        input: [[5, 4, 3, 2, 1]],
        expected: [1, 2, 3, 4, 5],
        description: "Обратный порядок",
      },
      { input: [[1]], expected: [1], description: "Один элемент" },
      { input: [[]], expected: [], description: "Пустой массив" },
      {
        input: [[2, 2, 2, 2]],
        expected: [2, 2, 2, 2],
        description: "Одинаковые элементы",
      },
    ],
    solution: `function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  return merge(left, right);
}

function merge(left, right) {
  const res = [];
  let i = 0;
  let j = 0;
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      res.push(left[i++]);
    } else {
      res.push(right[j++]);
    }
  }
  while (i < left.length) res.push(left[i++]);
  while (j < right.length) res.push(right[j++]);
  return res;
}`,
    explanation:
      "Merge Sort — классика «разделяй и властвуй». Гарантированные O(n log n) в любом случае (в отличие от quicksort), стабильная сортировка. Минус — O(n) дополнительной памяти. Используется для сортировки связных списков (там слияние in-place), внешних сортировок (огромные файлы на диске), и является базой для TimSort (Python, Java).",
    similar: ["Quick Sort (task-quick-sort)", "Бинарный поиск"],
  },

  // ==================== 9. ХЭШ-ТАБЛИЦЫ ====================
  {
    id: "task-first-unique-char",
    topic: "hash-tables",
    topicName: "Хэш-таблицы",
    difficulty: "easy",
    title: "Первый уникальный символ",
    description: `Напишите функцию \`firstUniqueChar(s)\`, которая возвращает индекс первого символа, встречающегося в строке ровно один раз.
**Требования:**
- Если уникального символа нет, вернуть \`-1\`
- \`"leetcode"\` → \`0\` (символ \`'l'\`)
- \`"loveleetcode"\` → \`2\` (символ \`'v'\`)
- O(n) по времени`,
    starterCode: `function firstUniqueChar(s) {
// ваш код здесь
}`,
    pattern: "Хэш-таблицы",
    approach: {
      recognize:
        "Нужно узнать, сколько раз встречается каждый символ, и потом найти первый с count === 1. Подсчёт частот = хэш-таблица.",
      idea: "Два прохода: (1) считаем частоту каждого символа в Map/объекте, (2) идём по строке слева направо и возвращаем индекс первого символа с count === 1.",
      steps: [
        "Создай Map (или объект) count",
        "Первый проход по строке: count[ch]++",
        "Второй проход по строке с индексом i: если count[s[i]] === 1 → вернуть i",
        "Если не нашли — вернуть -1",
      ],
      skeleton: `const count = new Map();
for (const ch of s) {
  count.set(ch, (count.get(ch) ?? 0) + 1);
}
for (let i = 0; i < s.length; i++) {
  if (count.get(s[i]) === 1) return i;
}
return -1;`,
      complexity:
        "O(n) время (2 прохода), O(k) память где k = размер алфавита (константа для ASCII)",
    },
    hints: [
      {
        text: "Первый проход: посчитай, сколько раз встречается каждый символ. Map лучше объекта — не путается с унаследованными свойствами.",
        code: `const count = new Map();
for (const ch of s) {
  count.set(ch, (count.get(ch) ?? 0) + 1);
}`,
      },
      {
        text: "Второй проход по строке с ИНДЕКСОМ. Первый символ с count === 1 и есть ответ.",
        code: `for (let i = 0; i < s.length; i++) {
  if (count.get(s[i]) === 1) return i;
}
return -1;`,
      },
    ],
    testCases: [
      {
        input: ["leetcode"],
        expected: 0,
        description: "'l' — первый уникальный",
      },
      { input: ["loveleetcode"], expected: 2, description: "'v' на позиции 2" },
      { input: ["aabb"], expected: -1, description: "Нет уникального" },
      { input: [""], expected: -1, description: "Пустая строка" },
      { input: ["abc"], expected: 0, description: "Все уникальны" },
    ],
    solution: `function firstUniqueChar(s) {
  const count = new Map();
  for (const ch of s) {
    count.set(ch, (count.get(ch) ?? 0) + 1);
  }
  for (let i = 0; i < s.length; i++) {
    if (count.get(s[i]) === 1) return i;
  }
  return -1;
}`,
    explanation:
      "Два прохода — классический приём для задач «найди первый/последний элемент с таким-то свойством». Можно оптимизировать до одного прохода, храня Map<символ → индекс первого появления> и помечая повторения как -1, но двухпроходный вариант читается проще. LeetCode #387.",
    similar: [
      "Пересечение массивов (task-array-intersection)",
      "Two Sum (task-two-sum)",
    ],
  },

  {
    id: "task-array-intersection",
    topic: "hash-tables",
    topicName: "Хэш-таблицы",
    difficulty: "medium",
    title: "Пересечение двух массивов",
    description: `Даны два массива \`nums1\` и \`nums2\`. Верните массив их пересечения.
**Требования:**
- Каждый элемент в результате должен встречаться столько раз, сколько он встречается в ОБА массивах (с учётом кратности)
- Порядок в результате не важен
- \`[1,2,2,1], [2,2]\` → \`[2,2]\`
- \`[4,9,5], [9,4,9,8,4]\` → \`[4,9]\` (или \`[9,4]\`)`,
    starterCode: `function intersect(nums1, nums2) {
// ваш код здесь
}`,
    pattern: "Хэш-таблицы",
    approach: {
      recognize:
        "Нужно учесть КРАТНОСТЬ: элемент должен появиться в ответе столько раз, сколько он есть в обоих массивах. Это задача на частотный счётчик.",
      idea: "Посчитай частоты элементов ОДНОГО массива (желательно меньшего). Проходя по второму массиву, если элемент есть в счётчике с count > 0 — добавляем в результат и декрементируем счётчик.",
      steps: [
        "Создай Map со счётчиком для nums1",
        "Для каждого x в nums2:",
        "  если count.get(x) > 0 → добавь x в результат и count.set(x, count.get(x) - 1)",
        "Верни результат",
      ],
      skeleton: `const count = new Map();
for (const x of nums1) {
  count.set(x, (count.get(x) ?? 0) + 1);
}
const res = [];
for (const x of nums2) {
  const c = count.get(x);
  if (c > 0) {
    res.push(x);
    count.set(x, c - 1);
  }
}
return res;`,
      complexity: "O(n + m) время, O(min(n, m)) память",
    },
    hints: [
      {
        text: "Посчитай, сколько раз каждый элемент встречается в nums1 (Map<число, количество>).",
        code: `const count = new Map();
for (const x of nums1) {
  count.set(x, (count.get(x) ?? 0) + 1);
}`,
      },
      {
        text: "Теперь пройдись по nums2: если элемент есть в счётчике и count > 0 — бери его и уменьшай счётчик.",
        code: `for (const x of nums2) {
  const c = count.get(x);
  if (c > 0) {
    res.push(x);
    count.set(x, c - 1);
  }
}`,
      },
      {
        text: "Оптимизация: счётчик строить по МЕНЬШЕМУ массиву, чтобы экономить память.",
        code: `const [small, big] = nums1.length < nums2.length 
  ? [nums1, nums2] 
  : [nums2, nums1];`,
      },
    ],
    testCases: [
      {
        input: [
          [1, 2, 2, 1],
          [2, 2],
        ],
        expected: [2, 2],
        description: "Классический пример",
      },
      {
        input: [
          [4, 9, 5],
          [9, 4, 9, 8, 4],
        ],
        expected: [4, 9],
        description: "Без учёта лишнего",
      },
      {
        input: [
          [1, 2, 3],
          [4, 5, 6],
        ],
        expected: [],
        description: "Нет пересечения",
      },
      {
        input: [
          [1, 1, 1],
          [1, 1],
        ],
        expected: [1, 1],
        description: "Кратность",
      },
    ],
    solution: `function intersect(nums1, nums2) {
  // строим счётчик по меньшему массиву
  const [small, big] = nums1.length < nums2.length ? [nums1, nums2] : [nums2, nums1];
  const count = new Map();
  for (const x of small) {
    count.set(x, (count.get(x) ?? 0) + 1);
  }
  const res = [];
  for (const x of big) {
    const c = count.get(x);
    if (c > 0) {
      res.push(x);
      count.set(x, c - 1);
    }
  }
  return res;
}`,
    explanation:
      "Ключ — декремент счётчика: он гарантирует, что элемент попадёт в ответ не больше раз, чем есть в обоих массивах. Если массивы ОТСОРТИРОВАНЫ, можно решить за O(1) памяти двумя указателями. Если один массив огромный и не влезает в RAM (на диске), а второй маленький — хэш по маленькому и сканируем большой. LeetCode #350.",
    similar: [
      "Первый уникальный символ (task-first-unique-char)",
      "Two Sum (task-two-sum)",
    ],
  },

  // ==================== 10. ТОЧКИ И ОТРЕЗКИ ====================
  {
    id: "task-merge-intervals",
    topic: "intervals",
    topicName: "Точки и отрезки",
    difficulty: "medium",
    title: "Слияние интервалов",
    description: `Дан массив интервалов \`intervals\`, где \`intervals[i] = [start_i, end_i]\`. Слейте все пересекающиеся интервалы.
**Требования:**
- Вернуть массив непересекающихся интервалов
- \`[[1,3],[2,6],[8,10],[15,18]]\` → \`[[1,6],[8,10],[15,18]]\` (т.к. [1,3] и [2,6] пересекаются)
- \`[[1,4],[4,5]]\` → \`[[1,5]]\` (считаются пересекающимися)`,
    starterCode: `function merge(intervals) {
// ваш код здесь
}`,
    pattern: "Точки и отрезки",
    approach: {
      recognize:
        "Слияние/пересечение интервалов. Почти всегда: СОРТИРОВКА по start + жадный проход по соседям.",
      idea: "Отсортируй по началу интервала. После этого пересекающиеся интервалы ОБЯЗАТЕЛЬНО идут подряд. Иди по отсортированным, сравнивай каждый с последним в результате: если пересекается — расширяй end, иначе добавляй как новый.",
      steps: [
        "Отсортируй intervals по start (a[0] - b[0])",
        "Создай result с первым интервалом",
        "Для каждого следующего interval:",
        "  пусть last = result[result.length - 1]",
        "  если interval.start <= last.end → last.end = max(last.end, interval.end)",
        "  иначе → result.push(interval)",
      ],
      skeleton: `intervals.sort((a, b) => a[0] - b[0]);
const res = [intervals[0]];
for (let i = 1; i < intervals.length; i++) {
  const cur = intervals[i];
  const last = res[res.length - 1];
  if (cur[0] <= last[1]) {
    last[1] = Math.max(last[1], cur[1]);
  } else {
    res.push(cur);
  }
}
return res;`,
      complexity: "O(n log n) время (сортировка), O(n) память для результата",
    },
    hints: [
      {
        text: "Сначала отсортируй интервалы по началу. После этого все пересекающиеся будут рядом.",
        code: `intervals.sort((a, b) => a[0] - b[0]);`,
      },
      {
        text: "Заведи результат с первым интервалом. Дальше сравнивай КАЖДЫЙ следующий с последним в результате.",
        code: `const res = [intervals[0]];
for (let i = 1; i < intervals.length; i++) {
  const cur = intervals[i];
  const last = res[res.length - 1];
  // ...
}`,
      },
      {
        text: "Пересечение: если начало нового <= конец последнего в результате, расширяй последний.",
        code: `if (cur[0] <= last[1]) {
  last[1] = Math.max(last[1], cur[1]);
} else {
  res.push(cur);
}`,
      },
    ],
    testCases: [
      {
        input: [
          [
            [1, 3],
            [2, 6],
            [8, 10],
            [15, 18],
          ],
        ],
        expected: [
          [1, 6],
          [8, 10],
          [15, 18],
        ],
        description: "Базовый пример",
      },
      {
        input: [
          [
            [1, 4],
            [4, 5],
          ],
        ],
        expected: [[1, 5]],
        description: "Граничное пересечение",
      },
      {
        input: [
          [
            [1, 4],
            [0, 4],
          ],
        ],
        expected: [[0, 4]],
        description: "Начало в другом порядке",
      },
      {
        input: [
          [
            [1, 4],
            [2, 3],
          ],
        ],
        expected: [[1, 4]],
        description: "Один внутри другого",
      },
      { input: [[[1, 2]]], expected: [[1, 2]], description: "Один интервал" },
    ],
    solution: `function merge(intervals) {
  if (intervals.length === 0) return [];
  intervals.sort((a, b) => a[0] - b[0]);
  const res = [intervals[0]];
  for (let i = 1; i < intervals.length; i++) {
    const cur = intervals[i];
    const last = res[res.length - 1];
    if (cur[0] <= last[1]) {
      last[1] = Math.max(last[1], cur[1]);
    } else {
      res.push(cur);
    }
  }
  return res;
}`,
    explanation:
      "Паттерн «sort + greedy pass» работает в 90% задач на интервалы. Причина, почему сортировка помогает: после неё любой интервал, пересекающийся с текущим, находится в «хвосте» уже просмотренных — достаточно сравнивать с последним в результате. LeetCode #56. Похожие: Insert Interval, Meeting Rooms II, Employee Free Time.",
    similar: [
      "Можно ли посетить все встречи (task-can-attend-meetings)",
      "Insert Interval",
    ],
  },

  {
    id: "task-can-attend-meetings",
    topic: "intervals",
    topicName: "Точки и отрезки",
    difficulty: "easy",
    title: "Можно ли посетить все встречи",
    description: `Дан массив интервалов \`intervals\`, где \`intervals[i] = [start, end]\` — время начала и конца встречи.
Можно ли посетить все встречи (ни одна пара не пересекается)?
**Требования:**
- \`[[0,30],[5,10],[15,20]]\` → \`false\` (первая пересекается со второй)
- \`[[7,10],[2,4]]\` → \`true\` (пересечений нет)`,
    starterCode: `function canAttendMeetings(intervals) {
// ваш код здесь
}`,
    pattern: "Точки и отрезки",
    approach: {
      recognize:
        "Проверка отсутствия пересечений между интервалами. Это упрощённая версия merge intervals: не надо сливать, только детектировать.",
      idea: "Отсортируй по start. Если у любого интервала start < end предыдущего — есть пересечение. Проход один.",
      steps: [
        "Отсортируй intervals по start",
        "for i = 1 .. n-1:",
        "  если intervals[i][0] < intervals[i-1][1] → return false",
        "return true",
      ],
      skeleton: `intervals.sort((a, b) => a[0] - b[0]);
for (let i = 1; i < intervals.length; i++) {
  if (intervals[i][0] < intervals[i - 1][1]) {
    return false;
  }
}
return true;`,
      complexity:
        "O(n log n) время из-за сортировки, O(1) памяти (или O(n) если sort мутирует и нужна копия)",
    },
    hints: [
      {
        text: "Отсортируй по start — все потенциальные пересечения окажутся между соседями.",
        code: `intervals.sort((a, b) => a[0] - b[0]);`,
      },
      {
        text: "Если начало текущего интервала МЕНЬШЕ конца предыдущего — пересечение есть.",
        code: `for (let i = 1; i < intervals.length; i++) {
  if (intervals[i][0] < intervals[i - 1][1]) return false;
}`,
      },
    ],
    testCases: [
      {
        input: [
          [
            [0, 30],
            [5, 10],
            [15, 20],
          ],
        ],
        expected: false,
        description: "Пересечение",
      },
      {
        input: [
          [
            [7, 10],
            [2, 4],
          ],
        ],
        expected: true,
        description: "Без пересечений",
      },
      {
        input: [
          [
            [1, 2],
            [2, 3],
          ],
        ],
        expected: true,
        description: "Стык в точку — ок",
      },
      {
        input: [
          [
            [1, 5],
            [1, 5],
          ],
        ],
        expected: false,
        description: "Полное совпадение",
      },
      { input: [[]], expected: true, description: "Пустой массив" },
      { input: [[[1, 5]]], expected: true, description: "Одна встреча" },
    ],
    solution: `function canAttendMeetings(intervals) {
  if (intervals.length <= 1) return true;
  intervals.sort((a, b) => a[0] - b[0]);
  for (let i = 1; i < intervals.length; i++) {
    if (intervals[i][0] < intervals[i - 1][1]) {
      return false;
    }
  }
  return true;
}`,
    explanation:
      "Простейший паттерн на интервалы. После сортировки по началу достаточно сравнивать только соседей. Важный нюанс: если в задаче «стык в точку» считается пересечением (как тут обычно), используем <. Если нужно «не раньше конца предыдущей» — ставь <=. LeetCode #252 (premium).",
    similar: ["Слияние интервалов (task-merge-intervals)", "Meeting Rooms II"],
  },

  // ==================== 11. ЧТО БЫЛО В НАЧАЛЕ ====================
  {
    id: "task-restore-from-prefix-sum",
    topic: "reverse-engineering",
    topicName: "Что было в начале",
    difficulty: "easy",
    title: "Восстановить массив из префиксных сумм",
    description: `Дан массив \`pref\` длины \`n\`, где \`pref[i] = arr[0] + arr[1] + ... + arr[i]\` — префиксные суммы некоторого массива \`arr\`.
Восстановите исходный массив \`arr\`.
**Требования:**
- \`[1, 3, 6, 10]\` → \`[1, 2, 3, 4]\` (т.к. 1=1, 1+2=3, 1+2+3=6, 1+2+3+4=10)
- \`[5]\` → \`[5]\`
- O(n) время`,
    starterCode: `function restoreArray(pref) {
// ваш код здесь
}`,
    pattern: "Что было в начале",
    approach: {
      recognize:
        "Дан РЕЗУЛЬТАТ преобразования (префиксные суммы). Нужно восстановить ИСХОДНИК. Ищи связь между соседними элементами.",
      idea: "Запишем формулы: pref[0] = arr[0], pref[1] = arr[0]+arr[1], pref[2] = arr[0]+arr[1]+arr[2]. Видно, что arr[i] = pref[i] - pref[i-1] для i > 0. Первый элемент равен pref[0].",
      steps: [
        "arr[0] = pref[0]",
        "Для i = 1 .. n-1: arr[i] = pref[i] - pref[i-1]",
        "Вернуть arr",
      ],
      skeleton: `const arr = new Array(pref.length);
arr[0] = pref[0];
for (let i = 1; i < pref.length; i++) {
  arr[i] = pref[i] - pref[i - 1];
}
return arr;`,
      complexity:
        "O(n) время, O(n) память (или O(1) доп., если менять pref на месте)",
    },
    hints: [
      {
        text: "Первый элемент известен напрямую: arr[0] = pref[0].",
        code: `const arr = [pref[0]];`,
      },
      {
        text: "Для остальных: pref[i] содержит сумму первых i+1 элементов, а pref[i-1] — сумму первых i. Разность и есть arr[i].",
        code: `for (let i = 1; i < pref.length; i++) {
  arr.push(pref[i] - pref[i - 1]);
}`,
      },
    ],
    testCases: [
      {
        input: [[1, 3, 6, 10]],
        expected: [1, 2, 3, 4],
        description: "Базовый пример",
      },
      { input: [[5]], expected: [5], description: "Один элемент" },
      { input: [[0, 0, 0]], expected: [0, 0, 0], description: "Нули" },
      {
        input: [[10, 5, 3]],
        expected: [10, -5, -2],
        description: "Отрицательные элементы",
      },
    ],
    solution: `function restoreArray(pref) {
  const arr = new Array(pref.length);
  arr[0] = pref[0];
  for (let i = 1; i < pref.length; i++) {
    arr[i] = pref[i] - pref[i - 1];
  }
  return arr;
}`,
    explanation:
      "Паттерн «обратная операция»: если преобразование было 'накопительным' (сумма), то обратное — разность соседних. Тот же приём работает для префиксного XOR (обратная операция — тоже XOR), произведений (/), и т.д. LeetCode #2433.",
    similar: [
      "Декодирование XOR (task-decode-xor)",
      "Префиксные суммы: сумма на отрезке",
    ],
  },

  {
    id: "task-decode-xor",
    topic: "reverse-engineering",
    topicName: "Что было в начале",
    difficulty: "medium",
    title: "Декодирование XOR-массива",
    description: `Дан массив \`encoded\` длины \`n - 1\` и первый элемент \`first\`.
Массив \`encoded\` получен из исходного массива \`arr\` длины \`n\` по правилу:
\`encoded[i] = arr[i] XOR arr[i + 1]\`
Известно, что \`arr[0] = first\`. Восстановите массив \`arr\`.
**Требования:**
- \`encoded = [1,2,3], first = 1\` → \`[1, 0, 2, 1]\`
  (проверка: 1 XOR 0 = 1, 0 XOR 2 = 2, 2 XOR 1 = 3)
- O(n) время`,
    starterCode: `function decode(encoded, first) {
// ваш код здесь
}`,
    pattern: "Что было в начале",
    approach: {
      recognize:
        "Дан результат попарного XOR соседних элементов + первый элемент. Задача «восстанови исходник».",
      idea: "Свойство XOR: если a XOR b = c, то a XOR c = b и b XOR c = a (XOR — своя же обратная операция). Значит: arr[i+1] = arr[i] XOR encoded[i]. Зная arr[0], по цепочке восстановим весь массив.",
      steps: [
        "arr[0] = first",
        "Для i = 0 .. n-2:",
        "  arr[i + 1] = arr[i] XOR encoded[i]",
        "Вернуть arr",
      ],
      skeleton: `const arr = [first];
for (let i = 0; i < encoded.length; i++) {
  arr.push(arr[i] ^ encoded[i]);
}
return arr;`,
      complexity: "O(n) время, O(n) память",
    },
    hints: [
      {
        text: "Ключевое свойство XOR: a ^ b = c ⟹ a ^ c = b. XOR — обратная операция к самому себе.",
        code: `// если encoded[i] = arr[i] ^ arr[i+1]
// то arr[i+1] = arr[i] ^ encoded[i]`,
      },
      {
        text: "Зная arr[0] = first, восстанавливаем цепочкой: каждый следующий элемент через предыдущий.",
        code: `const arr = [first];
for (let i = 0; i < encoded.length; i++) {
  arr.push(arr[i] ^ encoded[i]);
}`,
      },
      {
        text: "Оператор XOR в JavaScript — это `^` (циркумфлекс).",
        code: `const next = prev ^ encoded[i];`,
      },
    ],
    testCases: [
      {
        input: [[1, 2, 3], 1],
        expected: [1, 0, 2, 1],
        description: "Базовый пример",
      },
      {
        input: [[6, 2, 7, 3], 4],
        expected: [4, 2, 0, 7, 4],
        description: "Длинный массив",
      },
      { input: [[0], 5], expected: [5, 5], description: "Один элемент" },
    ],
    solution: `function decode(encoded, first) {
  const arr = new Array(encoded.length + 1);
  arr[0] = first;
  for (let i = 0; i < encoded.length; i++) {
    arr[i + 1] = arr[i] ^ encoded[i];
  }
  return arr;
}`,
    explanation:
      "XOR — удивительная операция: a ^ a = 0 (аннигиляция), a ^ 0 = a (нейтральный), a ^ b = b ^ a (коммутативность), и главное — (a ^ b) ^ b = a. Именно последнее свойство делает задачу решаемой: мы просто «отменяем» XOR. Тот же принцип в криптографии, контрольных суммах, swap без временной переменной. LeetCode #1720.",
    similar: [
      "Восстановить массив из префиксных сумм (task-restore-from-prefix-sum)",
    ],
  },
  // ==================== 12. СТЕК ====================
  {
    id: "task-next-greater",
    topic: "stack",
    topicName: "Стек",
    difficulty: "easy",
    title: "Следующий больший элемент",
    description: `Дан массив чисел. Для каждого элемента найдите **первый элемент справа**, который больше него.
**Требования:**
- Вернуть массив той же длины: на позиции i — первый больший элемент справа, или \`-1\`, если такого нет
- \`[2, 1, 3, 5, 4]\` → \`[3, 3, 5, -1, -1]\`
- Реши за O(n) с помощью стека (не вложенными циклами)`,
    starterCode: `function nextGreater(arr) {
// ваш код здесь
}`,
    pattern: "Стек (монотонный)",
    approach: {
      recognize:
        "«Первый больший/меньший элемент справа/слева» — это всегда монотонный стек.",
      idea: "Идём слева направо и держим в стеке индексы элементов, для которых ответ ещё не найден. Когда приходит элемент БОЛЬШЕ вершины стека — он и есть «следующий больший» для неё: снимаем вершину и записываем ответ.",
      steps: [
        "res = массив из -1, stack = [] (храним ИНДЕКСЫ)",
        "for i = 0..n-1:",
        "  пока стек не пуст и arr[вершина] < arr[i]: res[stack.pop()] = arr[i]",
        "  stack.push(i)",
        "Элементы, оставшиеся в стеке, так и останутся с ответом -1",
      ],
      skeleton: `const res = new Array(arr.length).fill(-1);
const stack = [];
for (let i = 0; i < arr.length; i++) {
  while (stack.length && arr[stack[stack.length - 1]] < arr[i]) {
    res[stack.pop()] = arr[i];
  }
  stack.push(i);
}`,
      complexity:
        "O(n) время (каждый индекс входит и выходит из стека один раз), O(n) память",
    },
    hints: [
      {
        text: "Храни в стеке ИНДЕКСЫ элементов, для которых ответ ещё не найден.",
        code: `const res = new Array(arr.length).fill(-1);
const stack = [];`,
      },
      {
        text: "Пока текущий элемент больше вершины стека — он «убивает» вершину: это и есть её следующий больший.",
        code: `while (stack.length && arr[stack[stack.length - 1]] < arr[i]) {
  res[stack.pop()] = arr[i];
}`,
      },
      {
        text: "После «зачистки» положи текущий индекс в стек — его ответ найдётся позже (или не найдётся → останется -1).",
        code: `stack.push(i);`,
      },
    ],
    testCases: [
      {
        input: [[2, 1, 3, 5, 4]],
        expected: [3, 3, 5, -1, -1],
        description: "Базовый пример",
      },
      {
        input: [[5, 4, 3, 2, 1]],
        expected: [-1, -1, -1, -1, -1],
        description: "Убывающий массив",
      },
      {
        input: [[1, 3, 2, 4]],
        expected: [3, 4, 4, -1],
        description: "Смешанный",
      },
      { input: [[1]], expected: [-1], description: "Один элемент" },
      { input: [[]], expected: [], description: "Пустой массив" },
    ],
    solution: `function nextGreater(arr) {
  const res = new Array(arr.length).fill(-1);
  const stack = [];
  for (let i = 0; i < arr.length; i++) {
    while (stack.length && arr[stack[stack.length - 1]] < arr[i]) {
      res[stack.pop()] = arr[i];
    }
    stack.push(i);
  }
  return res;
}`,
    explanation:
      "Монотонный стек: в стеке индексы в порядке невозрастания значений. Новый элемент «закрывает» все меньшие вершины — для них он и есть первый больший справа. Кажется, что while внутри for даёт O(n²), но каждый индекс попадает в стек и выходит ровно один раз → суммарно O(n).",
    similar: [
      "Температуры (task-daily-temperatures)",
      "Валидные скобки (task-valid-parentheses)",
    ],
  },
  {
    id: "task-daily-temperatures",
    topic: "stack",
    topicName: "Стек",
    difficulty: "medium",
    title: "Температуры (Daily Temperatures)",
    description: `Дан массив температур. Для каждого дня определите, **сколько дней придётся ждать** до более тёплого дня.
**Требования:**
- \`[73, 74, 75, 71, 69, 72, 76, 73]\` → \`[1, 1, 4, 2, 1, 1, 0, 0]\`
- Если тёплого дня впереди нет — 0
- O(n) через монотонный стек`,
    starterCode: `function dailyTemperatures(temps) {
// ваш код здесь
}`,
    pattern: "Стек (монотонный)",
    approach: {
      recognize:
        "«Сколько позиций до следующего большего» — вариант «следующего большего» с расстоянием. Монотонный стек с индексами.",
      idea: "Тот же паттерн, что в nextGreater, но в ответ записываем РАЗНИЦУ ИНДЕКСОВ i - j. Поэтому в стеке обязательно храним индексы, а не значения.",
      steps: [
        "res = массив из 0, stack = []",
        "for i = 0..n-1:",
        "  пока стек не пуст и temps[вершина] < temps[i]: j = stack.pop(); res[j] = i - j",
        "  stack.push(i)",
      ],
      skeleton: `const res = new Array(temps.length).fill(0);
const stack = [];
for (let i = 0; i < temps.length; i++) {
  while (stack.length && temps[stack[stack.length - 1]] < temps[i]) {
    const j = stack.pop();
    res[j] = i - j;
  }
  stack.push(i);
}`,
      complexity: "O(n) время, O(n) память",
    },
    hints: [
      {
        text: "Это брат-близнец «следующего большего элемента», только в ответ идёт расстояние. Держи в стеке индексы.",
        code: `const stack = []; // индексы дней, для которых ответ не найден`,
      },
      {
        text: "Когда текущий день теплее вершины стека — для вершины ответ найден: разница индексов.",
        code: `while (stack.length && temps[stack[stack.length - 1]] < temps[i]) {
  const j = stack.pop();
  res[j] = i - j;
}`,
      },
      {
        text: "Дни, для которых тёплого дня так и не нашлось, останутся с нулём (изначальное значение res).",
        code: `const res = new Array(temps.length).fill(0);`,
      },
    ],
    testCases: [
      {
        input: [[73, 74, 75, 71, 69, 72, 76, 73]],
        expected: [1, 1, 4, 2, 1, 1, 0, 0],
        description: "Классика LeetCode #739",
      },
      {
        input: [[30, 40, 50, 60]],
        expected: [1, 1, 1, 0],
        description: "Возрастающий",
      },
      { input: [[30, 60, 90]], expected: [1, 1, 0], description: "Короткий" },
      { input: [[50, 40, 30]], expected: [0, 0, 0], description: "Убывающий" },
    ],
    solution: `function dailyTemperatures(temps) {
  const res = new Array(temps.length).fill(0);
  const stack = [];
  for (let i = 0; i < temps.length; i++) {
    while (stack.length && temps[stack[stack.length - 1]] < temps[i]) {
      const j = stack.pop();
      res[j] = i - j;
    }
    stack.push(i);
  }
  return res;
}`,
    explanation:
      "Монотонный стек в чистом виде. Запомни связку: «следующий больший» → стек индексов + while «пока вершина меньше текущего». Меняется только то, ЧТО записываем в ответ: значение (nextGreater) или расстояние (температуры). LeetCode #739.",
    similar: [
      "Следующий больший (task-next-greater)",
      "Стек-теория в разделе «Стек»",
    ],
  },

  // ==================== 13. ПРЕФИКСНЫЙ МАССИВ ====================
  {
    id: "task-running-sum",
    topic: "prefix-sums",
    topicName: "Префиксный массив",
    difficulty: "easy",
    title: "Накопительная сумма (Running Sum)",
    description: `Дан массив чисел. Верните массив его префиксных сумм.
**Требования:**
- \`result[i] = nums[0] + nums[1] + ... + nums[i]\`
- \`[1, 2, 3, 4]\` → \`[1, 3, 6, 10]\`
- Один проход, O(n)`,
    starterCode: `function runningSum(nums) {
// ваш код здесь
}`,
    pattern: "Префиксный массив",
    approach: {
      recognize:
        "Нужны суммы НАЧАЛ массива или суммы на отрезках — строй префиксный массив.",
      idea: "Каждая следующая префиксная сумма = предыдущая + текущий элемент. Это база, на которой строятся все задачи темы: сумма на отрезке [l..r] = prefix[r+1] - prefix[l].",
      steps: [
        "Заведи res и переменную sum = 0",
        "for i = 0..n-1: sum += nums[i]; res[i] = sum",
        "Верни res",
      ],
      skeleton: `const res = new Array(nums.length);
let sum = 0;
for (let i = 0; i < nums.length; i++) {
  sum += nums[i];
  res[i] = sum;
}`,
      complexity: "O(n) время, O(n) память на результат",
    },
    hints: [
      {
        text: "Не пересчитывай сумму с нуля на каждом шаге: новая сумма = старая + текущий элемент.",
        code: `sum += nums[i];
res[i] = sum;`,
      },
    ],
    testCases: [
      {
        input: [[1, 2, 3, 4]],
        expected: [1, 3, 6, 10],
        description: "Базовый",
      },
      {
        input: [[1, 1, 1, 1, 1]],
        expected: [1, 2, 3, 4, 5],
        description: "Единицы",
      },
      { input: [[-1, 1]], expected: [-1, 0], description: "Отрицательные" },
      { input: [[5]], expected: [5], description: "Один элемент" },
    ],
    solution: `function runningSum(nums) {
  const res = new Array(nums.length);
  let sum = 0;
  for (let i = 0; i < nums.length; i++) {
    sum += nums[i];
    res[i] = sum;
  }
  return res;
}`,
    explanation:
      "Простейшее построение префиксного массива. Запомни сдвиг индексов в «взрослой» версии: prefix[0] = 0 и prefix[i+1] = prefix[i] + nums[i] — тогда сумма отрезка [l..r] считается как prefix[r+1] - prefix[l] без граничных случаев. LeetCode #1480.",
    similar: [
      "Подмассив с суммой k (task-subarray-sum-k)",
      "Восстановить из префиксных сумм (task-restore-from-prefix-sum)",
    ],
  },
  {
    id: "task-subarray-sum-k",
    topic: "prefix-sums",
    topicName: "Префиксный массив",
    difficulty: "medium",
    title: "Подмассив с суммой k",
    description: `Дан массив чисел \`nums\` и число \`k\`. Верните **количество** непрерывных подмассивов, сумма которых равна \`k\`.
**Требования:**
- \`[1, 1, 1], k = 2\` → \`2\`
- \`[1, 2, 3], k = 3\` → \`2\`
- Числа могут быть отрицательными — скользящее окно НЕ работает, нужен префикс + хэш`,
    starterCode: `function subarraySum(nums, k) {
// ваш код здесь
}`,
    pattern: "Префиксный массив + хэш-таблица",
    approach: {
      recognize:
        "«Количество подмассивов с суммой k» + есть отрицательные числа → префиксные суммы + Map. Окно не подойдёт: нет монотонности.",
      idea: "Сумма подмассива (i..j] = prefix[j] - prefix[i]. Значит, нужен такой prefix[i], что prefix[i] = prefix[j] - k. Идя по массиву, считаем префикс и спрашиваем у Map: сколько раз раньше встречался префикс (prefix - k)?",
      steps: [
        "Map: префикс → сколько раз встречался. Сразу положи map.set(0, 1) (пустой префикс)",
        "prefix = 0, count = 0",
        "Для каждого x: prefix += x",
        "  count += map.get(prefix - k) ?? 0",
        "  map.set(prefix, (map.get(prefix) ?? 0) + 1)",
      ],
      skeleton: `const map = new Map();
map.set(0, 1); // пустой префикс
let prefix = 0, count = 0;
for (const x of nums) {
  prefix += x;
  count += map.get(prefix - k) ?? 0;
  map.set(prefix, (map.get(prefix) ?? 0) + 1);
}`,
      complexity: "O(n) время, O(n) память",
    },
    hints: [
      {
        text: "Сумма подмассива — это разность двух префиксов. Тебе нужен ранее встреченный префикс, равный (текущий префикс − k).",
        code: `count += map.get(prefix - k) ?? 0;`,
      },
      {
        text: "Обязательно положи map.set(0, 1) ДО цикла — иначе потеряешь подмассивы, начинающиеся с индекса 0.",
        code: `const map = new Map();
map.set(0, 1);`,
      },
      {
        text: "СНАЧАЛА считаем count, ПОТОМ добавляем текущий префикс в Map (иначе посчитаешь сам себя).",
        code: `count += map.get(prefix - k) ?? 0;
map.set(prefix, (map.get(prefix) ?? 0) + 1);`,
      },
    ],
    testCases: [
      { input: [[1, 1, 1], 2], expected: 2, description: "Два подмассива" },
      { input: [[1, 2, 3], 3], expected: 2, description: "[1,2] и [3]" },
      {
        input: [[1, -1, 0], 0],
        expected: 3,
        description: "[1,-1], [1,-1,0], [0]",
      },
      { input: [[5], 5], expected: 1, description: "Весь массив" },
    ],
    solution: `function subarraySum(nums, k) {
  const map = new Map();
  map.set(0, 1);
  let prefix = 0;
  let count = 0;
  for (const x of nums) {
    prefix += x;
    count += map.get(prefix - k) ?? 0;
    map.set(prefix, (map.get(prefix) ?? 0) + 1);
  }
  return count;
}`,
    explanation:
      "Ключевая идея: сумма подмассива = разность префиксов, а «разность префиксов = k» переформулируется как «раньше встречался префикс prefix − k». Map даёт O(1) на такой запрос. Три классических грабля: забыть map.set(0,1); добавить префикс в Map до подсчёта; попытаться решить скользящим окном при отрицательных числах. LeetCode #560.",
    similar: [
      "Накопительная сумма (task-running-sum)",
      "Two Sum (task-two-sum)",
    ],
  },

  // ==================== 14. ОДНОСВЯЗНЫЙ СПИСОК ====================
  {
    id: "task-reverse-linked-list",
    topic: "linked-list",
    topicName: "Односвязный список",
    difficulty: "easy",
    title: "Реверс односвязного списка",
    description: `Напишите функцию \`reverseList(arr)\`, которая:
1. Строит из массива настоящий односвязный список (узлы \`{ val, next }\`)
2. Разворачивает его **перелинковкой указателей** (не создавая новый список значений)
3. Возвращает развёрнутый список обратно как массив
**Требования:**
- \`[1, 2, 3, 4, 5]\` → \`[5, 4, 3, 2, 1]\`
- O(n) время, O(1) дополнительной памяти (не считая построения списка)`,
    starterCode: `function reverseList(arr) {
// 1. построить список из массива
// 2. развернуть указатели
// 3. собрать результат в массив
}`,
    pattern: "Односвязный список",
    approach: {
      recognize:
        "Разворот списка — базовая операция на указатели. Три переменные: prev, cur, next.",
      idea: "Идя по списку, для каждого узла СОХРАНЯЕМ next, разворачиваем стрелку (cur.next = prev) и сдвигаем пару prev/cur вперёд. В конце prev — новая голова.",
      steps: [
        "Построй список: иди с конца массива, создавая узлы head = { val, next: head }",
        "prev = null, cur = head",
        "while cur: next = cur.next; cur.next = prev; prev = cur; cur = next",
        "prev — новая голова; собери значения в массив",
      ],
      skeleton: `let prev = null;
let cur = head;
while (cur) {
  const next = cur.next; // сохраняем!
  cur.next = prev;       // разворот стрелки
  prev = cur;
  cur = next;
}
return prev; // новая голова`,
      complexity: "O(n) время, O(1) память",
    },
    hints: [
      {
        text: "Построение списка из массива: иди с ПОСЛЕДНЕГО элемента и каждый раз создавай голову.",
        code: `let head = null;
for (let i = arr.length - 1; i >= 0; i--) {
  head = { val: arr[i], next: head };
}`,
      },
      {
        text: "Главная опасность — потерять остаток списка. ПЕРВЫМ делом сохраняй cur.next во временную переменную.",
        code: `const next = cur.next;
cur.next = prev;`,
      },
      {
        text: "После цикла prev указывает на новую голову (cur ушёл в null).",
        code: `prev = cur;   // после тела цикла
cur = next;
// ...
// в конце: head = prev`,
      },
    ],
    testCases: [
      {
        input: [[1, 2, 3, 4, 5]],
        expected: [5, 4, 3, 2, 1],
        description: "Классика LeetCode #206",
      },
      { input: [[1, 2]], expected: [2, 1], description: "Два узла" },
      { input: [[7]], expected: [7], description: "Один узел" },
      { input: [[]], expected: [], description: "Пустой список" },
    ],
    solution: `function reverseList(arr) {
  // 1. строим список
  let head = null;
  for (let i = arr.length - 1; i >= 0; i--) {
    head = { val: arr[i], next: head };
  }
  // 2. разворачиваем указатели
  let prev = null;
  let cur = head;
  while (cur) {
    const next = cur.next;
    cur.next = prev;
    prev = cur;
    cur = next;
  }
  // 3. собираем в массив
  const res = [];
  cur = prev;
  while (cur) {
    res.push(cur.val);
    cur = cur.next;
  }
  return res;
}`,
    explanation:
      "Разворот списка — это «отпечаток пальца» владения указателями: сохранить next, развернуть стрелку, сдвинуть пару. На собеседовании часто просят написать именно итеративную версию (O(1) памяти), а рекурсивную — как бонус. Тот же приём используется в «палиндром-списке» и «реверсе части списка».",
    similar: [
      "Цикл в списке (task-linked-list-cycle)",
      "Реверс строки указателями (task-reverse-string)",
    ],
  },
  {
    id: "task-linked-list-cycle",
    topic: "linked-list",
    topicName: "Односвязный список",
    difficulty: "medium",
    title: "Цикл в односвязном списке",
    description: `Напишите функцию \`hasCycle(arr, pos)\`, которая:
1. Строит список из массива; если \`pos >= 0\`, хвост списка соединяется с узлом по индексу \`pos\` (получается цикл)
2. Определяет, есть ли в списке цикл, **алгоритмом Флойда** (два указателя)
**Требования:**
- \`([3, 2, 0, -4], 1)\` → \`true\`
- \`([1], -1)\` → \`false\`
- O(n) время, O(1) память (без Set/Map!)`,
    starterCode: `function hasCycle(arr, pos) {
// 1. построить список (хвост -> узел pos, если pos >= 0)
// 2. slow/fast указатели
}`,
    pattern: "Два указателя (Флойд)",
    approach: {
      recognize:
        "«Есть ли цикл в списке» без дополнительной памяти → черепаха и заяц (Флойд).",
      idea: "Два указателя: slow идёт на 1 шаг, fast на 2. Если цикла нет — fast дойдёт до null. Если есть — fast неизбежно догонит slow внутри цикла (как круговая трасса: быстрый бегун обгоняет медленного на круг).",
      steps: [
        "Построй список; если pos >= 0: последний.next = узел[pos]",
        "slow = head, fast = head",
        "while fast && fast.next: slow = slow.next; fast = fast.next.next",
        "  если slow === fast → return true",
        "Конец цикла → return false",
      ],
      skeleton: `let slow = head, fast = head;
while (fast && fast.next) {
  slow = slow.next;
  fast = fast.next.next;
  if (slow === fast) return true;
}
return false;`,
      complexity: "O(n) время, O(1) память",
    },
    hints: [
      {
        text: "При построении цикла сначала сохрани все узлы в массив, чтобы легко соединить хвост с узлом по индексу pos.",
        code: `const nodes = arr.map((v) => ({ val: v, next: null }));
for (let i = 0; i < arr.length - 1; i++) nodes[i].next = nodes[i + 1];
if (pos >= 0) nodes[arr.length - 1].next = nodes[pos];`,
      },
      {
        text: "Условие цикла while: fast && fast.next — иначе fast.next.next упадёт на null.",
        code: `while (fast && fast.next) { ... }`,
      },
      {
        text: "Сравнивай УЗЛЫ по ссылке (slow === fast), а не значения — значения могут повторяться.",
        code: `if (slow === fast) return true;`,
      },
    ],
    testCases: [
      {
        input: [[3, 2, 0, -4], 1],
        expected: true,
        description: "Цикл на индекс 1",
      },
      { input: [[1, 2], 0], expected: true, description: "Цикл на голову" },
      { input: [[1], -1], expected: false, description: "Без цикла" },
      { input: [[], -1], expected: false, description: "Пустой список" },
    ],
    solution: `function hasCycle(arr, pos) {
  if (arr.length === 0) return false;
  const nodes = arr.map((v) => ({ val: v, next: null }));
  for (let i = 0; i < arr.length - 1; i++) nodes[i].next = nodes[i + 1];
  if (pos >= 0) nodes[arr.length - 1].next = nodes[pos];

  let slow = nodes[0];
  let fast = nodes[0];
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) return true;
  }
  return false;
}`,
    explanation:
      "Алгоритм Флойда: два указателя с разной скоростью. В цикле fast каждый шаг сокращает разрыв с slow на 1, поэтому встреча гарантирована. Бонус-вопрос на собеседовании: «а как найти НАЧАЛО цикла?» — после встречи пусти третий указатель с головы, и они с slow встретятся в начале цикла. LeetCode #141.",
    similar: [
      "Реверс списка (task-reverse-linked-list)",
      "Two pointers теория",
    ],
  },

  // ==================== 15. БИНАРНЫЙ ПОИСК ====================
  {
  id: "task-binary-search",
  topic: "binary-search",
  topicName: "Бинарный поиск",
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
  pattern: "Бинарный поиск",
  approach: {
    recognize: "Отсортированный массив + поиск элемента → бинарный поиск. Любое упоминание O(log n) — тоже он.",
    idea: "Держим окно [left, right], сравниваем средний элемент с целью и отбрасываем половину окна на каждом шаге.",
    steps: [
      "left = 0, right = arr.length - 1",
      "while left <= right: mid = Math.floor((left + right) / 2)",
      "arr[mid] === target → return mid",
      "arr[mid] < target → left = mid + 1, иначе right = mid - 1",
      "Цикл закончился → return -1",
    ],
    skeleton: `let left = 0, right = arr.length - 1;
while (left <= right) {
  const mid = Math.floor((left + right) / 2);
  if (arr[mid] === target) return mid;
  if (arr[mid] < target) left = mid + 1;
  else right = mid - 1;
}
return -1;`,
    complexity: "O(log n) время, O(1) память",
  },
  hints: [
    {
      text: "Два указателя по краям; середина — Math.floor((left + right) / 2). Условие цикла — left <= right.",
      code: `let left = 0;
let right = arr.length - 1;
while (left <= right) { ... }`,
    },
    {
      text: "Сравнение с целью говорит, какую половину отбросить.",
      code: `if (arr[mid] === target) return mid;
if (arr[mid] < target) left = mid + 1;
else right = mid - 1;`,
    },
  ],
  testCases: [
    { input: [[1, 3, 5, 7, 9, 11], 5], expected: 2, description: "Элемент в середине" },
    { input: [[1, 3, 5, 7, 9, 11], 1], expected: 0, description: "Первый элемент" },
    { input: [[1, 3, 5, 7, 9, 11], 11], expected: 5, description: "Последний элемент" },
    { input: [[1, 3, 5, 7, 9, 11], 4], expected: -1, description: "Элемента нет" },
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
    "Бинарный поиск делит пространство поиска пополам на каждом шаге → O(log n). Массив ОБЯЗАН быть отсортирован. Варианты посложнее: первое/последнее вхождение (task-search-range) и «поиск по ответу» (task-sqrt).",
  similar: ["Целочисленный корень (task-sqrt)", "Первое и последнее вхождение (task-search-range)"],
},

  // ==================== 16. ПЕРЕБОР КОМБИНАЦИЙ ====================
  {
    id: "task-subsets",
    topic: "backtracking",
    topicName: "Перебор комбинаций",
    difficulty: "easy",
    title: "Все подмножества (Subsets)",
    description: `Дан массив УНИКАЛЬНЫХ чисел. Верните все возможные подмножества (в любом порядке элементов внутри, но в порядке генерации backtracking).
**Требования:**
- \`[1, 2, 3]\` → \`[[], [1], [1,2], [1,2,3], [1,3], [2], [2,3], [3]]\`
- Подмножеств 2^n — это нормально, сложность экспоненциальна по природе задачи`,
    starterCode: `function subsets(nums) {
// ваш код здесь
}`,
    pattern: "Backtracking",
    approach: {
      recognize:
        "«Все подмножества / комбинации / перестановки» — полный перебор через backtracking: choose → explore → un-choose.",
      idea: "Дерево решений: на каждом шаге решаем, брать ли следующий элемент. Параметр start гарантирует, что элементы берутся только ВПЕРЁД — так каждое подмножество генерируется ровно один раз, без перестановок-дубликатов.",
      steps: [
        "result = []",
        "backtrack(start, path):",
        "  result.push([...path]) — КОПИЮ, а не ссылку!",
        "  for i = start..n-1: path.push(nums[i]); backtrack(i + 1, path); path.pop()",
        "Запустить backtrack(0, [])",
      ],
      skeleton: `const result = [];
function backtrack(start, path) {
  result.push([...path]);
  for (let i = start; i < nums.length; i++) {
    path.push(nums[i]);   // choose
    backtrack(i + 1, path); // explore
    path.pop();           // un-choose
  }
}
backtrack(0, []);`,
      complexity:
        "O(n · 2^n) время (2^n подмножеств, каждое копируем), O(n) глубина рекурсии",
    },
    hints: [
      {
        text: "Каждый узел дерева рекурсии — готовое подмножество. Поэтому push в result делается СРАЗУ, до цикла.",
        code: `result.push([...path]); // копия!`,
      },
      {
        text: "Параметр start = «с какого индекса можно брать» избавляет от дубликатов вида [2,1] после [1,2].",
        code: `backtrack(i + 1, path);`,
      },
      {
        text: "path.pop() после рекурсии — это и есть backtrack: отменяем выбор, чтобы попробовать ветку брата.",
        code: `path.push(nums[i]);
backtrack(i + 1, path);
path.pop();`,
      },
    ],
    testCases: [
      {
        input: [[1, 2, 3]],
        expected: [[], [1], [1, 2], [1, 2, 3], [1, 3], [2], [2, 3], [3]],
        description: "8 подмножеств",
      },
      { input: [[0]], expected: [[], [0]], description: "Один элемент" },
    ],
    solution: `function subsets(nums) {
  const result = [];
  function backtrack(start, path) {
    result.push([...path]);
    for (let i = start; i < nums.length; i++) {
      path.push(nums[i]);
      backtrack(i + 1, path);
      path.pop();
    }
  }
  backtrack(0, []);
  return result;
}`,
    explanation:
      "Эталонный backtracking. Запомни мантру: «копия в результат, push → рекурсия → pop». Варианты на собеседовании: подмножества с дубликатами (сначала sort + пропуск `if (i > start && nums[i] === nums[i-1]) continue`), подмножества суммы (добавить условие и target). LeetCode #78.",
    similar: [
      "Перестановки (task-permutations)",
      "Перебор комбинаций — теория",
    ],
  },
  {
    id: "task-permutations",
    topic: "backtracking",
    topicName: "Перебор комбинаций",
    difficulty: "medium",
    title: "Все перестановки (Permutations)",
    description: `Дан массив УНИКАЛЬНЫХ чисел. Верните все возможные перестановки.
**Требования:**
- \`[1, 2]\` → \`[[1, 2], [2, 1]]\`
- \`[1, 2, 3]\` → \`[[1,2,3], [1,3,2], [2,1,3], [2,3,1], [3,1,2], [3,2,1]]\`
- В отличие от подмножеств, ПОРЯДОК важен, и каждый элемент используется ровно один раз в каждой перестановке`,
    starterCode: `function permutations(nums) {
// ваш код здесь
}`,
    pattern: "Backtracking с used-метками",
    approach: {
      recognize:
        "«Все перестановки» — порядок важен, значит start-индекс не подходит; нужен массив used, чтобы брать элементы в любом порядке, но по одному разу.",
      idea: "На каждом шаге перебираем ВСЕ элементы; пропускаем уже взятые (used[i]). Когда path заполнен до конца — копируем в результат. Отличие от subsets: результат фиксируем только на полной длине, а цикл всегда с 0.",
      steps: [
        "used = массив false, result = []",
        "backtrack(path):",
        "  если path.length === nums.length → result.push([...path]); return",
        "  for i = 0..n-1: если used[i] — continue",
        "    used[i] = true; path.push(nums[i]); backtrack(path); path.pop(); used[i] = false",
      ],
      skeleton: `const used = new Array(nums.length).fill(false);
function backtrack(path) {
  if (path.length === nums.length) {
    result.push([...path]);
    return;
  }
  for (let i = 0; i < nums.length; i++) {
    if (used[i]) continue;
    used[i] = true;
    path.push(nums[i]);
    backtrack(path);
    path.pop();
    used[i] = false; // откат метки!
  }
}`,
      complexity: "O(n · n!) время (n! перестановок), O(n) глубина + O(n) used",
    },
    hints: [
      {
        text: "В перестановках цикл ВСЕГДА с 0 — порядок важен. За «не брать дважды» отвечает массив used.",
        code: `for (let i = 0; i < nums.length; i++) {
  if (used[i]) continue;`,
      },
      {
        text: "Результат фиксируем только когда path заполнен целиком (в subsets — на каждом шаге).",
        code: `if (path.length === nums.length) {
  result.push([...path]);
  return;
}`,
      },
      {
        text: "Не забудь снять метку used[i] = false при откате — иначе ветки брата не увидят элемент.",
        code: `path.pop();
used[i] = false;`,
      },
    ],
    testCases: [
      {
        input: [[1, 2]],
        expected: [
          [1, 2],
          [2, 1],
        ],
        description: "Две перестановки",
      },
      {
        input: [[1, 2, 3]],
        expected: [
          [1, 2, 3],
          [1, 3, 2],
          [2, 1, 3],
          [2, 3, 1],
          [3, 1, 2],
          [3, 2, 1],
        ],
        description: "Шесть перестановок",
      },
      { input: [[5]], expected: [[5]], description: "Один элемент" },
    ],
    solution: `function permutations(nums) {
  const result = [];
  const used = new Array(nums.length).fill(false);
  function backtrack(path) {
    if (path.length === nums.length) {
      result.push([...path]);
      return;
    }
    for (let i = 0; i < nums.length; i++) {
      if (used[i]) continue;
      used[i] = true;
      path.push(nums[i]);
      backtrack(path);
      path.pop();
      used[i] = false;
    }
  }
  backtrack([]);
  return result;
}`,
    explanation:
      "Сравни с subsets и запомни различия: (1) цикл с 0, а не со start; (2) used-массив вместо start; (3) фиксация результата только на полной длине. Это три кита всех backtracking-задач; остальные — комбинации этих приёмов. LeetCode #46.",
    similar: ["Все подмножества (task-subsets)", "Перебор комбинаций — теория"],
  },
  // ==================== 17. ДЕРЕВЬЯ ====================
  {
    id: "task-max-depth",
    topic: "trees",
    topicName: "Деревья",
    difficulty: "easy",
    title: "Максимальная глубина дерева",
    description: `Дано двоичное дерево в массивном представлении (формат LeetCode: дети узла \`i\` — на позициях \`2i+1\` и \`2i+2\`, \`null\` — узла нет).
Верните его **глубину** — количество узлов на самом длинном пути от корня до листа.
**Требования:**
- \`[3, 9, 20, null, null, 15, 7]\` → \`3\`
- Постройте дерево как узлы \`{ val, left, right }\` и решите рекурсией (DFS)
- \`[]\` → \`0\``,
    starterCode: `function maxDepth(tree) {
// 1. построить дерево из массива
// 2. dfs(node): 1 + max(dfs(left), dfs(right))
}`,
    pattern: "Деревья (DFS-рекурсия)",
    approach: {
      recognize:
        "Дерево + «глубина / высота / путь от корня» → рекурсия: ответ для узла из ответов детей.",
      idea: "depth(null) = 0; depth(node) = 1 + max(depth(left), depth(right)). Базовый случай — пустой узел.",
      steps: [
        "Построй дерево из массива через очередь (BFS-построение)",
        "dfs(node): если !node → return 0",
        "Иначе 1 + Math.max(dfs(node.left), dfs(node.right))",
      ],
      skeleton: `function dfs(node) {
  if (!node) return 0;
  return 1 + Math.max(dfs(node.left), dfs(node.right));
}`,
      complexity: "O(n) время, O(h) память (h — высота, в худшем случае n)",
    },
    hints: [
      {
        text: "Построение из массива: заведи очередь, у каждого узла забирай по два следующих значения как left и right.",
        code: `const queue = [root];
let i = 1;
while (i < arr.length) {
  const node = queue.shift();
  if (arr[i] !== null) { node.left = { val: arr[i], left: null, right: null }; queue.push(node.left); }
  i++;
  // то же для right...
}`,
      },
      {
        text: "Базовый случай рекурсии — пустой узел. Без него бесконечная рекурсия.",
        code: `if (!node) return 0;`,
      },
      {
        text: "Ответ для узла = 1 + максимум из глубин детей.",
        code: `return 1 + Math.max(dfs(node.left), dfs(node.right));`,
      },
    ],
    testCases: [
      {
        input: [[3, 9, 20, null, null, 15, 7]],
        expected: 3,
        description: "Классическое дерево",
      },
      { input: [[]], expected: 0, description: "Пустое дерево" },
      { input: [[1]], expected: 1, description: "Один узел" },
      {
        input: [[1, 2, 2, 3, 3, null, null, 4, 4]],
        expected: 4,
        description: "Несбалансированное",
      },
    ],
    solution: `function maxDepth(tree) {
  function build(arr) {
    if (!arr.length || arr[0] === null) return null;
    const root = { val: arr[0], left: null, right: null };
    const queue = [root];
    let i = 1;
    while (i < arr.length) {
      const node = queue.shift();
      if (i < arr.length && arr[i] !== null) {
        node.left = { val: arr[i], left: null, right: null };
        queue.push(node.left);
      }
      i++;
      if (i < arr.length && arr[i] !== null) {
        node.right = { val: arr[i], left: null, right: null };
        queue.push(node.right);
      }
      i++;
    }
    return root;
  }
  function dfs(node) {
    if (!node) return 0;
    return 1 + Math.max(dfs(node.left), dfs(node.right));
  }
  return dfs(build(tree));
}`,
    explanation:
      "Эталонная DFS-задача на деревья: рекурсия сама обходит всё дерево, а базовый случай `!node → 0` останавливает её. Тот же шаблон решает «сбалансировано ли дерево», «сумма всех узлов», «диаметр дерева». Альтернатива — BFS по уровням (см. task-level-order): глубина = число уровней.",
    similar: ["Обход по уровням (task-level-order)", "Теория «Деревья»"],
  },
  {
    id: "task-level-order",
    topic: "trees",
    topicName: "Деревья",
    difficulty: "medium",
    title: "Обход дерева по уровням (BFS)",
    description: `Дано двоичное дерево в массивном представлении. Верните массив уровней: \`[[корень], [уровень 1], [уровень 2], ...]\`.
**Требования:**
- \`[3, 9, 20, null, null, 15, 7]\` → \`[[3], [9, 20], [15, 7]]\`
- Использовать BFS с очередью (не рекурсию)
- \`[]\` → \`[]\``,
    starterCode: `function levelOrder(tree) {
// ваш код здесь
}`,
    pattern: "Деревья (BFS с очередью)",
    approach: {
      recognize:
        "«По уровням / слева направо по этажам» → BFS с очередью. Ключевой трюк — фиксировать размер уровня ДО цикла.",
      idea: "Очередь узлов. На каждой итерации внешнего цикла запоминаем size = queue.length — это весь текущий уровень; достаём ровно size узлов и кладём их детей.",
      steps: [
        "Если корня нет → []",
        "queue = [root], levels = []",
        "while queue.length: size = queue.length; level = []",
        "  size раз: достать узел, push его val, добавить детей в очередь",
        "  levels.push(level)",
      ],
      skeleton: `const queue = [root];
const levels = [];
while (queue.length) {
  const size = queue.length; // фиксируем ДО цикла!
  const level = [];
  for (let i = 0; i < size; i++) {
    const node = queue.shift();
    level.push(node.val);
    if (node.left) queue.push(node.left);
    if (node.right) queue.push(node.right);
  }
  levels.push(level);
}`,
      complexity: "O(n) время, O(n) память (очередь)",
    },
    hints: [
      {
        text: "Запоминай длину очереди ДО цикла по уровню — иначе дети текущего уровня попадут в него же.",
        code: `const size = queue.length;
for (let i = 0; i < size; i++) { ... }`,
      },
      {
        text: "Детей добавляй в очередь сразу при обработке родителя.",
        code: `if (node.left) queue.push(node.left);
if (node.right) queue.push(node.right);`,
      },
    ],
    testCases: [
      {
        input: [[3, 9, 20, null, null, 15, 7]],
        expected: [[3], [9, 20], [15, 7]],
        description: "Классика LeetCode #102",
      },
      { input: [[]], expected: [], description: "Пустое дерево" },
      { input: [[1]], expected: [[1]], description: "Один узел" },
    ],
    solution: `function levelOrder(tree) {
  function build(arr) {
    if (!arr.length || arr[0] === null) return null;
    const root = { val: arr[0], left: null, right: null };
    const queue = [root];
    let i = 1;
    while (i < arr.length) {
      const node = queue.shift();
      if (i < arr.length && arr[i] !== null) {
        node.left = { val: arr[i], left: null, right: null };
        queue.push(node.left);
      }
      i++;
      if (i < arr.length && arr[i] !== null) {
        node.right = { val: arr[i], left: null, right: null };
        queue.push(node.right);
      }
      i++;
    }
    return root;
  }
  const root = build(tree);
  if (!root) return [];
  const queue = [root];
  const levels = [];
  while (queue.length) {
    const size = queue.length;
    const level = [];
    for (let i = 0; i < size; i++) {
      const node = queue.shift();
      level.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    levels.push(level);
  }
  return levels;
}`,
    explanation:
      "BFS по уровням — второй базовый обход дерева после DFS. Трюк «size до цикла» — то, что спрашивают на собеседовании чаще всего. BFS на деревьях и графах также даёт кратчайший путь в невзвешенных структурах.",
    similar: [
      "Максимальная глубина (task-max-depth)",
      "Число островов (task-num-islands)",
    ],
  },

  // ==================== 18. ГРАФЫ ====================
  {
    id: "task-path-exists",
    topic: "graphs",
    topicName: "Графы",
    difficulty: "easy",
    title: "Существует ли путь в графе",
    description: `Дано: \`n\` узлов (0..n-1), массив рёбер \`edges\` (неориентированный граф), \`source\` и \`destination\`.
Определите, существует ли путь из \`source\` в \`destination\`.
**Требования:**
- Постройте список смежности и пройдитесь BFS или DFS
- Не забудьте \`visited\` — в графе бывают циклы!
- \`pathExists(3, [[0,1],[1,2],[2,0]], 0, 2)\` → \`true\``,
    starterCode: `function pathExists(n, edges, source, destination) {
// ваш код здесь
}`,
    pattern: "Графы (BFS + visited)",
    approach: {
      recognize:
        "«Достижимость / есть ли путь» в графе → BFS/DFS + visited. Рёбра даны парами → сначала список смежности.",
      idea: "Список смежности: adj[узел] = массив соседей. Стартуем из source, идём по соседям, помечая visited. Встретили destination → true; очередь кончилась → false.",
      steps: [
        "Если source === destination → true",
        "adj = массив из n пустых массивов; для каждого [a,b]: adj[a].push(b), adj[b].push(a)",
        "visited = new Set([source]), queue = [source]",
        "BFS: достал узел → для каждого соседа: сосед === destination → true; иначе если не visited — в очередь",
        "Конец цикла → false",
      ],
      skeleton: `const adj = Array.from({ length: n }, () => []);
for (const [a, b] of edges) {
  adj[a].push(b);
  adj[b].push(a);
}
const visited = new Set([source]);
const queue = [source];
while (queue.length) {
  const node = queue.shift();
  for (const next of adj[node]) {
    if (next === destination) return true;
    if (!visited.has(next)) {
      visited.add(next);
      queue.push(next);
    }
  }
}`,
      complexity: "O(V + E) время, O(V + E) память",
    },
    hints: [
      {
        text: "Сначала построй список смежности: для неориентированного графа каждое ребро добавляется в обе стороны.",
        code: `const adj = Array.from({ length: n }, () => []);
for (const [a, b] of edges) {
  adj[a].push(b);
  adj[b].push(a);
}`,
      },
      {
        text: "Без visited BFS зациклится на первом же цикле графа.",
        code: `const visited = new Set([source]);
// ...
if (!visited.has(next)) {
  visited.add(next);
  queue.push(next);
}`,
      },
    ],
    testCases: [
      {
        input: [
          3,
          [
            [0, 1],
            [1, 2],
            [2, 0],
          ],
          0,
          2,
        ],
        expected: true,
        description: "Треугольник",
      },
      {
        input: [
          5,
          [
            [0, 1],
            [1, 2],
            [3, 4],
          ],
          0,
          4,
        ],
        expected: false,
        description: "Две компоненты",
      },
      {
        input: [1, [], 0, 0],
        expected: true,
        description: "source = destination",
      },
    ],
    solution: `function pathExists(n, edges, source, destination) {
  if (source === destination) return true;
  const adj = Array.from({ length: n }, () => []);
  for (const [a, b] of edges) {
    adj[a].push(b);
    adj[b].push(a);
  }
  const visited = new Set([source]);
  const queue = [source];
  while (queue.length) {
    const node = queue.shift();
    for (const next of adj[node]) {
      if (next === destination) return true;
      if (!visited.has(next)) {
        visited.add(next);
        queue.push(next);
      }
    }
  }
  return false;
}`,
    explanation:
      "Базовая задача на обход графа: список смежности + BFS + visited. LeetCode #1971. Запомни каркас «adj → visited → queue → while», он решает 80% графовых задач на достижимость.",
    similar: ["Число островов (task-num-islands)", "Теория «Графы»"],
  },
  {
    id: "task-num-islands",
    topic: "graphs",
    topicName: "Графы",
    difficulty: "medium",
    title: "Число островов",
    description: `Дана сетка \`grid\` из единиц (суша) и нулей (вода). Остров — группа единиц, соединённых по вертикали и горизонтали.
Верните количество островов.
**Требования:**
- \`[[1,1,0],[0,1,0],[0,0,1]]\` → \`2\`
- НЕ мутируйте входную сетку — используйте множество visited
- O(rows × cols)`,
    starterCode: `function numIslands(grid) {
// ваш код здесь
}`,
    pattern: "Графы (DFS по сетке, компоненты связности)",
    approach: {
      recognize:
        "Сетка (матрица) + «острова / области / заливы» → граф, где каждая клетка — узел с 4 соседями. Число островов = число компонент связности.",
      idea: "Внешний двойной цикл по клеткам. Нашли непосещённую «1» → это новый остров: запускаем DFS, который помечает всю связную сушу как visited. islands++.",
      steps: [
        "visited = new Set(), key = (r,c) => r + ',' + c",
        "dfs(r, c): границы? visited? вода? → return; иначе пометь и в 4 стороны",
        "Двойной цикл: если grid[r][c] === 1 и не visited → dfs(r,c); islands++",
      ],
      skeleton: `function dfs(r, c) {
  if (r < 0 || r >= rows || c < 0 || c >= cols) return;
  if (visited.has(key(r, c)) || grid[r][c] === 0) return;
  visited.add(key(r, c));
  dfs(r + 1, c); dfs(r - 1, c);
  dfs(r, c + 1); dfs(r, c - 1);
}`,
      complexity: "O(rows × cols) время и память",
    },
    hints: [
      {
        text: "Ключ visited-клетки удобно делать строкой «строка,запятая,столбец».",
        code: `const key = (r, c) => r + "," + c;`,
      },
      {
        text: "DFS сначала проверяет границы, потом visited, потом воду — в этом порядке.",
        code: `if (r < 0 || r >= rows || c < 0 || c >= cols) return;
if (visited.has(key(r, c)) || grid[r][c] === 0) return;`,
      },
      {
        text: "Каждый запуск DFS из внешнего цикла = один новый остров.",
        code: `if (grid[r][c] === 1 && !visited.has(key(r, c))) {
  dfs(r, c);
  islands++;
}`,
      },
    ],
    testCases: [
      {
        input: [
          [
            [1, 1, 0, 0, 0],
            [1, 1, 0, 0, 0],
            [0, 0, 1, 0, 0],
            [0, 0, 0, 1, 1],
          ],
        ],
        expected: 3,
        description: "Классика LeetCode #200",
      },
      { input: [[[0]]], expected: 0, description: "Только вода" },
      { input: [[[1]]], expected: 1, description: "Один остров" },
      {
        input: [
          [
            [1, 0, 1],
            [0, 1, 0],
            [1, 0, 1],
          ],
        ],
        expected: 5,
        description: "Шахматная суша",
      },
    ],
    solution: `function numIslands(grid) {
  if (!grid.length) return 0;
  const rows = grid.length;
  const cols = grid[0].length;
  const visited = new Set();
  const key = (r, c) => r + "," + c;
  function dfs(r, c) {
    if (r < 0 || r >= rows || c < 0 || c >= cols) return;
    if (visited.has(key(r, c)) || grid[r][c] === 0) return;
    visited.add(key(r, c));
    dfs(r + 1, c);
    dfs(r - 1, c);
    dfs(r, c + 1);
    dfs(r, c - 1);
  }
  let islands = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === 1 && !visited.has(key(r, c))) {
        dfs(r, c);
        islands++;
      }
    }
  }
  return islands;
}`,
    explanation:
      "Сетка — это скрытый граф. «Число островов» = число компонент связности: внешний цикл находит непосещённую сушу, DFS затапливает весь остров посещёнными. Точно так же решаются «максимальная площадь острова», «залив воды» (flood fill), «границы островов».",
    similar: [
      "Существует ли путь (task-path-exists)",
      "Обход по уровням (task-level-order)",
    ],
  },

  // ==================== 19. ДИНАМИЧЕСКОЕ ПРОГРАММИРОВАНИЕ ====================
  {
    id: "task-climb-stairs",
    topic: "dp",
    topicName: "Динамическое программирование",
    difficulty: "easy",
    title: "Лесенка (Climbing Stairs)",
    description: `Вы поднимаетесь по лестнице из \`n\` ступенек. За шаг можно подняться на 1 или 2 ступеньки.
Сколькими различными способами можно добраться до верха?
**Требования:**
- \`n = 3\` → \`3\` (1+1+1, 1+2, 2+1)
- O(n) время, O(1) память (две переменные вместо массива)`,
    starterCode: `function climbStairs(n) {
// ваш код здесь
}`,
    pattern: "Динамическое программирование",
    approach: {
      recognize:
        "«Количество способов» + шаги 1/2 → это Фибоначчи в маскировке. dp[i] зависит от dp[i-1] и dp[i-2].",
      idea: "На ступеньку i можно попасть с i-1 (шаг 1) или с i-2 (шаг 2). Значит ways(i) = ways(i-1) + ways(i-2). База: ways(1)=1, ways(2)=2.",
      steps: [
        "Если n <= 2 → вернуть n",
        "a = 1 (ways(1)), b = 2 (ways(2))",
        "for i = 3..n: [a, b] = [b, a + b]",
        "Вернуть b",
      ],
      skeleton: `if (n <= 2) return n;
let a = 1, b = 2;
for (let i = 3; i <= n; i++) {
  [a, b] = [b, a + b];
}
return b;`,
      complexity: "O(n) время, O(1) память",
    },
    hints: [
      {
        text: "Запиши рекуррентность: чтобы встать на ступеньку i, ты пришёл с i-1 или с i-2.",
        code: `dp[i] = dp[i - 1] + dp[i - 2];`,
      },
      {
        text: "Массив dp не обязателен: нужны только два последних значения.",
        code: `let a = 1, b = 2;
for (let i = 3; i <= n; i++) [a, b] = [b, a + b];`,
      },
    ],
    testCases: [
      { input: [1], expected: 1, description: "Одна ступенька" },
      { input: [2], expected: 2, description: "Две ступеньки" },
      { input: [3], expected: 3, description: "Три способа" },
      { input: [5], expected: 8, description: "n = 5" },
      { input: [10], expected: 89, description: "n = 10" },
    ],
    solution: `function climbStairs(n) {
  if (n <= 2) return n;
  let a = 1;
  let b = 2;
  for (let i = 3; i <= n; i++) {
    [a, b] = [b, a + b];
  }
  return b;
}`,
    explanation:
      "Вводная задача в ДП: состояние dp[i] = «число способов дойти до ступеньки i», переход из двух предыдущих состояний. На собеседовании сразу проговори три шага: состояние → рекуррентность → база. Это же семейство: Фибоначчи, «домовой вор», «покраска забора».",
    similar: ["Фибоначчи (task-fibonacci)", "Размен монет (task-coin-change)"],
  },
  {
    id: "task-coin-change",
    topic: "dp",
    topicName: "Динамическое программирование",
    difficulty: "medium",
    title: "Размен монет (Coin Change)",
    description: `Дан массив номиналов монет \`coins\` и сумма \`amount\`. Верните **минимальное количество монет**, которыми можно набрать сумму, или \`-1\`, если невозможно.
**Требования:**
- \`[1, 2, 5], 11\` → \`3\` (5 + 5 + 1)
- \`[2], 3\` → \`-1\`
- Монет каждого номинала бесконечно много
- O(amount × coins.length)`,
    starterCode: `function coinChange(coins, amount) {
// ваш код здесь
}`,
    pattern: "Динамическое программирование (bottom-up)",
    approach: {
      recognize:
        "«Минимальное количество монет/шагов» + бесконечный запас → ДП по сумме. Жадный алгоритм НЕ работает (пример: coins [1,3,4], amount 6: жадный 4+1+1=3, оптимум 3+3=2).",
      idea: "dp[i] = минимум монет для суммы i. Переход: dp[i] = min(dp[i - coin] + 1) по всем coin <= i. База: dp[0] = 0. Недостижимые суммы держим как Infinity.",
      steps: [
        "dp = массив amount+1 из Infinity; dp[0] = 0",
        "for i = 1..amount: для каждой монеты coin <= i: dp[i] = min(dp[i], dp[i-coin] + 1)",
        "Ответ: dp[amount] === Infinity ? -1 : dp[amount]",
      ],
      skeleton: `const dp = new Array(amount + 1).fill(Infinity);
dp[0] = 0;
for (let i = 1; i <= amount; i++) {
  for (const coin of coins) {
    if (coin <= i) {
      dp[i] = Math.min(dp[i], dp[i - coin] + 1);
    }
  }
}
return dp[amount] === Infinity ? -1 : dp[amount];`,
      complexity: "O(amount × n) время, O(amount) память",
    },
    hints: [
      {
        text: "Инициализируй недостижимые суммы Infinity, а dp[0] = 0 — это база рекуррентности.",
        code: `const dp = new Array(amount + 1).fill(Infinity);
dp[0] = 0;`,
      },
      {
        text: "Переход: если последняя монета — coin, то до неё было dp[i - coin] монет.",
        code: `dp[i] = Math.min(dp[i], dp[i - coin] + 1);`,
      },
      {
        text: "В конце Infinity означает «невозможно» → верни -1.",
        code: `return dp[amount] === Infinity ? -1 : dp[amount];`,
      },
    ],
    testCases: [
      { input: [[1, 2, 5], 11], expected: 3, description: "5+5+1" },
      { input: [[2], 3], expected: -1, description: "Невозможно" },
      { input: [[1], 0], expected: 0, description: "Ноль монет" },
      {
        input: [[1, 3, 4], 6],
        expected: 2,
        description: "Жадный не работает: 3+3",
      },
    ],
    solution: `function coinChange(coins, amount) {
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;
  for (let i = 1; i <= amount; i++) {
    for (const coin of coins) {
      if (coin <= i) {
        dp[i] = Math.min(dp[i], dp[i - coin] + 1);
      }
    }
  }
  return dp[amount] === Infinity ? -1 : dp[amount];
}`,
    explanation:
      "Классика bottom-up ДП (LeetCode #322). Ключевые моменты: Infinity как «недостижимо», база dp[0]=0, переход «последняя монета». Тест [1,3,4], 6 — проверка, что ты не написал жадный алгоритм. То же семейство: «минимальный путь», «разбиение суммы».",
    similar: ["Лесенка (task-climb-stairs)", "Максимальный подмассив (Kadane)"],
  },
  {
  id: "task-sqrt",
  topic: "binary-search",
  topicName: "Бинарный поиск",
  difficulty: "easy",
  title: "Целочисленный корень (Sqrt)",
  description: `Напишите функцию \`mySqrt(x)\`, которая возвращает целую часть квадратного корня из \`x\` (округление вниз).
**Требования:**
- \`mySqrt(8)\` → \`2\` (корень ≈ 2.83)
- \`mySqrt(16)\` → \`4\`
- Без \`Math.sqrt\` — через бинарный поиск по пространству ответов`,
  starterCode: `function mySqrt(x) {
// ваш код здесь
}`,
  pattern: "Бинарный поиск по ответу",
  approach: {
    recognize: "Нужно найти максимальное значение, удовлетворяющее условию (mid*mid <= x) — бинарный поиск по ПРОСТРАНСТВУ ОТВЕТОВ, а не по массиву.",
    idea: "Ответ лежит в отрезке [1, x/2] (для x >= 2). Делим пополам: если mid*mid <= x — ответ как минимум mid, идём правее и запоминаем кандидата; если больше — идём левее.",
    steps: [
      "Если x < 2 → вернуть x",
      "left = 1, right = Math.floor(x / 2), answer = 0",
      "while left <= right: mid = (left + right) >> 1",
      "если mid * mid <= x: answer = mid; left = mid + 1",
      "иначе right = mid - 1",
      "Вернуть answer",
    ],
    skeleton: `let left = 1;
let right = Math.floor(x / 2);
let answer = 0;
while (left <= right) {
  const mid = Math.floor((left + right) / 2);
  if (mid * mid <= x) {
    answer = mid;      // кандидат
    left = mid + 1;    // пробуем больше
  } else {
    right = mid - 1;
  }
}
return answer;`,
    complexity: "O(log x) время, O(1) память",
  },
  hints: [
    {
      text: "Для x >= 2 корень не превышает x/2 — это правая граница поиска.",
      code: `let left = 1;
let right = Math.floor(x / 2);`,
    },
    {
      text: "Если mid*mid <= x — mid подходит, но ответ может быть БОЛЬШЕ: запомни кандидата и иди вправо.",
      code: `if (mid * mid <= x) {
  answer = mid;
  left = mid + 1;
}`,
    },
  ],
  testCases: [
    { input: [8], expected: 2, description: "Округление вниз" },
    { input: [16], expected: 4, description: "Точный корень" },
    { input: [0], expected: 0, description: "Ноль" },
    { input: [1], expected: 1, description: "Единица" },
    { input: [2], expected: 1, description: "Корень из 2 ≈ 1.41" },
  ],
  solution: `function mySqrt(x) {
  if (x < 2) return x;
  let left = 1;
  let right = Math.floor(x / 2);
  let answer = 0;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (mid * mid <= x) {
      answer = mid;
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return answer;
}`,
  explanation:
    "Это шаблон «бинарный поиск по ответу»: функция mid*mid <= x монотонна (ложь…ложь, правда…правда), и мы ищем последнюю «правду». Тот же шаблон решает «минимальную скорость бананов» (LeetCode #875) и десятки задач на «минимакс». LeetCode #69.",
  similar: ["Бинарный поиск (task-binary-search)", "Первое и последнее вхождение (task-search-range)"],
},
{
  id: "task-search-range",
  topic: "binary-search",
  topicName: "Бинарный поиск",
  difficulty: "medium",
  title: "Первое и последнее вхождение",
  description: `Дан **отсортированный** массив \`nums\` и цель \`target\`. Найдите первую и последнюю позицию \`target\` в массиве.
**Требования:**
- Вернуть \`[firstIndex, lastIndex]\` или \`[-1, -1]\`, если элемента нет
- \`[5, 7, 7, 8, 8, 10], target = 8\` → \`[3, 4]\`
- O(log n) — два бинарных поиска (левой и правой границы)`,
  starterCode: `function searchRange(nums, target) {
// ваш код здесь
}`,
  pattern: "Бинарный поиск границ",
  approach: {
    recognize: "«Найти первую/последнюю позицию» в отсортированном массиве с дубликатами → два бинарных поиска границ.",
    idea: "Обычный бинарный поиск найдёт КАКОЕ-ТО вхождение. Чтобы найти ЛЕВОЕ: когда arr[mid] === target, запоминаем ответ и идём ВЛЕВО (right = mid - 1). Для правого — зеркально идём вправо.",
    steps: [
      "Напиши findBound(goLeft): стандартный бинарный поиск, но при совпадении запоминай ans и продолжай в нужную сторону",
      "first = findBound(true), last = findBound(false)",
      "Вернуть [first, last]",
    ],
    skeleton: `function findBound(goLeft) {
  let left = 0, right = nums.length - 1, ans = -1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] === target) {
      ans = mid;
      if (goLeft) right = mid - 1; // ищем левее
      else left = mid + 1;         // ищем правее
    } else if (nums[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return ans;
}`,
    complexity: "O(log n) время, O(1) память",
  },
  hints: [
    {
      text: "Не останавливайся при nums[mid] === target — запомни ответ и ПРОДОЛЖАЙ поиск в сторону границы.",
      code: `if (nums[mid] === target) {
  ans = mid;
  if (goLeft) right = mid - 1;
  else left = mid + 1;
}`,
    },
    {
      text: "Вынеси поиск границы в функцию с флагом направления — не дублируй код дважды.",
      code: `const findBound = (goLeft) => { ... };
return [findBound(true), findBound(false)];`,
    },
  ],
  testCases: [
    { input: [[5, 7, 7, 8, 8, 10], 8], expected: [3, 4], description: "Дубликаты в середине" },
    { input: [[5, 7, 7, 8, 8, 10], 6], expected: [-1, -1], description: "Элемента нет" },
    { input: [[], 0], expected: [-1, -1], description: "Пустой массив" },
    { input: [[1], 1], expected: [0, 0], description: "Один элемент" },
    { input: [[2, 2, 2, 2], 2], expected: [0, 3], description: "Все одинаковые" },
  ],
  solution: `function searchRange(nums, target) {
  const findBound = (goLeft) => {
    let left = 0;
    let right = nums.length - 1;
    let ans = -1;
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      if (nums[mid] === target) {
        ans = mid;
        if (goLeft) right = mid - 1;
        else left = mid + 1;
      } else if (nums[mid] < target) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
    return ans;
  };
  return [findBound(true), findBound(false)];
}`,
  explanation:
    "Ключевое отличие от обычного бинарного поиска: совпадение — не повод останавливаться. Мы запоминаем кандидата и продолжаем сужать поиск в сторону нужной границы. Ошибка «верну первое найденное и расширюсь линейно» ломает O(log n) на массиве из одинаковых элементов. LeetCode #34.",
  similar: ["Бинарный поиск (task-binary-search)", "Целочисленный корень (task-sqrt)"],
},
];

export default tasks;