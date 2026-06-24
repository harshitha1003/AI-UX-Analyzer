from dataclasses import dataclass
from typing import Optional


@dataclass
class Feedback:
    id: Optional[int]
    source: str
    text: str
    cleaned_text: str


@dataclass
class SentimentResult:
    feedback_id: int
    sentiment: str
    confidence: float


@dataclass
class UXIssue:
    feedback_id: int
    category: str
    score: float
    evidence: str


@dataclass
class Recommendation:
    feedback_id: int
    category: str
    recommendation: str
    priority: str
