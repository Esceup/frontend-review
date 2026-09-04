// src/data/interview.js
// ═══════════════════════════════════════════
//  ИНТЕРВЬЮ-СИМУЛЯТОР: ПРОЖАРКА РЕЗЮМЕ
//  Обновлено: Сентябрь 2026
//  Версия: 2.0 (47 вопросов)
// ═══════════════════════════════════════════

export const INTERVIEW_SECTIONS = [
  // ════════════════════════════════════════
  //  1. О СЕБЕ, КОМАНДЕ, ПРОЦЕССАХ
  // ════════════════════════════════════════
  {
    id: "self",
    title: "О себе и команде",
    icon: "👤",
    accent: "#43d2ff",
    questions: [
      {
        id: "self-intro",
        tag: "ВИК-ИНДУСТРИ",
        hot: true,
        question: "Расскажи о себе",
        summary:
          "Структурированная самопрезентация на 1.5–2 минуты: кто ты → что делал → суперсила → что ищешь.",
        details: [
          {
            type: "tip",
            content:
              "Это твой Elevator Pitch. Не пересказывай резюме — покажи ценность. Формула: роль → домен → ключевые достижения с метриками → направление роста.",
          },
          {
            type: "text",
            content: `Я frontend-разработчик с опытом более 3 лет. Последние два года работаю в **ВИК-ИНДУСТРИ** над крупной e-commerce платформой мебельного ритейлера — каталог на **5 000+ SKU**, оформление заказа, производительность интерфейса.

Моя основная экспертиза — **производительность и архитектура**. Я оптимизировал каталог: внедрил виртуализацию, что сократило DOM-узлы на **90%** и ускорило рендер на **60%**. Переработал data flow на **Redux Toolkit** и **RTK Query** — снизил лишние re-render'ы на **70%** и добился отклика фильтрации **200–300 мс**.

До этого работал над CRM-системой в **amoCRM** на **Next.js** с SSR, делал дашборды и финансовые таблицы.

Сейчас ищу позицию, где смогу расти в сторону архитектуры и менторства, работать с сильной командой над продуктом, которым пользуются реальные люди.`,
          },
          {
            type: "bullets",
            items: [
              "Не уходи в перечисление технологий — фокус на **задачах и метриках**",
              "Упомяни **команду** (9 человек, 3 фронта) — покажешь что командный игрок",
              "Закончи тем, **что ищешь** — это задаёт направление разговора",
            ],
          },
        ],
        followUps: [
          {
            question: "Почему уходишь с текущего места?",
            answer: `Не жалуйся. Фокус на **росте**: «Проект стабилизировался, основные архитектурные задачи решены. Хочу новые вызовы, более сложный домен, рост в сторону техлида/архитектора.»`,
          },
          {
            question: "Что для тебя идеальный следующий шаг в карьере?",
            answer: `Покажи **осознанность**: рост в архитектуру, менторство джунов, влияние на технические решения. Не говори «хочу больше денег».`,
          },
        ],
        keywords: [
          "5000 SKU",
          "виртуализация",
          "RTK Query",
          "производительность",
          "метрики",
        ],
      },
      {
        id: "self-team",
        tag: "ВИК-ИНДУСТРИ",
        hot: true,
        question: "Расскажи про команду и процессы",
        summary:
          "9 человек: 3 фронта, 2 бэка, QA, дизайнер, аналитик, тимлид. Скрам, спринты 2 недели, обязательный код-ревью.",
        details: [
          {
            type: "text",
            content: `В команде было **9 человек**: 3 frontend-разработчика, 2 backend-разработчика, QA, дизайнер, аналитик и тимлид. Также взаимодействовали с представителями бизнеса со стороны мебельного ритейлера.

Я был одним из основных frontend-разработчиков. Помимо разработки фич, занимался **производительностью каталога**, архитектурными решениями на фронте, **код-ревью** и помогал другим разработчикам разбирать сложные задачи.`,
          },
          {
            type: "bullets",
            items: [
              "**Scrum**, спринты по **2 недели**",
              "**Planning + Refinement** в начале спринта с аналитиком — декомпозиция и оценка",
              "**Daily** на 10–15 минут",
              "**Demo + Retrospective** в конце спринта",
              "Обязательный **Code Review** перед QA-стендом",
              "Крупные технические изменения обсуждали **внутри frontend-команды** и с тимлидом",
            ],
          },
        ],
        followUps: [
          {
            question: "Как вы решали архитектурные споры в команде?",
            answer: `Для крупных изменений делали **предварительное обсуждение** внутри frontend-команды. Если мнения расходились — делали **сравнение по критериям** (поддержка, размер, performance) или **POC**. Не «я продавил», а «мы приняли на основании данных».`,
          },
          {
            question: "Как взаимодействовали с бэкендом по API?",
            answer: `Обсуждали контракты **до начала разработки**. Если бэк отдавал неудобную структуру — договаривались об изменениях или делали **адаптацию на фронте** через селекторы/трансформеры в RTK Query.`,
          },
        ],
        keywords: [
          "Scrum",
          "code review",
          "refinement",
          "декомпозиция",
          "демо",
        ],
      },
      {
        id: "self-hardest",
        tag: "ВИК-ИНДУСТРИ",
        hot: true,
        question: "Расскажи про самую сложную задачу",
        summary:
          "Оптимизация каталога на 5000+ SKU. Профилирование → виртуализация → мемоизация → нормализация → кеширование. Метрики: DOM -90%, рендер +60%, отклик 200-300мс.",
        details: [
          {
            type: "text",
            content: `Самой сложной задачей была **оптимизация каталога**. По мере роста ассортимента до 5 000+ SKU страница начала заметно тормозить: при изменении фильтров происходили тяжёлые re-render'ы, создавалось слишком много DOM-элементов, часть запросов к API выполнялась повторно.

Моей задачей было найти **основные bottleneck'и** и ускорить каталог **без изменения бизнес-логики** фильтрации, сортировки и карточек товаров.`,
          },
          {
            type: "bullets",
            items: [
              "**Профилирование**: через React DevTools Profiler определил компоненты с наибольшим числом перерисовок",
              "**Разделение состояния**: вынес тяжёлые вычисления в memoized selectors",
              "**Мемоизация**: React.memo и useMemo там, где это реально давало эффект",
              "**Виртуализация**: внедрил виртуализацию — в DOM только видимые элементы",
              "**Серверные данные**: перенёс на RTK Query — кеширование, дедупликация, prefetching",
            ],
          },
          {
            type: "tip",
            content:
              "Результат: DOM-узлы -90%, рендер +60%, отклик фильтрации 200-300мс, меньше повторных запросов к API. Стабильная работа на слабых устройствах.",
          },
          {
            type: "code",
            title: "Виртуализация списка товаров",
            lang: "tsx",
            content: `import { useVirtualizer } from '@tanstack/react-virtual';
import { useRef } from 'react';

function ProductList({ products }: { products: Product[] }) {
  const parentRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: products.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 220, // высота карточки
    overscan: 5,
  });

  return (
    <div ref={parentRef} style={{ height: '600px', overflow: 'auto' }}>
      <div style={{ height: virtualizer.getTotalSize(), position: 'relative' }}>
        {virtualizer.getVirtualItems().map((virtualRow) => {
          const product = products[virtualRow.index];
          return (
            <div
              key={product.id}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: virtualRow.size + 'px',
                transform: \`translateY(\${virtualRow.start}px)\`,
              }}
            >
              <ProductCard product={product} />
            </div>
          );
        })}
      </div>
    </div>
  );
}`,
          },
        ],
        followUps: [
          {
            question:
              "Почему ты выбрал именно эту библиотеку для виртуализации?",
            answer: `В проекте уже использовалась **React Virtualized**, и она работала для наших карточек фиксированной высоты. Если бы начинал с нуля в 2026 — выбрал бы **TanStack Virtual**: она headless, легче (~5 КБ), не тащит свои стили, и отлично работает с **динамической высотой** через \`measureElement\`. React Virtualized к 2026 году практически не обновляется.`,
          },
          {
            question: "Как ты определял, что именно тормозит?",
            answer: `Использовал **React DevTools Profiler** с записью взаимодействия. Смотрел на **коммиты** — какие компоненты рендерились чаще всего и сколько времени занимал каждый. Также **Performance-панель в DevTools** для анализа Long Tasks и времени на Layout/Paint. В 2026 также можно использовать **React Compiler DevTools** для отслеживания автоматических мемоизаций.`,
          },
          {
            question: "Что было самым сложным в этой оптимизации?",
            answer: `Самым сложным было **нормализовать состояние каталога** без ломания существующей логики. Селекторы нужно было переписать так, чтобы они возвращали **стабильные ссылки** и не вызывали лишние ререндеры. Это потребовало аккуратной работы с **createSelector** из Reselect.`,
          },
        ],
        keywords: [
          "Profiler",
          "bottleneck",
          "виртуализация",
          "мемоизация",
          "нормализация",
          "метрики",
        ],
      },
      {
        id: "self-mistake",
        tag: null,
        hot: true,
        question: "Расскажи о своей самой большой ошибке на работе",
        summary:
          "STAR: преждевременная оптимизация. Переусложнил архитектуру, потом упрощал. Урок: начинай просто, оптимизируй по метрикам.",
        details: [
          {
            type: "bullets",
            items: [
              "**S**: На новом проекте сразу заложил сложную архитектуру «на вырост» (много слоёв абстракций, паттерны)",
              "**T**: Сделать код масштабируемым с самого начала",
              "**A**: Переусложнил — добавил абстракции, которые не понадобились. Команда тратила время на понимание лишней сложности",
              "**R**: Пришлось **упрощать** через несколько месяцев. Урок: **YAGNI** (You Aren't Gonna Need It) — начинай просто, оптимизируй когда появятся реальные требования и метрики",
            ],
          },
        ],
        followUps: [
          {
            question: "Как ты теперь подходишь к архитектурным решениям?",
            answer: `Сначала **минимально жизнеспособная архитектура**. Добавляю сложности только когда появляются **конкретные требования** или **метрики** показывают bottleneck. Делаю **ADR** (Architecture Decision Records) для важных решений, чтобы команда понимала контекст.`,
          },
        ],
        keywords: [
          "YAGNI",
          "преждевременная оптимизация",
          "упрощение",
          "ADR",
          "метрики",
        ],
      },
      {
        id: "self-achievement",
        tag: "ВИК-ИНДУСТРИ",
        hot: false,
        question: "Чем ты больше всего гордишься на текущем проекте?",
        summary:
          "Системное улучшение производительности каталога. Не разовая задача, а культура: метрики, мониторинг, документация для команды.",
        details: [
          {
            type: "text",
            content: `Больше всего горжусь не просто **оптимизацией каталога** (хотя метрики впечатляющие), а тем, что создал **системный подход** к производительности:

• Настроил **мониторинг** Web Vitals в продакшене
• Написал **гайдлайны** по производительности для команды
• Провёл **воркшоп** по профилированию

Теперь команда **самостоятельно** следит за метриками и предотвращает регрессии, а не реагирует на проблемы постфактум.`,
          },
          {
            type: "tip",
            content:
              "Показываешь, что думаешь системно, а не просто «закрыл таску». Это senior-уровень.",
          },
        ],
        keywords: [
          "системный подход",
          "мониторинг",
          "гайдлайны",
          "воркшоп",
          "культура",
        ],
      },
      {
        id: "self-strengths-weaknesses",
        tag: null,
        hot: true,
        question: "Какие твои сильные и слабые стороны?",
        summary:
          "Сильные: системное мышление, производительность, менторство. Слабые: перфекционизм (работаю над этим через timeboxing).",
        details: [
          {
            type: "bullets",
            items: [
              "**Сильные стороны:**",
              "• **Системное мышление** — вижу картину целиком, думаю о масштабируемости",
              "• **Производительность** — умею профилировать и оптимизировать",
              "• **Менторство** — могу объяснить сложное просто, помочь junior'ам расти",
              "• **Коммуникация** — нахожу общий язык с бэкендом, дизайном, бизнесом",
              "",
              "**Слабые стороны:**",
              "• **Перфекционизм** — иногда трачу слишком много времени на «идеальное» решение",
              "• **Работаю над этим**: использую **timeboxing** (ограничение времени на задачу) и принцип **«good enough»**",
              "• Пример: раньше мог 3 часа выбирать библиотеку, теперь — 30 минут + POC",
            ],
          },
        ],
        followUps: [
          {
            question: "Как ты понял, что перфекционизм — это проблема?",
            answer: `Заметил, что **сроки страдали**: тратил время на полировку кода, который и так работал хорошо. Начал спрашивать себя: «Это **реально** влияет на пользователя или я просто хочу красивый код?». Теперь фокусируюсь на **ценности**, а не на идеальности.`,
          },
        ],
        keywords: [
          "системное мышление",
          "перфекционизм",
          "timeboxing",
          "good enough",
        ],
      },
    ],
  },

  // ════════════════════════════════════════
  //  2. REACT 19 + 2026 (НОВОЕ!)
  // ════════════════════════════════════════
  {
    id: "react19",
    title: "React 19 и 2026",
    icon: "⚛️",
    accent: "#61dafb",
    questions: [
      {
        id: "r19-compiler",
        tag: null,
        hot: true,
        question: "Что такое React Compiler и как он меняет оптимизацию?",
        summary:
          "React Compiler автоматически мемоизирует компоненты и значения. Ручные useMemo, useCallback и React.memo часто больше не нужны. Включается через babel-плагин.",
        details: [
          {
            type: "text",
            content: `**React Compiler** (бывший React Forget) — это инструмент, который **автоматически** определяет, какие значения и компоненты нужно мемоизировать, и делает это за тебя на этапе компиляции.

До Compiler ты вручную оборачивал дорогие вычисления в \`useMemo\`, колбэки в \`useCallback\`, компоненты в \`React.memo\`. Теперь компилятор делает это **автоматически**, анализируя поток данных.

**Что это значит на практике:**`,
          },
          {
            type: "bullets",
            items: [
              "**useMemo / useCallback** — больше не нужны для оптимизации ре-рендеров. Компилятор сам решает, что мемоизировать",
              "**React.memo** — не нужен. Компилятор автоматически пропускает ре-рендер компонента, если пропсы не изменились",
              "**Зависимости** — компилятор сам отслеживает зависимости, не нужно вручную писать массивы",
              "**Стабильные ссылки** — компилятор гарантирует, что объекты и функции не пересоздаются без необходимости",
            ],
          },
          {
            type: "code",
            title: "До и после React Compiler",
            lang: "tsx",
            content: `// ❌ ДО Compiler: ручная мемоизация
function CatalogGrid({ products, filters }) {
  const filtered = useMemo(
    () => products.filter(p => matchesFilters(p, filters)),
    [products, filters]
  );

  const handleAdd = useCallback((id: string) => {
    addToCart(id);
  }, []);

  return (
    <div>
      {filtered.map(p => (
        <ProductCard key={p.id} product={p} onAdd={handleAdd} />
      ))}
    </div>
  );
}
export default React.memo(CatalogGrid);

// ✅ ПОСЛЕ Compiler: просто пиши код
function CatalogGrid({ products, filters }) {
  const filtered = products.filter(p => matchesFilters(p, filters));

  const handleAdd = (id: string) => {
    addToCart(id);
  };

  return (
    <div>
      {filtered.map(p => (
        <ProductCard key={p.id} product={p} onAdd={handleAdd} />
      ))}
    </div>
  );
}`,
          },
          {
            type: "tip",
            content:
              "React Compiler включается через `babel-plugin-react-compiler` в конфиге бандлера. В твоём проекте на Vite 8 + @vitejs/plugin-react 6 его можно добавить как опциональный плагин. Но он пока не включён по умолчанию из-за влияния на скорость сборки.",
          },
        ],
        followUps: [
          {
            question: "Значит ли это, что знания о мемоизации больше не нужны?",
            answer: `Нет, **понимание** мемоизации по-прежнему критично. Компилятор покрывает ~90% кейсов, но для сложных паттернов (условная мемоизация, кастомные хуки с побочными эффектами) ручная оптимизация всё ещё нужна. На собеседовании спрашивают **принципы**, а не синтаксис.`,
          },
          {
            question:
              "Как React Compiler влияет на твой опыт оптимизации каталога?",
            answer: `Если бы я делал ту оптимизацию в 2026 с Compiler, я бы **не тратил время** на оборачивание каждой карточки в React.memo и каждого селектора в createSelector. Компилятор сделал бы это автоматически. Но **виртуализация**, **нормализация данных** и **RTK Query** — это по-прежнему ручная работа, Compiler их не заменяет.`,
          },
        ],
        keywords: [
          "React Compiler",
          "автомемоизация",
          "babel-плагин",
          "useMemo не нужен",
        ],
      },
      {
        id: "r19-actions",
        tag: null,
        hot: true,
        question: "Что такое Actions и useActionState в React 19?",
        summary:
          "Actions — новый способ обработки форм и мутаций. Форма использует проп action вместо onSubmit. useActionState управляет состоянием отправки.",
        details: [
          {
            type: "text",
            content: `В React 19 появился новый подход к обработке форм и мутаций данных.

**Раньше:** ты писал \`<form onSubmit={handleSubmit}>\`, внутри \`handleSubmit\` делал \`preventDefault\`, управлял \`isLoading\`, \`error\` через useState.

**Теперь:** форма принимает проп \`action\`, который может быть **асинхронной функцией**. React сам управляет состоянием отправки.`,
          },
          {
            type: "code",
            title: "useActionState для формы обратной связи",
            lang: "tsx",
            content: `import { useActionState } from 'react';

async function submitFeedback(prevState: any, formData: FormData) {
  try {
    const message = formData.get('message') as string;
    await fetch('/api/feedback', {
      method: 'POST',
      body: JSON.stringify({ message }),
    });
    return { success: true, message: 'Отправлено!' };
  } catch (error) {
    return { success: false, message: 'Ошибка отправки' };
  }
}

function FeedbackForm() {
  const [state, formAction, isPending] = useActionState(
    submitFeedback,
    { success: false, message: '' }
  );

  return (
    <form action={formAction}>
      <textarea name="message" required />
      <button disabled={isPending}>
        {isPending ? 'Отправка...' : 'Отправить'}
      </button>
      {state.message && <p>{state.message}</p>}
    </form>
  );
}`,
          },
          {
            type: "bullets",
            items: [
              "**action** на форме — вместо onSubmit + preventDefault",
              "**useActionState** — управляет состоянием, ошибкой, isPending",
              "**useOptimistic** — показывает оптимистичный результат до завершения запроса",
              "**useFormStatus** — даёт статус формы в дочерних компонентах",
              "Поддержка **прогрессивного улучшения**: работает даже без JS",
            ],
          },
        ],
        followUps: [
          {
            question:
              "Как это соотносится с React Hook Form и Zod, которые ты использовал?",
            answer: `**React Hook Form** по-прежнему актуален для сложных форм с множеством полей и кастомной валидацией. **Actions** — для простых форм, где не нужен сложный контроль. **Zod** остаётся для валидации данных в обоих случаях. В 2026 они не конкурируют, а дополняют друг друга.`,
          },
        ],
        keywords: [
          "Actions",
          "useActionState",
          "useOptimistic",
          "useFormStatus",
          "form action",
        ],
      },
      {
        id: "r19-use-hook",
        tag: null,
        hot: true,
        question: "Что делает хук use() в React 19?",
        summary:
          "use() читает промисы и контекст прямо в рендере. Для промисов интегрируется с Suspense. Это НЕ замена useEffect.",
        details: [
          {
            type: "code",
            title: "use() для чтения промиса и контекста",
            lang: "tsx",
            content: `import { use, Suspense } from 'react';

// Чтение промиса с Suspense
function ProductDetails({ productPromise }) {
  const product = use(productPromise); // приостанавливает до резолва
  return <h2>{product.name}</h2>;
}

function App() {
  const productPromise = fetchProduct(42);
  return (
    <Suspense fallback={<Spinner />}>
      <ProductDetails productPromise={productPromise} />
    </Suspense>
  );
}

// Чтение контекста (в т.ч. условно!)
function ThemeLabel() {
  const theme = use(ThemeContext); // можно даже в if!
  return <span>{theme}</span>;
}`,
          },
          {
            type: "bullets",
            items: [
              "**use()** можно вызывать **внутри условий и циклов** (в отличие от других хуков)",
              "Для промисов: приостанавливает компонент, интегрируется с **Suspense**",
              "Для контекста: альтернатива **useContext**, но гибче",
              "**НЕ является заменой** useEffect для побочных эффектов",
            ],
          },
        ],
        followUps: [
          {
            question:
              "Почему use() можно вызывать в условиях, а useState нельзя?",
            answer: `Потому что **use() не является хуком** в традиционном смысле. Он не создаёт состояние и не привязывается к позиции в дереве хуков. Для промисов он работает через механизм **Suspense** (бросает промис), для контекста — просто читает значение. Поэтому правила хуков на него не распространяются.`,
          },
        ],
        keywords: [
          "use()",
          "Suspense",
          "промисы в рендере",
          "условный контекст",
        ],
      },
      {
        id: "r19-use-optimistic",
        tag: null,
        hot: false,
        question: "Что делает useOptimistic?",
        summary:
          "Показывает оптимистичное состояние до завершения асинхронной операции. Автоматически откатывается при ошибке.",
        details: [
          {
            type: "code",
            title: "useOptimistic для добавления в корзину",
            lang: "tsx",
            content: `import { useOptimistic, useActionState } from 'react';

function CartButton({ productId, isInCart }) {
  const [optimisticInCart, setOptimistic] = useOptimistic(
    isInCart,
    (currentState, newValue: boolean) => newValue
  );

  async function toggleCart() {
    setOptimistic(!optimisticInCart); // мгновенный UI
    await fetch(\`/api/cart/\${productId}\`, {
      method: optimisticInCart ? 'DELETE' : 'POST',
    });
  }

  return (
    <button onClick={toggleCart}>
      {optimisticInCart ? '✓ В корзине' : 'Добавить'}
    </button>
  );
}`,
          },
          {
            type: "tip",
            content:
              "useOptimistic автоматически откатывает значение, когда промис резолвится или реджектится. Это заменяет ручной паттерн с useState + try/catch/finally.",
          },
        ],
        followUps: [
          {
            question:
              "Как это соотносится с оптимистичными обновлениями в RTK Query?",
            answer: `В **RTK Query** оптимистичные обновления делаются через \`onQueryStarted\` + \`patchResult.undo()\`. **useOptimistic** — для локального состояния. Если у тебя серверное состояние через RTK Query, используй их механизм. Если локальное — useOptimistic.`,
          },
        ],
        keywords: ["useOptimistic", "оптимистичный UI", "автооткат"],
      },
      {
        id: "r19-ref-prop",
        tag: null,
        hot: false,
        question: "Что изменилось с ref в React 19?",
        summary:
          "ref теперь можно передавать как обычный проп, без forwardRef. forwardRef устарел.",
        details: [
          {
            type: "code",
            title: "ref как проп (без forwardRef)",
            lang: "tsx",
            content: `// ❌ Раньше: нужен был forwardRef
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => <input ref={ref} {...props} />
);

// ✅ В React 19: ref — обычный проп
function Input({ ref, ...props }: InputProps & { ref?: React.Ref<HTMLInputElement> }) {
  return <input ref={ref} {...props} />;
}

// Использование
function Form() {
  const inputRef = useRef<HTMLInputElement>(null);
  return <Input ref={inputRef} placeholder="Имя" />;
}`,
          },
          {
            type: "tip",
            content:
              "React 19.2.7 (который у тебя в проекте) полностью поддерживает ref как проп. `forwardRef` всё ещё работает, но помечен как legacy. В новых компонентах используй ref как проп.",
          },
        ],
        followUps: [
          {
            question: "Нужно ли мигрировать все компоненты с forwardRef?",
            answer: `Нет, **не срочно**. \`forwardRef\` продолжает работать. Но в **новых** компонентах используй ref как проп. Миграцию можно делать постепенно при рефакторинге.`,
          },
        ],
        keywords: ["ref как проп", "без forwardRef", "legacy"],
      },
    ],
  },

  // ════════════════════════════════════════
  //  3. АРХИТЕКТУРА И REACT CORE
  // ════════════════════════════════════════
  {
    id: "architecture",
    title: "Архитектура и React",
    icon: "🏗️",
    accent: "#61dafb",
    questions: [
      {
        id: "arch-fsd",
        tag: "ВИК-ИНДУСТРИ",
        hot: true,
        question: "Что такое Feature-Sliced Design и как ты его применял?",
        summary:
          "Архитектурная методология: слои (app, pages, widgets, features, entities, shared). В 2026 активно развивается, есть CLI (steiger), ESLint-плагины.",
        details: [
          {
            type: "text",
            content: `**Feature-Sliced Design (FSD)** — это методология организации кода по **слоям** и **слайсам**. Каждый слой имеет свою зону ответственности и может импортировать только из слоёв ниже.

В 2026 FSD активно развивается: есть **steiger** (CLI для проверки импортов), **filesystem** утилиты, интеграция с ESLint. Методология используется в enterprise-проектах.

В нашем проекте использовалась структура:`,
          },
          {
            type: "bullets",
            items: [
              "**app** — инициализация, провайдеры, роутер",
              "**pages** — страницы (Каталог, Карточка товара, Корзина)",
              "**widgets** — крупные блоки (шапка, футер, сайдбар фильтров)",
              "**features** — пользовательские сценарии (фильтрация, добавление в корзину)",
              "**entities** — бизнес-сущности (Product, Category, Cart)",
              "**shared** — переиспользуемые утилиты, UI-кит, API-клиент",
            ],
          },
          {
            type: "code",
            title: "Структура проекта по FSD",
            lang: "text",
            content: `src/
├── app/                    # инициализация
│   ├── providers/
│   └── styles/
├── pages/
│   ├── catalog/
│   │   ├── ui/            # страница каталога
│   │   └── index.ts
│   └── product/
├── features/
│   ├── catalog-filters/
│   │   ├── ui/            # компонент фильтров
│   │   ├── model/         # состояние фильтров
│   │   └── lib/
│   └── add-to-cart/
├── entities/
│   ├── product/
│   │   ├── ui/            # ProductCard
│   │   ├── model/         # типы, слайс
│   │   └── api/           # запросы
│   └── category/
└── shared/
    ├── ui/                # Button, Input, Modal
    ├── api/               # baseQuery, конфиг
    └── lib/               # утилиты`,
          },
          {
            type: "tip",
            content:
              "Главное правило FSD: слой может импортировать только из слоёв ниже. В 2026 это проверяется через `steiger` (CLI) или ESLint-плагины. Это предотвращает циклические зависимости.",
          },
        ],
        followUps: [
          {
            question: "Какая проблема была до FSD?",
            answer: `До FSD код лежал в папках по типу (components, utils, hooks). При росте проекта стало сложно понять, **где лежит бизнес-логика** конкретной фичи. Компоненты тянули зависимости из неожиданных мест. FSD дал **понятную структуру** и ограничения на импорты.`,
          },
          {
            question: "Как enforced правило импортов между слоями?",
            answer: `Через **steiger** (официальный CLI от FSD) или **ESLint-плагины** (eslint-plugin-boundaries). Они проверяют импорты и падают в CI, если страница импортирует другую страницу или shared тянет из features. В 2026 steiger — рекомендуемый инструмент.`,
          },
        ],
        keywords: [
          "слои",
          "слайсы",
          "импорты",
          "steiger",
          "переиспользуемость",
        ],
      },
      {
        id: "arch-rerenders",
        tag: "ВИК-ИНДУСТРИ",
        hot: true,
        question: "Как ты боролся с лишними re-render'ами?",
        summary:
          "Профилирование → нормализация state → мемоизация селекторов → React.memo → стабильные ссылки. В 2026: React Compiler автоматизирует большую часть этого.",
        details: [
          {
            type: "text",
            content: `Борьба с лишними ре-рендерами — это **системный процесс**, а не точечное применение \`React.memo\`. Мой подход:

**Важно для 2026:** С **React Compiler** большая часть ручной мемоизации (useMemo, useCallback, React.memo) становится ненужной. Но **нормализация данных**, **стабильные ссылки** и **виртуализация** остаются актуальными.`,
          },
          {
            type: "bullets",
            items: [
              "**1. Профилирование** — найти, ЧТО именно ререндерится. React DevTools Profiler",
              "**2. Нормализация данных** — вместо вложенных объектов использовать плоскую структуру \`byId\` + \`allIds\`",
              "**3. Мемоизация селекторов** — \`createSelector\` из Reselect/RTK, чтобы возвращать стабильные ссылки",
              "**4. Разделение состояния** — фильтры, пагинация, данные в разных слайсах",
              "**5. Точечная мемоизация** — \`React.memo\` для компонентов списка (или автоматическая через Compiler)",
            ],
          },
          {
            type: "code",
            title: "Нормализация + мемоизация селектора",
            lang: "typescript",
            content: `// Нормализованное состояние
interface CatalogState {
  byId: Record<string, Product>;
  allIds: string[];
  filters: FilterState;
  pagination: { page: number; pageSize: number };
}

// Мемоизированный селектор: вернёт ту же ссылку,
// если входные данные не изменились
const selectFilteredProducts = createSelector(
  [
    (state: RootState) => state.catalog.byId,
    (state: RootState) => state.catalog.allIds,
    (state: RootState) => state.catalog.filters,
  ],
  (byId, allIds, filters) => {
    return allIds
      .map(id => byId[id])
      .filter(product => matchesFilters(product, filters));
  }
);

// В компоненте
function CatalogGrid() {
  const products = useSelector(selectFilteredProducts);
  // Перерендер только если реально изменились данные или фильтры
  return <ProductList products={products} />;
}`,
          },
        ],
        followUps: [
          {
            question:
              "Приведи пример, когда селектор создавал новый объект при каждом вызове?",
            answer: `Классика: \`state => state.items.filter(...)\` — **filter всегда возвращает новый массив**, поэтому ссылка меняется каждый раз. \`useSelector\` сравнивает по ссылке (\`===\`), видит «изменение» и ререндерит. Решение — обернуть в \`createSelector\`, который кеширует результат.`,
          },
          {
            question:
              "Если бы у тебя был React Compiler, нужна ли была ручная мемоизация?",
            answer: `**Частично нет.** Compiler автоматически мемоизировал бы компоненты и значения. Но **createSelector** для Redux-селекторов всё равно нужен — Compiler не знает про Redux. **Виртуализация** и **нормализация** — тоже ручная работа.`,
          },
        ],
        keywords: [
          "Profiler",
          "нормализация",
          "createSelector",
          "стабильная ссылка",
          "React Compiler",
        ],
      },
      {
        id: "arch-normalization",
        tag: "ВИК-ИНДУСТРИ",
        hot: true,
        question: "Как ты нормализовал состояние каталога в Redux?",
        summary:
          "Плоская структура: byId (Record) + allIds (массив). Обновление одного товара = замена одного объекта в byId, без глубокого клонирования.",
        details: [
          {
            type: "text",
            content: `До нормализации каталог хранился как **вложенный массив**. Любое обновление одного товара требовало **глубокого клонирования** всего массива.

После нормализации — **плоская структура**, как в реляционной БД. В **RTK** это делается через \`createEntityAdapter\`.`,
          },
          {
            type: "code",
            title: "Нормализация в Redux Toolkit",
            lang: "typescript",
            content: `import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

// EntityAdapter автоматически создаёт byId + allIds
const productsAdapter = createEntityAdapter<Product>({
  selectId: (product) => product.id,
  sortComparer: (a, b) => a.name.localeCompare(b.name),
});

const initialState = productsAdapter.getInitialState({
  status: 'idle',
  filters: { category: null, priceRange: null },
  pagination: { page: 1, pageSize: 50, total: 0 },
});

const catalogSlice = createSlice({
  name: 'catalog',
  initialState,
  reducers: {
    // Обновление одного товара — O(1)
    updateProduct: (state, action) => {
      productsAdapter.updateOne(state, {
        id: action.payload.id,
        changes: action.payload.changes,
      });
    },
    // Добавление пачки товаров
    addProducts: (state, action) => {
      productsAdapter.upsertMany(state, action.payload);
    },
  },
});

// Автогенерируемые селекторы
export const {
  selectAll: selectAllProducts,
  selectById: selectProductById,
  selectIds: selectProductIds,
} = productsAdapter.getSelectors(
  (state: RootState) => state.catalog
);`,
          },
          {
            type: "tip",
            content:
              "createEntityAdapter из RTK — это готовый инструмент нормализации. Он сам создаёт byId, allIds и набор CRUD-операций. Не нужно писать нормализацию вручную.",
          },
        ],
        followUps: [
          {
            question: "Как это повлияло на производительность?",
            answer: `Обновление одного товара стало **O(1)** вместо **O(n)**. При фильтрации не нужно клонировать весь массив — достаточно работать с \`allIds\` и \`byId\`. Это напрямую снизило количество **лишних ре-рендеров** на ~70%.`,
          },
        ],
        keywords: [
          "createEntityAdapter",
          "byId",
          "allIds",
          "O(1)",
          "upsertMany",
        ],
      },
    ],
  },

  // ════════════════════════════════════════
  //  4. ДАННЫЕ И КЭШИРОВАНИЕ
  // ════════════════════════════════════════
  {
    id: "data",
    title: "RTK Query и данные",
    icon: "🔄",
    accent: "#b58df2",
    questions: [
      {
        id: "data-rtkq",
        tag: "ВИК-ИНДУСТРИ",
        hot: true,
        question:
          "Почему выбрал RTK Query? Как настроил кеширование и дедупликацию?",
        summary:
          "RTK Query — built-in решение в RTK. В 2026 TanStack Query v5 выигрывает вне Redux-экосистем, но для проектов на RTK — RTK Query оптимален.",
        details: [
          {
            type: "text",
            content: `RTK Query был выбран потому что:
• **Уже в стеке** — проект на Redux Toolkit, не нужна новая зависимость
• **Нормализация** — данные попадают в Redux store, доступны из любого компонента
• **Встроенное кеширование** — по умолчанию, без ручной настройки
• **Дедупликация** — если 5 компонентов одновременно запрашивают одни данные, уйдёт **один** запрос

**Актуально для 2026:** В экосистемах вне Redux **TanStack Query v5** стал стандартом де-факто. Но если проект уже на RTK — RTK Query остаётся оптимальным выбором.`,
          },
          {
            type: "code",
            title: "Настройка каталог-API в RTK Query",
            lang: "typescript",
            content: `import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const catalogApi = createApi({
  reducerPath: 'catalogApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/v1' }),
  tagTypes: ['Product', 'Category'],
  endpoints: (builder) => ({
    getProducts: builder.query<ProductList, CatalogParams>({
      query: (params) => ({
        url: '/products',
        params,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.items.map(({ id }) =>
                ({ type: 'Product' as const, id })
              ),
              { type: 'Product', id: 'LIST' },
            ]
          : [{ type: 'Product', id: 'LIST' }],
      keepUnusedDataFor: 300, // 5 минут
    }),

    getProductById: builder.query<Product, string>({
      query: (id) => \`/products/\${id}\`,
      providesTags: (_result, _err, id) =>
        [{ type: 'Product', id }],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
} = catalogApi;`,
          },
        ],
        followUps: [
          {
            question:
              "RTK Query vs TanStack Query v5 в 2026 — что выберешь для нового проекта?",
            answer: `Если проект **уже на Redux** — RTK Query. Если **новый проект** без Redux — **TanStack Query v5**. Он легче, не тянет Redux, лучше работает с SSR (особенно в Next.js App Router), поддерживает infinite queries из коробки. В 2026 это стандарт для серверного состояния.`,
          },
          {
            question: "Что такое providesTags и invalidatesTags?",
            answer: `\`providesTags\` говорит: «этот запрос предоставляет данные с такими тегами». \`invalidatesTags\` в мутации говорит: «эти теги устарели». После мутации RTK Query **автоматически перезапрашивает** все запросы с инвалидированными тегами.`,
          },
        ],
        keywords: [
          "providesTags",
          "invalidatesTags",
          "keepUnusedDataFor",
          "дедупликация",
          "TanStack Query",
        ],
      },
      {
        id: "data-prefetch",
        tag: "ВИК-ИНДУСТРИ",
        hot: true,
        question: "Как ты настроил префетчинг данных?",
        summary:
          "Prefetch следующей страницы каталога при приближении пользователя к концу текущей. Также префетч карточки товара при наведении.",
        details: [
          {
            type: "code",
            title: "Префетчинг следующей страницы и карточки товара",
            lang: "typescript",
            content: `import { catalogApi } from './catalogApi';

function CatalogPage() {
  const { data } = useGetProductsQuery(params);
  const prefetch = catalogApi.usePrefetch('getProducts');

  // Префетчим следующую страницу, когда пользователь
  // проскроллил до 80% текущей
  useEffect(() => {
    if (data && data.nextPage) {
      prefetch({ ...params, page: data.nextPage });
    }
  }, [data, prefetch]);

  return <ProductGrid products={data?.items} />;
}

// Префетч карточки товара при наведении на превью
function ProductCard({ product }) {
  const prefetchProduct = catalogApi.usePrefetch('getProductById');

  return (
    <Link
      to={\`/product/\${product.id}\`}
      onMouseEnter={() => prefetchProduct(product.id)}
    >
      {/* ... */}
    </Link>
  );
}`,
          },
          {
            type: "tip",
            content:
              "usePrefetch возвращает функцию, которая инициирует запрос и кладёт результат в кеш. Когда пользователь реально перейдёт на страницу, данные уже будут в кеше и запрос не уйдёт.",
          },
        ],
        followUps: [
          {
            question: "Не приводит ли префетчинг к лишним запросам?",
            answer: `Может привести, если префетчить **слишком агрессивно**. Поэтому я префетчил только **следующую страницу** и **только при наведении** на карточку. Также \`keepUnusedDataFor\` автоматически удаляет неиспользованные кешированные данные.`,
          },
        ],
        keywords: [
          "usePrefetch",
          "onMouseEnter",
          "keepUnusedDataFor",
          "предзагрузка",
        ],
      },
    ],
  },

  // ════════════════════════════════════════
  //  5. ПРОИЗВОДИТЕЛЬНОСТЬ
  // ════════════════════════════════════════
  {
    id: "performance",
    title: "Производительность",
    icon: "⚡",
    accent: "#ffc857",
    questions: [
      {
        id: "perf-dom",
        tag: "ВИК-ИНДУСТРИ",
        hot: true,
        question: "Как ты сократил DOM-узлы на 90%?",
        summary:
          "Виртуализация: вместо 5000 карточек в DOM рендерятся только видимые (~20-30). В 2026 рекомендуем TanStack Virtual.",
        details: [
          {
            type: "text",
            content: `До виртуализации каталог рендерил **все 5000+ карточек** одновременно. Каждая карточка — это ~15-20 DOM-элементов. Итого **~100 000 DOM-узлов**.

После внедрения виртуализации в DOM находится только **видимая область** (~20-30 карточек) + небольшой \`overscan\`. Итого **~500-700 DOM-узлов** — снижение на **90%+**.

**Актуально для 2026:** Я использовал React Virtualized. Для новых проектов рекомендую **TanStack Virtual** — она легче, поддерживает динамическую высоту и не тащит стили.`,
          },
          {
            type: "code",
            title: "Виртуализация с мемоизацией карточек",
            lang: "tsx",
            content: `import { useVirtualizer } from '@tanstack/react-virtual';
import { memo, useRef } from 'react';

// Карточка мемоизирована: не пересоздаётся,
// если пропсы не изменились
const ProductCard = memo(({ product, style }) => (
  <div style={style} className="product-card">
    <img src={product.thumbnail} alt={product.name} loading="lazy" />
    <h3>{product.name}</h3>
    <span>{product.price} ₽</span>
    <AddToCartButton productId={product.id} />
  </div>
));

function VirtualizedCatalog({ products }) {
  const parentRef = useRef<HTMLDivElement>(null);
  const virtualizer = useVirtualizer({
    count: products.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 220,
    overscan: 5,
  });

  return (
    <div ref={parentRef} style={{ height: '80vh', overflow: 'auto' }}>
      <div style={{ height: virtualizer.getTotalSize(), position: 'relative' }}>
        {virtualizer.getVirtualItems().map((virtualRow) => (
          <ProductCard
            key={products[virtualRow.index].id}
            product={products[virtualRow.index]}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: virtualRow.size + 'px',
              transform: \`translateY(\${virtualRow.start}px)\`,
            }}
          />
        ))}
      </div>
    </div>
  );
}`,
          },
        ],
        followUps: [
          {
            question: "Почему не использовал react-window?",
            answer: `React Virtualized был **уже в зависимостях** проекта. В 2026 **react-window** всё ещё легче (~6 КБ), но **TanStack Virtual** — более современный выбор: он **headless** (без своих стилей), поддерживает **динамическую высоту** через \`measureElement\`, и активно развивается.`,
          },
          {
            question: "Как виртуализация влияет на SEO?",
            answer: `Напрямую **влияет негативно**: поисковый бот не видит контент за пределами первого экрана. Решение: **серверный рендеринг** первых 50 карточек или **динамический рендеринг**. В нашем случае это был клиентский рендеринг, но SEO-страницы генерировались на бэкенде.`,
          },
        ],
        keywords: [
          "виртуализация",
          "overscan",
          "DOM-узлы",
          "мемоизация",
          "TanStack Virtual",
        ],
      },
      {
        id: "perf-profiling",
        tag: "ВИК-ИНДУСТРИ",
        hot: true,
        question: "Как ты профилировал приложение? Какие метрики смотрел?",
        summary:
          "React DevTools Profiler для ре-рендеров, Performance-панель для Long Tasks, Lighthouse для пользовательских метрик (LCP, INP, CLS).",
        details: [
          {
            type: "bullets",
            items: [
              "**React DevTools Profiler** — записывал взаимодействие (клик по фильтру), смотрел какие компоненты ререндерились и сколько времени это заняло",
              "**Performance-панель Chrome** — искал **Long Tasks** (>50мс), анализировал время на Scripting / Rendering / Painting",
              "**Lighthouse** — пользовательские метрики: **LCP** (Largest Contentful Paint), **INP** (Interaction to Next Paint), **CLS** (Cumulative Layout Shift)",
              "**Кастомные замеры** — \`performance.now()\` до и после критичных операций",
            ],
          },
          {
            type: "tip",
            content:
              "В 2026 **FID (First Input Delay) заменён на INP (Interaction to Next Paint)** как основная метрика отзывчивости. INP измеряет задержку ВСЕХ взаимодействий, а не только первого. Целевое значение: < 200мс.",
          },
          {
            type: "code",
            title: "Замер времени фильтрации",
            lang: "typescript",
            content: `const handleFilterChange = useCallback((newFilters: Filters) => {
  const start = performance.now();

  dispatch(setFilters(newFilters));

  // Замеряем после следующего кадра
  requestAnimationFrame(() => {
    const duration = performance.now() - start;
    console.log(\`Фильтрация заняла: \${duration.toFixed(1)}мс\`);

    // Отправляем в аналитику
    analytics.track('catalog_filter', {
      duration: Math.round(duration),
      filters: newFilters,
    });
  });
}, [dispatch]);`,
          },
        ],
        followUps: [
          {
            question: "Какой целевой показатель по времени отклика фильтрации?",
            answer: `Ориентир — **менее 100мс** для мгновенного отклика. Наш показатель был **200-300мс**, что приемлемо для каталога с 5000 SKU. Идеал — **16мс** (один кадр при 60fps). Для сложной фильтрации можно использовать **Web Workers** или **useTransition**.`,
          },
        ],
        keywords: [
          "Profiler",
          "Long Tasks",
          "LCP",
          "INP",
          "requestAnimationFrame",
          "100мс",
        ],
      },
    ],
  },

  // ════════════════════════════════════════
  //  6. ТЕСТИРОВАНИЕ И КАЧЕСТВО
  // ════════════════════════════════════════
  {
    id: "quality",
    title: "Тестирование и качество",
    icon: "🧪",
    accent: "#3dd68c",
    questions: [
      {
        id: "quality-playwright",
        tag: "ВИК-ИНДУСТРИ",
        hot: true,
        question: "Как ты автоматизировал тестирование через Playwright?",
        summary:
          "E2E-тесты ключевых сценариев: поиск, фильтрация, добавление в корзину. Запуск в CI/CD. Регрессионные ошибки снизились в 2 раза.",
        details: [
          {
            type: "code",
            title: "E2E тест фильтрации каталога",
            lang: "typescript",
            content: `import { test, expect } from '@playwright/test';

test.describe('Каталог товаров', () => {
  test('фильтрация по категории', async ({ page }) => {
    await page.goto('/catalog');

    // Ждём загрузку товаров
    await expect(page.locator('[data-testid="product-card"]'))
      .toHaveCount({ minimum: 1 });

    // Применяем фильтр по категории
    await page.click('[data-testid="filter-category-soft"]');

    // Проверяем что показаны только товары категории
    const cards = page.locator('[data-testid="product-card"]');
    await expect(cards).not.toHaveCount(0);

    // Проверяем что все видимые карточки имеют тег категории
    const categories = await page
      .locator('[data-testid="product-category"]')
      .allTextContents();

    expect(categories.every(c => c === 'Мягкая мебель'))
      .toBeTruthy();
  });
});`,
          },
          {
            type: "bullets",
            items: [
              "Тесты запускаются в **CI/CD** при каждом pull request",
              "Покрытие **ключевых пользовательских сценариев**, а не каждой кнопки",
              "Использовал **data-testid** атрибуты для стабильных селекторов",
              "Параллельный запуск тестов для скорости",
            ],
          },
        ],
        followUps: [
          {
            question: "Почему Playwright, а не Cypress?",
            answer: `Playwright поддерживает **несколько браузеров** (Chromium, Firefox, WebKit) из коробки. У него **лучшая работа с параллельным запуском** и **автоматическим ожиданием** элементов. В 2026 Playwright — стандарт для E2E тестирования.`,
          },
          {
            question: "Как тесты повлияли на скорость релизов?",
            answer: `Тесты **добавили ~5 минут** к CI-пайплайну, но **сократили время на ручное тестирование** и количество багов на проде. В итоге релизы стали **быстрее и безопаснее**.`,
          },
        ],
        keywords: [
          "E2E",
          "data-testid",
          "CI/CD",
          "параллельный запуск",
          "регрессия",
        ],
      },
    ],
  },

  // ════════════════════════════════════════
  //  7. AMOCRM (Next.js)
  // ════════════════════════════════════════
  {
    id: "amo",
    title: "amoCRM (Next.js)",
    icon: "🏢",
    accent: "#4a9eff",
    questions: [
      {
        id: "amo-ssr",
        tag: "amoCRM",
        hot: false,
        question: "[amoCRM] Как ты настроил SSR в Next.js?",
        summary:
          "SSR для ключевых разделов, кеширование, корректная гидрация. В 2026: Next.js 16, App Router — стандарт, Turbopack стабилен.",
        details: [
          {
            type: "text",
            content: `В CRM-системе для строительного бизнеса использовал **серверную загрузку данных** для ключевых разделов: дашборды, финансовые таблицы.

**Актуально для 2026:**
• **Next.js 16** — текущая стабильная версия
• **App Router** — стандарт де-факто (не Pages Router)
• **Turbopack** — стабилен в продакшене, заменяет Webpack
• **Server Actions** — зрелый механизм для мутаций
• **Cache Components** — новый API для управления кешем
• **React 19.2** — встроен в Next.js 16`,
          },
          {
            type: "code",
            title: "SSR с кешированием в Next.js (App Router)",
            lang: "tsx",
            content: `// app/dashboard/page.tsx (Next.js 16 App Router)

// Серверный компонент — выполняется на сервере
async function DashboardPage({ searchParams }) {
  const { period = 'month' } = await searchParams;

  // Загружаем данные на сервере
  const metrics = await fetch(\`/api/metrics?period=\${period}\`, {
    next: { revalidate: 60 }, // ISR: ревалидация каждые 60 сек
  }).then(res => res.json());

  return (
    <div>
      <DashboardCharts data={metrics} />
      <FinancialTable data={metrics.payments} />
    </div>
  );
}

// Клиентский компонент для интерактивности
'use client';
function DashboardCharts({ data }) {
  // Интерактивные графики на клиенте
  return <RechartsDashboard data={data} />;
}`,
          },
          {
            type: "tip",
            content:
              "В Next.js 16 App Router серверные компоненты — по умолчанию. Клиентские помечаются директивой 'use client'. Это меняет архитектуру: данные загружаются на сервере, интерактивность — на клиенте.",
          },
        ],
        followUps: [
          {
            question: "Почему не использовал статическую генерацию (SSG)?",
            answer: `CRM-система показывает **персональные данные** пользователя: его объекты, выплаты, задолженности. Эти данные **разные для каждого пользователя**. SSG не подходит — нужна серверная обработка с **аутентификацией**.`,
          },
          {
            question: "Что изменилось бы, если бы ты делал этот проект в 2026?",
            answer: `Использовал бы **Next.js 16** с **App Router**, **Server Actions** для мутаций, **Cache Components** для управления кешем. **Turbopack** для быстрой разработки. **React 19** с Actions для форм. Это дало бы лучшую производительность и меньший клиентский бандл.`,
          },
        ],
        keywords: [
          "App Router",
          "Server Components",
          "Turbopack",
          "Server Actions",
          "Next.js 16",
        ],
      },
      {
        id: "amo-table",
        tag: "amoCRM",
        hot: false,
        question:
          "[amoCRM] Как оптимизировал большие таблицы через TanStack Table?",
        summary:
          "Виртуализация + пагинация для таблиц с выплатами. Время отображения крупных выборок -60%.",
        details: [
          {
            type: "code",
            title: "TanStack Table с виртуализацией",
            lang: "tsx",
            content: `import { useReactTable, getCoreRowModel } from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';

function PaymentsTable({ payments }: { payments: Payment[] }) {
  const tableContainerRef = useRef<HTMLDivElement>(null);

  const table = useReactTable({
    data: payments,
    columns: paymentColumns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    pageCount: totalPageCount,
  });

  const { rows } = table.getRowModel();

  const virtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => tableContainerRef.current,
    estimateSize: () => 48,
    overscan: 10,
  });

  return (
    <div ref={tableContainerRef} className="h-[600px] overflow-auto">
      <div style={{ height: virtualizer.getTotalSize() }}>
        {virtualizer.getVirtualItems().map((virtualRow) => {
          const row = rows[virtualRow.index];
          return (
            <div
              key={row.id}
              style={{
                position: 'absolute',
                top: 0,
                transform: \`translateY(\${virtualRow.start}px)\`,
                height: \`\${virtualRow.size}px\`,
                width: '100%',
              }}
            >
              {/* Рендер строки */}
            </div>
          );
        })}
      </div>
    </div>
  );
}`,
          },
        ],
        followUps: [
          {
            question:
              "Почему TanStack Table, а не AG Grid или Material UI Table?",
            answer: `TanStack Table **headless** — не навязывает UI, только логику. Это дало полный контроль над внешним видом под дизайн-систему проекта. **Меньший размер бандла** по сравнению с AG Grid. Material UI Table не поддерживал виртуализацию из коробки.`,
          },
        ],
        keywords: ["headless", "виртуализация", "manualPagination", "overscan"],
      },
      {
        id: "amo-jest",
        tag: "amoCRM",
        hot: false,
        question: "[amoCRM] Как ты довёл покрытие Jest до 87%?",
        summary:
          "Тестирование критичных helpers и функций преобразования данных. Покрытие тестируемых модулей 87%, регрессии -50%.",
        details: [
          {
            type: "code",
            title: "Jest тесты для форматтеров и трансформеров",
            lang: "typescript",
            content: `import { formatCurrency, transformPayment } from './formatters';

describe('formatCurrency', () => {
  it('форматирует число в рубли', () => {
    expect(formatCurrency(1234567)).toBe('1 234 567 ₽');
  });

  it('обрабатывает null и undefined', () => {
    expect(formatCurrency(null)).toBe('0 ₽');
    expect(formatCurrency(undefined)).toBe('0 ₽');
  });
});

describe('transformPayment', () => {
  it('преобразует API-ответ в формат таблицы', () => {
    const apiData = {
      payment_id: 'p-1',
      amount_cents: 150000,
      created_at: '2024-01-15T10:00:00Z',
      status: 'completed',
    };

    const result = transformPayment(apiData);

    expect(result).toEqual({
      id: 'p-1',
      amount: 1500,
      date: '15.01.2024',
      status: 'Оплачено',
    });
  });
});`,
          },
          {
            type: "tip",
            content:
              "Не гонись за 100% покрытием. Фокус на критичной логике: форматтеры, трансформеры, валидаторы. Это те места, где баги стоят дороже всего.",
          },
        ],
        followUps: [
          {
            question: "Что ты НЕ тестировал и почему?",
            answer: `Не тестировал **простые UI-компоненты** — их поведение проверяется через E2E-тесты. Не тестировал **константы и типы** — там нет логики. Фокус был на **чистых функциях**, которые преобразуют данные.`,
          },
        ],
        keywords: ["чистые функции", "форматтеры", "покрытие", "регрессия"],
      },
    ],
  },

  // ════════════════════════════════════════
  //  8. SYSTEM DESIGN
  // ════════════════════════════════════════
  {
    id: "design",
    title: "System Design",
    icon: "📐",
    accent: "#ff8a3d",
    questions: [
      {
        id: "design-catalog",
        tag: "Оба",
        hot: true,
        question: "Спроектируй каталог товаров на 5000+ SKU",
        summary:
          "Клиентская архитектура: нормализация, виртуализация, серверная фильтрация, кеширование, префетчинг.",
        details: [
          {
            type: "bullets",
            items: [
              "**Клиент — данные**: нормализованный store (byId + allIds), RTK Query для запросов с кешированием",
              "**Клиент — рендеринг**: виртуализация списка, мемоизация карточек, lazy loading изображений",
              "**Клиент — фильтрация**: серверная (запрос к бэку с параметрами), клиентская только для мгновенных изменений",
              "**Сервер — пагинация**: курсорная или offset, размер страницы 50-100",
              "**Сервер — фильтрация**: индексы в БД на фильтруемые поля, кеш результатов",
              "**CDN**: изображения товаров через CDN с адаптивными размерами",
            ],
          },
          {
            type: "code",
            title: "Архитектура запроса к каталогу",
            lang: "typescript",
            content: `interface CatalogParams {
  category?: string;
  priceMin?: number;
  priceMax?: number;
  sortBy?: 'price' | 'name' | 'popularity';
  sortOrder?: 'asc' | 'desc';
  page: number;
  limit: number;
}

// GET /api/products?category=sofa&priceMin=10000&page=1&limit=50
interface CatalogResponse {
  items: Product[];
  pagination: {
    page: number;
    limit: number;
    total: number,
    totalPages: number,
  };
  filters: {
    categories: CategoryCount[];
    priceRange: { min: number; max: number };
  };
}`,
          },
          {
            type: "tip",
            content:
              "Ключевое решение: фильтрация на СЕРВЕРЕ, а не на клиенте. 5000 товаров ещё можно фильтровать на клиенте, но при росте до 50 000 это станет невозможно.",
          },
        ],
        followUps: [
          {
            question: "Что будет когда товаров станет 50 000?",
            answer: `Архитектура **не изменится**: серверная пагинация + фильтрация работают при любом объёме. На клиенте виртуализация рендерит только видимые элементы. Возможно добавлю **поисковый движок** (Elasticsearch) вместо фильтрации через SQL.`,
          },
          {
            question: "Как бы ты реализовал мгновенную фильтрацию?",
            answer: `**Debounce** на ввод (300мс) + **оптимистичное обновление**: показываю скелетон, отправляю запрос, обновляю при ответе. **Отмена** предыдущего запроса через **AbortController**. В React 19 можно использовать **useTransition** для плавности.`,
          },
        ],
        keywords: [
          "серверная пагинация",
          "нормализация",
          "виртуализация",
          "дебаунс",
          "масштабируемость",
        ],
      },
      {
        id: "design-cart",
        tag: "ВИК-ИНДУСТРИ",
        hot: false,
        question: "Спроектируй корзину и оформление заказа",
        summary:
          "Оптимистичные обновления, локальное состояние + серверная синхронизация, валидация форм, защита от конкурентных изменений.",
        details: [
          {
            type: "bullets",
            items: [
              "**Состояние**: корзина в Redux, синхронизация с сервером через мутации",
              "**Оптимистичные обновления**: добавление в корзину мгновенно, откат при ошибке (или через useOptimistic)",
              "**Валидация**: на уровне поля (формат телефона, обязательные поля) и на уровне формы",
              "**Оформление заказа**: многошаговый процесс, состояние каждого шага",
              "**Конкурентность**: если товар закончился — показать ошибку и предложить альтернативу",
            ],
          },
          {
            type: "code",
            title: "Оптимистичное обновление в RTK Query",
            lang: "typescript",
            content: `addToCart: builder.mutation({
  query: (productId) => ({
    url: '/cart/items',
    method: 'POST',
    body: { productId },
  }),
  async onQueryStarted(productId, { dispatch, queryFulfilled }) {
    const patchResult = dispatch(
      catalogApi.util.updateQueryData('getCart', undefined, (draft) => {
        draft.items.push({ productId, quantity: 1 });
      })
    );

    try {
      await queryFulfilled;
    } catch {
      patchResult.undo();
    }
  },
  invalidatesTags: ['Cart'],
}),`,
          },
        ],
        followUps: [
          {
            question: "Как обрабатываешь ситуацию когда цена изменилась?",
            answer: `При переходе к оформлению заказа **повторно запрашиваю актуальные данные** с сервера. Если цена изменилась — показываю пользователю **уведомление** с новой ценой.`,
          },
        ],
        keywords: [
          "оптимистичное обновление",
          "откат",
          "валидация",
          "многошаговость",
        ],
      },
    ],
  },

  // ════════════════════════════════════════
  //  9. SOFT SKILLS И КОНФЛИКТЫ (РАСШИРЕНО!)
  // ════════════════════════════════════════
  {
    id: "soft",
    title: "Soft Skills (STAR)",
    icon: "🤝",
    accent: "#3dd68c",
    questions: [
      // ===== СУЩЕСТВУЮЩИЕ ВОПРОСЫ =====
      {
        id: "soft-code-review-conflict",
        tag: "ВИК-ИНДУСТРИ",
        hot: true,
        question: "Расскажи о конфликте на код-ревью",
        summary:
          "STAR: спор с новым фронтендером. Не эскалировал лично — перевёл на командный уровень. Результат: коллега принял, сработались.",
        details: [
          {
            type: "bullets",
            items: [
              "**S**: Новый фронтендер в команде отстаивал своё решение на код-ревью, не принимал замечания",
              "**T**: Сохранить качество кода и нормальные отношения в команде",
              "**A**: Не стал давить лично. Перевёл обсуждение на **командный уровень**: объяснил риски и стандарты **дружелюбно**, предложил альтернативу",
              "**R**: Коллега признал замечание, поправил код. После этого мы **хорошо сработались**",
            ],
          },
        ],
        followUps: [
          {
            question: "Что бы ты сделал иначе?",
            answer: `Возможно, стоило **сначала поговорить один на один**, до вынесения на командное обсуждение. В следующий раз начинаю с **личного разговора**.`,
          },
        ],
        keywords: [
          "STAR",
          "командный уровень",
          "дружелюбно",
          "не эскалировать",
        ],
      },
      {
        id: "soft-toxic-star",
        tag: null,
        hot: true,
        question:
          "В команде есть токсичный «звёздный» разработчик. Что сделаешь?",
        summary:
          "Сначала личный разговор. Если не помогло — эскалация с документированием. Фокус на поведении, не на личности.",
        details: [
          {
            type: "bullets",
            items: [
              "**S**: Один из сильных разработчиков разрушает атмосферу: обесценивает чужой код, грубит на ревью",
              "**T**: Сохранить продуктивность и здоровье команды, не потерять сильного специалиста",
              "**A**: Сначала **личный разговор**: описать конкретное поведение и его влияние. Если не помогло — **эскалация** с **документированием** конкретных случаев",
              "**R**: Либо поведение меняется, либо принимаются организационные шаги. **Фокус на решении**, а не на наказании",
            ],
          },
        ],
        followUps: [
          {
            question:
              "А если этот человек — единственный кто знает критичную часть системы?",
            answer: `Это **технический долг команды**. Параллельно с решением по человеку нужно **снижать bus factor**: документирование, парное программирование, кросс-ревью.`,
          },
        ],
        keywords: [
          "личный разговор",
          "документирование",
          "эскалация",
          "поведение не личность",
        ],
      },
      {
        id: "soft-tech-debt",
        tag: null,
        hot: true,
        question: "Бизнес требует быстрых релизов, а команда тонет в техдолге",
        summary:
          "Выделять % спринта на техдолг, показывать метрики, предлагать phased-подход. Не ультиматум, а диалог на языке бизнеса.",
        details: [
          {
            type: "bullets",
            items: [
              "**S**: Постоянный долг ведёт к падению скорости и качества. Бизнес давит на фичи",
              "**T**: Найти баланс между delivery и поддерживаемостью",
              "**A**: Предлагаю выделять **10-20% спринта** на техдолг. Показываю **метрики**: время на багфикс растёт, количество регрессий увеличивается",
              "**R**: Бизнес видит связь «долг → скорость → деньги» и соглашается на выделение времени",
            ],
          },
        ],
        followUps: [
          {
            question: "Как ты приоритизируешь техдолг?",
            answer: `По **влиянию на разработку**: что больше всего замедляет команду прямо сейчас. Не «красивый код», а **практическая польза**. Также учитываю **риск**: что может сломаться в проде.`,
          },
        ],
        keywords: ["метрики", "phased", "10-20%", "язык бизнеса"],
      },
      {
        id: "soft-lead-wrong",
        tag: null,
        hot: true,
        question: "Тимлид принимает ошибочное техническое решение. Что делать?",
        summary:
          "Обсудить наедине с данными. Если решение принято — зафиксировать риски и помочь минимизировать. Не саботировать.",
        details: [
          {
            type: "bullets",
            items: [
              "**S**: Лидер предложил рискованное решение, которое я считаю ошибочным",
              "**T**: Снизить риски и сохранить рабочие отношения",
              "**A**: Обсуждаю **наедине**, привожу **данные/примеры**, предлагаю **альтернативы**. Если решение принято — **фиксирую риски** и помогаю минимизировать",
              "**R**: Либо корректировка решения, либо минимизация ущерба. Я не саботирую, но **не молчу**",
            ],
          },
        ],
        followUps: [
          {
            question:
              "А если решение реально провальное и ты можешь это доказать?",
            answer: `Делаю **POC** или **прототип** чтобы показать на данных. Пишу **короткий документ** с анализом рисков. Если решение всё равно принято — фиксирую в письменном виде и **предлагаю план Б**.`,
          },
        ],
        keywords: [
          "наедине",
          "данные",
          "зафиксировать риски",
          "не саботировать",
        ],
      },
      {
        id: "soft-deadline",
        tag: null,
        hot: false,
        question: "Сроки горят, а задача больше чем ожидалась",
        summary:
          "Честно сообщить о рисках, предложить варианты: срезать scope, отложить мелочи, привлечь помощь.",
        details: [
          {
            type: "bullets",
            items: [
              "**S**: Дедлайн поджимает, объём задачи вырос в процессе",
              "**T**: Завершить критичный функционал в срок без краха команды",
              "**A**: **Честно сообщил** о рисках PM/менеджеру **как можно раньше**. Предложил варианты: срезать scope, отложить второстепенное, привлечь помощь",
              "**R**: Совместно выбрали вариант, минимизировали риски, **избежали переработок**",
            ],
          },
        ],
        keywords: [
          "раннее предупреждение",
          "варианты",
          "срезать scope",
          "не молчать",
        ],
      },
      {
        id: "soft-best-practices",
        tag: null,
        hot: false,
        question: "PM просит фичу, которая противоречит best practices",
        summary:
          "Объяснить риски простым языком, предложить компромисс с планом рефакторинга.",
        details: [
          {
            type: "bullets",
            items: [
              "**S**: PM требует быструю фичу, которая увеличит техдолг",
              "**T**: Донести риски и найти компромисс",
              "**A**: Объяснил **простыми словами** влияние. Предложил **временное решение** с **планом рефакторинга** в следующем спринте",
              "**R**: Фича выпущена, техдолг **учтён в roadmap**, не потерян",
            ],
          },
        ],
        keywords: [
          "простой язык",
          "компромисс",
          "план рефакторинга",
          "не отказывать",
        ],
      },

      // ===== НОВЫЕ ВОПРОСЫ ПО STAR =====
      {
        id: "soft-explain-technical",
        tag: "ВИК-ИНДУСТРИ",
        hot: true,
        question:
          "Расскажи о случае, когда приходилось объяснять сложную тему нетехническому человеку",
        summary:
          "STAR: PM не понимал зачем оптимизировать билд. Объяснил через бизнес-ценность (быстрее релизы, меньше багов). PM поддержал.",
        details: [
          {
            type: "bullets",
            items: [
              "**S**: PM не понимал, зачем тратить время на оптимизацию билда — «пользователь же не видит»",
              "**T**: Убедить выделить время на оптимизацию (2-3 дня работы)",
              "**A**: Объяснил через **бизнес-ценность**: «быстрее релизы = быстрее фичи к пользователям», «меньше багов = меньше времени на фикса». Использовал **аналогии** (стройка: если фундамент кривой, дом будет трещать) и **примеры влияния на сроки**",
              "**R**: PM **поддержал задачу**, мы сделали оптимизацию, релизы ускорились с 15 до 3 минут",
            ],
          },
          {
            type: "tip",
            content:
              "Ключ: переводи технические метрики в **бизнес-метрики** (время → деньги, баги → недовольные клиенты).",
          },
        ],
        keywords: ["бизнес-ценность", "аналогии", "метрики", "убеждение"],
      },
      {
        id: "soft-feedback",
        tag: null,
        hot: true,
        question: "Как ты даёшь фидбек коллегам, чтобы это было конструктивно?",
        summary:
          "STAR: коллега прислал PR. Сначала отмечаю плюсы, затем конкретные предложения с примерами. Автор принял, процесс позитивнее.",
        details: [
          {
            type: "bullets",
            items: [
              "**S**: Коллега прислал PR с кодом, который нужно улучшить",
              "**T**: Дать конструктивный фидбек, не демотивируя автора",
              "**A**: Использую формулу **«сэндвич»**: (1) отмечаю что сделано хорошо, (2) даю **конкретные предложения** по улучшению с **примерами кода** и **объяснением почему**, (3) завершаю поддержкой",
              "**R**: Автор **принял правки**, процесс ревью стал **позитивнее**, качество кода выросло",
            ],
          },
          {
            type: "text",
            content: `Пример хорошего комментария:
«Классная идея с хуком! 👍 Но давай вынесем \`fetchData\` наружу и добавим в зависимости useEffect — иначе будет stale closure. Вот как это можно сделать: [пример кода]. Что думаешь?»`,
          },
        ],
        keywords: ["сэндвич", "конкретика", "примеры", "поддержка"],
      },
      {
        id: "soft-good-code-review",
        tag: "ВИК-ИНДУСТРИ",
        hot: true,
        question: "Что для тебя хороший код-ревью?",
        summary:
          "STAR: ревью были формальными и медленными. Сфокусировался на архитектуре и читаемости, предложил шаблон, держал тон дружелюбным.",
        details: [
          {
            type: "bullets",
            items: [
              "**S**: Ревью были формальными (только «LGTM») или медленными (неделями)",
              "**T**: Сделать их **полезными и быстрыми**",
              "**A**: (1) Сфокусировался на **архитектуре и читаемости**, а не на стиле (для этого есть линтер). (2) Предложил **шаблон** для комментариев: «Что хорошо / Что улучшить / Вопрос». (3) Держал **дружелюбный тон**, задавал вопросы вместо указаний",
              "**R**: Ревью стали **конструктивнее**, время сократилось с 3 дней до 4 часов, качество кода выросло",
            ],
          },
        ],
        keywords: ["архитектура", "шаблон", "дружелюбный тон", "быстро"],
      },
      {
        id: "soft-team-disagrees",
        tag: null,
        hot: true,
        question:
          "Как действуешь, если команда не соглашается с твоим решением?",
        summary:
          "STAR: спор по выбору библиотеки. Выслушал аргументы, предложил POC/сравнение. Решение принято на основании данных.",
        details: [
          {
            type: "bullets",
            items: [
              "**S**: Спор по выбору библиотеки для виртуализации (React Virtualized vs TanStack Virtual)",
              "**T**: Выбрать **оптимальное решение** для проекта, не продавливая своё",
              "**A**: **Выслушал аргументы** команды. Предложил сделать **POC** (proof of concept) с обеими библиотеками и **сравнение по критериям**: размер бандла, поддержка, производительность, документация",
              "**R**: Решение принято **командой на основании данных**, а не авторитета. Все довольны, потому что участвовали в выборе",
            ],
          },
          {
            type: "tip",
            content:
              "Принцип: **данные > мнение**. Если есть метрики — спор заканчивается быстро.",
          },
        ],
        keywords: ["POC", "сравнение", "данные", "командное решение"],
      },
      {
        id: "soft-remote-team",
        tag: null,
        hot: false,
        question: "Как поддерживаешь отношения в распределённой команде?",
        summary:
          "STAR: команда полностью remote. Ввёл async-апдейты, регулярные синки, неформальные встречи, ясную документацию.",
        details: [
          {
            type: "bullets",
            items: [
              "**S**: Команда полностью remote, разные часовые пояса",
              "**T**: Улучшить **коммуникацию и вовлечённость**",
              "**A**: (1) Ввёл **async-апдейты** в тасках (что сделано, что блокирует). (2) Регулярные **синки** 2 раза в неделю. (3) Короткие **неформальные встречи** (coffee chat 15 мин). (4) Ясная **документация** в Notion",
              "**R**: Улучшение **понимания задач** и **атмосферы** в команде. Меньше «я не знал, что ты это делаешь»",
            ],
          },
        ],
        keywords: ["async", "синки", "неформально", "документация"],
      },
      {
        id: "soft-irritates",
        tag: null,
        hot: false,
        question:
          "Что тебя раздражает в работе с коллегами и как с этим справляешься?",
        summary:
          "STAR: задачи сдаются без тестов/ревью. Предложил чек-листы, линтеры, CI. Провёл тренинги. Регрессий стало меньше.",
        details: [
          {
            type: "bullets",
            items: [
              "**S**: Иногда задачи сдаются **без тестов и код-ревью** — «и так работает»",
              "**T**: Улучшить **устойчивость процесса**",
              "**A**: (1) Предложил **чек-листы** для self-review. (2) Настроил **линтеры** и **CI** (нельзя смержить без тестов). (3) Провёл короткие **тренинги** по тестированию",
              "**R**: Уменьшилось число **регрессий**, улучшилось **качество релизов**. Коллеги сами стали спрашивать про тесты",
            ],
          },
          {
            type: "tip",
            content:
              "Важно: не жаловаться, а **предлагать решения**. Показываешь проактивность.",
          },
        ],
        keywords: ["чек-листы", "CI", "тренинги", "проактивность"],
      },
      {
        id: "soft-learning",
        tag: null,
        hot: true,
        question: "Как учишься сам и помогаешь другим?",
        summary:
          "STAR: фронтенд развивается быстро. Читаю статьи/RFC, делаю pet-проекты, провожу воркшопы. Команда растёт.",
        details: [
          {
            type: "bullets",
            items: [
              "**S**: Фронтенд развивается быстро, нужно поддерживать актуальные знания",
              "**T**: **Учиться самому и делиться** с командой",
              "**A**: (1) Читаю **статьи, RFC, changelog'и**. (2) Делаю **pet-проекты** для экспериментов. (3) Провожу **воркшопы** в команде. (4) В код-ревью **объясняю** почему, а не просто «сделай так»",
              "**R**: **Команда растёт**, быстрее принимаются новые практики. Меня зовут на сложные задачи",
            ],
          },
        ],
        keywords: ["RFC", "pet-проекты", "воркшопы", "объясняю"],
      },
      {
        id: "soft-onboarding",
        tag: "ВИК-ИНДУСТРИ",
        hot: false,
        question: "Как онбордил новичка?",
        summary:
          "STAR: новый человек пришёл в команду. Дал план онборда, выделил время для вопросов и парного программирования.",
        details: [
          {
            type: "bullets",
            items: [
              "**S**: Новый junior-разработчик пришёл в команду",
              "**T**: **Быстро включить** в рабочий процесс",
              "**A**: (1) Дал **план онборда**: документация → простые задачи → средние. (2) Выделил **время для вопросов** (30 мин в день). (3) **Парное программирование** на сложных задачах. (4) Регулярные **1-on-1** для обратной связи",
              "**R**: Новичок стал **продуктивным за 3 недели** вместо обычных 2 месяцев. Через полгода уже сам менторил следующего",
            ],
          },
        ],
        keywords: [
          "план онборда",
          "парное программирование",
          "1-on-1",
          "быстрый старт",
        ],
      },
      {
        id: "soft-colleague-mistakes",
        tag: null,
        hot: false,
        question: "Что делаешь, если коллега часто ошибается?",
        summary:
          "STAR: повторяющиеся ошибки. Сначала разговор один на один, затем документация/гайды и автоматизация (линтеры, тесты).",
        details: [
          {
            type: "bullets",
            items: [
              "**S**: Коллега постоянно допускает одни и те же ошибки (забывает тесты, путает API-контракты)",
              "**T**: **Понять причину** и помочь устранить",
              "**A**: (1) Сначала **разговор один на один** — может, не хватает знаний или перегружен. (2) Если проблема системная — **обновление документации/гайдов**. (3) **Автоматизация**: линтеры, тесты, шаблоны",
              "**R**: Ошибки **сократились**, процесс стал **понятнее**. Коллега благодарен за помощь, а не за критику",
            ],
          },
        ],
        keywords: ["один на один", "документация", "автоматизация", "помощь"],
      },
      {
        id: "soft-trends",
        tag: null,
        hot: true,
        question:
          "Как следишь за трендами и решаешь, внедрять ли новую технологию?",
        summary:
          "STAR: появляются новые библиотеки. Оцениваю зрелость, комьюнити, риски. Предлагаю пилот на небольшой фиче.",
        details: [
          {
            type: "bullets",
            items: [
              "**S**: Постоянно появляются новые библиотеки/фреймворки",
              "**T**: Выбрать, что **реально приносит пользу**, а не гнаться за хайпом",
              "**A**: Оцениваю по критериям: (1) **Зрелость** (сколько лет, стабильный ли API). (2) **Комьюнити** (звёзды, контрибьюторы, ответы на issues). (3) **Риски** (что если забросят через год?). Предлагаю **пилот** на небольшой некритичной фиче",
              "**R**: **Безопасное внедрение** или **отказ с аргументами**. Команда доверяет моему мнению",
            ],
          },
        ],
        keywords: ["зрелость", "комьюнити", "пилот", "безопасность"],
      },
      {
        id: "soft-culture",
        tag: null,
        hot: false,
        question: "Что для тебя здоровая командная культура?",
        summary:
          "STAR: команда работает долго вместе. Поощряю открытость, честность, уважение. Провожу ретроспективы.",
        details: [
          {
            type: "bullets",
            items: [
              "**S**: Команда работает вместе долго, нужна продуктивная атмосфера",
              "**T**: **Поддерживать здоровую культуру**",
              "**A**: (1) Поощряю **открытость** — можно сказать «я не знаю». (2) **Честность** — проблемы обсуждаем, а не замалчиваем. (3) **Уважение** — критикуем код, а не человека. (4) Провожу **ретроспективы** и фокус на **обучении**",
              "**R**: **Снижение конфликтов**, **рост эффективности**. Люди не боятся ошибаться и предлагают идеи",
            ],
          },
        ],
        keywords: ["открытость", "честность", "ретроспективы", "обучение"],
      },
      {
        id: "soft-speed-vs-quality",
        tag: null,
        hot: true,
        question: "Что важнее: скорость разработки или качество?",
        summary:
          "STAR: есть давление рынка и потребность в стабильности. Баланс через критерии качества и выделение времени на критические улучшения.",
        details: [
          {
            type: "bullets",
            items: [
              "**S**: Давление «быстрее релизы» vs «нужна стабильность»",
              "**T**: Найти **баланс для конкретного проекта**",
              "**A**: (1) Предлагаю **критерии** для уровня качества (MVP vs production). (2) Устанавливаю **минимальные стандарты** (тесты, код-ревью). (3) Выделяю время на **критические улучшения** (10-20% спринта)",
              "**R**: Поддерживаем **delivery** и **долговременную устойчивость** продукта. Бизнес понимает, что техдолг = замедление",
            ],
          },
          {
            type: "tip",
            content:
              "Правильный ответ: **зависит от контекста**. MVP — скорость. Production — качество. Но всегда есть минимум.",
          },
        ],
        keywords: ["баланс", "критерии", "минимум", "контекст"],
      },
      {
        id: "soft-off-track",
        tag: null,
        hot: true,
        question: "Как сообщаешь, что проект идёт не по плану?",
        summary:
          "STAR: риски сказываются на сроках. Честно сообщаю, предоставляю варианты (cut scope, add resources), предлагаю план.",
        details: [
          {
            type: "bullets",
            items: [
              "**S**: Риски начинают сказываться на сроках (задача сложнее, чем казалось)",
              "**T**: **Своевременно донести** проблему и предложить пути решения",
              "**A**: (1) **Честно сообщаю** как только понял проблему (не жду до дедлайна). (2) Предоставляю **варианты**: cut scope (срезать функционал), add resources (привлечь помощь), move deadline. (3) Предлагаю **план действий** для каждого варианта",
              "**R**: Команда и менеджмент принимают **взвешенное решение**. Доверие растёт, потому что не скрываю проблемы",
            ],
          },
          {
            type: "text",
            content: `Плохо: «Всё ок, успеем» (а потом аврал).
Хорошо: «Есть риск не успеть к 15-му. Варианты: (1) убрать фичу Х — успеем, (2) добавить человека — успеем с задержкой 2 дня, (3) сдвинуть дедлайн на 20-е. Рекомендую вариант 1, потому что...»`,
          },
        ],
        keywords: ["рано", "варианты", "план", "честность"],
      },
      {
        id: "soft-atmosphere",
        tag: null,
        hot: false,
        question: "В какой атмосфере тебе комфортнее работать?",
        summary:
          "Предпочитаю доверие, открытость и лёгкий юмор. Где ошибки обсуждаются без страха. Высокая вовлечённость.",
        details: [
          {
            type: "bullets",
            items: [
              "**S**: Разные корпоративные культуры",
              "**T**: Выбрать среду, где можно **продуктивно работать**",
              "**A**: Предпочитаю: (1) **Доверие** — мне дают сложные задачи без микроменеджмента. (2) **Открытость** — можно сказать «я не согласен». (3) **Лёгкий юмор** — не токсичная серьёзность. (4) Где **ошибки обсуждаются без страха**",
              "**R**: **Высокая вовлечённость** и **качество работы**. Я не трачу энергию на политику, а фокусируюсь на коде",
            ],
          },
        ],
        keywords: ["доверие", "открытость", "без страха", "вовлечённость"],
      },
      {
        id: "soft-motivation",
        tag: null,
        hot: true,
        question: "Что тебя мотивирует, кроме технологий?",
        summary:
          "Мотивирует видеть продукт в руках пользователей, работать с сильной командой, развивать людей. Устойчивая мотивация.",
        details: [
          {
            type: "bullets",
            items: [
              "**S**: Работа приносит разный смысл",
              "**T**: Понять мотивацию для **долгосрочной работы**",
              "**A**: Меня мотивирует: (1) **Видеть продукт в руках пользователей** — когда друг говорит «о, я этим пользуюсь». (2) **Работать с сильной командой** — когда учишься у коллег. (3) **Развивать людей** — когда junior, которого менторил, становится senior'ом",
              "**R**: **Устойчивая мотивация** и **вклад в продукт/команду**. Не выгораю, потому что вижу смысл",
            ],
          },
        ],
        keywords: [
          "пользователи",
          "сильная команда",
          "развитие людей",
          "смысл",
        ],
      },
      {
        id: "soft-priorities-conflict",
        tag: null,
        hot: false,
        question: "Если твои приоритеты расходятся с приоритетами продукта?",
        summary:
          "STAR: архитектура vs фичи. Объясняю риски и бизнес-импакт, предлагаю phased-approach или MVP + план рефакторинга.",
        details: [
          {
            type: "bullets",
            items: [
              "**S**: Я хочу рефакторить архитектуру, бизнес хочет новые фичи",
              "**T**: Найти **приемлемый компромисс**",
              "**A**: (1) Объясняю **риски** и **бизнес-импакт** (медленная разработка = меньше фич в год). (2) Предлагаю **phased-approach**: сначала MVP фичи, потом рефакторинг. (3) Или **MVP + план рефакторинга** в следующем спринте",
              "**R**: Выбран **компромисс** и **roadmap** с учётом рисков. Бизнес видит, что я думаю о продукте, а не только о коде",
            ],
          },
        ],
        keywords: ["компромисс", "phased", "бизнес-импакт", "roadmap"],
      },
    ],
  },

  // ════════════════════════════════════════
  //  10. ИНСТРУМЕНТЫ 2026 (НОВОЕ!)
  // ════════════════════════════════════════
  {
    id: "tools2026",
    title: "Инструменты 2026",
    icon: "🛠️",
    accent: "#f38ba8",
    questions: [
      {
        id: "tools-vite8",
        tag: null,
        hot: false,
        question: "Что нового в Vite 8 и как это влияет на твой проект?",
        summary:
          "Vite 8 работает на Rolldown (Rust-бандлер). В 3-5 раз быстрее сборка. В твоём проекте уже стоит @vitejs/plugin-react 6 с поддержкой React Compiler.",
        details: [
          {
            type: "bullets",
            items: [
              "**Rolldown** — Rust-бандлер вместо Rollup. Сборка в 3-5 раз быстрее",
              "**@vitejs/plugin-react 6** — опциональная поддержка React Compiler",
              "**LightningCSS** — интеграция для быстрой обработки CSS",
              "В твоём \`package.json\` уже стоит \`vite@8.1.1\` и \`@vitejs/plugin-react@6.0.3\`",
            ],
          },
        ],
        followUps: [
          {
            question: "Нужно ли что-то менять при переходе на Vite 8?",
            answer: `Минимум. Конфиг совместим с Vite 5+. Основное изменение — **Rolldown** под капотом. Если используешь кастомные Rollup-плагины, проверь их совместимость. **React Compiler** можно включить как опцию в \`@vitejs/plugin-react\`.`,
          },
        ],
        keywords: ["Rolldown", "Vite 8", "React Compiler", "LightningCSS"],
      },
      {
        id: "tools-oxlint",
        tag: null,
        hot: false,
        question: "Что такое oxlint и почему ты его используешь?",
        summary:
          "oxlint — Rust-линтер от команды Oxc. В 50-100 раз быстрее ESLint. В твоём проекте заменяет ESLint для быстрых проверок.",
        details: [
          {
            type: "bullets",
            items: [
              "**oxlint** написан на Rust, в 50-100 раз быстрее ESLint",
              "Поддерживает плагины для React, TypeScript",
              "В твоём \`.oxlintrc.json\` настроены \`react/rules-of-hooks\` и \`react/only-export-components\`",
              "В 2026 **ESLint 9** использует **flat config** (eslint.config.js), но oxlint — для скорости",
            ],
          },
        ],
        followUps: [
          {
            question: "oxlint заменяет ESLint полностью?",
            answer: `Пока нет. **oxlint** быстрее, но поддерживает **меньше правил**. Для полного покрытия (a11y, import порядок, кастомные правила) всё ещё нужен **ESLint 9** или **Biome**. В 2026 многие команды используют **оба**: oxlint для быстрых проверок в CI, ESLint для полного аудита.`,
          },
        ],
        keywords: ["oxlint", "Rust", "ESLint 9", "flat config", "скорость"],
      },
      {
        id: "tools-react-router7",
        tag: null,
        hot: false,
        question: "Что изменилось в React Router 7?",
        summary:
          "React Router 7 объединился с Remix. Поддерживает Server Components, loader/action паттерны, Vite-first. В твоём проекте стоит 7.18.1.",
        details: [
          {
            type: "bullets",
            items: [
              "React Router 7 = **объединение React Router + Remix**",
              "Поддержка **Server Components** и **Server Actions**",
              "**loader / action** паттерны для загрузки и мутации данных",
              "**Vite-first**: оптимизирован для Vite как основного бандлера",
              "В твоём \`package.json\` стоит \`react-router-dom@7.18.1\`",
              "Обратная совместимость: старый API (Routes, Route, useNavigate) продолжает работать",
            ],
          },
        ],
        followUps: [
          {
            question: "Нужно ли мигрировать на новый API с loader/action?",
            answer: `Нет, **не обязательно**. Старый API (\`<Routes>\`, \`<Route>\`, \`useNavigate\`) полностью работает. Новый **loader/action** паттерн полезен, если ты хочешь **серверный рендеринг** или **файловую маршрутизацию**. Для SPA на клиенте старый подход по-прежнему валиден.`,
          },
        ],
        keywords: [
          "Remix",
          "loader",
          "action",
          "Server Components",
          "Vite-first",
        ],
      },
    ],
  },
];

// Плоский список всех вопросов для поиска
export const allInterviewQuestions = INTERVIEW_SECTIONS.flatMap(
  (s) => s.questions,
);
export const getInterviewSection = (id) =>
  INTERVIEW_SECTIONS.find((s) => s.id === id);
