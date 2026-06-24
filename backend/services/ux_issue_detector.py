from collections import defaultdict

UX_KEYWORDS = {
    "Navigation": [
        "navigate", "navigation", "menu", "find", "lost", "back", "flow", "journey",
        "screen", "search", "hierarchy"
    ],
    "Performance": [
        "slow", "lag", "load", "loading", "freeze", "crash", "timeout", "delay",
        "response", "speed", "hang"
    ],
    "UI Design": [
        "button", "color", "layout", "font", "confusing", "clutter", "screen",
        "visual", "icon", "design", "spacing"
    ],
    "Accessibility": [
        "accessibility", "contrast", "reader", "keyboard", "voice", "small text",
        "blind", "caption", "aria", "focus"
    ],
    "Bugs": [
        "bug", "broken", "error", "crash", "incorrect", "fail", "issue", "glitch",
        "doesn't work", "not working"
    ],
    "Usability": [
        "hard", "difficult", "frustrating", "unusable", "complicated", "steps",
        "intuitive", "easy", "learn", "onboarding"
    ],
}


def detect_ux_issues(text, processed_text=""):
    haystack = f"{text or ''} {processed_text or ''}".lower()
    matches = []
    for category, keywords in UX_KEYWORDS.items():
        evidence = [keyword for keyword in keywords if keyword in haystack]
        if evidence:
            score = min(0.98, 0.54 + (len(evidence) * 0.1))
            matches.append(
                {"category": category, "score": round(score, 2), "evidence": ", ".join(evidence[:4])}
            )

    if not matches and processed_text:
        try:
            from sklearn.feature_extraction.text import TfidfVectorizer

            vectorizer = TfidfVectorizer(vocabulary=sorted({k for values in UX_KEYWORDS.values() for k in values if " " not in k}))
            matrix = vectorizer.fit_transform([processed_text])
            scores = matrix.toarray()[0]
            by_category = defaultdict(float)
            for term, value in zip(vectorizer.get_feature_names_out(), scores):
                for category, keywords in UX_KEYWORDS.items():
                    if term in keywords:
                        by_category[category] += value
            for category, value in by_category.items():
                if value > 0:
                    matches.append({"category": category, "score": round(min(0.85, value + 0.45), 2), "evidence": "tf-idf signal"})
        except Exception:
            pass

    return sorted(matches, key=lambda item: item["score"], reverse=True)
