/*=========================================
        CONTENEDOR
=========================================*/

const particlesContainer = document.getElementById("particles");


/*=========================================
        INICIAR
=========================================*/

function startParticles(){

    const delay = window.innerWidth < 768 ? 250 : 150;

    setInterval(createParticle, delay);

}


/*=========================================
        CREAR PARTÍCULA
=========================================*/

function createParticle(){

    const particle = document.createElement("div");

    particle.className = "particle";

    //------------------------------------
    // Posición
    //------------------------------------

    particle.style.left = random(-5,105)+"vw";
    particle.style.top = random(10,100)+"vh";

    //------------------------------------
    // Tamaño
    //------------------------------------

    const probability = Math.random();

    let size;

    if(probability < 0.7){

        size = randomFloat(2,4);

    }else if(probability < 0.9){

        size = randomFloat(4,6);

    }else{

        size = randomFloat(6,9);

    }

    particle.style.width = size+"px";
    particle.style.height = size+"px";

    //------------------------------------
    // Duración
    //------------------------------------

    const duration = randomFloat(4,9);

    particle.style.animationDuration = duration+"s";

    //------------------------------------
    // Movimiento
    //------------------------------------

    particle.style.setProperty("--drift",random(-80,80)+"px");

    //------------------------------------
    // Colores
    //------------------------------------

    const colors=[
        "#ffffff",
        "#ffdff1",
        "#ffeef8",
        "#ffc8e3",
        "#fff7d8"
    ];

    const color = colors[random(0,colors.length-1)];

    particle.style.background = color;
    particle.style.color = color;

    particle.style.opacity = randomFloat(.3,1);

    particlesContainer.appendChild(particle);

    setTimeout(()=>{

        particle.remove();

    },duration*1000);

}