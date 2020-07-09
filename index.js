

if (!localStorage.getItem('token')) {
  event.preventDefault()
  $('#loginForm').show()
  $('#registerForm').hide()

} else {
  event.preventDefault()
  $('#loginForm').hide()
  $('#registerForm').hide()

}

// login
$('.loginForm').submit((event) => {

  const email = $('#email').val()
  const password = $('#password').val()

  $.ajax({
    method: 'POST',
    url: `${SERVER_PATH}/login`,
    data: {
      email: email,
      password: password

    }
  })
    .done(response => {
      console.log(response);
      localStorage.setItem('token', response.token)
      $('#loginForm').hide()

      fetchData()

    })
    .fail(response => {
      console.log(response.responseText);
    })
    .always(response => {
      console.log(response);
    })

  event.preventDefault()
})


// sign-up / register
$('#registerForm').submit((event) => {
  const email = $('#email').val()
  const password = $('#password').val()

  $.ajax({
    method: 'POST',
    url: `${SERVER_PATH}/register`,
    data: {
      email: email,
      password: password,
    }
  })
    .done(response => {
      console.log(response);


    })
    .fail(response => {
      console.log(response.responseText);
    })
    .always(response => {
      console.log(response);
    })

  event.preventDefault()

})


$('#log-out').click((event) => {
  localStorage.removeItem('token')
  $('#formLogin').show()
  $('#formRegister').show()
})