// Solicitar el nombre del usuario
nombreUsuario = prompt("Ingrese su nombre:");
mostrarNombreEnPagina(nombreUsuario);

function mostrarNombreEnPagina(nombre) {
    const nombreElement = document.getElementById("nombre");
    nombreElement.value = nombre;
}

function realizarConversion() {
    // Obtener valores del formulario
    inputMonto = parseFloat(document.getElementById("monto").value);
    monedaDesde = document.getElementById("monedaDesde").value;
    monedaHacia = document.getElementById("monedaHacia").value;

    // Verificar si el monto es un número válido
    if (isNaN(inputMonto)) {
        mostrarResultado("Ingrese un monto válido", "error");
        return;
    }

    // Verificar si la moneda seleccionada es válida
    if (!tasasDeCambio.hasOwnProperty(monedaDesde) || !tasasDeCambio.hasOwnProperty(monedaHacia)) {
        mostrarResultado("Seleccione monedas válidas", "error");
        return;
    }

    // Realizar la conversión
    const tasaDeCambioDesde = tasasDeCambio[monedaDesde];
    const tasaDeCambioHacia = tasasDeCambio[monedaHacia];
    const resultado = (inputMonto / tasaDeCambioDesde) * tasaDeCambioHacia;

    // Mostrar resultado
    mostrarResultado(`Resultado: ${inputMonto} ${monedaDesde.toUpperCase()} = ${resultado.toFixed(2)} ${monedaHacia.toUpperCase()}`, "success");
}

function mostrarResultado(mensaje, tipo) {
    const resultadoElement = document.getElementById("resultado");
    resultadoElement.textContent = mensaje;

    // Aplicar estilos según el tipo de mensaje (éxito o error)
    resultadoElement.className = tipo;

    // Limpiar mensaje después de unos segundos
    setTimeout(() => {
        resultadoElement.textContent = "";
        resultadoElement.className = "";
    }, 3000);
}