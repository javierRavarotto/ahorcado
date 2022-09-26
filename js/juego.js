const palabraContenedor = document.getElementById('palabra');
const erroresId = document.getElementById("error");
const tecladoId = document.getElementById("teclado");
const resultado = document.getElementById("resultado");
const conteiner = document.getElementById("conteiner");
const mensaje = document.getElementById("mensaje");
const soga = document.getElementById("soga");
const cabeza = document.getElementById("cabeza");
const torzo = document.getElementById("torzo");
const brasoIzq = document.getElementById("brasoIzq");
const brasoDer = document.getElementById("brasoDer");
const piernaIzq = document.getElementById("piernaIzq");
const piernaDer = document.getElementById("piernaDer");

let errores = []
var palabraArreglo = []
var palabras = ["elefante", "perro", "gato", "tucan"]
let teclado = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "a", "s", "d", "f", "g", "h", "j", "k", "l", "ñ", "z", "x", "c", "v", "b", "n", "m"]
let contadorCorrecto = 0
let ahorcado = 0

function generarPalabra() {
    guardarLocalStorague()
    obtenerLocalStorague()
    let palabra = ""
    generarTeclado()
    palabra = palabras[Math.floor(Math.random() * (palabras.length))]
    return palabra
}
function generarTeclado() {
    for (let i = 0; i < teclado.length; i++) {
        let p = document.createElement("p");
        let br = document.createElement("br");
        p.textContent = teclado[i]
        p.id = teclado[i]
        p.addEventListener("click", checkLetra, false);
        if (i < 10) {
            p.className = "teclado1"
        } else if (i >= 10 && i < 20) {
            if (i === 10) {
                tecladoId.appendChild(br);
            }
            p.className = "teclado2"
        } else {
            if (i === 20) {
                tecladoId.appendChild(br);
            }
            p.className = "teclado3"
        }
        tecladoId.appendChild(p);
    }
}

function mostrarPalabra() {
    let palabra = ""
    console.log(palabra)
    palabra = generarPalabra()
    for (let i = 0; i < palabra.length; i++) {
        this.palabraArreglo.push(palabra[i])
        let p = document.createElement("div");
        let div = document.createElement("div");
        div.className = "linea"
        p.textContent = palabra[i]
        p.id = "letra" + i
        p.className = "letraOculta"
        palabraContenedor.appendChild(p);
        p.appendChild(div);
    }
}

function checkLetra(letra) {

    letra = letra.path[0].id
    const correctas = document.getElementById(letra)
    let contadorError = 0

    for (let i = 0; i < palabraArreglo.length; i++) {
        if (letra === palabraArreglo[i]) {
            const letras = document.getElementById("letra" + i)
            letras.className = "letraCorrecta"
            correctas.style.backgroundColor = "rgb(93, 255, 93)"
            contadorCorrecto = contadorCorrecto + 1
            if (contadorCorrecto === palabraArreglo.length) {

                resultado.className = "ganador"
                resultado.style.display = ""
                conteiner.style.display = "none"
                tecladoId.style.display = "none"
            }
        } else {
            contadorError = contadorError + 1

        }
    }
    if (!errores.includes(letra)) {
        if (contadorError < palabraArreglo.length) {
            contadorError = 0
        } else {
            ahorcado = ahorcado + 1
            vidas(ahorcado)
            correctas.style.backgroundColor = "rgb(255, 93, 93)"
            if (ahorcado === 7) {
                cerrar(ahorcado)
            }
        }
    }

}
function cerrar(ahorcado) {
    if (ahorcado === 7) {
        resultado.remove("ganador")
        conteiner.style.display = ""
        let p = document.createElement("p");
        let botonAtras = document.createElement("button")
        let botonSiguiente = document.createElement("button")
        let a = document.createElement("a")
        a.href = "index.html"
        botonAtras.textContent = "Atras"
        botonAtras.className = "boton"
        botonSiguiente.textContent = "Jugar otra"
        botonSiguiente.addEventListener("click", siguiente, false)
        botonSiguiente.className = "boton"

        p.textContent = "Perdiste"
        mensaje.className="mensajePerdedor"
        mensaje.appendChild(p)
        mensaje.appendChild(a)
        mensaje.appendChild(botonSiguiente)
        a.appendChild(botonAtras)
    } else {
        resultado.remove("ganador")
        conteiner.style.display = ""
        let p = document.createElement("p");
        let botonAtras = document.createElement("button")
        let botonSiguiente = document.createElement("button")
        let a = document.createElement("a")
        a.href = "index.html"
        botonAtras.textContent = "Atras"
        botonAtras.className = "boton"
        botonSiguiente.textContent = "Siguiente"
        botonSiguiente.addEventListener("click", siguiente, false)
        botonSiguiente.className = "boton"

        p.textContent = "Ganaste"
        mensaje.className="mensajeGanador"
        mensaje.appendChild(p)
        mensaje.appendChild(a)
        mensaje.appendChild(botonSiguiente)
        a.appendChild(botonAtras)
    }

}

function siguiente() {
    location.reload("juego.html")
}

function vidas(intentos) {
    switch (intentos) {
        case 1:
            cabeza.style.display=""
            break;
        case 2:
            torzo.style.display=""
            break;
        case 3:
            brasoIzq.style.display=""
            break;
        case 4:
            brasoDer.style.display=""
            break;
        case 5:
            piernaIzq.style.display=""
            break;
        case 6:
            piernaDer.style.display=""
            break;
        case 7:
            soga.style.display=""
            tecladoId.style.display = "none"
            break;
        default:
            break;
    }
}

function agregarPalabra(palabra){
    palabras.push(palabra)
    guardarLocalStorague()
    console.log(palabras)
}

function guardarLocalStorague(){
    localStorage.setItem("palabras", JSON.stringify(palabras))
}
function obtenerLocalStorague(){
   palabras= localStorage.getItem("palabras")
   palabras= JSON.parse(palabras)
}
