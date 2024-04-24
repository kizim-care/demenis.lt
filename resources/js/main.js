function submitPhoneForm(formId) {
    const form = document.getElementById(formId);

    const phone = form.querySelector('input[name="phone"]').value;
    const time  = form.querySelector('input[name="time"]').value;

    if (!/^(\+3706|86|003706|03706|3706|6|06)\d*$/.test(phone)) {
        alert('Neteisingas telefono numeris');

        return;
    }

    if (!time) {
        alert('Pasirinkite laiką');

        return;
    }

    const button = form.querySelector('button[type="submit"]');
    const originalButtonText = button.innerText;

    button.innerText = 'Siunčiama...';
    button.classList.add('loading');

    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://play.svix.com/in/e_p3scfTB9MAzwrl7pPVvWynIU5LP/', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function () {
        let notificationType = '';

        if (xhr.readyState === 4 && (xhr.status === 200 || xhr.status === 204)) {
            notificationType = 'success';

            form.reset();
        }

        if (xhr.status !== 200 && xhr.status !== 204) {
            notificationType = 'fail';
        }

        if (notificationType !== '') {
            let notification = document.getElementById(notificationType + '-' + formId);
            notification.classList.remove('hidden');
        }

        button.innerHTML = originalButtonText;
        button.classList.remove('loading');
    };
    xhr.send(JSON.stringify({
        phone,
        time,
    }));
}