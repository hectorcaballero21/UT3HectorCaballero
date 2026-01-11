const simbolos = [
    "img/cereza.png",
    "img/diamante.png",
    "img/fresa.png",
    "img/platano.png",
    "img/uva.png"
];

const pagos = {
    "cereza": 20,
    "diamante": 100,
    "fresa": 30,
    "platano": 50,
    "uva": 10
};

let saldo = 100;
let sonidoActivo = true;

const slot1 = document.getElementById("slot1");
const slot2 = document.getElementById("slot2");
const slot3 = document.getElementById("slot3");
const saldoSpan = document.getElementById("saldo");
const mensaje = document.getElementById("mensaje");
const sonidoGiro = document.getElementById("sonidoGiro");
const sonidoPremio = document.getElementById("sonidoPremio");

document.getElementById("girar").onclick = () => {

    if (saldo < 10) {
        mensaje.innerText = "No dispones de suficiente saldo.";
        return;
    }

    saldo -= 10;
    saldoSpan.innerText = saldo;

    if (sonidoActivo) sonidoGiro.play();

    const s1 = simbolos[Math.floor(Math.random() * 5)];
    const s2 = simbolos[Math.floor(Math.random() * 5)];
    const s3 = simbolos[Math.floor(Math.random() * 5)];

    slot1.src = s1;
    slot2.src = s2;
    slot3.src = s3;

    if (s1 === s2 && s2 === s3) {
        const nombre = s1.split("/")[1].split(".")[0];
        const premio = pagos[nombre];

        saldo += premio;
        saldoSpan.innerText = saldo;

        mensaje.innerText = "🎉 ¡Ganaste " + premio + " monedas!";
        if (sonidoActivo) sonidoPremio.play();

    } else {
        mensaje.innerText = "😢 Sin premio...";
    }
};

document.getElementById("ingresar").onclick = () => {
    let cantidad = parseInt(prompt("¿Cuántas monedas deseas ingresar?"));
    if (!isNaN(cantidad) && cantidad > 0) {
        saldo += cantidad;
        saldoSpan.innerText = saldo;
    }
};

document.getElementById("retirar").onclick = () => {
    alert("Has retirado " + saldo + " monedas.\n¡Gracias por jugar!");
    saldo = 0;
    saldoSpan.innerText = saldo;
};

document.getElementById("sonidoBtn").onclick = () => {
    sonidoActivo = !sonidoActivo;
    document.getElementById("sonidoBtn").innerText = sonidoActivo ? "🔊 ON" : "🔇 OFF";
};

setInterval(() => {
    const ahora = new Date();
    document.getElementById("fechaHora").innerText =
        ahora.toLocaleDateString() + " " + ahora.toLocaleTimeString();
}, 1000);
