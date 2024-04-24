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

    let button = form.querySelector('button[type="submit"]');
    const originalButtonText = button.innerText;

    button.innerText = 'Siunčiama...';
    button.classList.add('loading');

    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://play.svix.com/in/e_p3scfTB9MAzwrl7pPVvWynIU5LP/', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && (xhr.status === 200 || xhr.status === 204)) {
            alert('Užklausa išsiųsta');
            form.reset();
        }

        if (xhr.status !== 200 && xhr.status !== 204) {
            alert('Įvyko klaida, perkraukite puslapį ir bandykite dar kartą');
        }

        button.innerHTML = originalButtonText;
        button.classList.remove('loading');
    };
    xhr.send(JSON.stringify({
        phone,
        time,
    }));
}