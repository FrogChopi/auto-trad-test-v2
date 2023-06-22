window.onload = () => {
    $('select').select2({ dropdownCssClass: 'dropdown-inverse show-select-search' });

    $("#slider-1").slider({
        min: 1,
        max: 100,
        value: 30,
        orientation: "horizontal",
        range: "min"
    });

    const resizeObserver = new ResizeObserver((entries) => {
        let a = document.querySelector("#slider-1 > a")
        for ( let el in entries ) {
            a.innerHTML = `<span>${ Math.floor((entries[el].target.clientWidth / entries[el].target.parentNode.clientWidth) * 100) }</span>`
            canvas_config.lineWidth = Math.floor((entries[el].target.clientWidth / entries[el].target.parentNode.clientWidth) * 100)
        }
    });

    resizeObserver.observe(document.querySelector("#slider-1 > div"));

    $(".mode-switch").on('mouseup', (e) => {
        if ( e.currentTarget.localName == 'label' ) {
           e.currentTarget.querySelector('input').value = e.currentTarget.querySelector('input').value == "on" ? "off" : "on"
           canvas_config[e.currentTarget.attributes['name'].value] = e.currentTarget.querySelector('input').value
           e.currentTarget.style.backgroundColor = e.currentTarget.querySelector('input').value != "off" ? "#1abc9c" : "lightgray"
           console.log(canvas_config)
        }
    })
}
