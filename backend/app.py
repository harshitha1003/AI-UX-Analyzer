from flask import Flask
from flask_cors import CORS

from database.db import init_db
from routes.api import api


def create_app():
    app = Flask(__name__)
    app.config["MAX_CONTENT_LENGTH"] = 8 * 1024 * 1024
    CORS(app, resources={r"/*": {"origins": "*"}})
    init_db()
    app.register_blueprint(api)
    return app


app = create_app()

import os

if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=int(os.environ.get("PORT", 5000))
    )