nombreUsuario = prompt("Ingrese su nombre:");
mostrarNombreEnPagina(nombreUsuario);

function mostrarNombreEnPagina(nombre) {
    const nombreElement = document.getElementById("nombre");
    nombreElement.value = nombre;
}

function realizarConversion() {
    inputMonto = parseFloat(document.getElementById("monto").value);
    monedaDesde = document.getElementById("monedaDesde").value;
    monedaHacia = document.getElementById("monedaHacia").value;

    if (isNaN(inputMonto)) {
        mostrarResultado("Ingrese un monto válido", "error");
        return;
    }

    if (!tasasDeCambio.hasOwnProperty(monedaDesde) || !tasasDeCambio.hasOwnProperty(monedaHacia)) {
        mostrarResultado("Seleccione monedas válidas", "error");
        return;
    }

    const tasaDeCambioDesde = tasasDeCambio[monedaDesde];
    const tasaDeCambioHacia = tasasDeCambio[monedaHacia];
    const resultado = (inputMonto / tasaDeCambioDesde) * tasaDeCambioHacia;

    mostrarResultado(`Resultado: ${inputMonto} ${monedaDesde.toUpperCase()} = ${resultado.toFixed(2)} ${monedaHacia.toUpperCase()}`, "success");
}

function mostrarResultado(mensaje, tipo) {
    const resultadoElement = document.getElementById("resultado");
    resultadoElement.textContent = mensaje;

    resultadoElement.className = tipo;

    setTimeout(() => {
        resultadoElement.textContent = "";
        resultadoElement.className = "";
    }, 3000);
}