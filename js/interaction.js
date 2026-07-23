/*==================================================
                    ELEMENTOS
==================================================*/

const interactionSection = document.getElementById("interaction");

const yesButton = document.getElementById("yesBtn");

const noButton = document.getElementById("noBtn");

/*==================================================
                    VARIABLES
==================================================*/

let interactionShown = false;

let noClicks = 0;

const noMessages = [

    "¿Segura? 🤔",

    "Piénsalo bien 😅",

    "No seas así 🥺",

    "Casi me atrapas 😂",

    "No puedes decir que no ❤️",

    "Bueno... presiona Sí ❤️"

];


/*==================================================
            MOSTRAR INTERACCIÓN
==================================================*/

function showInteraction(){

    if(interactionShown) return;

    interactionShown = true;

    story.classList.add("fadeOut");

    setTimeout(()=>{

        story.style.display = "none";

        interactionSection.style.display = "flex";

        interactionSection.classList.remove("fadeOut");
        interactionSection.classList.add("fadeIn");

        startInteraction();

    },1200);

}

/*==================================================
            INICIAR INTERACCIÓN
==================================================*/

function startInteraction(){

    const title = document.getElementById("interactionTitle");

    const text = document.getElementById("interactionText");

    const buttons = document.getElementById("interactionButtons");

    // Mostrar únicamente las primeras palabras
    text.innerHTML = "";

    typeWriter(
        "¿Sabes algo?",
        title,
        45
    );

    // Mostrar las opciones mucho más rápido
    setTimeout(()=>{

        buttons.classList.add("show");

    },1200);

    document.addEventListener(
        "mousemove",
        escapeButton
    );

}

/*==================================================
                BOTÓN NO
==================================================*/

function escapeButton(event){

    if(interactionSection.style.display !== "flex") return;

    const rect = noButton.getBoundingClientRect();

    const centerX = rect.left + rect.width / 2;

    const centerY = rect.top + rect.height / 2;

    const distance = Math.hypot(

        event.clientX - centerX,

        event.clientY - centerY

    );

    if(distance < 120){

        moveNoButton();

    }

}

function moveNoButton(){

    noClicks++;

    const maxX = window.innerWidth - noButton.offsetWidth - 20;

    const maxY = window.innerHeight - noButton.offsetHeight - 20;

    const x = random(20, maxX);

    const y = random(20, maxY);

    noButton.style.position = "fixed";

    noButton.style.left = x + "px";

    noButton.style.top = y + "px";

    noButton.textContent =
        noMessages[Math.min(noClicks - 1, noMessages.length - 1)];

}

noButton.addEventListener(
    "click",
    moveNoButton
);

/*==================================================
                BOTÓN SÍ
==================================================*/

yesButton.addEventListener(
    "click",
    acceptLove
);

function acceptLove(){

    document.removeEventListener(
        "mousemove",
        escapeButton
    );

    interactionSection.classList.remove("fadeIn");
    interactionSection.classList.add("fadeOut");

    setTimeout(()=>{

        interactionSection.style.display = "none";

        interactionSection.classList.remove("fadeOut");

        if(typeof startConstellation === "function"){

            startConstellation();

        }

    },1200);

}

/*==================================================
            REINICIAR INTERACCIÓN
==================================================*/

function resetInteraction(){

    interactionShown = false;

    noClicks = 0;

    noButton.textContent = "No";

    noButton.removeAttribute("style");

    document.removeEventListener(
        "mousemove",
        escapeButton
    );

}