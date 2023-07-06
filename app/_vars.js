/*
    SHORTCUTS
*/

var listened_keys = {
    // SHIFT
    16 : false,
    // CTRL
    17 : false,
}

var prevent_events = [
    [ 17, 83 ], // Ctrl + S
]

var combo_touchs = {}

/*
    WORKING CANVAS
*/

var canvas_config = {
    ctx : null,
    clicked : false,
    start_point : null,
    prec_point : null,
    canvas : null,
    lineWidth : 2
}

var global_context = {}