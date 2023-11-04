// TODO: Usar operadores ternarias para mostrar el estado de la API
function checkApiStatus () {
  const apiUrl = 'http://localhost:5000/'

  fetch(apiUrl)
    .then(response => {
      if (response.ok) {
        document.getElementById('status').textContent = 'Conectado'
        document.getElementById('status').style.color = '#16a34a'
      } else {
        console.log(response)
      }
    })
    .catch(error => {
      console.log(error)
      document.getElementById('status').textContent = 'Desconectado'
      document.getElementById('status').style.color = 'orange'
    })
}

window.onload = checkApiStatus
