
const SERVER_PATH = `http://localhost:3000`

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
        url: `${SERVER_PATH}/register`,
        data: {
            email: emailLogin,
            password: passwordLogin
        }
    })
        .done((response) => {
            console.log(response);
            localStorage.setItem('token', response.accessToken);

            $('#loginForm').hide()
            $('#registerNav').hide()
            $('#registerForm').hide()

            $('#catNav').show()
            $('#dogNav').show()
            $('#foxNav').show()
            $('#logoutNav').show()
        })
        .fail((response) => {
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

    // event.preventDefault()
})

$('#logoutNav').click(function (event) {
    localStorage.removeItem('token')

    $('#loginForm').show()
    $('#registerForm').hide()
    $('#catNav').hide()
    $('#dogNav').hide()
    $('#foxNav').hide()
    $('#logoutNav').hide()

    event.preventDefault()
})

// function registerForm(event) {
//     event.preventDefault()
//     $('#registerForm').show()
//     $('#loginForm').hide()
//     $('#emailRegis').val('')
//     $('#passwordRegis').val('')
// }

function onSignIn(googleUser) {
    const google_token = googleUser.getAuthResponse().id_token;

    $.ajax({
        url: `http://localhost:3000/login/google`,
        method: `POST`,
        headers: {
            google_token
        }
    })
        .done(response => {
            console.log(response);
        })
        .fail(response => {
            console.log(response);
            localStorage.setItem('token', response.token)
        })
        .always(response => {
            console.log(response);
        })
}