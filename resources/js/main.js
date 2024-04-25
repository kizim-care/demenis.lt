function submitPhoneForm(form) {
    hideAllNotifications(form.id);

    const phone = form.querySelector('input[name="phone"]').value;
    const time  = form.querySelector('input[name="time"]').value;

    if (!/^(\+3706|86|003706|03706|3706|6|06)\d{7}$/.test(phone)) {
        showNotification('fail', form.id, 'Neteisingas telefono numeris');

        return;
    }

    if (!time) {
        showNotification('fail', form.id, 'Pasirinkite laiką');

        return;
    }

    data = {
        phone,
        time,
        type: 'phone',
    };

    postRequest(data, form);
}

function submitFooterForm(form) {
    hideAllNotifications(form.id);

    const name = form.querySelector('input[name="name"]').value;
    const email = form.querySelector('input[name="email"]').value;
    const phone = form.querySelector('input[name="phone"]').value;
    const message = form.querySelector('textarea[name="message"]').value;

    if (!name) {
        showNotification('fail', form.id, 'Įveskite vardą');

        return;
    }

    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
        showNotification('fail', form.id, 'Įveskite teisingą el. pašto adresą');

        return;
    }

    if (!/^(\+3706|86|003706|03706|3706|6|06)\d{7}$/.test(phone)) {
        showNotification('fail', form.id, 'Neteisingas telefono numeris');

        return;
    }

    if (!message) {
        showNotification('fail', form.id, 'Įveskite žinutę');

        return;
    }

    data = {
        name,
        email,
        phone,
        message,
        type: 'footer',
    };

    postRequest(data, form);
}

function postRequest(data, form) {
    data.templid = form.querySelector('input[name="templid"]').value;

    if (data.templid === '') {
        data.templid = 'b157cbcbe3d42815a9c5de15f07d4b02'
    }

    const button = form.querySelector('button[type="submit"]');

    disableButton(button);

    let url = 'https_colon__slash__slash_templid_dot_com_slash_webhooks_slash_31_slash_48dfc66d9734a56c81817dfccc99a683_slash_demenislt';

    url = url.replace(/_colon_/g, ':').replace(/_slash_/g, '/');

    const xhr = new XMLHttpRequest();
    xhr.open('POST', url.replace(/_dot_/g, '.'), true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && (xhr.status === 200 || xhr.status === 204)) {
            window.location.href = '/thank-you/';
        }

        if (xhr.status !== 200 && xhr.status !== 204) {
            showNotification('fail', form.id);
            disableButton(button, false);
        }
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
        document.getElementById(type + '-' + id).classList.add('hidden');
    }
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
