/*==================================================
                    ELEMENTOS
==================================================*/

const constellation = document.getElementById("constellation");

const constellationCanvas = document.getElementById("constellationCanvas");

const constellationTitle = document.getElementById("constellationTitle");

const constellationText = document.getElementById("constellationText");

const ctx = constellationCanvas.getContext("2d");

/*==================================================
                    VARIABLES
==================================================*/

let stars = [];

let shapePoints = [];

let animationId = null;

const TOTAL_STARS = 2500;

const SHAPE_STARS = 500;

/*==================================================
                    CANVAS
==================================================*/

function resizeCanvas(){

    constellationCanvas.width = window.innerWidth;

    constellationCanvas.height = window.innerHeight;

}

window.addEventListener("resize",resizeCanvas);

/*==================================================
                CREAR ESTRELLAS
==================================================*/

function createStars(){

    stars = [];

    for(let i=0;i<TOTAL_STARS;i++){

        const x = Math.random() * constellationCanvas.width;

        const y = Math.random() * constellationCanvas.height;

        stars.push({

            x: x,

            y: y,

            homeX: x,

            homeY: y,

            targetX: x,

            targetY: y,

            size: randomFloat(1,2.8),

            alpha: randomFloat(0.35,1),

            speed: randomFloat(0.015,0.05)

        });

    }

}


/*==================================================
                CARGAR FIGURA
==================================================*/

async function loadShape(imagePath){

    const img = new Image();

    img.src = imagePath;

    await new Promise((resolve,reject)=>{

        img.onload = resolve;

        img.onerror = reject;

    });

    const tempCanvas = document.createElement("canvas");

    const tempCtx = tempCanvas.getContext("2d");

    tempCanvas.width = img.width;

    tempCanvas.height = img.height;

    tempCtx.drawImage(img,0,0);

    const pixels = tempCtx.getImageData(
        0,
        0,
        img.width,
        img.height
    ).data;

    shapePoints = [];

    const scale = 4;

    const offsetX =
        constellationCanvas.width / 2 -
        (img.width * scale) / 2;

    const offsetY =
        constellationCanvas.height / 2 -
        (img.height * scale) / 2;

    for(let y=0;y<img.height;y+=3){

        for(let x=0;x<img.width;x+=3){

            const index = (y * img.width + x) * 4;

            if(pixels[index+3] > 120){

                shapePoints.push({

                    x: offsetX + x * scale,

                    y: offsetY + y * scale

                });

            }

        }

    }

}

/*==================================================
                FORMAR FIGURA
==================================================*/

async function formShape(imagePath){

    await loadShape(imagePath);

    // Todas las estrellas vuelven a su lugar original
    stars.forEach(star=>{

        star.targetX = star.homeX;

        star.targetY = star.homeY;

    });

    // Solo algunas forman la figura
    const total = Math.min(shapePoints.length,SHAPE_STARS);

    for(let i=0;i<total;i++){

        stars[i].targetX = shapePoints[i].x;

        stars[i].targetY = shapePoints[i].y;

    }

}

/*==================================================
            INICIAR CONSTELACIÓN
==================================================*/

function startConstellation(){

    constellation.style.display = "flex";

    constellation.classList.remove("fadeOut");

    constellation.classList.add("fadeIn");

    resizeCanvas();

    createStars();

    animateStars();

    startMessages();

    setTimeout(()=>{

        playConstellation();

    },8500);

}

/*==================================================
                ANIMACIÓN
==================================================*/

function animateStars(){

    ctx.clearRect(
        0,
        0,
        constellationCanvas.width,
        constellationCanvas.height
    );

    stars.forEach(star=>{

        // Movimiento suave
        star.x += (star.targetX - star.x) * star.speed;
        star.y += (star.targetY - star.y) * star.speed;

        // Parpadeo natural
        star.alpha += (Math.random() - 0.5) * 0.015;

        if(star.alpha < 0.35) star.alpha = 0.35;
        if(star.alpha > 1) star.alpha = 1;

        ctx.beginPath();

        ctx.arc(
            star.x,
            star.y,
            star.size,
            0,
            Math.PI * 2
        );

        ctx.fillStyle = `rgba(255,255,255,${star.alpha})`;

        ctx.shadowBlur = star.size * 8;

        ctx.shadowColor = "white";

        ctx.fill();

    });

    ctx.shadowBlur = 0;

    animationId = requestAnimationFrame(animateStars);

}

/*==================================================
                MENSAJES
==================================================*/

function startMessages(){

    constellationTitle.classList.remove("fadeMessageOut");
    constellationText.classList.remove("fadeMessageOut");

    constellationTitle.textContent = "";
    constellationText.textContent = "";

    setTimeout(()=>{

        typeWriter(
            "Antes de continuar...",
            constellationTitle,
            70
        );

    },1000);

    setTimeout(()=>{

        typeWriter(
            "Quiero enseñarte algo muy especial.",
            constellationText,
            45
        );

    },4000);

    setTimeout(()=>{

        constellationTitle.textContent = "";
        constellationText.textContent = "";

        typeWriter(
            "Mira al cielo...",
            constellationTitle,
            70
        );

    },8500);

}

/*==================================================
                SECUENCIA
==================================================*/

async function playConstellation(){

    constellationTitle.classList.add("fadeMessageOut");
    constellationText.classList.add("fadeMessageOut");

    await new Promise(resolve=>setTimeout(resolve,2000));

    constellationTitle.textContent="";
    constellationText.textContent="";

    constellationTitle.classList.remove("fadeMessageOut");
    constellationText.classList.remove("fadeMessageOut");

    // ❤️ Corazón
    await formShape("img/shapes/heart.png");

    // ✨ Siempre
    setTimeout(async()=>{

        await formShape("img/shapes/siempre.png");

    },2500);

    // ❤️ Mi amor
    setTimeout(async()=>{

        await formShape("img/shapes/miamor.png");

    },4500);

    // 💌 Mostrar carta final
    setTimeout(()=>{

        stopConstellation();

        constellation.classList.remove("fadeIn");
        constellation.classList.add("fadeOut");

        setTimeout(()=>{

            constellation.style.display="none";

            constellation.classList.remove("fadeOut");

            constellationTitle.textContent="";
            constellationText.textContent="";

            constellationTitle.classList.remove("fadeMessageOut");
            constellationText.classList.remove("fadeMessageOut");

            const ending=document.getElementById("ending");

            ending.style.display="flex";

            ending.classList.add("fadeIn");

        },1000);

    },7000);

}

/*==================================================
                DETENER
==================================================*/

function stopConstellation(){

    if(animationId){

        cancelAnimationFrame(animationId);

        animationId=null;

    }

}

/*==================================================
                REINICIAR
==================================================*/

function resetConstellation(){

    stopConstellation();

    stars=[];

    shapePoints=[];

    ctx.clearRect(
        0,
        0,
        constellationCanvas.width,
        constellationCanvas.height
    );

    constellation.classList.remove("fadeIn");
    constellation.classList.remove("fadeOut");

}

/*==================================================
            VISIBILIDAD
==================================================*/

document.addEventListener("visibilitychange",()=>{

    if(document.hidden){

        stopConstellation();

    }

});