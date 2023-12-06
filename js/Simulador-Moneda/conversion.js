const apiKey = 'a45708b558c937daa856a522';  // Reemplaza tu clave real
let inputMonto, monedaDesde, monedaHacia, nombreUsuario;

nombreUsuario = prompt("Ingrese su nombre:");
mostrarNombreEnPagina(nombreUsuario);

function mostrarNombreEnPagina(nombre) {
    const nombreElement = document.getElementById("nombre");
    nombreElement.value = nombre;
}

async function cargarMonedas() {
    try {
        const response = await fetch(`https://open.er-api.com/v6/latest`);
        const data = await response.json();

        if (data.rates) {
            const monedas = Object.keys(data.rates);

            llenarOpcionesDesplegables("monedaDesde", monedas);
            llenarOpcionesDesplegables("monedaHacia", monedas);
        } else {
            console.error("No se pudieron obtener las tasas de cambio");
        }
    } catch (error) {
        console.error("Error al obtener tasas de cambio:", error);
    }
}

function llenarOpcionesDesplegables(elementId, opciones) {
    const selectElement = document.getElementById(elementId);

    opciones.forEach(opcion => {
        const optionElement = document.createElement("option");
        optionElement.value = opcion;
        optionElement.text = opcion;
        selectElement.appendChild(optionElement);
    });
}

async function realizarConversion() {
    inputMonto = parseFloat(document.getElementById("monto").value);
    monedaDesde = document.getElementById("monedaDesde").value;
    monedaHacia = document.getElementById("monedaHacia").value;

    if (isNaN(inputMonto)) {
        mostrarResultado("Ingrese un monto válido", "error");
        return;
    }

    try {
        const response = await fetch(`https://open.er-api.com/v6/latest`);
        const data = await response.json();

        if (data.rates && data.rates[monedaDesde] && data.rates[monedaHacia]) {
            const tasaDeCambioDesde = data.rates[monedaDesde];
            const tasaDeCambioHacia = data.rates[monedaHacia];
            const resultado = (inputMonto / tasaDeCambioDesde) * tasaDeCambioHacia;

            mostrarResultado(`Resultado: ${inputMonto} ${monedaDesde.toUpperCase()} = ${resultado.toFixed(2)} ${monedaHacia.toUpperCase()}`, "success");
        } else {
            mostrarResultado("No se pudieron obtener las tasas de cambio", "error");
        }
    } catch (error) {
        console.error("Error al obtener tasas de cambio:", error);
        mostrarResultado("Error al obtener tasas de cambio", "error");
    }
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

cargarMonedas();