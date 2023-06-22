from flask import Flask

import api

app = Flask(__name__, static_url_path='/assets')
app.register_blueprint(api._routes.router)