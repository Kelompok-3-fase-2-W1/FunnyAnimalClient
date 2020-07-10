
const SERVER_PATH = `http://localhost:3000`

function logInDisplay() {

    $('#catNav').show()
    $('#dogNav').show()
    $('#foxNav').show()
    $('#logoutNav').show()
    $('#loginForm').hide()
    $('#registerNav').hide()
    $('#registerForm').hide()

}

$(document).ready(function () {


    if (!localStorage.getItem('token')) {

        $('#loginForm').show()
        $('#registerNav').show()
        $('#registerForm').hide()
        $('#catNav').hide()
        $('#dogNav').hide()
        $('#foxNav').hide()
        $('#logoutNav').hide()

    } else {
        $('#loginForm').hide()
        $('#registerForm').hide()

    }
})


$('#form-register').submit(function (event) {
    let emailRegister = $('#emailRegis').val()
    let passwordRegister = $('#passwordRegis').val()

    $.ajax({
        method: 'POST',
        url: `${SERVER_PATH}/register`,
        data: {
            email: emailRegister,
            password: passwordRegister
        }
    })
        .done(response => {
            console.log(response);
            $('#loginForm').show()
            $('#registerForm').hide()
        })
        .fail(response => {
            console.log(response.responseText);
        })
        .always(response => {
            console.log('ini always');
        })

    event.preventDefault()
})

$('#form-login').submit(function (event) {
    let emailLogin = $('#email').val()
    let passwordLogin = $('#password').val()

    $.ajax({
        method: 'POST',
        url: `${SERVER_PATH}/login`,
        data: {
            email: emailLogin,
            password: passwordLogin
        }
    })
        .done((response) => {
            console.log(response);
            localStorage.setItem('token', response.token);
            logInDisplay()

        })
        .fail((response) => {
            alert(response.responseText)
            console.log(response.responseText);
        })
        .always((response) => {
            console.log(`ini always`);
        })

    event.preventDefault()
})

$('#registerNav').click(function (event) {
    // $('#register-error').remove()

    $('#registerForm').show()
    $('#loginForm').hide()
})

$('#logoutNav').click(function (event) {
    localStorage.removeItem('token')
    googleSignOut()
    $('#email').val('')
    $('#password').val('')
    $('#loginForm').show()
    $('#registerForm').hide()
    $('#catNav').hide()
    $('#dogNav').hide()
    $('#foxNav').hide()
    $('#logoutNav').hide()

    event.preventDefault()
})

function onSignIn(googleUser) {

    const google_token = googleUser.getAuthResponse().id_token;

    $.ajax({
        url: `${SERVER_PATH}/login/google`,
        method: `POST`,
        headers: {
            google_token
        }
    })
        .done(response => {

            logInDisplay()
            console.log(response);
            localStorage.setItem('token', response.token);

        })
        .fail(response => {
            console.log(response);
            localStorage.setItem('token', response.token)
        })
        .always(response => {
            console.log(response);
        })
    event.preventDefault()
}


function googleSignOut() {
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });
}


