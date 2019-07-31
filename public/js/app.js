const weatherForm = document.querySelector('form')
const input = document.querySelector('input')
const message = document.querySelector('#Message')

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const address = input.value

  message.querySelectorAll('p')[0].textContent = 'Loading...'
  message.querySelectorAll('p')[1].textContent = ''

  fetch(`/weather?address=${address}`)
    .then((response) => {
      response.json().then((data) => {
        if (data.error) {
          message.querySelectorAll('p')[0].textContent = data.error
        } else {
          message.querySelectorAll('p')[0].textContent = data.location
          message.querySelectorAll('p')[1].textContent = data.forecast
        }
      })
    })
})