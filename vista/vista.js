const slot1 = document.getElementById("slot1");
const slot2 = document.getElementById("slot2");
const slot3 = document.getElementById("slot3");
const saldoSpan = document.getElementById("saldo");
const mensaje = document.getElementById("mensaje");
const sonidoGiro = document.getElementById("sonidoGiro");
const sonidoPremio = document.getElementById("sonidoPremio");
const sonidoIngreso = document.getElementById("sonidoIngreso");
const idiomaSelect = document.getElementById("idioma");
const idi = document.getElementById("idi");
const s = document.getElementById("s");
const pt = document.getElementById("pt");
const divSaldo = document.querySelector('.saldo');
const girarBtn = document.getElementById("girar");
const ingresarBtn = document.getElementById("ingresar");
const retirarBtn = document.getElementById("retirar");
const cer = document.getElementById("cer");
const dia = document.getElementById("dia");
const fre = document.getElementById("fre");
const pla = document.getElementById("pla");
const uva = document.getElementById("uva");
const protext = document.getElementById("protext");
const spo = document.getElementById("spo");

function actualizarSaldo() {
    saldoSpan.innerText = saldo;
}

function mostrarMensaje(texto) {
    mensaje.innerText = texto;
}

function reproducirSonido(sonido) {
    if (sonidoActivo) sonido.play();
}

function bloquearGiro() {
    girarBtn.disabled = true;
}

function desbloquearGiro() {
    girarBtn.disabled = false;
}

function ponerSimbolo(slot, ruta) {
    slot.src = ruta;
}

let intervalos = {};

function iniciarAnimacion(slot) {
    slot.classList.add("spin-animation");
    intervalos[slot.id] = setInterval(() => {
        slot.src = obtenerSimboloRandom();
    }, 70);
}

function detenerAnimacion(slot) {
    slot.classList.remove("spin-animation");
    clearInterval(intervalos[slot.id]);
}

function actualizarIdioma() {
    lng = idiomaSelect.value;

    if (lng === "en") {
        idi.innerText = "Language";
        s.innerText = "Sound";
        pt.innerText = "Payment Table";
        divSaldo.childNodes[0].textContent = "Money: ";
        divSaldo.childNodes[2].textContent = " coins";
        girarBtn.innerText = "Spin (10 coins)";
        ingresarBtn.innerText = "+ Add coins";
        retirarBtn.innerText = "- Withdraw coins";
        cer.innerText = "3 CHERRIES → 20 coins";
        dia.innerText = "3 DIAMONDS → 100 coins";
        fre.innerText = "3 STRAWBERRIES → 30 coins";
        pla.innerText = "3 BANANAS → 50 coins";
        uva.innerText = "3 GRAPES → 10 coins";
        protext.innerText = "Data Protection"
        spo.innerText = "A game from"

    } else {
        idi.innerText = "Idioma";
        s.innerText = "Sonido";
        pt.innerText = "Tabla de Pagos";
        divSaldo.childNodes[0].textContent = "Saldo: ";
        divSaldo.childNodes[2].textContent = " monedas";
        girarBtn.innerText = "Girar (10 monedas)";
        ingresarBtn.innerText = "+ Ingresar saldo";
        retirarBtn.innerText = "- Retirar saldo";
        cer.innerText = "3 CEREZAS → 20 monedas";
        dia.innerText = "3 DIAMANTES → 100 monedas";
        fre.innerText = "3 FRESAS → 30 monedas";
        pla.innerText = "3 PLÁTANOS → 50 monedas";
        uva.innerText = "3 UVAS → 10 monedas";
        protext.innerText = "Protección de datos"
        spo.innerText = "Un juego de la marca"
    }
}
