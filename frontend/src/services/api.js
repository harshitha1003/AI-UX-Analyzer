import axios from "axios";
import { demoDashboard, demoRecommendations } from "./demoData.js";

const rawApiUrl = import.meta.env.VITE_API_URL?.trim();

export const API_BASE_URL =
  rawApiUrl?.replace(/\/+$/, "") ||
  (import.meta.env.DEV ? "http://localhost:5000" : "/api");
export const DEMO_MODE = import.meta.env.VITE_DEMO_MODE === "true";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 60000,
});

export const getApiErrorMessage = (error, fallback = "Request failed.") => {
  const backendMessage = error.response?.data?.error;
  if (backendMessage) return backendMessage;

  if (error.response?.status === 502) {
    return "The backend service is down on Render. Redeploy or restart the Render service, then try again.";
  }
  if (error.response?.status === 404) {
    return `The backend route was not found at ${API_BASE_URL}. Check the Vercel VITE_API_URL setting.`;
  }
  if (error.code === "ECONNABORTED") {
    return "The backend took too long to respond. Render may still be starting up or the service may have crashed.";
  }
  if (error.request && !error.response) {
    return `Cannot reach the backend at ${API_BASE_URL}. Check that the Render service is live.`;
  }

  return error.message || fallback;
};

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
