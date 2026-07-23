/*=========================================
            ELEMENTOS
=========================================*/

const progressBar = document.getElementById("bar");

const currentTime = document.getElementById("currentTime");

const duration = document.getElementById("duration");


/*=========================================
            INICIAR
=========================================*/

function startMusic(){

    music.volume = 0;

    music.play().catch(error => {

        console.log("No se pudo reproducir automáticamente:", error);

    });

    fadeMusic();

    music.addEventListener("loadedmetadata",()=>{

        duration.textContent = formatTime(music.duration);

    });

    music.addEventListener("timeupdate",updatePlayer);

}


/*=========================================
            ACTUALIZAR PLAYER
=========================================*/

function updatePlayer(){

    if(!music.duration) return;

    const percent = (music.currentTime / music.duration) * 100;

    progressBar.style.width = percent + "%";

    currentTime.textContent = formatTime(music.currentTime);

}


/*=========================================
            FADE IN
=========================================*/

function fadeMusic(){

    let volume = 0;

    const maxVolume = 0.75; // Volumen máximo (75%)

    const fade = setInterval(()=>{

        volume += 0.02;

        if(volume >= maxVolume){

            volume = maxVolume;

            clearInterval(fade);

        }

        music.volume = volume;

    },120);

}


/*=========================================
            FORMATO TIEMPO
=========================================*/

function formatTime(seconds){

    const min = Math.floor(seconds / 60);

    const sec = Math.floor(seconds % 60);

    return `${String(min).padStart(2,"0")}:${String(sec).padStart(2,"0")}`;

}