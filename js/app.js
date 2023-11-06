console.log("CONECTADO")
function calcularDescuento() {
    let continuar = true;
    while (continuar) {
        const nombre = prompt("Ingrese su nombre:");
        const nombreProducto = prompt(nombre + ", Ingrese el nombre del producto:");
        const precioBase = parseFloat(prompt(nombre + ", Ingrese el precio base del producto:"));
        const descuento = parseFloat(prompt(nombre + ", Ingrese el porcentaje de descuento (%):"));

        if (isNaN(precioBase) || isNaN(descuento)) {
            alert("Por favor, ingrese valores numéricos válidos.");
            continue;
        }

        const precioConDescuento = precioBase - (precioBase * descuento / 100);

        // Mostrar el resultado en la página
        const resultado = `Producto: ${nombreProducto}\nPrecio con descuento: $${precioConDescuento.toFixed(2)}`;
        document.getElementById("resultado").textContent += resultado + "\n\n";

        // Mostrar los valores en la consola
        console.log(nombre + ", El nombre del Producto es: " + nombreProducto);
        console.log(nombre + ", El precio Base del producto es: $" + precioBase);
        console.log(nombre + ", El Descuento (%) del producto es: " + descuento + "%");
        console.log(nombre + ", Este es el Precio con Descuento: $" + precioConDescuento.toFixed(2));

        // Preguntar si el usuario desea calcular otro descuento
        const respuesta = prompt(nombre + ", ¿Desea calcular otro descuento? (Sí/No)").toLowerCase();
        if (respuesta !== "sí" && respuesta !== "si") {
            continuar = false;
        }
    }
}

// Asignar la función calcularDescuento al evento 'click' del botón
document.getElementById("calcularButton").addEventListener("click", calcularDescuento);