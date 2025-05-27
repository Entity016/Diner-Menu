// Menús
const primeros = {
    "Ensalada": 5.0,
    "Sopa": 4.5,
    "Pasta": 6.0
};
const segundos = {
    "Pollo": 8.0,
    "Pescado": 9.0,
    "Ternera": 10.0
};
const postres = {
    "Flan": 3.0,
    "Helado": 2.5,
    "Fruta": 2.0
};

const comentarios = [
    "¡Buena elección!",
    "¡Es uno de los favoritos!",
    "¡Te va a encantar!",
    "¡Maravillosa decisión!",
    "¡Oido cocina!"
];

function mostrarCarta() {
    let carta = "CARTA COMPLETA\n\n";
    carta += "Primeros:\n" + Object.entries(primeros).map(([k, v]) => `  - ${k} (${v.toFixed(2)} €)`).join('\n') + '\n\n';
    carta += "Segundos:\n" + Object.entries(segundos).map(([k, v]) => `  - ${k} (${v.toFixed(2)} €)`).join('\n') + '\n\n';
    carta += "Postres:\n" + Object.entries(postres).map(([k, v]) => `  - ${k} (${v.toFixed(2)} €)`).join('\n');
    alert(carta);
}

function elegirOpcion(opciones, tipo) {
    let opcion;
    while (true) {
        opcion = prompt(
            `Elige un ${tipo}:\n` +
            Object.entries(opciones).map(([k, v]) => `- ${k} (${v.toFixed(2)} €)`).join('\n')
        );
        if (opcion === null) {
            cancelarPedido();
            return null;
        }

        // Buscar la clave que coincide ignorando mayúsculas/minúsculas
        const claveElegida = Object.keys(opciones).find(
            k => k.toLowerCase() === opcion.toLowerCase()
        );

        if (claveElegida) {
            alert(comentarios[Math.floor(Math.random() * comentarios.length)]);
            return { nombre: claveElegida, precio: opciones[claveElegida] };
        } else {
            alert(`Error: "${opcion}" no es una opción válida. Intenta de nuevo.`);
        }
    }
}

function mostrarFactura(pedido) {
    let mensaje = "FACTURA\n\n";
    let total = 0;
    for (const { tipo, nombre, precio } of pedido) {
        mensaje += `${tipo}: ${nombre} - ${precio.toFixed(2)} €\n`;
        total += precio;
    }
    mensaje += `\nTotal: ${total.toFixed(2)} €`;
    const confirmar = confirm(mensaje + "\n\n¿Deseas confirmar el pedido?");
    if (confirmar) {
        alert("¡Gracias! Prepararemos tu pedido lo más rápido posible.");
    } else {
        cancelarPedido();
    }
}

function cancelarPedido() {
    alert("Muchas gracias. Esperamos verle pronto de nuevo.");
}

function iniciarPedido() {
    alert("Bienvenido al menú interactivo");
    mostrarCarta();

    const pedido = [];

    const primero = elegirOpcion(primeros, "primer plato");
    if (!primero) return;
    pedido.push({ tipo: "Primer Plato", ...primero });

    const segundo = elegirOpcion(segundos, "segundo plato");
    if (!segundo) return;
    pedido.push({ tipo: "Segundo Plato", ...segundo });

    const postre = elegirOpcion(postres, "postre");
    if (!postre) return;
    pedido.push({ tipo: "Postre", ...postre });

    mostrarFactura(pedido);
}

iniciarPedido();