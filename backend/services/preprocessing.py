import re

STOPWORDS = {
    "a", "an", "and", "are", "as", "at", "be", "but", "by", "for", "from",
    "has", "have", "i", "in", "is", "it", "its", "of", "on", "or", "our",
    "so", "that", "the", "this", "to", "too", "was", "we", "were", "with",
    "you", "your"
}

_nlp = None


def _load_spacy():
    global _nlp
    if _nlp is not None:
        return _nlp
    try:
        import spacy

        _nlp = spacy.load("en_core_web_sm", disable=["ner", "parser"])
    except Exception:
        _nlp = False
    return _nlp


def clean_text(text):
    value = (text or "").lower()
    value = re.sub(r"http\S+|www\.\S+", " ", value)
    value = re.sub(r"[^a-z0-9\s']", " ", value)
    value = re.sub(r"\s+", " ", value).strip()
    return value


def preprocess_text(text):
    cleaned = clean_text(text)
    nlp = _load_spacy()
    if nlp:
        doc = nlp(cleaned)
        tokens = [
            token.lemma_.strip()
            for token in doc
            if token.text not in STOPWORDS and not token.is_space and len(token.text) > 1
        ]
    else:
        tokens = [
            token.rstrip("s")
            for token in cleaned.split()
            if token not in STOPWORDS and len(token) > 1
        ]
    return {"cleaned_text": cleaned, "tokens": tokens, "processed_text": " ".join(tokens)}
