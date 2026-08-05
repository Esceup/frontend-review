# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.

```
vite-project
├─ .oxlintrc.json
├─ index.html
├─ package-lock.json
├─ package.json
├─ postcss.config.js
├─ public
│  ├─ favicon.svg
│  └─ icons.svg
├─ README.md
├─ src
│  ├─ App.css
│  ├─ App.jsx
│  ├─ assets
│  │  ├─ hero.png
│  │  ├─ react.svg
│  │  └─ vite.svg
│  ├─ components
│  │  ├─ Breadcrumbs.jsx
│  │  ├─ HomePage.jsx
│  │  ├─ Layout.jsx
│  │  ├─ Login.jsx
│  │  ├─ PrivateRoute.jsx
│  │  ├─ QuestionCard.jsx
│  │  ├─ Register.jsx
│  │  ├─ ResultModal.jsx
│  │  ├─ SectionDetail.jsx
│  │  ├─ TasksPage.jsx
│  │  └─ TicketPage.jsx
│  ├─ context
│  │  ├─ AuthContext.jsx
│  │  └─ ProgressContext.jsx
│  ├─ data
│  │  ├─ questions.js
│  │  └─ tasks.js
│  ├─ firebase.js
│  ├─ index.css
│  ├─ main.jsx
│  └─ utils
│     ├─ generateTicket.js
│     └─ shuffle.js
├─ tailwind.config.js
└─ vite.config.js

```
```
vite-project
├─ .oxlintrc.json
├─ index.html
├─ package-lock.json
├─ package.json
├─ postcss.config.js
├─ public
│  ├─ favicon.svg
│  └─ icons.svg
├─ README.md
├─ src
│  ├─ App.css
│  ├─ App.jsx
│  ├─ assets
│  │  ├─ hero.png
│  │  ├─ react.svg
│  │  └─ vite.svg
│  ├─ components
│  │  ├─ Breadcrumbs.jsx
│  │  ├─ CodeEditor.jsx
│  │  ├─ HomePage.jsx
│  │  ├─ Layout.jsx
│  │  ├─ Login.jsx
│  │  ├─ PrivateRoute.jsx
│  │  ├─ QuestionCard.jsx
│  │  ├─ Register.jsx
│  │  ├─ ResultModal.jsx
│  │  ├─ SectionDetail.jsx
│  │  ├─ TaskPage.jsx
│  │  ├─ TasksPage.jsx
│  │  ├─ Test.jsx
│  │  └─ TicketPage.jsx
│  ├─ context
│  │  ├─ AuthContext.jsx
│  │  └─ ProgressContext.jsx
│  ├─ data
│  │  ├─ questions.js
│  │  └─ tasks.js
│  ├─ firebase.js
│  ├─ index.css
│  ├─ main.jsx
│  └─ utils
│     ├─ generateTicket.js
│     └─ shuffle.js
├─ tailwind.config.js
└─ vite.config.js

```