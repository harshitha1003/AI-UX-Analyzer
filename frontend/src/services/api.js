import axios from "axios";
import { demoDashboard, demoRecommendations } from "./demoData.js";

export const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
export const DEMO_MODE = import.meta.env.VITE_DEMO_MODE === "true";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 8000,
});

export const analyzeFeedback = (text, source = "manual") =>
  api.post("/analyze", { text, source }).then((res) => res.data);

export const uploadFeedbackCsv = (file) => {
  const formData = new FormData();
  formData.append("file", file);
  return api
    .post("/upload", formData, { headers: { "Content-Type": "multipart/form-data" } })
    .then((res) => res.data);
};

export const getDashboard = async () => {
  if (DEMO_MODE) return demoDashboard;
  try {
    return await api.get("/dashboard").then((res) => res.data);
  } catch (error) {
    return { ...demoDashboard, demo: true, apiError: error.message };
  }
};
export const getIssues = () => api.get("/issues").then((res) => res.data);
export const getRecommendations = async () => {
  if (DEMO_MODE) return demoRecommendations;
  try {
    return await api.get("/recommendations").then((res) => res.data);
  } catch {
    return demoRecommendations;
  }
};
export const exportResultsUrl = `${API_BASE_URL}/export`;
