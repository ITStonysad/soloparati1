/*==================================================
                RANDOM
==================================================*/

function random(min,max){

    return Math.floor(

        Math.random()*(max-min+1)

    )+min;

}

/*==================================================
            RANDOM FLOAT
==================================================*/

function randomFloat(min,max){

    return Math.random()*(max-min)+min;

}

/*==================================================
                FORMAT TIME
==================================================*/

function formatTime(seconds){

    const min=Math.floor(seconds/60);

    const sec=Math.floor(seconds%60);

    return String(min).padStart(2,"0")+

    ":"+

    String(sec).padStart(2,"0");

}