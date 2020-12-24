'use strict'

// check if the entered email is correct
function validateEmail(email) {
    var pattern = new RegExp("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$");
    return pattern.test(email);
}

// displaying the error messages if email is incorrect. runs on blur event
function emailValidation() {
    var email = document.getElementById('email').value;
    if (email === '' && !validateEmail(email)) {
        $('#errorMessage').addClass('d-block');
        $('#email').addClass('validation-error');
    } else {
        $('#email').removeClass('validation-error');
        $('#errorMessage').removeClass('d-block');
    }
}

function search() {
    // will search only if the email is not emply and valid
    emailValidation();
    var emailSearched = document.getElementById('email').value;
    if (emailSearched !== '') {
        const url = `https://cors-anywhere.herokuapp.com/https://ltv-data-api.herokuapp.com/api/v1/records.json?email=${emailSearched}`;
        showLoader();
        const details = fetch(url);
        details
            .then(res => res.json())
            .then(res => {
                if (res) {
                    hideLoader();
                }
                $('#banner').removeClass('d-block');
                $('#reverseLookup').removeClass('d-block');
                $('#reverseLookup').addClass('d-none');
                $('#findRightPerson').addClass('d-block');
                displayData(res);
            })
            .catch((err) => {
                console.log(err);
            })
    }
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

function displayData(data) {
    if (Object.keys(data).length !== 0) {
        let parsedData = `<div class="container details">
        <h2 class="ltvco-color mt-3 p-3">1 Result</h2>
        <p class="ltvco-text-color">Look at the result below to see the details of the person you're searched for.</p>
        <div class="card mb-3">
            <div class="card-body">
                <div class="row">
                    <div class="col-2">
                    <div style="width: 70px;" class="circle m-auto">
                        <img src="../assets/PNGs/icn_person@2x.png" alt="">
                    </div>
                    </div>
                    <div class="col-10">
                        <div class="card-text">
                            <h3 class="text-left ltvco-color">${data.first_name}</h3>
                            <p class="text-left ltvco-text-color">${data.description}</p>
    
                            <div class="row d-flex">
                                <div class="col-sm-12 col-md-6">
                                    <h5 class="ltvco-color text-left">Address</h5>
                                    <p class="text-left ltvco-text-color">${data.address}</p>
                                </div>
                                <div class="col-sm-12 col-md-6">
                                    <h5 class="ltvco-color text-left">Phone Numbers</h5>
                                    <ul style="list-style: none;" class="p-0 text-left">
                                        ${data.phone_numbers.map(number => `<li>${number}</li>`).join('')}
                                </div>
                            </div>
                            <div class="row d-flex">
                                <div class="col-sm-12 col-md-6">
                                    <h5 class="ltvco-color text-left">Email</h5>
                                    <p class="text-left ltvco-text-color">${data.email}</p>
                                </div>
                                <div class="col-sm-12 col-md-6">
                                    <h5 class="ltvco-color text-left">Relatives</h5>
                                    <ul style="list-style: none;" class="p-0 text-left">
                                    ${data.relatives.map(relative => `<li>${relative}</li>`).join('')}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- <h5 class="card-title">Special title treatment</h5>
                <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                <a href="#" class="btn btn-primary">Go somewhere</a> -->
            </div>
        </div>
    </div>`
        document.getElementById("details").innerHTML = parsedData;
    } else {
        let noData = `<div class="container-fluid text-center w-100 no-result">
        <h2 class="ltvco-color">0 Results</h2>
        <p class="ltvco-text-color ">Try starting a new search below</p>
    </div>`
    document.getElementById("details").innerHTML = noData;
    }
}