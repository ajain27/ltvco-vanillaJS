// const email = document.getElementById('#email');

function validateEmail(email) {
    var pattern = new RegExp("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$");
    return pattern.test(email)
}

function emailValidation() {
    var email = document.getElementById('email').value;
    if (!validateEmail(email)) {
        $('#errorMessage').addClass('d-block');
        $('#email').addClass('validation-error');
    } else {
        $('#email').removeClass('validation-error');
        $('#errorMessage').removeClass('d-block');
    }
}

function search() {
    var emailSearched = document.getElementById('email').value;
    const url = `https://cors-anywhere.herokuapp.com/https://ltv-data-api.herokuapp.com/api/v1/records.json?email=${emailSearched}`;
    showLoader();
    const details = fetch(url);
    details
        .then(res => res.json())
        .then(res => {
            if (res) {
                hideLoader();
            }
            displayData();
        })
        .catch((err) => {
            console.log(err);
        })
}

function hideLoader() {
    $('#loader').addClass('d-none');
    $('#loader').removeClass('d-block');
    $('#banner').addClass('d-block');
}

function showLoader() {
    $('#loader').addClass('d-block');
    $('#loader').removeClass('d-none');
    $('#banner').addClass('d-none');
}

function displayData() {
    console.log('displaying data ...');
}