from flask import Flask

import api

# flask --app main --debug run
app = Flask(__name__, static_url_path='/assets')
app.register_blueprint(api._routes.router)