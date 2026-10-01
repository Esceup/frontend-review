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
  DATA,
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
  const [dismissed, setDismissed] = useState({}); // ← НОВОЕ
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setCards({});
      setDismissed({});
      setLoading(false);
      return;
    }

    const ref = doc(db, "users", user.uid);
    const unsubscribe = onSnapshot(ref, async (snap) => {
      if (snap.exists()) {
        const data = snap.data();
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
            dismissed: {},
            learned: deleteField(),
            incorrect: deleteField(),
          });
          return;
        }
        setCards(data.cards || {});
        setDismissed(data.dismissed || {}); // ← НОВОЕ
      } else {
        await setDoc(ref, { cards: {}, dismissed: {} }); // ← НОВОЕ
        setCards({});
        setDismissed({});
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

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

  // ← НОВОЕ: Удалить вопрос навсегда
  const dismissCard = useCallback(
    async (questionId) => {
      if (!user) return;
      await updateDoc(doc(db, "users", user.uid), {
        [`dismissed.${questionId}`]: Date.now(),
        [`cards.${questionId}`]: deleteField(),
      });
    },
    [user],
  );

  // ← НОВОЕ: Восстановить удалённый вопрос
  const restoreCard = useCallback(
    async (questionId) => {
      if (!user) return;
      await updateDoc(doc(db, "users", user.uid), {
        [`dismissed.${questionId}`]: deleteField(),
      });
    },
    [user],
  );

  const statusOf = useCallback(
    (qId) => {
      if (dismissed[qId]) return "dismissed"; // ← НОВОЕ
      const c = cards[qId];
      if (!c) return "new";
      return c.next <= Date.now() ? "due" : "scheduled";
    },
    [cards, dismissed],
  );

  const stats = useMemo(() => {
    const now = Date.now();
    let due = 0;
    let fresh = 0;
    let learned = 0;
    let dismissedCount = 0;
    const sections = DATA.sections.map((s) => {
      let sDue = 0,
        sFresh = 0,
        sLearned = 0,
        sDismissed = 0;
      const topics = s.topics.map((t) => {
        let tDue = 0,
          tFresh = 0,
          tLearned = 0,
          tDismissed = 0;
        t.questions.forEach((q) => {
          if (dismissed[q.id]) {
            tDismissed++;
            return;
          }
          const c = cards[q.id];
          if (!c) tFresh++;
          else if (c.next <= now) tDue++;
          else tLearned++;
        });
        sDue += tDue;
        sFresh += tFresh;
        sLearned += tLearned;
        sDismissed += tDismissed;
        return {
          id: t.id,
          title: t.title,
          total: t.questions.length,
          active: t.questions.length - tDismissed,
          due: tDue,
          fresh: tFresh,
          learned: tLearned,
          dismissed: tDismissed,
          hot: t.questions.filter((q) => q.hot && !dismissed[q.id]).length,
        };
      });
      due += sDue;
      fresh += sFresh;
      learned += sLearned;
      dismissedCount += sDismissed;
      return {
        id: s.id,
        title: s.title,
        accent: s.accent,
        total: topics.reduce((n, t) => n + t.total, 0),
        active: topics.reduce((n, t) => n + t.active, 0),
        due: sDue,
        fresh: sFresh,
        learned: sLearned,
        dismissed: sDismissed,
        topics,
      };
    });
    return {
      total: allQuestions.length,
      active: allQuestions.length - dismissedCount,
      due,
      fresh,
      learned,
      dismissed: dismissedCount,
      sections,
    };
  }, [cards, dismissed]);

  return (
    <ProgressContext.Provider
      value={{
        cards,
        dismissed,
        loading,
        rateCard,
        dismissCard,
        restoreCard,
        statusOf,
        stats,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => useContext(ProgressContext);
