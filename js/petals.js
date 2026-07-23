/*=========================================
            CONTENEDOR
=========================================*/

const petalsBack = document.getElementById("petalsBack");
const petalsFront = document.getElementById("petalsFront");

/*=========================================
            INICIAR
=========================================*/

function startPetals(){

    const delay = window.innerWidth <= 768 ? 700 : 400;

    setInterval(createPetal, delay);

}

/*=========================================
            CREAR PÉTALO
=========================================*/

function createPetal(){

    const petal = document.createElement("img");

    petal.classList.add("petal");

    // Imagen
    petal.src = "img/petals/petal13.png";

    // Posición
    petal.style.left = random(-5,105) + "vw";
    petal.style.top = "-80px";

    // Tamaño
    petal.style.width = random(20,55) + "px";

    // Duración
    const duration = randomFloat(8,15);
    petal.style.animationDuration = duration + "s";

    // Opacidad
    petal.style.opacity = randomFloat(0.55,1);

    // Rotación
    petal.style.setProperty("--rotate",`${random(360,1080)}deg`);

    // Movimiento
    petal.style.setProperty("--drift",`${random(-180,180)}px`);

    // Escala
    petal.style.transform = `scale(${randomFloat(0.8,1.3)})`;

    // Profundidad
    if(Math.random() < 0.3){

        petal.style.filter = "blur(1px)";
        petal.style.opacity *= 0.7;

        petalsBack.appendChild(petal);

    }else{

        petal.style.filter = "blur(0px)";

        petalsFront.appendChild(petal);

    }

    // Eliminar
    setTimeout(()=>{

        petal.remove();

    }, duration * 1000);

}