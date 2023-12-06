document.addEventListener("DOMContentLoaded", () => {
    const productos = document.querySelectorAll(".producto");
    const listaCarrito = document.getElementById("lista-carrito");
    const total = document.getElementById("total");
    const botonPagar = document.getElementById("pagar");

    productos.forEach(producto => {
        producto.addEventListener("click", agregarAlCarrito);
    });

    function agregarAlCarrito(event) {
        if (event.target.classList.contains("agregar")) {
            const productoSeleccionado = event.target.parentElement;
            const id = productoSeleccionado.dataset.id;
            const nombre = productoSeleccionado.querySelector("span").textContent;
            const precio = productoSeleccionado.dataset.precio;

            const nuevoProducto = document.createElement("li");
            nuevoProducto.innerHTML = `${nombre} - $${precio} <button class="eliminar">Eliminar</button>`;
            nuevoProducto.dataset.id = id;
            nuevoProducto.dataset.precio = precio;

            listaCarrito.appendChild(nuevoProducto);

            calcularTotal();
        }
    }

    listaCarrito.addEventListener("click", eliminarDelCarrito);

    function eliminarDelCarrito(event) {
        if (event.target.classList.contains("eliminar")) {
            const productoEliminado = event.target.parentElement;
            const id = productoEliminado.dataset.id;

            listaCarrito.removeChild(productoEliminado);

            calcularTotal();
        }
    }

    botonPagar.addEventListener("click", realizarPago);

    function realizarPago() {
        const productosCarrito = document.querySelectorAll("#lista-carrito li");

        if (productosCarrito.length === 0) {
            alert("El carrito está vacío. Agrega productos antes de pagar.");
            return;
        }

        const totalCompra = calcularTotal();

        alert(`Pago exitoso. Total: $${totalCompra.toFixed(2)}`);

        listaCarrito.innerHTML = "";
        total.textContent = "0.00";
    }

    function calcularTotal() {
        let totalCompra = 0;
        const productosCarrito = document.querySelectorAll("#lista-carrito li");

        productosCarrito.forEach(producto => {
            const precio = parseFloat(producto.dataset.precio);
            totalCompra += precio;
        });

        total.textContent = totalCompra.toFixed(2);

        return totalCompra;
    }
});