import { HashRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ProgressProvider } from "./context/ProgressContext";
import Layout from "./components/Layout";
import HomePage from "./components/HomePage";
import SectionDetail from "./components/SectionDetail";
import ReviewPage from "./components/ReviewPage";
import Login from "./components/Login";
import Register from "./components/Register";
import PrivateRoute from "./components/PrivateRoute";
import TasksPage from "./components/TasksPage";
import TaskPage from "./components/TaskPage";

function App() {
  return (
    <AuthProvider>
      <ProgressProvider>
        <HashRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Layout />
                </PrivateRoute>
              }
            >
              <Route index element={<HomePage />} />
              <Route path="section/:section" element={<SectionDetail />} />
              <Route
                path="section/:section/:topic"
                element={<SectionDetail />}
              />
              <Route path="review" element={<ReviewPage />} />
              <Route path="review/:section" element={<ReviewPage />} />
              <Route path="review/:section/:topic" element={<ReviewPage />} />
              <Route path="tasks" element={<TasksPage />} />
              <Route path="tasks/:taskId" element={<TaskPage />} />
            </Route>
          </Routes>
        </HashRouter>
      </ProgressProvider>
    </AuthProvider>
  );
}

export default App;
