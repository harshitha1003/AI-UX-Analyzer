import csv
import os

from app import create_app
from routes.api import persist_analysis


def seed():
    create_app()
    path = os.path.join(os.path.dirname(__file__), "data", "sample_feedback.csv")
    with open(path, newline="", encoding="utf-8") as handle:
        for row in csv.DictReader(handle):
            persist_analysis(row["text"], row.get("source", "sample"))
    print("Seeded sample feedback.")


if __name__ == "__main__":
    seed()
