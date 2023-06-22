let listened_keys = {
    // SHIFT
    16 : false,
    // CTRL
    17 : false,
},
prevent_events = [
    [ 17, 83 ]
],
combo_touchs = {
    "17,83" : () => console.log("save")
},
canvas_config = {
    ctx : null,
    clicked : false,
    start_point : null,
    prec_point : null,
    canvas : null,
    lineWidth : 2
}

$(window).on('load', () => {
    // 1402.13  873.05
    canvas_config.canvas = document.querySelector('#workbench')
    canvas_config.ctx = canvas_config.canvas.getContext('2d')
    width = document.querySelector('#workbench_background').width
    height = document.querySelector('#workbench_background').height
    canvas_config.canvas.width = width;
    canvas_config.canvas.height = height;
    // canvas_config.ctx.canvas.width = width;
    // canvas_config.ctx.canvas.height = height;
    // canvas_config.ctx.width = width;
    // canvas_config.ctx.height = height;
    // canvas_config.ctx.clientWidth = width;
    // canvas_config.ctx.clientHeight = height;

    console.log(canvas_config.ctx);
})

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
    // console.log(listened_keys);
})

$('.workbench').on('mousedown', (e) => {
    console.log(e)
    if ( canvas_config['clicked'] == false ) {
        canvas_config['clicked'] = true
        canvas_config.ctx.strokeStyle = 'rgb(200, 0, 0)';
        canvas_config.ctx.fillStyle = 'rgb(200, 0, 0)';
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
                canvas_config.ctx.lineWidth/2,
                0,
                360
            )
            canvas_config.ctx.fill()
        } else if ( canvas_config.mode[16] && !canvas_config.mode[17] ) {
            canvas_config.ctx.lineWidth = 2
            canvas_config.ctx.beginPath()
            canvas_config.ctx.clearRect(0, 0, canvas_config.canvas.width, canvas_config.canvas.height);
            canvas_config.ctx.rect(canvas_config.start_point.x, canvas_config.start_point.y, e.offsetX - canvas_config.start_point.x, e.offsetY - canvas_config.start_point.y);
            canvas_config.ctx.stroke()
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
            canvas_config.ctx.stroke()
            canvas_config.ctx.closePath()
        }
    }
})

$('.workbench').on('mouseup', (e) => {
    if ( !listened_keys[16] && ! listened_keys[17] ) {
        canvas_config.ctx.closePath()
    }
    canvas_config.ctx.beginPath()
    canvas_config.ctx.clearRect(0, 0, canvas_config.canvas.width, canvas_config.canvas.height);
    console.log(canvas_config.start_point.x, canvas_config.start_point.y, e.offsetX, e.offsetY);
    canvas_config.ctx.closePath()
    canvas_config['clicked'] = false
})
