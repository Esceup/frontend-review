import React from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import {
  SECTIONS,
  allQuestions,
  getSection,
  getTopic,
  DATA
} from "../data/questions/index";
import allTasks from "../data/tasks";

export default function Breadcrumbs() {
  const location = useLocation();
  const params = useParams();
  const pathname = location.pathname;

  if (pathname === "/") return null;

  const crumbs = [{ to: "/", label: "Главная" }];

  if (pathname.startsWith("/section/")) {
    const section = DATA.sections.find((s) => s.id === params.section);
    if (params.topic) {
      crumbs.push({
        to: `/section/${params.section}`,
        label: section?.title || params.section,
      });
      const topic = section?.topics.find((t) => t.id === params.topic);
      crumbs.push({ to: null, label: topic?.title || params.topic });
    } else {
      crumbs.push({ to: null, label: section?.title || params.section });
    }
  } else if (pathname.startsWith("/review")) {
    crumbs.push({ to: null, label: "Повторение" });
  } else if (pathname === "/tasks") {
    crumbs.push({ to: null, label: "Задачи" });
  } else if (pathname.startsWith("/tasks/")) {
    const task = allTasks.find((t) => t.id === params.taskId);
    crumbs.push({ to: "/tasks", label: "Задачи" });
    if (task) crumbs.push({ to: null, label: task.title });
  } else {
    return null;
  }

  return (
    <nav className="mb-5 flex flex-wrap items-center gap-1 font-mono text-xs text-mist-500">
      {crumbs.map((crumb, idx) => (
        <React.Fragment key={idx}>
          {idx > 0 && <span className="mx-1 text-ink-500">/</span>}
          {crumb.to ? (
            <Link to={crumb.to} className="transition hover:text-accent-css">
              {crumb.label}
            </Link>
          ) : (
            <span className="text-mist-300">{crumb.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}
