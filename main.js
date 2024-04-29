const html = document.querySelector('html');

const botonCorto = document.querySelector('.app__card-button--corto');
const botonEnfoque = document.querySelector('.app__card-button--enfoque');
const botonLargo = document.querySelector('.app__card-button--largo');

const baner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botones = document.querySelectorAll('.app__card-button');

const inputMusic = document.querySelector('#alternar-musica');
const botonInicio = document.querySelector('#start-pause');
const textoBotonInicio = document.querySelector('#start-pause span');
const iconoBotonInicio = document.querySelector('.app__card-primary-butto-icon');

const audioPlay = new Audio('./sonidos/play.wav');
const audioPause = new Audio('./sonidos/pause.mp3');
const audioStop = new Audio('./sonidos/beep.mp3');
const musica = new Audio('./sonidos/luna-rise-part-one.mp3');
    musica.loop = true;

const tiempoEnPantalla = document.querySelector('#timer');
let tiempoTranscurrido = 1500;
let idIntervalo = null;

function cambiarModo(modo){
    mostrarTiempo();
    botones.forEach(function(modo){
        modo.classList.remove(`active`)
    })

    html.setAttribute('data-contexto',modo)
    baner.setAttribute('src',`./imagenes/${modo}.png`)
    
    switch (modo) {
        case "enfoque":
            titulo.innerHTML = `Optimiza tu productividad,<br>
            <strong class="app__title-strong">sumérgete en lo que importa.</strong>`
            break;
        case "descanso-corto":
            titulo.innerHTML = `¿Qué tal un respiro?
            <strong class="app__title-strong">¡Haz una pausa corta!.</strong>`
            break;
        case "descanso-largo":
            titulo.innerHTML = `Hora de volver a la superficie
            <strong class="app__title-strong">Haz una pausa larga.</strong>`    
        default:
            break;
    }
}

botonCorto.addEventListener('click', () => {
    tiempoTranscurrido = 300;
    cambiarModo('descanso-corto');
    botonCorto.classList.add('active');
})

botonEnfoque.addEventListener('click', () => {
    tiempoTranscurrido = 1500;
    cambiarModo('enfoque');
    botonEnfoque.classList.add('active');
})

botonLargo.addEventListener('click', () => {
    tiempoTranscurrido = 900;
    cambiarModo('descanso-largo');
    botonLargo.classList.add('active');
})

inputMusic.addEventListener('change', () => {
    if (musica.paused) {
        musica.play();
    }else{
        musica.pause();
    }
})

const cuentaRegresiva = () => {
    if(tiempoTranscurrido <= 0){
        audioStop.play();
        reiniciar();
        return;
    }
    iconoBotonInicio.setAttribute('src','./imagenes/pause.png');
    textoBotonInicio.textContent = "Pausar";
    tiempoTranscurrido -= 1;
    mostrarTiempo ();
}

function iniciarPausar(){
    if(idIntervalo){
        audioPause.play();
        reiniciar();
        return;
    }
    audioPlay.play();
    idIntervalo = setInterval(cuentaRegresiva,1000);
}

function reiniciar(){
    clearInterval(idIntervalo);
    idIntervalo = null;
    iconoBotonInicio.setAttribute('src','./imagenes/play_arrow.png');
    textoBotonInicio.textContent = "Comenzar";

}

botonInicio.addEventListener('click', iniciarPausar);

function mostrarTiempo () {
    const tiempo = new Date(tiempoTranscurrido*1000);
    const tiempoFormateado = tiempo.toLocaleTimeString('es-MX',{minute:'2-digit',second:'2-digit'});
    tiempoEnPantalla.innerHTML = `${tiempoFormateado}`;
}

mostrarTiempo();