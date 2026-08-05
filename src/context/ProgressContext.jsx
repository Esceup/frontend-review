import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  deleteField,
  doc,
  increment,
  onSnapshot,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "./AuthContext";
import {
  SECTIONS,
  allQuestions,
  getSection,
  getTopic,
  DATA 
} from "../data/questions/index";

const DAY = 86_400_000;

export const LEVELS = [
  { key: 0, label: "Не знаю", days: 0, color: "#ff6b6b" }, 
  { key: 1, label: "Немного знаю", days: 1, color: "#ffc857" },
  { key: 2, label: "Хорошо знаю", days: 3, color: "#43d2ff" },
  { key: 3, label: "Полностью знаю", days: 7, color: "#3dd68c" },
];

export const formatNext = (ts) => {
  if (ts <= Date.now()) return "сейчас";
  return new Date(ts).toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "short",
  });
};

const ProgressContext = createContext();

export const ProgressProvider = ({ children }) => {
  const { user } = useAuth();
  const [cards, setCards] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setCards({});
      setLoading(false);
      return;
    }
    const ref = doc(db, "users", user.uid);
    const unsubscribe = onSnapshot(ref, async (snap) => {
      if (snap.exists()) {
        const data = snap.data();
        // Одноразовая миграция со старого формата (learned/incorrect)
        // Одноразовая миграция со старого формата (learned/incorrect)
        if (!data.cards && (data.learned?.length || data.incorrect?.length)) {
          const now = Date.now();
          const migrated = {};
          (data.learned || []).forEach((id) => {
            migrated[id] = { lvl: 3, next: now + 7 * DAY, seen: 1, last: now };
          });
          (data.incorrect || []).forEach((id) => {
            migrated[id] = { lvl: 0, next: now + DAY, seen: 1, last: now };
          });
          await updateDoc(ref, {
            cards: migrated,
            learned: deleteField(),
            incorrect: deleteField(),
          });
          return;
        }
        setCards(data.cards || {});
      } else {
        await setDoc(ref, { cards: {} });
        setCards({});
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [user]);

  // Оценить карточку — точечная запись в Firestore, синхронизируется на всех ПК
  const rateCard = useCallback(
    async (questionId, lvl) => {
      if (!user) return;
      const now = Date.now();
      await updateDoc(doc(db, "users", user.uid), {
        [`cards.${questionId}`]: {
          lvl,
          next: now + LEVELS[lvl].days * DAY,
          seen: increment(1),
          last: now,
        },
      });
    },
    [user],
  );

  const statusOf = useCallback(
    (qId) => {
      const c = cards[qId];
      if (!c) return "new";
      return c.next <= Date.now() ? "due" : "scheduled";
    },
    [cards],
  );

  // Статистика по секциям и темам
  const stats = useMemo(() => {
    const now = Date.now();
    let due = 0;
    let fresh = 0;
    let learned = 0;

    const sections = DATA.sections.map((s) => {
      let sDue = 0,
        sFresh = 0,
        sLearned = 0;
      const topics = s.topics.map((t) => {
        let tDue = 0,
          tFresh = 0,
          tLearned = 0;
        t.questions.forEach((q) => {
          const c = cards[q.id];
          if (!c) tFresh++;
          else if (c.next <= now) tDue++;
          else tLearned++;
        });
        sDue += tDue;
        sFresh += tFresh;
        sLearned += tLearned;
        return {
          id: t.id,
          title: t.title,
          total: t.questions.length,
          due: tDue,
          fresh: tFresh,
          learned: tLearned,
          hot: t.questions.filter((q) => q.hot).length,
        };
      });
      due += sDue;
      fresh += sFresh;
      learned += sLearned;
      return {
        id: s.id,
        title: s.title,
        accent: s.accent,
        total: s.topics.reduce((n, t) => n + t.questions.length, 0),
        due: sDue,
        fresh: sFresh,
        learned: sLearned,
        topics,
      };
    });

    return { total: allQuestions.length, due, fresh, learned, sections };
  }, [cards]);

  return (
    <ProgressContext.Provider
      value={{ cards, loading, rateCard, statusOf, stats }}
    >
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => useContext(ProgressContext);
