export const demoDashboard = {
  statistics: {
    total_feedback: 8,
    positive_percent: 25,
    negative_percent: 50,
    neutral_percent: 25,
  },
  sentiment_counts: {
    Positive: 2,
    Negative: 4,
    Neutral: 2,
  },
  issue_counts: {
    Navigation: 3,
    Performance: 2,
    "UI Design": 2,
    Accessibility: 1,
    Bugs: 1,
    Usability: 2,
  },
  trend: [
    { date: "2026-06-19", Positive: 1, Negative: 1, Neutral: 0 },
    { date: "2026-06-20", Positive: 0, Negative: 2, Neutral: 1 },
    { date: "2026-06-21", Positive: 1, Negative: 1, Neutral: 1 },
  ],
  heatmap: [
    { area: "Navigation", value: 3 },
    { area: "UI", value: 2 },
    { area: "Performance", value: 2 },
    { area: "Accessibility", value: 1 },
    { area: "Bugs", value: 1 },
    { area: "Usability", value: 2 },
  ],
  feedback: [
    {
      id: "demo-1",
      source: "app_review",
      text: "The app takes too long to load and freezes after login.",
      created_at: "2026-06-21 10:00:00",
    },
    {
      id: "demo-2",
      source: "survey",
      text: "The navigation is confusing and I cannot find the billing page.",
      created_at: "2026-06-21 11:30:00",
    },
    {
      id: "demo-3",
      source: "survey",
      text: "I love the clean layout and the dashboard is easy to use.",
      created_at: "2026-06-20 09:45:00",
    },
    {
      id: "demo-4",
      source: "support_ticket",
      text: "The text is too small and contrast is poor in dark mode.",
      created_at: "2026-06-20 13:20:00",
    },
  ],
  recommendations: [
    {
      id: "demo-rec-1",
      category: "Performance",
      recommendation: "Optimize API response times, compress large assets, cache frequent requests, and use loading indicators.",
      priority: "High",
      created_at: "2026-06-21 10:00:00",
      text: "The app takes too long to load and freezes after login.",
    },
    {
      id: "demo-rec-2",
      category: "Navigation",
      recommendation: "Simplify menu hierarchy, clarify navigation labels, and add breadcrumbs or visible back paths.",
      priority: "High",
      created_at: "2026-06-21 11:30:00",
      text: "The navigation is confusing and I cannot find the billing page.",
    },
  ],
};

export const demoRecommendations = demoDashboard.recommendations;
