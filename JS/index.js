fetch('../navBar.html')
.then(response => response.text())
.then(data => {
  document.getElementById('navBar').innerHTML = data;
})
.catch(error => console.error('Error cargando el nav:', error));

fetch('../whatsApp.html')
.then(response => response.text())
.then(data => {
  document.getElementById('whatsApp').innerHTML = data;
})
.catch(error => console.error('Error cargando el botón:', error));

fetch('../footer.html')
.then(response => response.text())
.then(data => {
  document.getElementById('footer').innerHTML = data;
})
.catch(error => console.error('Error cargando el footer:', error));