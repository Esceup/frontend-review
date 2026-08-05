// src/data/index.js
// Собирает все разделы из отдельных файлов и нормализует вопросы.
// Если какого-то файла ещё нет — просто закомментируй его импорт и строку в rawSections.

// src/data/index.js
import htmlSection from "./html";
import cssSection from "./css";
import jsSection from "./js";
import httpSection from "./http";
import tsSection from "./ts";
import reactSection from "./react";
import reduxSection from "./redux";


const rawSections = [
  htmlSection,
  cssSection,
  jsSection,
  httpSection,
  tsSection,
  reactSection,
  reduxSection,
];

// Приводим вопрос к единому виду + алиасы, чтобы работало ЛЮБОЕ имя поля в компонентах
const normalizeQuestion = (q, section, topic) => ({
  ...q,
  hot: Boolean(q.hot),
  // основные поля (как в твоём js.js)
  q: q.q,
  a: q.a,
  // алиасы для совместимости с компонентами
  title: q.q,
  text: q.q,
  question: q.q,
  answer: q.a,
  fullAnswer: q.a,
  shortAnswer: q.a,
  explanation: q.a,
  // привязка к разделу/теме (для хлебных крошек и «Повторения»)
  section: section.id,
  sectionTitle: section.title,
  topic: topic.id,
  topicTitle: topic.title,
});

export const SECTIONS = rawSections.map((s) => ({
  id: s.id,
  title: s.title,
  color: s.color,
  topics: (s.topics || []).map((t) => ({
    id: t.id,
    title: t.title,
    questions: (t.questions || []).map((q) => normalizeQuestion(q, s, t)),
  })),
}));

// Плоский список всех вопросов (для «Повторения», поиска, статистики)
export const allQuestions = SECTIONS.flatMap((s) => s.topics.flatMap((t) => t.questions));

export const getSection = (id) => SECTIONS.find((s) => s.id === id);

export const getTopic = (sectionId, topicId) =>
  getSection(sectionId)?.topics.find((t) => t.id === topicId);

// на случай, если какой-то компонент читает DATA.sections
export const DATA = { sections: SECTIONS };

export default SECTIONS;