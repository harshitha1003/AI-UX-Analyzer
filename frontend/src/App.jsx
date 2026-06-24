import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";
import AnalyzeFeedback from "./pages/AnalyzeFeedback.jsx";
import UploadData from "./pages/UploadData.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Recommendations from "./pages/Recommendations.jsx";

export default function App() {
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("theme") === "dark");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <Layout darkMode={darkMode} onToggleDark={() => setDarkMode((value) => !value)}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/analyze" element={<AnalyzeFeedback />} />
        <Route path="/upload" element={<UploadData />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/recommendations" element={<Recommendations />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}
