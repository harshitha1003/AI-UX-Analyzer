RECOMMENDATIONS = {
    "Navigation": "Simplify menu hierarchy, clarify navigation labels, and add breadcrumbs or visible back paths.",
    "Performance": "Optimize API response times, compress large assets, cache frequent requests, and use loading indicators.",
    "UI Design": "Improve visual hierarchy, make primary actions clearer, and standardize spacing, labels, and button states.",
    "Accessibility": "Increase contrast, support keyboard navigation, add accessible labels, and test with screen readers.",
    "Bugs": "Prioritize reproducible defects, add regression tests, and expose clear recovery messages when failures occur.",
    "Usability": "Reduce task steps, improve onboarding cues, and validate the flow with usability tests.",
}


def priority_for(sentiment, score):
    if sentiment == "Negative" and score >= 0.75:
        return "High"
    if sentiment == "Negative" or score >= 0.7:
        return "Medium"
    return "Low"


def generate_recommendations(text, issues, sentiment_result):
    if not issues:
        return [
            {
                "category": "General",
                "recommendation": "Review this feedback during the next UX triage session and look for repeated patterns.",
                "priority": "Low",
            }
        ]
    sentiment = sentiment_result.get("sentiment", "Neutral")
    return [
        {
            "category": issue["category"],
            "recommendation": RECOMMENDATIONS.get(issue["category"], RECOMMENDATIONS["Usability"]),
            "priority": priority_for(sentiment, issue["score"]),
        }
        for issue in issues
    ]
