import json
import os, re, base64, io
from PIL import Image
from flask import Blueprint, send_from_directory, request

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

# renvoie un json formatter avec nom + vlue b64
@router.route('/folder')
def open_folder():
    folder = request.args.get('folder')
    files = os.listdir(folder)

    images = {}
    for f in files :
        if re.search("\.(jpg|png|jpeg)$", f) != None :
            with open(folder + '/' + f, "rb") as image_file:
                tmp_img = base64.b64encode(image_file.read())
                images[f] = str(tmp_img)[2:-1]
    return json.dumps(images)

@router.route('/inpaint', methods=('GET', 'POST'))
def inpaint():
    # img = Image.fromstring('RGB',(request.form['width'],request.form['height']), base64.decodestring(request.form['img'][23:]))
    # msk = Image.fromstring('RGB',(request.form['width'],request.form['height']), base64.decodestring(request.form['msk'][23:]))
    # print(request.form['img'][23:])
    img = Image.open(io.BytesIO(base64.b64decode(request.form['img'][24:])))
    msk = Image.open(io.BytesIO(base64.b64decode(request.form['mask'][22:])))
    img.show()
    msk.show()
    return ""