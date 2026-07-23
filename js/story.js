/*==================================================
                    ESCENAS
==================================================*/

const storyScenes = [

    {
        time: 0,
        image: "img/scenes/scene01.webp.png",
        phrase: "Hay canciones que simplemente se escuchan..."
    },

    {
        time: 18,
        image: "img/scenes/scene02.webp.png",
        phrase: "Desde que llegaste, mi vida comenzó a tener más sentido."
    },

    {
        time: 38,
        image: "img/scenes/scene03.webp.png",
        phrase: "Hay personas que cambian el mundo... tú cambiaste el mío."
    },

    {
        time: 58,
        image: "img/scenes/scene04.webp.png",
        phrase: "Si pudiera volver a empezar, volvería a elegirte."
    },

    {
        time: 80,
        image: "img/scenes/scene05.webp.png",
        phrase: "Eres la casualidad más bonita que me regaló la vida."
    },

    {
        time: 105,
        image: "img/scenes/scene06.webp.png",
        phrase: "Incluso el cielo parece más bonito cuando pienso en ti."
    },

    {
        time: 135,
        image: "img/scenes/scene07.webp.png",
        phrase: "Gracias por existir."
    },

    {
        time: 160,
        image: "img/scenes/scene08.webp.png",
        phrase: "Hay canciones que terminan... pero algunas personas se quedan para siempre."
    }

];

/*==================================================
                VARIABLES
==================================================*/

let currentScene = -1;
let typingInterval = null;


/*==================================================
                INICIAR HISTORIA
==================================================*/

function startStory(){

    currentScene = -1;

    updateScene();

    music.removeEventListener(
        "timeupdate",
        updateScene
    );

    music.addEventListener(
        "timeupdate",
        updateScene
    );

}

/*==================================================
            ACTUALIZAR ESCENA
==================================================*/

function updateScene(){

    const currentTime = Math.floor(music.currentTime);

    // Si ya se mostró la última escena
    if(currentScene >= storyScenes.length - 1){

        // Esperar unos segundos antes de pasar a la pregunta
        if(currentTime >= storyScenes[storyScenes.length - 1].time + 18){

            music.removeEventListener(
                "timeupdate",
                updateScene
            );

            if(typeof showInteraction === "function"){

                showInteraction();

            }

        }

        return;

    }

    // Cambiar a la siguiente escena
    if(currentTime >= storyScenes[currentScene + 1].time){

        currentScene++;

        changeScene(
            storyScenes[currentScene]
        );

    }

}

/*==================================================
                CAMBIAR ESCENA
==================================================*/

function changeScene(scene){

    // Cambiar imagen
    if(sceneImage){

        sceneImage.classList.remove("changeScene");

        sceneImage.style.animation = "none";

        void sceneImage.offsetWidth;

        sceneImage.src = scene.image;

        sceneImage.style.animation = "kenBurns 18s ease-in-out forwards";

        sceneImage.classList.add("changeScene");

    }

    // Cambiar frase
    if(scenePhrase){

        scenePhrase.classList.remove("showPhrase");

        void scenePhrase.offsetWidth;

        setTimeout(()=>{

            typeWriter(
                scene.phrase,
                scenePhrase
            );

            scenePhrase.classList.add("showPhrase");

        },300);

    }

}

/*==================================================
                EFECTO ESCRITURA
==================================================*/

function typeWriter(text, element, speed = 45){

    if(typingInterval){

        clearInterval(typingInterval);

        typingInterval = null;

    }

    element.textContent = "";

    let index = 0;

    typingInterval = setInterval(()=>{

        element.textContent += text.charAt(index);

        index++;

        if(index >= text.length){

            clearInterval(typingInterval);

            typingInterval = null;

        }

    },speed);

}

/*==================================================
                REINICIAR HISTORIA
==================================================*/

function resetStory(){

    currentScene = -1;

    if(typingInterval){

        clearInterval(typingInterval);

        typingInterval = null;

    }

    if(sceneImage){

        sceneImage.src = "";

    }

    if(scenePhrase){

        scenePhrase.textContent = "";

    }

}