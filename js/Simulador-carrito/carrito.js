document.addEventListener("DOMContentLoaded", () => {
    const productos = document.querySelectorAll(".producto");
    const listaCarrito = document.getElementById("lista-carrito");
    const total = document.getElementById("total");
    const botonPagar = document.getElementById("pagar");

    let carrito = []; // Utilizamos let en lugar de const para poder modificar el array

    productos.forEach(producto => {
        producto.addEventListener("click", agregarAlCarrito);
    });

    function agregarAlCarrito(event) {
        if (event.target.classList.contains("agregar")) {
            const id = event.target.parentElement.dataset.id;
            const nombre = event.target.parentElement.querySelector("span").textContent;
            const precio = parseFloat(event.target.parentElement.dataset.precio); // Ajustamos cómo se obtiene el precio

            // Verificar si el precio es un número válido
            if (!isNaN(precio) && precio > 0) {
                // Agregar producto al carrito
                carrito.push({ id, nombre, precio });

                // Actualizar la interfaz del carrito
                renderizarCarrito();

                // Calcular y actualizar el total
                calcularTotal();
            } else {
                mostrarMensaje("Error al agregar al carrito. Precio no válido.");
            }
        }
    }

    function renderizarCarrito() {
        // Limpiar la lista del carrito
        listaCarrito.innerHTML = "";

        // Renderizar los productos en el carrito
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

            // Filtrar el producto del carrito
            carrito = carrito.filter(producto => producto.id !== id);

            // Actualizar la interfaz del carrito
            renderizarCarrito();

            // Calcular y actualizar el total
            calcularTotal();
        }
    }

    botonPagar.addEventListener("click", realizarPago);

    function realizarPago() {
        // Verificar si hay productos en el carrito
        if (carrito.length === 0) {
            mostrarMensaje("El carrito está vacío. Agrega productos antes de pagar.");
            return;
        }

        // Calcular el total de la compra
        const totalCompra = calcularTotal();

        // Mostrar mensaje
        mostrarMensaje(`Pago exitoso. Total: $${totalCompra.toFixed(2)}`);

        // Limpiar el carrito después de realizar el pago
        carrito = [];
        renderizarCarrito(); // Limpiar la interfaz del carrito
        total.textContent = "0.00";
    }

    function calcularTotal() {
        // Utilizar reduce para sumar los precios de todos los productos en el carrito
        const totalCompra = carrito.reduce((total, producto) => total + producto.precio, 0);

        // Mostrar el total en el DOM
        total.textContent = totalCompra.toFixed(2);

        return totalCompra;
    }

    function mostrarMensaje(mensaje) {
        alert(mensaje);
    }
});