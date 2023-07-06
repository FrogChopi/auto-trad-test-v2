function refresh_canvas(canvas_config) {
    width = document.querySelector('#workbench_background').offsetWidth
    height = document.querySelector('#workbench_background').offsetHeight
    
    document.querySelector('#workbench').width = width;
    document.querySelector('#workbench').height = height;
    
    document.querySelector('#workbench').getContext('2d').canvas.width = width;
    document.querySelector('#workbench').getContext('2d').canvas.height = height;
    
    canvas_config.canvas = document.querySelector('#workbench')
    canvas_config.ctx = canvas_config.canvas.getContext('2d')
}

function apply_mask(img, mask) {
    $.ajax({
        type: "POST",
        url: "/inpaint",
        data: {
            img : img,
            mask : mask
        },
        success: (res) => {
            console.log(res)
        }
    });
}

function attribute_observer(callback) {
    return new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === "attributes") callback();
        })
    })
}

function load_folder() {
    $.ajax({
        type: "GET",
        url: "/folder?folder=" + encodeURI(document.querySelector('#current_folder').value),
        success: (res) => {
            res = JSON.parse(res)
            let folder_content = document.querySelector('#folder_content')
            global_context = {}
            folder_content.innerHTML = ''
            list_index = Object.keys(res)
            // console.log(res, list_index)
            for (let i = 0; i < list_index.length; i++){
                folder_content.innerHTML += `<button class="list-group-item list-group-item-action">${ list_index[i] }</button>`
                global_context[list_index[i]] = [ 'data:image/jpeg;base64, ' + res[list_index[i]] ]
            }
        }
    });
}