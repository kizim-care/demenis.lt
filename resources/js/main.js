function submitPhoneForm(formId) {
    hideAllNotifications(formId);

    const form = document.getElementById(formId);

    const phone = form.querySelector('input[name="phone"]').value;
    const time  = form.querySelector('input[name="time"]').value;

    if (!/^(\+3706|86|003706|03706|3706|6|06)\d{7}$/.test(phone)) {
        showNotification('fail', formId, 'Neteisingas telefono numeris');

        return;
    }

    if (!time) {
        showNotification('fail', formId, 'Pasirinkite laiką');

        return;
    }

    data = {
        phone,
        time,
    };

    postRequest(data, form, formId);
}

function submitFooterForm() {
    const id = 'footer-form';

    hideAllNotifications(id);

    const form = document.getElementById(id);

    const name = form.querySelector('input[name="name"]').value;
    const email = form.querySelector('input[name="email"]').value;
    const phone = form.querySelector('input[name="phone"]').value;
    const message = form.querySelector('textarea[name="message"]').value;

    if (!name) {
        showNotification('fail', id, 'Įveskite vardą');

        return;
    }

    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
        showNotification('fail', id, 'Įveskite teisingą el. pašto adresą');

        return;
    }

    if (!/^(\+3706|86|003706|03706|3706|6|06)\d{7}$/.test(phone)) {
        showNotification('fail', id, 'Neteisingas telefono numeris');

        return;
    }

    if (!message) {
        showNotification('fail', id, 'Įveskite žinutę');

        return;
    }

    data = {
        name,
        email,
        phone,
        message,
    };

    postRequest(data, form, id);
}

function postRequest(data, form, id) {
    const button = form.querySelector('button[type="submit"]');

    disableButton(button);

    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://play.svix.com/in/e_p3scfTB9MAzwrl7pPVvWynIU5LP/', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && (xhr.status === 200 || xhr.status === 204)) {
            showNotification('success', id);

            form.reset();
        }

        if (xhr.status !== 200 && xhr.status !== 204) {
            showNotification('fail', id);
        }

        disableButton(button, false);
    };
    xhr.send(JSON.stringify(data));
}

function showNotification(type, id, message = '') {
    let notification = document.getElementById(type + '-' + id);

    notification.classList.remove('hidden');

    if (type === 'success') {
        return;
    }

    if (message) {
        notification.innerText = message;

        return;
    }

    notification.innerText = 'Įvyko klaida, perkraukite puslapį ir bandykite dar kartą.';
}

function hideAllNotifications(id) {
    for (let type of ['success', 'fail']) {
        hideNotification(type, id);
    }
}

function hideNotification(type, id) {
    let notification = document.getElementById(type + '-' + id);

    notification.classList.add('hidden');
}

function disableButton(button, loading = true) {
    if (loading) {
        button.innerHTML = 'Siunčiama...';
        button.classList.add('loading');

        return;
    }

    button.innerHTML = 'Siųsti';
    button.classList.remove('loading');
}
