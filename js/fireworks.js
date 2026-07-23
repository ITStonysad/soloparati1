/*=========================================
            CONTENEDOR
=========================================*/

const fireworksContainer = document.createElement("div");

fireworksContainer.id = "fireworks";

document.body.appendChild(fireworksContainer);

/*=========================================
            INICIAR
=========================================*/

function startFireworks(){

    let total = 0;

    const interval = setInterval(()=>{

        createFirework();

        total++;

        if(total >= 12){

            clearInterval(interval);

        }

    },700);

}

/*=========================================
        CREAR FUEGO ARTIFICIAL
=========================================*/

function createFirework(){

    const firework = document.createElement("div");

    firework.className = "firework";

    firework.style.left = random(15,85) + "vw";

    firework.style.top = random(10,55) + "vh";

    const colors = [

        "#ffffff",
        "#ffd6ec",
        "#ff9fd4",
        "#ffc8e3"

    ];

    firework.style.setProperty(

        "--color",

        colors[random(0,colors.length-1)]

    );

    fireworksContainer.appendChild(firework);

    setTimeout(()=>{

        firework.remove();

    },1800);

}