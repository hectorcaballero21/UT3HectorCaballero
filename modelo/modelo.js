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

class Carrete {
    constructor(idSlot, obtenerSimboloRandom) {
        this.slot = document.getElementById(idSlot);
        this.obtenerSimboloRandom = obtenerSimboloRandom;
        this.intervalo = null;
    }

    iniciar() {
        this.slot.classList.add("spin-animation");
        this.intervalo = setInterval(() => {
            this.slot.src = this.obtenerSimboloRandom();
        }, 70);
    }

    detener(metodo) {
        this.slot.classList.remove("spin-animation");
        clearInterval(this.intervalo);

        const finalSymbol = this.obtenerSimboloRandom();
        this.slot.src = finalSymbol;

        if (metodo) metodo();
    }
}

function tirar() {
    
    if (saldo < 10) {
        mostrarMensaje(lng=="es" ? "No tienes suficientes monedas" : "Not enough coins to spin");
        return;
    }

    const carrete1 = new Carrete("slot1", obtenerSimboloRandom);
    const carrete2 = new Carrete("slot2", obtenerSimboloRandom);
    const carrete3 = new Carrete("slot3", obtenerSimboloRandom);

    restarSaldo(10);
    actualizarSaldo();

    bloquearGiro();
    reproducirSonido(sonidoGiro);

    carrete1.iniciar();
    carrete2.iniciar();
    carrete3.iniciar();

    setTimeout(() => carrete1.detener(), 800);
    setTimeout(() => carrete2.detener(), 1100);
    setTimeout(() => carrete3.detener(comprobarResultado), 1400);

    setTimeout(desbloquearGiro, 5000);

}


let saldo = 100;
let sonidoActivo = true;
let lng = "es";

function obtenerSimboloRandom() {
    return simbolos[Math.floor(Math.random() * simbolos.length)];
}

function restarSaldo(cantidad) {
    saldo -= cantidad;
}

function añadirSaldo(cantidad) {
    saldo += cantidad;
}

function evaluar(sim1, sim2, sim3) {
    if (sim1 === sim2 && sim2 === sim3) {
        return pagos[sim1];
    }
    return 0;
}
