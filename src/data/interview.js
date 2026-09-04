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
  // ════════════════════════════════════════
  //  11. JAVASCRIPT CORE
  // ════════════════════════════════════════
  {
    id: "js-core",
    title: "JavaScript Core",
    icon: "🟨",
    accent: "#ffc857",
    questions: [
      {
        id: "js-event-loop",
        tag: "ВИК-ИНДУСТРИ",
        hot: true,
        question: "Как работает Event Loop? Микрозадачи vs макрозадачи",
        summary:
          "Call Stack → Microtask Queue (Promise, queueMicrotask, MutationObserver) → Rendering → Macrotask Queue (setTimeout, события, I/O). После каждой макрозадачи ВСЕ микрозадачи выполняются до рендеринга.",
        details: [
          {
            type: "text",
            content: `JavaScript однопоточный, но неблокирующий благодаря Event Loop.

**Порядок обработки:**
1. **Call Stack** — выполняет синхронный код
2. **Microtask Queue** — промисы, \`queueMicrotask\`, \`MutationObserver\`
3. **Rendering** — браузер отрисовывает изменения
4. **Macrotask Queue** — \`setTimeout\`, \`setInterval\`, события DOM, I/O

**Критическое правило:** после каждой макрозадачи ВСЕ микрозадачи выполняются до рендеринга. Если микрозадачи рекурсивно создают новые — интерфейс заблокируется.`,
          },
          {
            type: "code",
            title: "Порядок выполнения",
            content: `console.log(1);                    // синхронно
setTimeout(() => console.log(2));  // macrotask
Promise.resolve().then(() => console.log(3)); // microtask
console.log(4);                    // синхронно

// Вывод: 1, 4, 3, 2`,
          },
          {
            type: "tip",
            content:
              "На собеседовании часто дают код с вложенными промисами и таймерами и просят предсказать порядок вывода. Тренируйся на таких задачах.",
          },
        ],
        followUps: [
          {
            question:
              "Что произойдёт, если в .then() создать бесконечную цепочку микрозадач?",
            answer: `Интерфейс **заблокируется**. Микрозадачи выполняются до рендеринга, и если они рекурсивно создают новые, браузер никогда не перейдёт к отрисовке. Это классический способ «подвесить» вкладку.`,
          },
          {
            question: "Где выполняется requestAnimationFrame?",
            answer: `\`requestAnimationFrame\` выполняется **перед рендерингом**, после микрозадач. Это не макрозадача в классическом смысле — он привязан к кадру отрисовки.`,
          },
        ],
        keywords: [
          "Call Stack",
          "microtask",
          "macrotask",
          "rendering",
          "queueMicrotask",
        ],
      },
      {
        id: "js-closures",
        tag: null,
        hot: true,
        question: "Что такое замыкание? Приведи практический пример",
        summary:
          "Функция запоминает переменные из области, где была создана, даже после завершения внешней функции. Используется для приватных переменных, фабрик, мемоизации, каррирования.",
        details: [
          {
            type: "code",
            title: "Счётчик на замыкании",
            content: `function makeCounter() {
  let count = 0; // приватная переменная
  return {
    increment: () => ++count,
    getCount: () => count,
  };
}
const counter = makeCounter();
counter.increment(); // 1
counter.increment(); // 2
counter.getCount();  // 2
// count недоступен снаружи`,
          },
          {
            type: "bullets",
            items: [
              "**Приватные переменные** — инкапсуляция без классов",
              "**Фабрики функций** — \`makeMultiplier(3)\` возвращает \`x => x * 3\`",
              "**Мемоизация** — кэш в замыкании",
              "**Обработчики событий** — сохранение контекста",
              "**Каррирование** — \`curry(a)(b)(c)\`",
            ],
          },
        ],
        followUps: [
          {
            question: "Какая проблема со замыканиями в цикле с var?",
            answer: `\`for (var i = 0; i < 3; i++) { setTimeout(() => console.log(i)); }\` выведет **3, 3, 3**. \`var\` имеет функциональную область видимости — все колбэки ссылаются на одну переменную. С \`let\` создаётся новая привязка на каждой итерации → **0, 1, 2**.`,
          },
          {
            question: "Может ли замыкание вызвать утечку памяти?",
            answer: `Да. Если замыкание хранит ссылку на большой объект и живёт долго (например, в обработчике события), сборщик мусора не может освободить этот объект. Решение: удалять обработчики через \`removeEventListener\`, обнулять ссылки.`,
          },
        ],
        keywords: [
          "лексическое окружение",
          "приватность",
          "фабрика",
          "stale closure",
        ],
      },
      {
        id: "js-this-bind",
        tag: null,
        hot: true,
        question: "Как определяется this? call, apply, bind",
        summary:
          "this определяется при вызове, не при создании. 5 правил: глобальный вызов, метод объекта, new, call/apply/bind, стрелочная функция (лексический this).",
        details: [
          {
            type: "bullets",
            items: [
              "**Глобальный вызов** \`fn()\` → \`window\` (или \`undefined\` в strict mode)",
              "**Метод** \`obj.fn()\` → объект слева от точки",
              "**Конструктор** \`new Fn()\` → новый созданный объект",
              "**Явная привязка** \`call/apply/bind\` → переданный контекст",
              "**Стрелочная функция** → \`this\` из внешней области (лексически)",
            ],
          },
          {
            type: "code",
            title: "Потеря контекста",
            content: `const obj = {
  name: 'test',
  say() { console.log(this.name); }
};
const fn = obj.say;
fn();           // undefined — this потерян
obj.say();      // 'test'

// Стрелочная функция НЕ подходит как метод:
const obj2 = {
  name: 'test',
  say: () => console.log(this.name) // this = window
};`,
          },
        ],
        followUps: [
          {
            question: "В чём разница между call, apply и bind?",
            answer: `\`call(ctx, a, b)\` — вызывает сразу, аргументы через запятую. \`apply(ctx, [a, b])\` — вызывает сразу, аргументы массивом. \`bind(ctx, a)\` — **не вызывает**, возвращает новую функцию с навсегда привязанным \`this\`.`,
          },
        ],
        keywords: [
          "call",
          "apply",
          "bind",
          "стрелочная функция",
          "потеря контекста",
        ],
      },
      {
        id: "js-promises",
        tag: null,
        hot: true,
        question: "Promise: состояния, цепочки, статические методы",
        summary:
          "Три состояния: pending → fulfilled / rejected. Цепочки через .then(). Статические: Promise.all, Promise.race, Promise.allSettled, Promise.any.",
        details: [
          {
            type: "bullets",
            items: [
              "**Promise.all** — ждёт все, реджект при первой ошибке",
              "**Promise.race** — первый завершившийся (успех или ошибка)",
              "**Promise.allSettled** — ждёт все, возвращает статус каждого",
              "**Promise.any** — первый успешный, AggregateError если все откажут",
            ],
          },
          {
            type: "code",
            title: "Обработка ошибок в цепочке",
            content: `fetch(url)
  .then(r => r.json())
  .then(data => process(data))
  .catch(e => handleError(e))    // ловит ошибку из ЛЮБОГО .then()
  .finally(() => hideSpinner()); // всегда, не получает аргументов`,
          },
        ],
        followUps: [
          {
            question: "Что вернёт Promise.resolve(5).then(x => x + 1)?",
            answer: `Промис, который резолвится значением **6**. \`.then()\` всегда возвращает **новый промис**. Если колбэк возвращает значение — промис резолвится им. Если бросает ошибку — реджектится.`,
          },
          {
            question: "async/await — это синтаксический сахар над чем?",
            answer: `Над промисами. \`async\` делает функцию возвращающей промис. \`await\` приостанавливает выполнение до резолва. \`try/catch\` заменяет \`.catch()\`. Под капотом — генераторы + промисы (в ранних реализациях).`,
          },
        ],
        keywords: [
          "pending",
          "fulfilled",
          "rejected",
          "Promise.all",
          "allSettled",
          "any",
        ],
      },
      {
        id: "js-prototype",
        tag: null,
        hot: false,
        question: "Прототипное наследование. __proto__ vs prototype",
        summary:
          "Каждый объект имеет скрытую ссылку на прототип. При обращении к свойству JS идёт по цепочке. prototype — свойство функции-конструктора, __proto__ — геттер к прототипу объекта (устаревший).",
        details: [
          {
            type: "code",
            title: "Цепочка прототипов",
            content: `function Animal(name) { this.name = name; }
Animal.prototype.speak = function() { return this.name; };

const dog = new Animal('Rex');
dog.speak(); // 'Rex' — найдено в прототипе

// Современный API:
Object.getPrototypeOf(dog) === Animal.prototype; // true
Object.setPrototypeOf(obj, proto);               // установка`,
          },
          {
            type: "tip",
            content:
              "В классах ES6 методы автоматически попадают в `prototype`. `class User { sayHi() {} }` — метод `sayHi` живёт в `User.prototype`, а не в каждом экземпляре.",
          },
        ],
        keywords: [
          "prototype chain",
          "Object.create",
          "getPrototypeOf",
          "наследование",
        ],
      },
      {
        id: "js-es6-features",
        tag: null,
        hot: true,
        question: "Какие ключевые фичи ES6+ ты используешь ежедневно?",
        summary:
          "Деструктуризация, spread/rest, optional chaining, nullish coalescing, async/await, модули, прокси, генераторы, structuredClone.",
        details: [
          {
            type: "bullets",
            items: [
              "**Деструктуризация** — \`const { name, age } = user\`",
              "**Spread/Rest** — \`[...arr]\`, \`{...obj}\`, \`function(...args)\`",
              "**Optional Chaining** — \`user?.address?.city\`",
              "**Nullish Coalescing** — \`value ?? default\` (в отличие от \`||\`, не ловит \`0\` и \`''\`)",
              "**Динамический импорт** — \`const mod = await import('./heavy.js')\`",
              "**structuredClone** — глубокое копирование (2022+)",
              "**Array.at()**, **Object.hasOwn()**, **findLast()**",
            ],
          },
        ],
        followUps: [
          {
            question: "В чём разница между ?? и ||?",
            answer: `\`||\` возвращает правый операнд для **любого falsy** (\`0\`, \`''\`, \`false\`, \`null\`, \`undefined\`, \`NaN\`). \`??\` — только для \`null\` и \`undefined\`. Если \`0\` — валидное значение, используй \`??\`.`,
          },
        ],
        keywords: [
          "деструктуризация",
          "spread",
          "optional chaining",
          "nullish",
          "structuredClone",
        ],
      },
    ],
  },

  // ════════════════════════════════════════
  //  12. TYPESCRIPT
  // ════════════════════════════════════════
  {
    id: "typescript",
    title: "TypeScript",
    icon: "🔷",
    accent: "#4a9eff",
    questions: [
      {
        id: "ts-interface-vs-type",
        tag: "ВИК-ИНДУСТРИ",
        hot: true,
        question: "interface vs type: когда что использовать?",
        summary:
          "interface — для объектов и классов, поддерживает extends и declaration merging. type — для union, intersection, примитивов, mapped types. Оба удаляются при компиляции.",
        details: [
          {
            type: "bullets",
            items: [
              "**interface**: идеален для API-объектов, поддерживает \`extends\`, declaration merging (можно расширить стороннюю библиотеку)",
              "**type**: union (\`string | number\`), intersection (\`A & B\`), кортежи, mapped types, условные типы",
              "Оба удаляются при компиляции — в рантайме их нет",
              "В проекте: \`interface\` для моделей данных, \`type\` для всего остального",
            ],
          },
          {
            type: "code",
            title: "Примеры",
            content: `// interface — для объектов
interface User {
  id: number;
  name: string;
}
interface Admin extends User {
  permissions: string[];
}

// type — для union, intersection
type Status = 'active' | 'inactive' | 'banned';
type Result<T> = { data: T } | { error: string };
type UserWithRole = User & { role: string };`,
          },
        ],
        followUps: [
          {
            question: "Что такое declaration merging?",
            answer: `Если объявить \`interface User\` дважды, TypeScript **объединит** их поля. С \`type\` это невозможно — будет ошибка. Это полезно для расширения типов из сторонних библиотек.`,
          },
        ],
        keywords: ["extends", "declaration merging", "union", "intersection"],
      },
      {
        id: "ts-generics",
        tag: "ВИК-ИНДУСТРИ",
        hot: true,
        question: "Что такое дженерики? Приведи пример из практики",
        summary:
          "Дженерики позволяют создавать переиспользуемые компоненты, где тип определяется при вызове. Пример: ApiResponse<T>, createSelector, useState<T>.",
        details: [
          {
            type: "code",
            title: "Дженерик для API-ответа",
            content: `interface ApiResponse<T> {
  data: T;
  error: string | null;
  isLoading: boolean;
}

// Использование:
const userResponse: ApiResponse<User> = await fetchUser();
const listResponse: ApiResponse<Product[]> = await fetchProducts();`,
          },
          {
            type: "bullets",
            items: [
              "**Ограничения**: \`<T extends Comparable>\` — T должен быть сравнимым",
              "**Значения по умолчанию**: \`<T = string>\`",
              "**В функциях**: \`function identity<T>(arg: T): T\`",
              "**В классах**: \`class Store<T> { items: T[] }\`",
            ],
          },
        ],
        followUps: [
          {
            question: "Как ограничить дженерик определёнными полями?",
            answer: `Используй \`extends\`: \`function getProperty<T, K extends keyof T>(obj: T, key: K): T[K]\`. Здесь \`K\` может быть только ключом \`T\`, а возвращаемый тип — типом этого поля.`,
          },
        ],
        keywords: ["泛型", "extends", "keyof", "ApiResponse", "ограничения"],
      },
      {
        id: "ts-utility-types",
        tag: "ВИК-ИНДУСТРИ",
        hot: true,
        question:
          "Какие Utility Types используешь? Partial, Pick, Omit, Record",
        summary:
          "Partial<T> — все поля опциональны. Pick<T, K> — только указанные поля. Omit<T, K> — все кроме указанных. Record<K, V> — словарь. Readonly<T>, Required<T>, ReturnType<typeof fn>.",
        details: [
          {
            type: "code",
            title: "Практическое применение",
            content: `interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

// PATCH-запрос — только часть полей
type UpdateUser = Partial<Pick<User, 'name' | 'email'>>;

// Публичная модель без пароля
type PublicUser = Omit<User, 'password'>;

// Кэш сущностей: id → User
type UserCache = Record<number, User>;

// Тип возврата функции
type Fn = () => Promise<User>;
type Result = Awaited<ReturnType<Fn>>; // User`,
          },
        ],
        followUps: [
          {
            question: "Как реализовать свой Partial?",
            answer: `\`type MyPartial<T> = { [K in keyof T]?: T[K] }\`. Это **mapped type**: итерируем по ключам \`T\` и делаем каждое поле опциональным через \`?\`.`,
          },
        ],
        keywords: ["Partial", "Pick", "Omit", "Record", "mapped types"],
      },
      {
        id: "ts-type-guards",
        tag: null,
        hot: true,
        question: "Что такое Type Guards? Как сузить тип unknown?",
        summary:
          "Type Guard сужает тип внутри блока. Встроенные: typeof, instanceof, in. Пользовательский: `x is Type`. Критично для работы с unknown из API.",
        details: [
          {
            type: "code",
            title: "Пользовательский type guard",
            content: `function isUser(x: unknown): x is User {
  return (
    typeof x === 'object' && x !== null &&
    'id' in x && typeof (x as any).id === 'number' &&
    'name' in x && typeof (x as any).name === 'string'
  );
}

// Использование:
const data: unknown = await response.json();
if (isUser(data)) {
  console.log(data.name); // TS знает что это User
}`,
          },
        ],
        followUps: [
          {
            question: "unknown vs any — в чём разница?",
            answer: `\`any\` отключает все проверки. \`unknown\` — безопасный: TS не даст выполнить операцию, пока не сузишь тип через type guard. Используй \`unknown\` для \`catch\`, \`JSON.parse\`, внешних данных.`,
          },
        ],
        keywords: ["typeof", "instanceof", "x is Type", "unknown", "сужение"],
      },
      {
        id: "ts-discriminated-union",
        tag: "ВИК-ИНДУСТРИ",
        hot: true,
        question: "Что такое Discriminated Union? Как используешь в Redux?",
        summary:
          "Union-тип с общим полем-дискриминатором. В Redux: action.type. TS автоматически сужает тип в каждой ветке switch/if.",
        details: [
          {
            type: "code",
            title: "Discriminated Union для API-статусов",
            content: `type RequestState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; message: string };

function render<T>(state: RequestState<T>) {
  switch (state.status) {
    case 'success':
      return state.data;    // TS знает что есть data
    case 'error':
      return state.message; // TS знает что есть message
  }
}`,
          },
          {
            type: "tip",
            content:
              "В Redux Toolkit `createSlice` автоматически генерирует discriminated union для actions. Поле `type` — дискриминатор. В `extraReducers` TS сужает тип `action.payload`.",
          },
        ],
        keywords: [
          "дискриминатор",
          "switch",
          "exhaustiveness",
          "Redux actions",
        ],
      },
      {
        id: "ts-tsconfig",
        tag: null,
        hot: false,
        question: "Какие ключевые опции tsconfig.json ты настраиваешь?",
        summary:
          "strict: true (включает все строгие проверки), target, module, paths (алиасы), esModuleInterop. strict обязателен для production.",
        details: [
          {
            type: "bullets",
            items: [
              "**strict: true** — включает \`strictNullChecks\`, \`noImplicitAny\`, \`strictFunctionTypes\`",
              "**target** — ECMAScript-версия вывода (ES2020+ для современных проектов)",
              "**module** — \`ESNext\` для бандлеров, \`CommonJS\` для Node",
              "**paths + baseUrl** — алиасы: \`@/components\` → \`src/components\`",
              "**esModuleInterop** — совместимость CommonJS и ESM",
              "**noUncheckedIndexedAccess** — \`arr[i]\` может быть \`undefined\`",
            ],
          },
        ],
        keywords: ["strict", "paths", "target", "esModuleInterop"],
      },
    ],
  },

  // ════════════════════════════════════════
  //  13. REDUX TOOLKIT
  // ════════════════════════════════════════
  {
    id: "redux-toolkit",
    title: "Redux Toolkit",
    icon: "🟣",
    accent: "#b58df2",
    questions: [
      {
        id: "rtk-why",
        tag: "ВИК-ИНДУСТРИ",
        hot: true,
        question: "Почему Redux Toolkit, а не ванильный Redux?",
        summary:
          "RTK решает многословность: configureStore автоматически настраивает Thunk и DevTools, createSlice генерирует экшены и редьюсеры, Immer позволяет мутировать state напрямую.",
        details: [
          {
            type: "bullets",
            items: [
              "**configureStore** — автоматически добавляет Thunk, DevTools, сериализуемость",
              "**createSlice** — экшены + редьюсеры из одного объекта",
              "**Immer внутри** — \`state.value = 1\` вместо \`return { ...state, value: 1 }\`",
              "**createAsyncThunk** — для асинхронных операций",
              "**createEntityAdapter** — нормализация из коробки",
            ],
          },
          {
            type: "code",
            title: "createSlice",
            content: `const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment(state) {
      state.value += 1; // Immer: можно "мутировать"
    },
    addBy(state, action: PayloadAction<number>) {
      state.value += action.payload;
    },
  },
});
// Автоматически:
// counterSlice.actions.increment
// counterSlice.actions.addBy
// counterSlice.reducer`,
          },
        ],
        keywords: ["createSlice", "Immer", "configureStore", "многословность"],
      },
      {
        id: "rtk-normalization",
        tag: "ВИК-ИНДУСТРИ",
        hot: true,
        question: "Как ты нормализовал состояние каталога в Redux?",
        summary:
          "Плоская структура: byId (Record) + allIds (массив). Обновление одного товара = O(1). createEntityAdapter из RTK автоматизирует это.",
        details: [
          {
            type: "code",
            title: "createEntityAdapter",
            content: `const productsAdapter = createEntityAdapter<Product>({
  selectId: (product) => product.id,
  sortComparer: (a, b) => a.name.localeCompare(b.name),
});

const initialState = productsAdapter.getInitialState({
  status: 'idle',
  filters: { category: null },
});

// Обновление одного товара — O(1)
updateProduct: (state, action) => {
  productsAdapter.updateOne(state, {
    id: action.payload.id,
    changes: action.payload.changes,
  });
},

// Автогенерируемые селекторы
export const { selectAll, selectById, selectIds } =
  productsAdapter.getSelectors((s: RootState) => s.catalog);`,
          },
          {
            type: "tip",
            content:
              "До нормализации обновление одного товара требовало глубокого клонирования всего массива. После — замена одного объекта в byId. Это снизило лишние re-render'ы на ~70%.",
          },
        ],
        followUps: [
          {
            question: "Почему не хранил данные как массив?",
            answer: `Массив требует **глубокого клонирования** при обновлении одного элемента. \`byId\` + \`allIds\` позволяет обновлять **O(1)** и не создавать новые ссылки на неизменённые элементы. \`useSelector\` сравнивает по ссылке — стабильные ссылки = меньше ре-рендеров.`,
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
      {
        id: "rtk-selectors",
        tag: "ВИК-ИНДУСТРИ",
        hot: true,
        question: "Как оптимизировал selectors? createSelector",
        summary:
          "createSelector из Reselect/RTK кеширует результат. Если входы не изменились — возвращает ту же ссылку. Без него фильтр в useSelector создаёт новый массив при каждом вызове.",
        details: [
          {
            type: "code",
            title: "Мемоизированный селектор",
            content: `// ❌ ПЛОХО: filter всегда возвращает новый массив
const selectFiltered = (state: RootState) =>
  state.catalog.allIds
    .map(id => state.catalog.byId[id])
    .filter(p => matchesFilters(p, state.catalog.filters));

// ✅ ХОРОШО: мемоизация через createSelector
const selectFiltered = createSelector(
  [
    (s: RootState) => s.catalog.byId,
    (s: RootState) => s.catalog.allIds,
    (s: RootState) => s.catalog.filters,
  ],
  (byId, allIds, filters) =>
    allIds.map(id => byId[id]).filter(p => matchesFilters(p, filters))
);`,
          },
        ],
        followUps: [
          {
            question: "Что произойдёт без createSelector?",
            answer: `\`useSelector\` сравнивает результат по ссылке (\`===\`). \`filter()\` **всегда** возвращает новый массив → ссылка меняется → компонент перерендеривается при **любом** изменении стора, даже если данные не менялись.`,
          },
        ],
        keywords: [
          "createSelector",
          "мемоизация",
          "стабильная ссылка",
          "reselect",
        ],
      },
      {
        id: "rtk-immer",
        tag: null,
        hot: false,
        question: "Как работает Immer внутри RTK?",
        summary:
          "Immer создаёт Proxy вокруг state. Записывает мутации в черновик, затем генерирует новый иммутабельный объект. Ты пишешь мутативный код, получаешь иммутабельный результат.",
        details: [
          {
            type: "bullets",
            items: [
              "Под капотом: **Proxy** перехватывает записи в \`state\`",
              "Мутации записываются в **черновик** (draft)",
              "В конце генерируется **новый объект** с применёнными изменениями",
              "Неизменённые ветки сохраняют **прежние ссылки** (структурное разделение)",
              "Поэтому \`state.items.push(x)\` безопасно — оригинальный массив не меняется",
            ],
          },
        ],
        keywords: [
          "Proxy",
          "draft",
          "структурное разделение",
          "иммутабельность",
        ],
      },
      {
        id: "rtk-middleware",
        tag: null,
        hot: false,
        question: "Что такое middleware в Redux? Как работает Thunk?",
        summary:
          "Middleware встраивается в dispatch: экшен проходит через цепочку перед попаданием в reducer. Thunk позволяет диспатчить функции для асинхронной логики.",
        details: [
          {
            type: "code",
            title: "createAsyncThunk",
            content: `const fetchProducts = createAsyncThunk(
  'catalog/fetchProducts',
  async (params: CatalogParams) => {
    const response = await fetch(\`/api/products?\${qs(params)}\`);
    return response.json();
  }
);

// В createSlice:
extraReducers: (builder) => {
  builder
    .addCase(fetchProducts.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(fetchProducts.fulfilled, (state, action) => {
      state.status = 'succeeded';
      productsAdapter.setAll(state, action.payload);
    })
    .addCase(fetchProducts.rejected, (state) => {
      state.status = 'failed';
    });
}`,
          },
        ],
        keywords: ["dispatch", "thunk", "createAsyncThunk", "extraReducers"],
      },
    ],
  },

  // ════════════════════════════════════════
  //  14. REACT HOOKS (углублённо)
  // ════════════════════════════════════════
  {
    id: "react-hooks",
    title: "React Hooks",
    icon: "🪝",
    accent: "#61dafb",
    questions: [
      {
        id: "hooks-useeffect",
        tag: "ВИК-ИНДУСТРИ",
        hot: true,
        question: "Как работает useEffect? Когда вызывается cleanup?",
        summary:
          "useEffect запускается после обновления DOM. Cleanup вызывается перед повторным запуском и при unmount. Зависимости определяют, когда эффект перезапускается.",
        details: [
          {
            type: "bullets",
            items: [
              "**Пустой массив \`[]\`** — эффект один раз при mount",
              "**Массив с переменными** — эффект при их изменении",
              "**Без массива** — после каждого рендера",
              "**Cleanup** — отменяет предыдущий эффект: \`clearInterval\`, \`removeEventListener\`, \`abort()\`",
              "**React 18 Strict Mode** — эффекты монтируются, размонтируются и снова монтируются (проверка на утечки)",
            ],
          },
          {
            type: "code",
            title: "Эффект с cleanup и зависимостями",
            content: `useEffect(() => {
  const controller = new AbortController();

  fetchUser(userId, { signal: controller.signal })
    .then(res => res.json())
    .then(setUser)
    .catch(err => {
      if (err.name !== 'AbortError') setError(err);
    });

  return () => controller.abort(); // cleanup
}, [userId]); // перезапуск при смене userId`,
          },
        ],
        followUps: [
          {
            question: "Почему нельзя делать async колбэк в useEffect?",
            answer: `\`useEffect\` ожидает функцию или \`undefined\` (cleanup). \`async\`-функция возвращает **промис**, а не функцию очистки. Решение: создать внутреннюю \`async\`-функцию и вызвать её, или использовать \`.then()\`.`,
          },
          {
            question: "Что такое проблема гонки (race condition) в useEffect?",
            answer: `Быстрые смены \`userId\` → запросы завершаются в непредсказуемом порядке → старый ответ перезаписывает новый. Решение: **AbortController** или флаг \`ignore\` в cleanup.`,
          },
        ],
        keywords: [
          "cleanup",
          "зависимости",
          "AbortController",
          "race condition",
          "Strict Mode",
        ],
      },
      {
        id: "hooks-usememo-usecallback",
        tag: "ВИК-ИНДУСТРИ",
        hot: true,
        question: "useMemo vs useCallback. Когда использовать?",
        summary:
          "useMemo кеширует результат вычисления. useCallback кеширует ссылку на функцию. Нужны для передачи стабильных ссылок в мемоизированные дети и зависимости эффектов.",
        details: [
          {
            type: "code",
            title: "Разница",
            content: `// useMemo — кеширует РЕЗУЛЬТАТ
const filtered = useMemo(
  () => items.filter(i => i.name.includes(query)),
  [items, query]
);

// useCallback — кеширует ССЫЛКУ на функцию
const handleClick = useCallback(
  () => dispatch(addItem(id)),
  [dispatch, id]
);

// Фактически:
// useCallback(fn, deps) === useMemo(() => fn, deps)`,
          },
          {
            type: "tip",
            content:
              "С React Compiler (2026) ручная мемоизация через useMemo/useCallback часто не нужна — компилятор делает это автоматически. Но понимание принципов остаётся критичным.",
          },
        ],
        followUps: [
          {
            question: "Когда useMemo/actually вредит?",
            answer: `Для **дешёвых вычислений** (сложение, конкатенация строк) накладные расходы на сравнение зависимостей превышают экономию. Не мемоизируй без профилирования.`,
          },
        ],
        keywords: [
          "мемоизация",
          "стабильная ссылка",
          "зависимости",
          "преждевременная оптимизация",
        ],
      },
      {
        id: "hooks-custom",
        tag: "ВИК-ИНДУСТРИ",
        hot: true,
        question: "Пример кастомного хука из твоего проекта",
        summary:
          "Кастомный хук инкапсулирует переиспользуемую логику. В проекте: хук для подписки на WebSocket, хук для отслеживания размера окна, хук для debounce-поиска.",
        details: [
          {
            type: "code",
            title: "Хук для подписки на событие",
            content: `function useEventListener(event: string, handler: () => void) {
  useEffect(() => {
    window.addEventListener(event, handler);
    return () => window.removeEventListener(event, handler);
  }, [event, handler]);
}

// Использование в компоненте:
function Catalog() {
  const [width, setWidth] = useState(window.innerWidth);
  useEventListener('resize', () => setWidth(window.innerWidth));
  // ...
}`,
          },
          {
            type: "bullets",
            items: [
              "Каждый вызов кастомного хука создаёт **изолированное** состояние",
              "Имя должно начинаться с \`use\` — это требование правил хуков",
              "В отличие от HOC: не добавляют лишних узлов в дерево",
              "В отличие от Render Props: нет wrapper hell",
            ],
          },
        ],
        keywords: ["инкапсуляция", "переиспользование", "изоляция состояния"],
      },
      {
        id: "hooks-rules",
        tag: null,
        hot: true,
        question: "Почему хуки нельзя вызывать внутри условий?",
        summary:
          "React хранит хуки в связном списке. Порядок вызовов должен быть одинаковым на каждом рендере. Если один хук пропустится — все последующие сдвинутся и вернут чужие значения.",
        details: [
          {
            type: "bullets",
            items: [
              "Только на **верхнем уровне** компонента",
              "Не внутри \`if\`, \`for\`, \`while\`, колбэков",
              "Не в обычных функциях (только компоненты и кастомные хуки)",
              "ESLint \`eslint-plugin-react-hooks\` ловит нарушения автоматически",
            ],
          },
          {
            type: "code",
            title: "Нарушение",
            content: `// ❌ ПЛОХО:
if (isLoggedIn) {
  const [name, setName] = useState(''); // порядок сдвинется
}

// ✅ ХОРОШО:
const [name, setName] = useState(isLoggedIn ? '' : undefined);`,
          },
        ],
        keywords: ["связный список", "порядок вызовов", "правила хуков"],
      },
    ],
  },

  // ════════════════════════════════════════
  //  15. REACT HOOK FORM + ZOD
  // ════════════════════════════════════════
  {
    id: "forms-validation",
    title: "Формы и валидация",
    icon: "📝",
    accent: "#3dd68c",
    questions: [
      {
        id: "rhf-why",
        tag: "ВИК-ИНДУСТРИ",
        hot: true,
        question: "Почему React Hook Form? Чем лучше управляемых компонентов?",
        summary:
          "RHF использует неконтролируемые компоненты + ref. Минимум ре-рендеров при вводе. Встроенная валидация, поддержка Zod/Yup. В 2026 дополняется Actions из React 19 для простых форм.",
        details: [
          {
            type: "code",
            title: "Форма с Zod-валидацией",
            content: `import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(2, 'Минимум 2 символа'),
  email: z.string().email('Некорректный email'),
  phone: z.string().regex(/^\\+?[0-9]{10,15}$/, 'Некорректный телефон'),
});

type FormData = z.infer<typeof schema>;

function OrderForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    dispatch(submitOrder(data));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('name')} />
      {errors.name && <span>{errors.name.message}</span>}
      <input {...register('email')} />
      <button type="submit">Оформить</button>
    </form>
  );
}`,
          },
          {
            type: "bullets",
            items: [
              "**Неконтролируемые компоненты** — ввод не вызывает ре-рендер всего компонента",
              "**Валидация при отправке** или \`mode: 'onChange'\`",
              "**zodResolver** связывает Zod-схему с RHF",
              "**Для простых форм** в 2026 можно использовать \`<form action={fn}>\` из React 19",
            ],
          },
        ],
        followUps: [
          {
            question: "Когда использовать React 19 Actions вместо RHF?",
            answer: `Для **простых форм** (2-3 поля, базовая валидация). Для **сложных форм** с множеством полей, условной валидацией, динамическими полями — по-прежнему **React Hook Form**. Они дополняют, а не конкурируют.`,
          },
        ],
        keywords: [
          "register",
          "handleSubmit",
          "zodResolver",
          "неконтролируемые",
        ],
      },
      {
        id: "zod-schema",
        tag: "ВИК-ИНДУСТРИ",
        hot: true,
        question: "Что такое Zod? Как используешь для валидации API-данных?",
        summary:
          "Zod — TypeScript-first схема валидации. Описываешь схему → получаешь и рантайм-валидацию, и TypeScript-тип через z.infer. Используется для проверки API-ответов и форм.",
        details: [
          {
            type: "code",
            title: "Валидация API-ответа",
            content: `import { z } from 'zod';

const ProductSchema = z.object({
  id: z.number(),
  name: z.string(),
  price: z.number().positive(),
  category: z.enum(['sofa', 'chair', 'table']),
  images: z.array(z.string().url()),
});

type Product = z.infer<typeof ProductSchema>;

// Валидация при получении данных:
const response = await fetch('/api/products/1');
const data = await response.json();
const product = ProductSchema.parse(data); // бросит ошибку если невалидно`,
          },
        ],
        followUps: [
          {
            question: "Zod vs Yup vs Joi?",
            answer: `**Zod** — TypeScript-first, \`z.infer\` даёт тип без дублирования. **Yup** — старше, но типы приходится писать отдельно. **Joi** — тяжёлый, для браузера не подходит. В 2026 Zod — стандарт для новых проектов.`,
          },
        ],
        keywords: ["z.infer", "parse", "safeParse", "TypeScript-first"],
      },
    ],
  },

  // ════════════════════════════════════════
  //  16. REST API И HTTP
  // ════════════════════════════════════════
  {
    id: "rest-api",
    title: "REST API и HTTP",
    icon: "🌐",
    accent: "#3dd68c",
    questions: [
      {
        id: "rest-methods",
        tag: "Оба",
        hot: true,
        question: "HTTP-методы: GET, POST, PUT, PATCH, DELETE. Идемпотентность",
        summary:
          "GET — получить (безопасный, идемпотентный). POST — создать (не идемпотентный). PUT — полная замена (идемпотентный). PATCH — частичное обновление. DELETE — удаление (идемпотентный).",
        details: [
          {
            type: "bullets",
            items: [
              "**Идемпотентность**: повтор запроса даёт тот же эффект. GET, PUT, DELETE — идемпотентны. POST, PATCH — нет",
              "**Безопасные методы** (не меняют сервер): GET, HEAD, OPTIONS",
              "**PUT** отправляет ВСЕ поля ресурса. Не прислал поле — обнулится",
              "**PATCH** отправляет только изменяемые поля",
              "Ответы: 200, 201 (создано), 204 (нет контента), 400, 401, 403, 404, 429, 500",
            ],
          },
        ],
        followUps: [
          {
            question: "Почему нельзя использовать GET для удаления?",
            answer: `GET — **безопасный** метод: не должен менять состояние сервера. Браузеры, прокси, кэши могут повторять GET-запросы автоматически (предзагрузка, кеширование). DELETE через GET может быть вызван случайно.`,
          },
        ],
        keywords: [
          "идемпотентность",
          "безопасные методы",
          "PUT vs PATCH",
          "статусы",
        ],
      },
      {
        id: "rest-auth",
        tag: "Оба",
        hot: true,
        question: "JWT vs сессионные куки. Как хранишь токен на клиенте?",
        summary:
          "JWT — stateless, не нужен сервер для проверки. Куки — HttpOnly защищает от XSS. Лучший компромисс: refresh в HttpOnly-куке, access в памяти. Короткий exp для access.",
        details: [
          {
            type: "bullets",
            items: [
              "**JWT**: три части — Header.Payload.Signature. Payload НЕ зашифрован, только Base64",
              "**Нельзя отозвать** до истечения \`exp\`. Решение: короткие access (5-15 мин) + refresh",
              "**HttpOnly-куки**: защищены от XSS (JS не может прочитать), но нужна защита от CSRF",
              "**localStorage**: уязвим к XSS. Не рекомендуется для токенов",
              "**В памяти**: защищено от XSS, но теряется при F5",
            ],
          },
        ],
        followUps: [
          {
            question: "Как защитить от CSRF при использовании кук?",
            answer: `\`SameSite=Lax\` на куках (по умолчанию в современных браузерах). Для критичных операций — **CSRF-токен** в форме. Проверка заголовка \`Origin\`.`,
          },
        ],
        keywords: ["JWT", "HttpOnly", "SameSite", "refresh token", "CSRF"],
      },
      {
        id: "rest-cors",
        tag: null,
        hot: true,
        question: "Что такое CORS? Как настроить?",
        summary:
          "CORS — ограничение браузера, не сервера. Сервер разрешает кросс-доменные запросы заголовком Access-Control-Allow-Origin. Preflight (OPTIONS) для нестандартных запросов.",
        details: [
          {
            type: "bullets",
            items: [
              "**Origin** = протокол + домен + порт",
              "**Preflight** (OPTIONS) отправляется для PUT, DELETE, PATCH, Content-Type: application/json, кастомных заголовков",
              "\`Access-Control-Allow-Origin: *\` не работает с \`credentials: 'include'\`",
              "Настраивается **только на сервере**. Клиент ничего не может сделать",
              "Для разработки — прокси в Vite/Webpack",
            ],
          },
        ],
        keywords: [
          "Access-Control-Allow-Origin",
          "preflight",
          "OPTIONS",
          "Same-Origin Policy",
        ],
      },
      {
        id: "rest-axios-vs-fetch",
        tag: "amoCRM",
        hot: false,
        question: "Axios vs fetch. Что используешь и почему?",
        summary:
          "Axios: интерсепторы, автоматический JSON, таймауты, отмена через AbortController. fetch: нативный, без зависимостей. В проектах с RTK Query — fetchBaseQuery, Axios не нужен.",
        details: [
          {
            type: "bullets",
            items: [
              "**Axios**: интерсепторы (логирование, авто-обновление токена), авто-парсинг JSON, \`timeout\`",
              "**fetch**: нативный, не нужно устанавливать, но нужно вручную парсить JSON и проверять \`response.ok\`",
              "**RTK Query**: использует \`fetchBaseQuery\` — Axios не нужен",
              "В 2026 \`fetch\` поддерживает \`AbortController\`, \`keepalive\`, стриминг",
            ],
          },
        ],
        keywords: [
          "интерсепторы",
          "fetchBaseQuery",
          "AbortController",
          "response.ok",
        ],
      },
    ],
  },

  // ════════════════════════════════════════
  //  17. HTML / CSS / SCSS
  // ════════════════════════════════════════
  {
    id: "html-css",
    title: "HTML и CSS",
    icon: "🎨",
    accent: "#ff8a3d",
    questions: [
      {
        id: "css-specificity",
        tag: null,
        hot: true,
        question: "Специфичность и каскад. Как решаешь конфликты стилей?",
        summary:
          "Специфичность: inline (1000) > ID (100) > классы (10) > теги (1). Каскад: важность → происхождение → специфичность → порядок. @layer для управления приоритетом.",
        details: [
          {
            type: "bullets",
            items: [
              "**inline** > **#id** > **.class** > **tag**",
              "\`!important\` переопределяет всё, кроме другого \`!important\`",
              "**@layer** (CSS Cascade Layers) — управление приоритетом без специфичности",
              "**BEM** предотвращает конфликты имён: \`.card__title\`, \`.card--active\`",
              "В проекте: **CSS Modules** / **Tailwind** — нет глобальных конфликтов",
            ],
          },
        ],
        keywords: ["специфичность", "@layer", "BEM", "CSS Modules"],
      },
      {
        id: "css-flex-grid",
        tag: null,
        hot: true,
        question: "Flexbox vs Grid. Когда что используешь?",
        summary:
          "Flexbox — одномерный (строка или столбец). Grid — двумерный (строки и столбцы одновременно). Они работают вместе: Grid для макета, Flexbox для компонентов.",
        details: [
          {
            type: "bullets",
            items: [
              "**Flexbox**: навигация, ряд карточек, центрирование, когда контент определяет размер",
              "**Grid**: сложный макет, галерея, dashboard, когда макет определяет размер",
              "\`display: grid; place-items: center;\` — самый короткий способ центрирования",
              "\`repeat(auto-fill, minmax(250px, 1fr))\` — адаптивная сетка без медиазапросов",
            ],
          },
        ],
        keywords: [
          "одномерный",
          "двумерный",
          "place-items",
          "auto-fill",
          "minmax",
        ],
      },
      {
        id: "css-adaptive",
        tag: null,
        hot: true,
        question: "Как делаешь адаптивный дизайн? Mobile-first",
        summary:
          "Mobile-first: стили для мобильных по умолчанию, @media (min-width) для больших. Относительные единицы (rem, %, vw). clamp() для плавного масштабирования. Container queries (2023+).",
        details: [
          {
            type: "code",
            title: "clamp для плавного шрифта",
            content: `/* Минимум 16px, идеал 2vw, максимум 24px */
font-size: clamp(16px, 2vw, 24px);

/* Container queries: адаптация к родителю */
@container (min-width: 400px) {
  .card { flex-direction: row; }
}`,
          },
        ],
        keywords: [
          "mobile-first",
          "clamp",
          "container queries",
          "rem",
          "viewport",
        ],
      },
      {
        id: "css-scss",
        tag: "amoCRM",
        hot: false,
        question: "Зачем использовать SASS/SCSS? Какие фичи применяешь?",
        summary:
          "SCSS добавляет переменные, вложенность, миксины, @extend. В 2026 нативный CSS перекрывает многие фичи (@layer, custom properties, nesting), но SCSS остаётся в легаси-проектах.",
        details: [
          {
            type: "bullets",
            items: [
              "**Переменные**: \`$primary: #3498db;\`",
              "**Вложенность**: \`.card { &__title { ... } }\`",
              "**Миксины**: переиспользуемые блоки с аргументами",
              "**@use / @forward**: модульная система (замена @import)",
              "В новых проектах часто заменяется **CSS Modules** или **Tailwind**",
            ],
          },
        ],
        keywords: ["вложенность", "миксины", "@use", "переменные"],
      },
      {
        id: "html-semantic",
        tag: null,
        hot: false,
        question: "Семантическая вёрстка. Зачем и какие теги используешь?",
        summary:
          "Семантика: выбор тегов по смыслу (header, nav, main, article, section, footer). Улучшает SEO, доступность (скринридеры), читаемость кода.",
        details: [
          {
            type: "bullets",
            items: [
              "**header, nav, main, footer** — каркас страницы",
              "**article** — самостоятельный контент (пост, карточка товара)",
              "**section** — тематический раздел",
              "**strong / em** vs **b / i** — семантика важности",
              "**alt** у изображений — обязателен для доступности",
              "**label + input** — связь для скринридеров",
            ],
          },
        ],
        keywords: ["header", "article", "section", "доступность", "SEO"],
      },
    ],
  },

  // ════════════════════════════════════════
  //  18. CI/CD И ИНСТРУМЕНТЫ
  // ════════════════════════════════════════
  {
    id: "ci-cd",
    title: "CI/CD и инструменты",
    icon: "🔧",
    accent: "#f38ba8",
    questions: [
      {
        id: "cicd-pipeline",
        tag: "Оба",
        hot: true,
        question: "Как устроен ваш CI/CD пайплайн?",
        summary:
          "PR → линтинг (ESLint/oxlint) → тесты (Jest, Playwright) → сборка → деплой на стейджинг → QA → production. В ВИК-ИНДУСТРИ: Playwright E2E в CI сократил регрессии в 2 раза.",
        details: [
          {
            type: "bullets",
            items: [
              "**Lint**: ESLint + Prettier (или oxlint в 2026) — проверка стиля и правил",
              "**Unit-тесты**: Jest / Vitest — критичная логика",
              "**E2E-тесты**: Playwright — ключевые пользовательские сценарии",
              "**Сборка**: Vite build — проверка что проект собирается",
              "**Деплой**: автоматический на стейджинг, ручной/полуавтоматический на production",
            ],
          },
        ],
        followUps: [
          {
            question: "Что происходит, если тесты падают в CI?",
            answer: `**Merge блокируется**. В GitHub Actions / GitLab CI это настраивается через required status checks. Разработчик исправляет код и пушит заново. Это гарантирует, что в main не попадёт сломанный код.`,
          },
        ],
        keywords: [
          "pipeline",
          "lint",
          "test",
          "build",
          "deploy",
          "required checks",
        ],
      },
      {
        id: "cicd-eslint",
        tag: "Оба",
        hot: true,
        question: "Как настроил ESLint и Prettier? Что они проверяют?",
        summary:
          "ESLint — правила качества кода (no-unused-vars, react-hooks/rules-of-hooks). Prettier — форматирование (отступы, кавычки). В 2026: ESLint 9 с flat config, oxlint как быстрая альтернатива.",
        details: [
          {
            type: "bullets",
            items: [
              "**ESLint**: правила качества — хуки, зависимости, неиспользуемые переменные",
              "**Prettier**: только форматирование — не конфликтует с ESLint",
              "**В 2026**: \`eslint.config.js\` (flat config) вместо \`.eslintrc\`",
              "**oxlint**: Rust-линтер, в 50-100 раз быстрее. Для быстрых проверок в CI",
              "**В проекте**: общая конфигурация + автопроверка в CI перед merge",
            ],
          },
        ],
        keywords: ["flat config", "rules-of-hooks", "Prettier", "oxlint", "CI"],
      },
      {
        id: "cicd-playwright",
        tag: "ВИК-ИНДУСТРИ",
        hot: true,
        question: "Как автоматизировал E2E через Playwright? Что тестировал?",
        summary:
          "Ключевые пользовательские сценарии: поиск, фильтрация, добавление в корзину, оформление заказа. Запуск в CI при каждом PR. data-testid для стабильных селекторов.",
        details: [
          {
            type: "code",
            title: "E2E тест фильтрации",
            content: `import { test, expect } from '@playwright/test';

test('фильтрация по категории', async ({ page }) => {
  await page.goto('/catalog');
  await expect(page.locator('[data-testid="product-card"]'))
    .toHaveCount({ minimum: 1 });

  await page.click('[data-testid="filter-category-sofa"]');

  const cards = page.locator('[data-testid="product-card"]');
  await expect(cards).not.toHaveCount(0);
});`,
          },
          {
            type: "bullets",
            items: [
              "**data-testid** атрибуты — стабильные селекторы, не ломаются при изменении стилей",
              "**Параллельный запуск** — тесты идут в несколько потоков",
              "**Запуск в CI** при каждом pull request",
              "Покрытие **ключевых сценариев**, а не каждой кнопки",
            ],
          },
        ],
        keywords: ["data-testid", "параллельный запуск", "регрессия", "CI/CD"],
      },
      {
        id: "cicd-jest",
        tag: "amoCRM",
        hot: true,
        question: "Как довёл покрытие Jest до 87%? Что тестировал?",
        summary:
          "Фокус на чистых функциях: форматтеры, трансформеры данных, валидаторы. Не тестировал простые UI-компоненты (их покрывает E2E). Покрытие критичной логики, не ради цифры.",
        details: [
          {
            type: "code",
            title: "Тест трансформера данных",
            content: `import { transformPayment } from './formatters';

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

  it('обрабатывает null и undefined', () => {
    expect(formatCurrency(null)).toBe('0 ₽');
    expect(formatCurrency(undefined)).toBe('0 ₽');
  });
});`,
          },
        ],
        followUps: [
          {
            question: "Что ты НЕ тестировал и почему?",
            answer: `Не тестировал **простые UI-компоненты** (кнопки, лейблы) — их поведение проверяется через E2E. Не тестировал **константы и типы** — там нет логики. Фокус на **чистых функциях**, где баги стоят дороже всего.`,
          },
        ],
        keywords: ["чистые функции", "форматтеры", "покрытие", "регрессия"],
      },
    ],
  },

  // ════════════════════════════════════════
  //  19. REACT VIRTUALIZED / ВИРТУАЛИЗАЦИЯ
  // ════════════════════════════════════════
  {
    id: "virtualization",
    title: "Виртуализация",
    icon: "📜",
    accent: "#ffc857",
    questions: [
      {
        id: "virt-how",
        tag: "ВИК-ИНДУСТРИ",
        hot: true,
        question: "Как работает виртуализация списков?",
        summary:
          "Вместо 5000 карточек в DOM рендерятся только видимые (~20-30) + overscan. Общий контейнер имеет высоту всех элементов, но позиционируются только видимые.",
        details: [
          {
            type: "code",
            title: "Принцип виртуализации",
            content: `// Контейнер: высота = общая высота всех элементов
// Внутри: только видимые элементы с position: absolute

<div style={{ height: totalHeight, overflow: 'auto' }}>
  <div style={{ height: totalHeight, position: 'relative' }}>
    {visibleItems.map(item => (
      <div
        key={item.id}
        style={{
          position: 'absolute',
          top: 0,
          transform: \`translateY(\${item.offsetTop}px)\`,
          height: itemHeight,
        }}
      >
        <ProductCard product={item} />
      </div>
    ))}
  </div>
</div>`,
          },
          {
            type: "bullets",
            items: [
              "**React Virtualized** — использовал в проекте (карточки фиксированной высоты)",
              "**TanStack Virtual** — рекомендую в 2026: headless, легче, динамическая высота",
              "**overscan** — рендер нескольких элементов за пределами видимой области",
              "**Мемоизация карточек** — \`React.memo\` предотвращает ре-рендер при скролле",
            ],
          },
        ],
        followUps: [
          {
            question: "Как виртуализация влияет на SEO?",
            answer: `Негативно: поисковый бот не видит контент за пределами первого экрана. Решение: **серверный рендеринг** первых 50 карточек или **динамический рендеринг** для ботов.`,
          },
          {
            question: "Что делать с элементами переменной высоты?",
            answer: `**TanStack Virtual** поддерживает динамическую высоту через \`measureElement\`. Элемент рендерится, измеряется его реальная высота, позиция пересчитывается. **React Virtualized** требует \`CellMeasurer\`.`,
          },
        ],
        keywords: [
          "DOM-узлы",
          "overscan",
          "TanStack Virtual",
          "translateY",
          "мемоизация",
        ],
      },
    ],
  },

  // ════════════════════════════════════════
  //  20. FEATURE-SLICED DESIGN (углублённо)
  // ════════════════════════════════════════
  {
    id: "fsd-deep",
    title: "Feature-Sliced Design",
    icon: "🧩",
    accent: "#43d2ff",
    questions: [
      {
        id: "fsd-layers",
        tag: "ВИК-ИНДУСТРИ",
        hot: true,
        question: "Расскажи про слои FSD. Какое правило импортов?",
        summary:
          "6 слоёв: app → pages → widgets → features → entities → shared. Каждый слой импортирует только из слоёв ниже. В 2026 проверяется через steiger (CLI) или ESLint.",
        details: [
          {
            type: "code",
            title: "Структура проекта",
            content: `src/
├── app/                    # инициализация, провайдеры
├── pages/
│   └── catalog/            # страница каталога
├── widgets/
│   └── catalog-filters/    # блок фильтров
├── features/
│   ├── add-to-cart/        # сценарий добавления
│   └── catalog-sort/
├── entities/
│   ├── product/            # модель товара
│   └── category/
└── shared/
    ├── ui/                 # Button, Input
    ├── api/                # baseQuery
    └── lib/                # утилиты`,
          },
          {
            type: "bullets",
            items: [
              "**app** не импортируется никем",
              "**shared** не импортирует из других слоёв",
              "**Правило**: слой импортирует только из слоёв **ниже**",
              "**В 2026**: \`steiger\` (CLI) проверяет импорты в CI",
              "Каждый слайс имеет \`index.ts\` — публичный API",
            ],
          },
        ],
        followUps: [
          {
            question: "Какая проблема была до FSD?",
            answer: `Код лежал в папках по типу (\`components/\`, \`utils/\`). При росте проекта стало сложно понять, **где бизнес-логика** конкретной фичи. Компоненты тянули зависимости из неожиданных мест. FSD дал понятную структуру и ограничения.`,
          },
          {
            question: "Как enforced правило импортов?",
            answer: `Через **steiger** (официальный CLI от FSD) или **eslint-plugin-boundaries**. Проверяют импорты и падают в CI, если страница импортирует другую страницу или shared тянет из features.`,
          },
        ],
        keywords: ["слои", "слайсы", "steiger", "импорты", "публичный API"],
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
