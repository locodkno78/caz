// Verificar si estamos en una página de productos (no es index)
const esPagenaProductos = () => {
    return !document.title.includes('Home') && document.querySelector('h1') && 
           (document.title.includes('Alambres') || 
            document.title.includes('Electrodos') || 
            document.title.includes('Herramientas') || 
            document.title.includes('Soldadoras') || 
            document.title.includes('Sopleteria') || 
            document.title.includes('Torchas') ||
            document.querySelector('h1').textContent.includes('Alambres') ||
            document.querySelector('h1').textContent.includes('Electrodos') ||
            document.querySelector('h1').textContent.includes('Herramientas') ||
            document.querySelector('h1').textContent.includes('Soldadoras') ||
            document.querySelector('h1').textContent.includes('Sopleteria') ||
            document.querySelector('h1').textContent.includes('Torchas'))
}

console.log('✅ products.js INICIO')

const URL = '../products.json'
const productos = []
let container = null

console.log('📌 Variables inicializadas')

// Obtener la categoría del título de la página
const obtenerCategoriaActual = () => {
    const h1 = document.querySelector('h1')
    console.log('🔍 H1 element:', h1)
    console.log('🔍 H1 textContent:', h1?.textContent)
    console.log('🔍 H1 innerHTML:', h1?.innerHTML)
    
    if(h1 && h1.textContent.trim()) {
        const text = h1.textContent.trim()
        console.log('✅ Usando H1:', text)
        return text
    }
    const titulo = document.title.trim()
    console.log('✅ Usando title:', titulo)
    return titulo
}

// Generar HTML de la card con ID
const retornarCardHtml = (producto) => {
    return `<div class="card bg-dark text-white" id="producto-${producto.id}">
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

// Filtrar productos por categoría
const filtrarProductosPorCategoria = (todosLosProductos) => {
    const categoriaActual = obtenerCategoriaActual()
    console.log('📂 Categoría actual:', categoriaActual)
    return todosLosProductos.filter(producto => producto.category === categoriaActual)
}

// Nota: buscarProductos está definida en index.js para evitar duplicados

// Nota: mapaCategorias está definida en index.js para evitar duplicados

// Cargar productos en el DOM
const cargarProductos = (array) => {
    if(!container) container = document.querySelector('div.container')
    if(!container) {
        console.log('❌ No se encontró el container')
        return
    }
    
    container.innerHTML = ''
    if(array.length > 0){
        array.forEach(producto => {
            container.innerHTML += retornarCardHtml(producto)
        })
        console.log('✅ Se cargaron', array.length, 'productos')
    } else {
        container.innerHTML = '<p style="grid-column: 1 / -1; text-align: center; color: #999;">No se encontraron productos</p>'
    }
}

// Inicializar búsqueda - AQUÍ SOLO RECARGAMOS LA VISTA ACTUAL
const inicializarBusqueda = () => {
    const searchForm = document.getElementById('searchForm')
    const searchInput = document.getElementById('searchInput')
    
    if(!searchForm || !searchInput) {
        return
    }
    
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault()
        const termino = searchInput.value.trim()
        
        if(termino === '') {
            const productosFiltrados = filtrarProductosPorCategoria(productos)
            cargarProductos(productosFiltrados)
        }
    })
}

// Función para hacer scroll al producto encontrado
const scrollAlProducto = () => {
    const productoId = localStorage.getItem('buscarProductoId')
    if(productoId) {
        // Esperar a que se carguen las imágenes
        setTimeout(() => {
            const elemento = document.getElementById(`producto-${productoId}`)
            if(elemento) {
                console.log('📍 Haciendo scroll al producto:', productoId)
                elemento.scrollIntoView({ behavior: 'smooth', block: 'center' })
                elemento.style.boxShadow = '0 0 50px 10px rgba(255, 0, 0, 0.9)'
                
                // Remover el highlight después de 3 segundos
                setTimeout(() => {
                    elemento.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)'
                    localStorage.removeItem('buscarProductoId')
                }, 3000)
            }
        }, 500)
    }
}

// Cargar datos
const inicializarApp = () => {
    console.log('🔵 Iniciando app...')
    
    fetch(URL)
    .then(response => response.json())
    .then(data => {
        console.log('📦 Productos cargados:', data.length)
        productos.push(...data)
        
        const productosFiltrados = filtrarProductosPorCategoria(productos)
        cargarProductos(productosFiltrados)
        
        // Hacer scroll al producto si fue buscado
        scrollAlProducto()
        
        // Esperar a que el navBar cargue
        setTimeout(() => {
            console.log('⏳ Inicializando búsqueda...')
            inicializarBusqueda()
        }, 1000)
    })
    .catch(error => console.error('❌ Error:', error))
}

console.log('📌 Estado del documento:', document.readyState)

// Ejecutar cuando el documento esté listo
console.log('📌 Estado del documento:', document.readyState)

// Solo ejecutar en páginas de productos
if(esPagenaProductos()) {
    console.log('✅ Esta es una página de productos, inicializando...')
    
    if(document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', inicializarApp)
    } else {
        setTimeout(inicializarApp, 500)
    }
} else {
    console.log('⏭️ Esta es la página principal, saltando products.js')
}

console.log('✅ products.js FIN')
