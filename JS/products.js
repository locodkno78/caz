const URL = '../products.json'
const productos = []
const container = document.querySelector('div.container')
retornarCardHtml = (producto) => {
    return `<div class="card bg-dark text-white">
                <img src="${producto.image}" alt="${producto.name}" class="d-block w-100 img-thumbnail">
                <div class="card-name">${producto.name}</div>
                <div class="card-description">${producto.description}</div>
                <div class="card-category">Categoria: ${producto.category}</div>
                <div class="card-stock">Stock: ${producto.stock}</div>
                <div class="card-button">
                    <button class="btn btn-danger" id="${producto.id}" title="Clic para agregar al carrito">VER</button>
                </div>
            </div>`
}
//const activarClickEnBotones = ()=>{
  //  const botonesAgregar = document.querySelectorAll('button.button-outline.button-add')
    //if(botonesAgregar !== null) {
      //  botonesAgregar.forEach((button)=>{
        //    button.addEventListener('click', (e)=>{
          //      agregarAlCarrito(e.target.id)
            //})
        //})
    //}
//}

const cargarProductos = (array) => {
    if(array.length > 0){
        array.forEach(producto => {
            container.innerHTML += retornarCardHtml(producto)
        });
        //activarClickEnBotones()
    }
}
cargarProductos(productos)

 function obtenerProductos() {
    fetch(URL)
    .then((response)=> response.json())
    .then((data)=> productos.push(...data))
    .then(()=> cargarProductos(productos))
}
obtenerProductos()
