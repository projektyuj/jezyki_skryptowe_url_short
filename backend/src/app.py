import os
from flask import Flask
from flask_cors import CORS
from .routers.router import all_blueprints
from .config import Config

def create_app() -> Flask:
    cfg = Config.get_instance()

    app = Flask(__name__)

    # CORS
    if cfg.cors_allow_all:
        CORS(app)
    else:
        origins = [o.strip() for o in cfg.cors_origins.split(",") if o.strip()]
        CORS(app, resources={r"/*": {"origins": origins}})
    
    for blueprint in all_blueprints:
        app.register_blueprint(blueprint)
    
    return app

app = create_app()

if __name__ == "__main__":
    cfg = Config.get_instance()
    port = int(os.getenv("PORT", cfg.port))
    app.run(host=cfg.host, port=port, debug=cfg.debug)