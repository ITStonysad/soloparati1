/*=========================================
        CONTENEDOR
=========================================*/

const heartsContainer = document.getElementById("hearts");


/*=========================================
        COLORES
=========================================*/

const heartColors = [

    "#ff4d88",
    "#ff66b3",
    "#ff99cc",
    "#ff5eaa",
    "#ff3385",
    "#ff80bf",
    "#ff1493"

];


/*=========================================
        INICIAR CORAZONES
=========================================*/

let heartsInterval = null;

function startHearts(){

    music.addEventListener("timeupdate",()=>{

        // Comenzar cuando falten 20 segundos

        if(
            music.duration &&
            music.currentTime >= 5 &&
            !heartsInterval
        ){

            heartsInterval = setInterval(createHeart,250);

        }

    });

}


/*=========================================
        CREAR CORAZÓN
=========================================*/

function createHeart(){

    const heart = document.createElement("div");

    heart.className = "heart";

    heart.innerHTML = "❤";

    //-----------------------------------
    // Tamaño
    //-----------------------------------

    const size = random(20,65);

    heart.style.fontSize = size + "px";

    //-----------------------------------
    // Posición
    //-----------------------------------

    heart.style.left = random(-5,105) + "vw";

    //-----------------------------------
    // Duración
    //-----------------------------------

    const duration = randomFloat(6,12);

    heart.style.animationDuration = duration + "s";

    //-----------------------------------
    // Opacidad
    //-----------------------------------

    heart.style.opacity = randomFloat(0.4,1);

    //-----------------------------------
    // Color
    //-----------------------------------

    const color = heartColors[random(0,heartColors.length-1)];

    heart.style.color = color;

    //-----------------------------------
    // Brillo
    //-----------------------------------

    heart.style.filter =
        `drop-shadow(0 0 ${random(6,12)}px ${color})`;

    //-----------------------------------
    // Movimiento
    //-----------------------------------

    heart.style.setProperty("--drift",`${random(-80,80)}px`);

    heart.style.setProperty("--rotation",`${random(180,720)}deg`);

    //-----------------------------------
    // Agregar
    //-----------------------------------

    heartsContainer.appendChild(heart);

    //-----------------------------------
    // Eliminar
    //-----------------------------------

    setTimeout(()=>{

        heart.remove();

    },duration*1000);

}