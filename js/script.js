document.addEventListener('keydown', function(event){
    if(event.keyCode == 32 || event.keyCode == 38){
        console.log("salta");
        if(nivel.muerto == false){
            saltar();
        }
        else{
            nivel.velocidad = 9;
            nube.velocidad = 1;
            cactus.x = ForWidth+ 100;
            nube.x = ForWidth + 100;
            nivel.marcador = 0;
            nivel.muerto = false;
        }

    }
});

var imgRex, imgNube, imgCactus, imgSuelo;
function cargeImagenes(){
    imgRex = new Image();
    imgNube = new Image();
    imgCactus = new Image();
    imgSuelo = new Image();

    imgRex.src = "https://ih0.redbubble.net/image.467021864.9078/flat,550x550,075,f.u4.jpg";
    imgNube.src = "https://www.pnglot.com/pngfile/detail/2-20902_computer-icons-symbol-tag-cloud-logo-transparent-background.png";
    imgCactus.src = "https://simple-drawing.com/images/mexico-silhouette/mexico-silhouette-2.jpg";
    imgSuelo.src = "https://cs8.pikabu.ru/post_img/2016/02/05/6/1454662502140986344.jpg";
}


var ForWidth = 700;
var ForHeight = 300;
var canvas,ctx;


function inicialize(){
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext("2d");
    cargeImagenes();
}


function borraCanvas(){
    canvas.width = ForWidth;
    canvas.height = ForHeight;
}

var suelo = 200;
var trex = {y: suelo, vy: 0, gravedad: 2, salto: 28, vymax: 9, saltando: false};
var nivel = {velocidad: 9, marcador: 0, muerto: false};
var cactus = {x: ForWidth + 100, y: suelo-25};
var nube = {x: 400, y:100, velocidad: 1};
var suelog = {x: 0, y: suelo + 30};


function dibujaRex(){
    ctx.drawImage(imgRex,0,0,550,550,100,trex.y,50,50);

}



//--------------------------------------------------------------------------------------



function dibujaCactus(){
    ctx.drawImage(imgCactus, 0,0,480,626,cactus.x, cactus.y, 38,75);
}

function logicaCactus(){
    if(cactus.x < -100){
        cactus.x = ForWidth + 100;
        nivel.marcador++;
    }
    else{
        cactus.x -=nivel.velocidad;
    }
}

//----------------------------------------------------------------------------------------

function dibujaSuelo(){
    ctx.drawImage(imgSuelo, suelog.x,0,360,240,0, suelog.y,700, 0);
}

function logicaSuelo(){
    if(suelog.x > 360){
        suelog.x = 0;

    }
    else{
        suelog.x = nivel.velocidad;
    }
}




//----------------------------------------------------------------------------------------

function dibujaNube(){
    ctx.drawImage(imgNube, 0,0,920,517,nube.x, nube.y, 82,31);
}

function logicaNube(){
    if(nube.x < -100){
        nube.x = ForWidth + 100;
    }
    else{
        nube.x -= nube.velocidad;
    }
}






function saltar(){
    trex.saltando = true;
    trex.vy = trex.salto;
}


function gravedad(){
    if(trex.saltando == true){
        if(trex.y - trex.vy - trex.gravedad > suelo){
            trex.saltando = false;
            trex.vy = 0;
            trex.y = suelo;

        }
        else{
            trex.vy -= trex.gravedad;
            trex.y -= trex.vy;
        }

    }

}




function colision(){
    if(cactus.x >= 100 && cactus.x <=150){
        if(trex.y >= suelo-25){
            nivel.muerto = true;
            nivel.velocidad = 0;
            nube.velocidad = 0;
        }
    }
}



function puntuacion(){
    ctx.font = "30px impact";
    ctx.fillStyle = 'rgb(154, 160, 166);';
    ctx.fillText(`${nivel.marcador}`, 600, 50);

    if(nivel.muerto== true){
        ctx.font = "60px impact";
        ctx.fillText('GAME OVER', 240, 150);
    }
}



//******************************************************************** */
var FPS =  60;
setInterval(function(){
    principal();
}, 1000/FPS);



function principal(){
    borraCanvas();
    gravedad();
    colision();
    logicaSuelo();
    logicaCactus();
    logicaNube();
    dibujaSuelo();
    dibujaCactus();
    dibujaNube();
    dibujaRex();
    puntuacion();
}
