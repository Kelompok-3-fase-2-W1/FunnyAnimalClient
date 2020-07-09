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


$('#registerForm').submit(function (event) {
    let emailRegister = $('#emailRegis').val()
    let passwordRegister = $('passwordRegis').val()

    $.ajax({
        method: 'POST',
        url: 'http://localhost:3000/register',
        data: {
            email: emailRegister,
            password: passwordRegister
        }
    })
        .done((response) => {
            $('loginForm').show()
            $('registerForm').hide()
        })
        .fail((xhr, status, error) => {

        })
        .always((response) => {

        })
    $('#emailRegis').val()
    $('#passwordRegis').val()

    event.preventDefault()
})

$('#loginForm').submit(function (event) {
    let emailLogin = $('#email').val()
    let passwordLogin = $('#password').val()

    $.ajax({
        method: 'POST',
        url: 'http://localhost:3000/login',
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

        })
        .always((response) => {

        })

    event.preventDefault()
})

$('#registerNav').click(function (event) {
    $('#register-error').remove()

    $('#login-page').hide()
    $('#register-page').show()

    event.preventDefault()
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
