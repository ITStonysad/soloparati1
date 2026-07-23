/*==================================================
                    ELEMENTOS
==================================================*/

const intro = document.getElementById("intro");
const story = document.getElementById("story");

const startBtn = document.getElementById("startBtn");

const music = document.getElementById("music");

/*==================================================
                    VARIABLES
==================================================*/

let started = false;

/*==================================================
                    EVENTOS
==================================================*/

startBtn.addEventListener(
    "click",
    startExperience
);

/*==================================================
            COMENZAR EXPERIENCIA
==================================================*/

function startExperience(){

    if(started) return;

    started = true;

    startBtn.disabled = true;

    intro.classList.add("fadeOut");

    setTimeout(()=>{

        intro.style.display = "none";

        story.style.display = "flex";

        story.classList.remove("fadeOut");
        story.classList.add("fadeIn");

        initializeExperience();

    },1200);

}

/*==================================================
            INICIALIZAR EXPERIENCIA
==================================================*/

function initializeExperience(){

    // Música
    if(typeof startMusic === "function"){

        startMusic();

    }

    // Historia
    if(typeof startStory === "function"){

        startStory();

    }

    // Fondo de estrellas
    if(typeof startStars === "function"){

        startStars();

    }

    // Pétalos
    if(typeof startPetals === "function"){

        startPetals();

    }

    // Corazones
    if(typeof startHearts === "function"){

        startHearts();

    }

    // Partículas
    if(typeof startParticles === "function"){

        startParticles();

    }

}

/*==================================================
                FUNCIONES DE APOYO
==================================================*/

function showStory(){

    intro.style.display = "none";

    story.style.display = "flex";

    story.classList.remove("fadeOut");
    story.classList.add("fadeIn");

}

function hideStory(){

    story.classList.remove("fadeIn");
    story.classList.add("fadeOut");

    setTimeout(()=>{

        story.style.display = "none";

    },1200);

}