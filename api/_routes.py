from flask import Blueprint, send_from_directory

router = Blueprint('router', __name__, template_folder='templates')

@router.route('/')
def load_page() :
    return open('./assets/index.html')

@router.route('/app/<file>')
def local_script(file) :
    return open('./app/' + file, 'r')

@router.route('/assets/<file>')
def local_assets(file) :
    return send_from_directory('assets', file)
     
@router.route('/data')
def local_data() :
    save_file = 'local_save.json'
    local_s = open(save_file, 'rw+')
    if len(local_s) == 0 :
        local_s.write('[]')
    return local_s

