document.addEventListener("DOMContentLoaded", () => {
    const productos = document.querySelectorAll(".producto");
    const listaCarrito = document.getElementById("lista-carrito");
    const total = document.getElementById("total");
    const botonPagar = document.getElementById("pagar");

    let carrito = [];

    productos.forEach(producto => {
        producto.addEventListener("click", agregarAlCarrito);
    });

    function agregarAlCarrito(event) {
        if (event.target.classList.contains("agregar")) {
            const id = event.target.parentElement.dataset.id;
            const nombre = event.target.parentElement.querySelector("span").textContent;
            const precio = parseFloat(event.target.parentElement.dataset.precio); 

            if (!isNaN(precio) && precio > 0) {
                carrito.push({ id, nombre, precio });
                renderizarCarrito();
                calcularTotal();
            } else {
                mostrarMensaje("Error al agregar al carrito. Precio no válido.");
            }
        }
    }

    function renderizarCarrito() {
        listaCarrito.innerHTML = "";

        carrito.forEach(producto => {
            const nuevoProducto = document.createElement("li");
            nuevoProducto.innerHTML = `${producto.nombre} - $${producto.precio.toFixed(2)} <button class="eliminar" data-id="${producto.id}">Eliminar</button>`;
            listaCarrito.appendChild(nuevoProducto);
        });
    }

    listaCarrito.addEventListener("click", eliminarDelCarrito);

    function eliminarDelCarrito(event) {
        if (event.target.classList.contains("eliminar")) {
            const id = event.target.dataset.id;
            carrito = carrito.filter(producto => producto.id !== id);
            renderizarCarrito();
            calcularTotal();
        }
    }

    botonPagar.addEventListener("click", realizarPago);

    function realizarPago() {
        if (carrito.length === 0) {
            mostrarMensaje("El carrito está vacío. Agrega productos antes de pagar.");
            return;
        }

        const totalCompra = calcularTotal();
        mostrarMensaje(`Pago exitoso. Total: $${totalCompra.toFixed(2)}`);
        carrito = [];
        renderizarCarrito();
        total.textContent = "0.00";
    }

    function calcularTotal() {
        const totalCompra = carrito.reduce((total, producto) => total + producto.precio, 0);
        total.textContent = totalCompra.toFixed(2);
        return totalCompra;
    }

    function mostrarMensaje(mensaje) {
        alert(mensaje);
    }
});