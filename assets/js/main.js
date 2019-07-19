document.addEventListener('DOMContentLoaded', function () {
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

    function sendRequest(name, phone) {
        var xhr = new XMLHttpRequest()
        xhr.open('POST', 'send.php')
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
        xhr.onload = function () {
            console.log(xhr.responseText)
            if (xhr.status === 200 && xhr.responseText === '1') {
                toggleModal()
                toggleModal('modal-thanks')
            } else {
                alert('Что-то пошло не так, повторите попытку позднее')
            }
        }
        xhr.send(encodeURI('name=' + name + '&phone=' + phone))
    }

    document.getElementById('open-modal-contact')
        .addEventListener('click', function (e) {
            e.preventDefault()
            toggleModal('modal-contact')
        })

    var closeModalButtons = document.querySelectorAll('.modal__close')
    for (i = 0; i < closeModalButtons.length; i++) {
        closeModalButtons.item(i).addEventListener('click', function (e) {
            e.preventDefault()
            toggleModal()
        })
    }

    var sendModalButtons = document.querySelectorAll('.modal__button')
    for (i = 0; i < sendModalButtons.length; i++) {
        sendModalButtons.item(i).addEventListener('click', function (e) {
            e.preventDefault()
            var name, phone
            var elem = e.target || e.srcElement
            elem = elem.parentNode.firstChild.nextSibling
            do {
                console.log(elem)
                if (elem.classList.contains('modal__input')) {
                    if (elem.getAttribute('name') === 'name') {
                        name = elem.value
                    } else if (elem.getAttribute('name') === 'phone') {
                        phone = elem.value
                    }
                }
            } while ((elem = elem.nextSibling.nextSibling))

            // Send request
            if (name && phone) {
                sendRequest(name, phone)
            }
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
})
