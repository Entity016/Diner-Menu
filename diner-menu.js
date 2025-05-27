// Menús por tipo
const menuDesayuno = {
    primeros: {
        "Tostadas": 2.5,
        "Croissant": 2.0,
        "Fruta fresca": 2.0
    },
    segundos: {
        "Huevos revueltos": 3.5,
        "Tortilla francesa": 3.0,
        "Sándwich mixto": 4.0
    },
    postres: {
        "Zumo natural": 2.0,
        "Café con leche": 1.5,
        "Yogur": 1.8
    }
};

const menuComida = {
    primeros: {
        "Ensalada": 5.0,
        "Sopa": 4.5,
        "Pasta": 6.0
    },
    segundos: {
        "Pollo": 8.0,
        "Pescado": 9.0,
        "Ternera": 10.0
    },
    postres: {
        "Flan": 3.0,
        "Helado": 2.5,
        "Fruta": 2.0
    }
};

const menuCena = {
    primeros: {
        "Crema de verduras": 4.5,
        "Gazpacho": 4.0,
        "Ensalada ligera": 4.5
    },
    segundos: {
        "Tortilla de patatas": 6.0,
        "Merluza a la plancha": 8.5,
        "Pechuga de pollo": 7.5
    },
    postres: {
        "Yogur": 1.8,
        "Fruta": 2.0,
        "Infusión": 1.5
    }
};

const comentarios = [
    "¡Buena elección!",
    "¡Es uno de los favoritos!",
    "¡Te va a encantar!",
    "¡Maravillosa decisión!",
    "¡Oído cocina!"
];

function mostrarCarta(menu) {
    let carta = "CARTA COMPLETA\n\n";
    carta += "Primeros:\n" + Object.entries(menu.primeros).map(([k, v]) => `  - ${k} (${v.toFixed(2)} €)`).join('\n') + '\n\n';
    carta += "Segundos:\n" + Object.entries(menu.segundos).map(([k, v]) => `  - ${k} (${v.toFixed(2)} €)`).join('\n') + '\n\n';
    carta += "Postres:\n" + Object.entries(menu.postres).map(([k, v]) => `  - ${k} (${v.toFixed(2)} €)`).join('\n');
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

function verificarHorario() {
    const horaStr = prompt("¿Qué hora es? (formato 24h, solo la hora, por ejemplo: 9, 14, 19)");
    if (horaStr === null) {
        cancelarPedido();
        return null;
    }

    const hora = parseInt(horaStr);
    if (isNaN(hora) || hora < 0 || hora > 23) {
        alert("Por favor, introduce una hora válida entre 0 y 23.");
        return verificarHorario();
    }

    if (hora >= 6 && hora <= 12) {
        alert("¡Buenos días! Te ofrecemos nuestro menú de *desayunos*.");
        return menuDesayuno;
    } else if (hora >= 13 && hora <= 16) {
        alert("¡Buenas tardes! Te ofrecemos nuestro menú de *comidas*.");
        return menuComida;
    } else if (hora >= 18 && hora <= 22) {
        alert("¡Buenas noches! Te ofrecemos nuestro menú de *cenas*.");
        return menuCena;
    } else {
        alert("Lo sentimos, la cocina está descansando ahora.\n\n🕒 Horarios de servicio:\n- Desayunos: 6:00 a 12:00\n- Comidas: 13:00 a 16:00\n- Cenas: 18:00 a 22:00");
        return null;
    }
}

function iniciarPedido() {
    alert("Bienvenido al menú interactivo");

    const menu = verificarHorario();
    if (!menu) return;

    mostrarCarta(menu);

    const pedido = [];

    const primero = elegirOpcion(menu.primeros, "primer plato");
    if (!primero) return;
    pedido.push({ tipo: "Primer Plato", ...primero });

    const segundo = elegirOpcion(menu.segundos, "segundo plato");
    if (!segundo) return;
    pedido.push({ tipo: "Segundo Plato", ...segundo });

    const postre = elegirOpcion(menu.postres, "postre");
    if (!postre) return;
    pedido.push({ tipo: "Postre", ...postre });

    mostrarFactura(pedido);
}

iniciarPedido();
