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


    let title = document.querySelector('.h1');
    let text = 'CAZ Insumos Industriales';
    let letterStart = 0;
    let letterEnd = 1;
    let write = setInterval(() => {
      if (title) {
        title.innerHTML = text.slice(letterStart, letterEnd);
        letterEnd++;
        if (letterEnd > text.length) {
          letterEnd = 1;
        }
      }
    }, 200);
  
