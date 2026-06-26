import math
import os
import re

_classifier = None

POSITIVE_TERMS = {
    "love", "great", "fast", "easy", "smooth", "helpful", "excellent", "clear",
    "intuitive", "good", "amazing", "perfect", "useful", "reliable"
}
NEGATIVE_TERMS = {
    "bad", "slow", "confusing", "crash", "broken", "bug", "hard", "difficult",
    "annoying", "hate", "terrible", "poor", "inaccessible", "lag", "freeze",
    "unusable", "frustrating", "error"
}


def _load_classifier():
    global _classifier
    if _classifier is not None:
        return _classifier
    if os.environ.get("AI_UX_USE_TRANSFORMER_SENTIMENT", "").lower() not in {"1", "true", "yes"}:
        _classifier = False
        return _classifier
    try:
        from transformers import pipeline

        _classifier = pipeline(
            "sentiment-analysis",
            model="distilbert-base-uncased-finetuned-sst-2-english",
        )
    except Exception:
        _classifier = False
    return _classifier


def _fallback_sentiment(text):
    words = set(re.findall(r"[a-z']+", (text or "").lower()))
    positive = len(words & POSITIVE_TERMS)
    negative = len(words & NEGATIVE_TERMS)
    if positive == negative:
        return {"sentiment": "Neutral", "confidence": 0.62}
    sentiment = "Positive" if positive > negative else "Negative"
    gap = abs(positive - negative)
    confidence = min(0.93, 0.62 + math.log1p(gap) / 3)
    return {"sentiment": sentiment, "confidence": round(confidence, 2)}


def analyze_sentiment(text):
    classifier = _load_classifier()
    if not classifier:
        return _fallback_sentiment(text)

    try:
        result = classifier(text[:512])[0]
        label = result.get("label", "").upper()
        sentiment = "Positive" if label == "POSITIVE" else "Negative" if label == "NEGATIVE" else "Neutral"
        return {"sentiment": sentiment, "confidence": round(float(result.get("score", 0.0)), 2)}
    except Exception:
        return _fallback_sentiment(text)
