actualizarSaldo();

idiomaSelect.addEventListener("change", actualizarIdioma);

/*const carrete1 = new Carrete("slot1", obtenerSimboloRandom);
const carrete2 = new Carrete("slot2", obtenerSimboloRandom);
const carrete3 = new Carrete("slot3", obtenerSimboloRandom); */

girarBtn.onclick = () => { 
    tirar();
}

function detenerSlot(slot) {
    detenerAnimacion(slot);
    const finalSymbol = obtenerSimboloRandom();
    ponerSimbolo(slot, finalSymbol);
    if (slot.id === "slot3") comprobarResultado();
}

function comprobarResultado() {
    const s1 = slot1.src.split("/").pop().split(".")[0];
    const s2 = slot2.src.split("/").pop().split(".")[0];
    const s3 = slot3.src.split("/").pop().split(".")[0];
 
    const premio = evaluar(s1, s2, s3);

    if (premio > 0) {
        añadirSaldo(premio);
        actualizarSaldo();

        if(lng=="es") {
        mostrarMensaje(`¡Ganaste ${premio} monedas!`);
        return
     } else if(lng=="en") {
        mostrarMensaje(`You win ${premio} coins!`);
        return
     }

       
        reproducirSonido(sonidoPremio);

    } else {
        if(lng=="es") {
        mostrarMensaje("Sin premio...");
        return
     } else if(lng=="en") {
        mostrarMensaje("No prize...");
        return
     }
      
    }
}

ingresarBtn.onclick = () => {
    let cantidad = 0;

    if (lng=="es"){
        cantidad = parseInt(prompt("¿Cuántas monedas deseas ingresar?"));
    } else if(lng=="en") {
        cantidad = parseInt(prompt("How many coins do you want to insert?"));
    }
    if (!isNaN(cantidad) && cantidad > 0) {
        añadirSaldo(cantidad);
        actualizarSaldo();
        reproducirSonido(sonidoIngreso);
    }
};

retirarBtn.onclick = () => {
        if (lng=="es"){
            alert(`Has retirado ${saldo} monedas.\n¡Gracias por jugar!`);
        } else if(lng=="en") {
            alert(`You have withdrawn ${saldo} coins.\nThanks for playing!`);
    }

    saldo = 0;
    actualizarSaldo();
    reproducirSonido(sonidoIngreso);
};

document.getElementById("sonidoBtn").onclick = () => {
    sonidoActivo = !sonidoActivo;
    document.getElementById("sonidoBtn").innerText = sonidoActivo ? "ON 🔊" : "OFF 🔇";
};

setInterval(() => {
    const ahora = new Date();
    document.getElementById("fechaHora").innerText =
        ahora.toLocaleDateString() + " " + ahora.toLocaleTimeString();
}, 1000);
