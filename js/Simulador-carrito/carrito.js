document.addEventListener("DOMContentLoaded", () => {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const historialCompras = JSON.parse(localStorage.getItem("historialCompras")) || [];
    const listaProductos = document.getElementById("productos");
    const listaCarrito = document.getElementById("lista-carrito");
    const total = document.getElementById("total");
    const cargarProductosBtn = document.getElementById("cargar-productos");
    const cargarDesdeApiBtn = document.getElementById("cargar-desde-api");
    const buscarProductosBtn = document.getElementById("buscar-productos");
    const vaciarCarritoBtn = document.getElementById("vaciar-carrito");
    const pagarBtn = document.getElementById("pagar");

    const apiUrl = "https://fakestoreapi.com/products";

    historialCompras.length = 0; // Reiniciar historial de compras al cargar la página

    async function cargarProductosDesdeJson() {
        try {
            const response = await fetch("/js/Simulador-carrito/productos.js");
            const productos = await response.json();
            return productos;
        } catch (error) {
            console.error("Error al cargar productos desde JSON:", error);
            throw error;
        }
    }

    async function cargarDesdeApi() {
        try {
            const response = await fetch(apiUrl);
            const productos = await response.json();
            return productos;
        } catch (error) {
            console.error("Error al cargar desde la API:", error);
            throw error;
        }
    }

    function agregarAlCarrito(event) {
        const id = event.target.closest(".col-md-3").dataset.id;
        const nombre = event.target.parentElement.querySelector("h3").textContent;
        const precio = parseFloat(event.target.parentElement.querySelector("p").textContent.split("$")[1]);
    
        const productoEnCarrito = carrito.find(producto => producto.id === id);
    
        if (productoEnCarrito) {
            productoEnCarrito.cantidad += 1;
        } else {
            carrito.push({ id, nombre, precio, cantidad: 1 });
        }
    
        actualizarCarrito();
    }

    function renderizarProductos(productos) {
        listaProductos.innerHTML = "";
    
        productos.forEach(producto => {
            const elementoProducto = document.createElement("div");
            elementoProducto.classList.add("col-md-3", "mb-4");
            elementoProducto.dataset.id = producto.id;
    
            elementoProducto.innerHTML = `
                <div class="producto p-3 border border-secondary rounded">
                    <h3 class="mb-2">${producto.title}</h3>
                    <img src="${producto.image}" alt="${producto.title}" class="img-fluid mb-2"> <!-- Añadido -->
                    <p>Precio: $${(producto.price || 0).toFixed(2)}</p>
                    <button class="agregar btn btn-primary">Agregar al carrito</button>
                </div>
            `;
    
            listaProductos.appendChild(elementoProducto);
        });
    
        const botonesAgregar = document.querySelectorAll(".agregar");
        botonesAgregar.forEach(boton => {
            boton.addEventListener("click", agregarAlCarrito);
        });
    }
    

    function renderizarCarrito() {
        listaCarrito.innerHTML = "";
    
        carrito.forEach(producto => {
            const elementoProducto = document.createElement("li");
            elementoProducto.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");
    
            elementoProducto.dataset.id = producto.id;  // Asegúrate de que el id se establezca correctamente
    
            elementoProducto.innerHTML = `
                <span>${producto.nombre} - $${(producto.precio * producto.cantidad).toFixed(2)} x ${producto.cantidad}</span>
                <button class="eliminar btn btn-danger btn-sm">Eliminar</button>
            `;
    
            listaCarrito.appendChild(elementoProducto);
        });
    
        const botonesEliminar = document.querySelectorAll(".eliminar");
        botonesEliminar.forEach(boton => {
            boton.addEventListener("click", eliminarDelCarrito);
        });
    
        calcularTotal();
    }

    function eliminarDelCarrito(event) {
        const id = event.target.closest("li").dataset.id;
        console.log('ID del producto a eliminar:', id);
        const indiceProducto = carrito.findIndex(producto => producto.id === id);
        if (indiceProducto !== -1) {
            carrito[indiceProducto].cantidad -= 1;
            if (carrito[indiceProducto].cantidad <= 0) {
                carrito.splice(indiceProducto, 1);
            }
            actualizarCarrito();
            guardarCarritoEnLocalStorage();
        }
    }

    function calcularTotal() {
        const totalCompra = carrito.reduce((total, producto) => total + (producto.precio * producto.cantidad), 0);
        total.textContent = totalCompra.toFixed(2);
    }

    function actualizarCarrito() {
        renderizarCarrito();
        guardarCarritoEnLocalStorage();
    }

    function guardarCarritoEnLocalStorage() {
        localStorage.setItem("carrito", JSON.stringify(carrito));
    }

    function guardarHistorialDeCompra() {
        const compraActual = {
            productos: [...carrito],
            total: carrito.reduce((total, producto) => total + (producto.precio * producto.cantidad), 0)
        };

        historialCompras.push(compraActual);
        localStorage.setItem("historialCompras", JSON.stringify(historialCompras));
    }

    function mostrarHistorialCompras() {
        if (historialCompras.length === 0) {
            Swal.fire({
                icon: 'info',
                title: 'Historial de Compras',
                text: 'No hay compras anteriores.',
            });
        } else {
            const historialHTML = historialCompras.map((compra, index) => {
                const productosComprados = compra.productos.map(producto => `<li>${producto.nombre} x ${producto.cantidad}</li>`).join('');

                return `
                    <div class="historial-item">
                        <p><strong>Compra ${index + 1}:</strong></p>
                        <ul>${productosComprados}</ul>
                        <p><strong>Total:</strong> $${compra.total.toFixed(2)}</p>
                    </div>
                `;
            }).join('');

            Swal.fire({
                icon: 'info',
                title: 'Historial de Compras',
                html: historialHTML,
            });
        }
    }

    function vaciarCarrito() {
        carrito.length = 0;
        actualizarCarrito();
    }

    function procesarPago() {
        if (carrito.length === 0) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'El carrito está vacío. Agrega productos antes de pagar.',
            });
        } else {
            Swal.fire({
                icon: 'success',
                title: '¡Compra realizada con éxito!',
                showConfirmButton: false,
                timer: 2000
            });
            guardarHistorialDeCompra();

            carrito.length = 0;
            actualizarCarrito();
        }
    }

    cargarProductosBtn.addEventListener("click", async () => {
        const productos = await cargarProductosDesdeJson();
        renderizarProductos(productos);
    });

    cargarDesdeApiBtn.addEventListener("click", async () => {
        const productos = await cargarDesdeApi();
        renderizarProductos(productos);
    });

    buscarProductosBtn.addEventListener("click", () => {
        const terminoBusqueda = prompt("Ingresa el nombre del producto a buscar:");
        if (terminoBusqueda) {
            const productosFiltrados = carrito.filter(producto => producto.nombre.toLowerCase().includes(terminoBusqueda.toLowerCase()));
            renderizarProductos(productosFiltrados);
        }
    });

    vaciarCarritoBtn.addEventListener("click", vaciarCarrito);
    pagarBtn.addEventListener("click", procesarPago);
    document.getElementById("historial-compras").addEventListener("click", mostrarHistorialCompras);
});