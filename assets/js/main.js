window.onload = function () {
    function addOverlay() {
        removeOverlay()
        var overlay = document.createElement('div')
        overlay.id = 'modal-overlay'
        document.body.appendChild(overlay)
    }

    function removeOverlay() {
        var overlay = document.getElementById('modal-overlay')
        if (typeof (overlay) != 'undefined' && overlay != null) {
            document.body.removeChild(overlay)
        }
    }

    function toggleModal(id) {
        var modal = document.getElementById(id)
        if (typeof (modal) != 'undefined' && modal != null) {
            var style = window.getComputedStyle(modal);
            if (style.display === 'none') {
                addOverlay()
                modal.style.display = 'block'
            }
        } else {
            removeOverlay()
            var dialogs = document.querySelectorAll('.modal')
            for (var i = 0; i < dialogs.length; i++) {
                dialogs.item(i).style.display = 'none'
            }
        }
    }

    document.getElementById('open-modal-contact')
        .addEventListener('click', function (e) {
            e.preventDefault()
            toggleModal('modal-contact')
        })

    var buttons = document.querySelectorAll('.modal__close')
    for (var i = 0; i < buttons.length; i++) {
        buttons.item(i).addEventListener('click', function (e) {
            e.preventDefault()
            toggleModal()
        })
    }

    setTimeout(function () {
        toggleModal()
        toggleModal('modal-healing')
    }, 15000)

    document.querySelector('.scroll-to-top')
        .addEventListener('click', function (e) {
            e.preventDefault()
            document.body.scrollTop = 0
            document.documentElement.scrollTop = 0
        })
}
