/*=========================================
            CONTENEDOR
=========================================*/

const particlesContainer = document.getElementById("particles");

/*=========================================
            INICIAR
=========================================*/

function startParticles(){

    setInterval(createParticle,150);

}

/*=========================================
            CREAR PARTÍCULA
=========================================*/

function createParticle(){

    const particle = document.createElement("span");

    particle.className = "particle";

    //-----------------------------------------
    // Posición
    //-----------------------------------------

    particle.style.left = random(0,100) + "vw";
    particle.style.top = random(0,100) + "vh";

    //-----------------------------------------
    // Tamaño
    //-----------------------------------------

    const size = randomFloat(1,4);

    particle.style.width = size + "px";
    particle.style.height = size + "px";

    //-----------------------------------------
    // Duración
    //-----------------------------------------

    const duration = randomFloat(3,7);

    particle.style.animationDuration = duration + "s";

    //-----------------------------------------
    // Opacidad
    //-----------------------------------------

    particle.style.opacity = randomFloat(0.2,0.8);

    particlesContainer.appendChild(particle);

    setTimeout(()=>{

        particle.remove();

    },duration * 1000);

}