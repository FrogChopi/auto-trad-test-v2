/* 
    COMBO TOUCH
*/

// Ctrl + S
combo_touchs["17,83"] = () => console.log("save")

/*

    LOAD AND REFRESH

*/

refresh_canvas(canvas_config)

$(window).on('load', () => refresh_canvas(canvas_config))

attribute_observer(() => setTimeout(() => refresh_canvas(canvas_config), 20)).observe(document.querySelector('#workbench_background'), { attributes: true });

$(".list-group").on('click', (e) => {
    document.querySelector('#workbench_background').src = global_context[e.target.innerHTML][0]
    if ( e.target.parentNode.querySelector('.active') )
        e.target.parentNode.querySelector('.active').setAttribute('class', 'list-group-item list-group-item-action')
    e.target.setAttribute('class', 'list-group-item list-group-item-action active')
})

$("#search_folder").on('click', (e) => load_folder())

/*

    SHORTCUTS

*/

$(this).on('keydown', (e) => {
    listened_keys[e.keyCode] = true
    // console.log(listened_keys);
    for ( let i = 0 ; i < prevent_events.length ; i++ ) {
        let j = 0
        for (  ; j < prevent_events[i].length ; j++ )
            if ( listened_keys[prevent_events[i][j]] != true )
                break;
        if ( j == prevent_events[i].length ) {
            e.preventDefault()
            combo_touchs[prevent_events[i].join(',')]()
            break;
        }
    }
})

$(this).on('keyup', (e) => {
    listened_keys[e.keyCode] = false
})

/* 

    CANVAS

*/

$('.workbench').on('mousedown', (e) => {
    console.log(e)
    if ( canvas_config['clicked'] == false ) {
        canvas_config['clicked'] = true
        canvas_config.ctx.strokeStyle = '#ffffff';
        canvas_config.ctx.fillStyle = '#ffffff';
        canvas_config.start_point = { x : e.offsetX, y : e.offsetY }
        canvas_config.prec_point = { x : e.offsetX, y : e.offsetY }
        canvas_config.mode = listened_keys
        canvas_config.ctx.lineWidth = canvas_config.lineWidth 
        if ( !listened_keys[16] && ! listened_keys[17] ) {
            canvas_config.ctx.beginPath()
            canvas_config.ctx.moveTo(e.offsetX, e.offsetY)
        }
    }
})

$('.workbench').on('mousemove', (e) => {
    if ( canvas_config['clicked'] == true ) {
        if ( !canvas_config.mode[16] && !canvas_config.mode[17] ) {
            canvas_config.ctx.moveTo(e.offsetX, e.offsetY)
            canvas_config.ctx.arc(
                e.offsetX, 
                e.offsetY,
                canvas_config.ctx.lineWidth,
                0,
                360
            )
            canvas_config.ctx.fill()
        } else if ( canvas_config.mode[16] && !canvas_config.mode[17] ) {
            canvas_config.ctx.lineWidth = 2
            canvas_config.ctx.beginPath()
            canvas_config.ctx.clearRect(0, 0, canvas_config.canvas.width, canvas_config.canvas.height);
            canvas_config.ctx.rect(canvas_config.start_point.x, canvas_config.start_point.y, e.offsetX - canvas_config.start_point.x, e.offsetY - canvas_config.start_point.y);
            canvas_config.ctx.fill()
            canvas_config.ctx.closePath()
        } else if ( !canvas_config.mode[16] && canvas_config.mode[17] ) {
            canvas_config.ctx.lineWidth = 2
            canvas_config.ctx.beginPath()
            canvas_config.ctx.clearRect(0, 0, canvas_config.canvas.width, canvas_config.canvas.height);
            canvas_config.ctx.arc(
                canvas_config.start_point.x, 
                canvas_config.start_point.y, 
                Math.sqrt(Math.pow(e.offsetX - canvas_config.start_point.x, 2) + Math.pow(e.offsetY - canvas_config.start_point.y, 2)),
                0,
                360
            )
            canvas_config.ctx.fill()
            canvas_config.ctx.closePath()
        }
    }
})

$('.workbench').on('mouseup', (e) => {
    if ( !listened_keys[16] && ! listened_keys[17] ) {
        canvas_config.ctx.closePath()
    }

    canvas_config.ctx.beginPath()
    // canvas_config.canvas.style.backgroundColor = "#000000"
    canvas_config.ctx.fill()
    let mask = canvas_config.canvas.toDataURL("image/png")

    canvas_config.ctx.clearRect(0, 0, canvas_config.canvas.width, canvas_config.canvas.height);
    // console.log(canvas_config.start_point.x, canvas_config.start_point.y, e.offsetX, e.offsetY);
    canvas_config.ctx.closePath()

    apply_mask(document.querySelector('#workbench_background').src, mask)

    canvas_config['clicked'] = false
})
