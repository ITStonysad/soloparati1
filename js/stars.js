/*=========================================
            CONTENEDOR
=========================================*/

const starsContainer = document.getElementById("stars");

/*=========================================
            INICIAR
=========================================*/

function startStars(){

    createStars(180);

    setInterval(createShootingStar,4000);

}

/*=========================================
        CREAR ESTRELLAS
=========================================*/

function createStars(total){

    for(let i=0;i<total;i++){

        const star = document.createElement("div");

        star.className = "star";

        const size = randomFloat(1,3.5);

        star.style.width = size + "px";
        star.style.height = size + "px";

        star.style.left = Math.random()*100 + "%";
        star.style.top = Math.random()*100 + "%";

        star.style.animationDuration = randomFloat(2,5) + "s";
        star.style.opacity = randomFloat(0.2,1);

        //-----------------------------------------
        // Color
        //-----------------------------------------

        const starColors = [

            "#ffffff",
            "#fefefe",
            "#fff8e8",
            "#f4f8ff",
            "#ffeef7"

        ];


        const color = starColors[random(0,starColors.length-1)];

        star.style.background = color;
        star.style.boxShadow = `
        0 0 4px ${color},
        0 0 10px ${color},
        0 0 18px ${color}`;

        star.style.animationDelay = randomFloat(0,5)+"s";

        starsContainer.appendChild(star);

    }

}

/*=========================================
        ESTRELLA FUGAZ
=========================================*/

function createShootingStar(){

    const shooting = document.createElement("div");

    shooting.className = "shooting-star";

    shooting.style.top = random(5,30) + "%";

    shooting.style.left = random(60,100) + "%";

    shooting.style.animationDuration = randomFloat(0.9,1.2) + "s";

    starsContainer.appendChild(shooting);

    setTimeout(()=>{

        shooting.remove();

    },1500);

}