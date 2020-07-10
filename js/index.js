
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
        $(`#loginNav`).hide()
        $(`#registerNav`).hide()

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

            $('#loginNav').hide()
            $('#loginForm').hide()
            $('#registerNav').hide()
            $('#registerForm').hide()

            $('#catNav').show()
            $('#dogNav').show()
            $('#foxNav').show()
            $('#logoutNav').show()
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

$('#loginNav').click(function (event) {
    // $('#register-error').remove()

    $('#registerForm').hide()
    $('#loginForm').show()
})

$('#logoutNav').click(function (event) {
    localStorage.removeItem('token')
    $('#email').val('')
    $('#password').val('')
    $('#loginForm').show()
    $('#registerForm').hide()
    $('#catNav').hide()
    $('#dogNav').hide()
    $('#foxNav').hide()

    $('#cat').hide()
    $('#dog').hide()
    $('#fox').hide()

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

$('#catNav').click(function(event) {


    $.ajax({
        method: 'GET',
        url: `${SERVER_PATH}/cat`,
        headers: {
            token: localStorage.getItem('token')
        }
    })
        .done((response) => {
            console.log(response[0].url);
            
            $('#cat').empty();
            $('#cat').append(
                `<img src="${response[0].url}" >`
            )

            $(`#cat`).show();
            $(`#dog`).hide()
            $(`#fox`).hide()
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

$('#dogNav').click(function(event) {


    $.ajax({
        method: 'GET',
        url: `${SERVER_PATH}/dog`,
        headers: {
            token: localStorage.getItem('token')
        }
    })
        .done((response) => {
            console.log(response);
            
            // console.log(response.url.slice(response.url.length-4))

            const fileFormat = response.url.slice(response.url.length-4);
            
            $('#dog').empty();
            if(fileFormat == `.mp4`) {
                $('#dog').append(
                    `<video controls>
                    <source src="${response.url}" type="video/mp4">
                    Your browser does not support the video tag.
                  </video>`
                )
            } else {
                $('#dog').append(
                    `<img src="${response.url}">`
                )
            }
            

            $(`#cat`).hide();
            $(`#dog`).show()
            $(`#fox`).hide()
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

$('#foxNav').click(function(event) {


    $.ajax({
        method: 'GET',
        url: `${SERVER_PATH}/fox`,
        headers: {
            token: localStorage.getItem('token')
        }
    })
        .done((response) => {
            console.log(response);
            
            $('#fox').empty();
            $('#fox').append(
                `<img src="${response.image}" >`
            )

            $(`#cat`).hide();
            $(`#dog`).hide()
            $(`#fox`).show()
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