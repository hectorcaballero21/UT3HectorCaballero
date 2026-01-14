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
const sonidoIngreso = document.getElementById("sonidoIngreso");
const idioma = document.getElementById("idioma");
const idi = document.getElementById("idi");
const s = document.getElementById("s");
const pt = document.getElementById("pt");
const divSaldo = document.querySelector('.saldo');
const girar = document.getElementById("girar");
const ingresar = document.getElementById("ingresar");
const retirar = document.getElementById("retirar");
const cer = document.getElementById("cer");
const dia = document.getElementById("dia");
const fre = document.getElementById("fre");
const pla = document.getElementById("pla");
const uva = document.getElementById("uva");
let lng = "es";

idioma.addEventListener("change", function() {
    console.log("Idioma seleccionado:", this.value);
    let i = idioma.options[idioma.selectedIndex].text;
        i = idioma.value;
        lng = i;
        console.log(lng);
        if(i=="en") {
            idi.innerText ="Language";
            s.innerText ="Sound";
            pt.innerText ="Payment Table";
            divSaldo.childNodes[0].textContent = "Money: ";
            divSaldo.childNodes[2].textContent = " Coins";
            girar.innerText ="Spin (10 Coins)";
            ingresar.innerText ="+ Add Coins";
            retirar.innerText ="- Withdraw Coins";
            cer.innerText ="3 CHERRIES → 20 Coins";
            dia.innerText ="3 DIAMONDS → 100 Coins";
            fre.innerText ="3 STRAWBERRIES → 30 Coins";
            pla.innerText ="3 BANANAS → 50 Coins";
            uva.innerText ="3 GRAPES → 10 Coins";
        } else if(i=="es") {
            idi.innerText ="Idioma";
            s.innerText ="Sonido";
            pt.innerText ="Tabla de Pagos";
            divSaldo.childNodes[0].textContent = "Saldo: ";
            divSaldo.childNodes[2].textContent = " monedas";
            girar.innerText ="Girar (10 monedas)";
            ingresar.innerText ="+ Ingresar saldo";
            retirar.innerText ="- Retirar saldo";
            cer.innerText ="3 CEREZAS → 20 monedas";
            dia.innerText ="3 DIAMANTES → 100 monedas";
            fre.innerText ="3 FRESAS → 30 monedas";
            pla.innerText ="3 PLÁTANOS → 50 monedas";
            uva.innerText ="3 UVAS → 10 monedas";
        }

});

document.getElementById("girar").onclick = () => {

    if (saldo < 10) {
        if(lng=="es") {
        mensaje.innerText ="No tienes suficientes monedas"
     } else if(lng=="en") {
        mensaje.innerText ="Not enough coins to spin"
     }
    } else {
        girar.disabled = true;
        saldo -= 10;
        saldoSpan.innerText = saldo;

        if (sonidoActivo) sonidoGiro.play();

        setTimeout(() => {
            girar.disabled = false;
        }, 5000);

    spinSlots(); 
    }
};

let intervalos = {}; 

function spinSlots() {
    const reels = [
        document.getElementById("slot1"),
        document.getElementById("slot2"),
        document.getElementById("slot3")
    ];

    reels.forEach((reel, index) => {
        reel.classList.add("spin-animation");

        intervalos[reel.id] = setInterval(() => {
            const randomSymbol = simbolos[Math.floor(Math.random() * simbolos.length)];
            reel.src = randomSymbol;
        }, 70);
    });

    setTimeout(() => stopReel(reels[0]), 800);
    setTimeout(() => stopReel(reels[1]), 1100);
    setTimeout(() => stopReel(reels[2]), 1400);
}

function stopReel(reel) {
    reel.classList.remove("spin-animation");

    clearInterval(intervalos[reel.id]);

    const simboloRNG = simbolos[Math.floor(Math.random() * simbolos.length)];
    reel.src = simboloRNG;

    if (reel.id === "slot3") evaluarResultado();
}

function evaluarResultado() {
    const s1 = slot1.src.split("/").pop().split(".")[0];
    const s2 = slot2.src.split("/").pop().split(".")[0];
    const s3 = slot3.src.split("/").pop().split(".")[0];

    if (s1 === s2 && s2 === s3) {
        const premio = pagos[s1]; 

        saldo += premio;
        saldoSpan.innerText = saldo;

        if (lng == "es") {
            mensaje.innerText = "¡Ganaste " + premio + " monedas!";
        } else {
            mensaje.innerText = "You Win " + premio + " coins!";
        }

        if (sonidoActivo) sonidoPremio.play();

    } else {
        if (lng == "es") {
            mensaje.innerText = "Sin premio...";
        } else {
            mensaje.innerText = "No prize...";
        }
    }
}



document.getElementById("ingresar").onclick = () => {
    let cantidad = 0;
    if(lng=="es") {
        cantidad = parseInt(prompt("¿Cuántas monedas deseas ingresar?"));
     } else if(lng=="en") {
        cantidad = parseInt(prompt("How many coins would you like to insert?"));
     }
   //  console.log("Cantidad: " + cantidad);
    if (!isNaN(cantidad) && cantidad > 0) {
        saldo += cantidad;
        saldoSpan.innerText = saldo;
        if (sonidoActivo) sonidoIngreso.play();
    }
};

document.getElementById("retirar").onclick = () => {
    if(lng=="es") { 
        alert("Has retirado " + saldo + " monedas.\n¡Gracias por jugar!");
    } else if(lng=="en") {
        alert("You have withdrawn " + saldo + " coins.\nThanks for playing!");
    }
    saldo = 0;
    saldoSpan.innerText = saldo;
    if (sonidoActivo) sonidoIngreso.play();
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
