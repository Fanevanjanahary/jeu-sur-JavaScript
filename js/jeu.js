// BONNE PRATIQUE : avoir un programme principal
// en JavaScript. Ne pas mettre le code en vrac
// a la fin du HTML ou dans un <script></script>
// sauvage. mélanger HTML et JS ce n'est pas bon

window.addEventListener('load', init);
// ou window.onload = init;

// On peut faire de plein de manière différentes,
// avec jquery etc. Mais jQuery est de plus en plus
// obsolète et ne marche pas avec d'autres
// frameworks comme angularJS, ReactJS, Polymer
// Pour ce cours on fera du pur JS, qui est très bien.
let canvas, ctx, width, height, b1, e1;
let tableauxDesBalles = []; // un tableau vide en JS
// Pour afficher les ftps, un div

function init() {
  console.log("la page est chargée");
  
  initFPS();
  
  // BONNE PRATIQUEZ : canvas, ctx en variables globales
  // let en ES6 est comme var en javascript 5 mais respecte la portée
  // des variables de Java, portée = entre {...} alors que var
  // pour une variable locale a une portée = la fonction entière
  
  canvas = document.querySelector("#myCanvas");
  width = canvas.width;
  height = canvas.height; // pratique de les avoir globaux
  // querySelector = comme le $ de jQuery, à l'intérieur un 
  // selecteur CSS
  
  // Ici le querySelector a bien renvoyé le canvas
  // car le DOM est prêt, la page chargée, le canvas
  // existe.
  // si on fait canvas = document.querySelector("#myCanvas"); en
  // avant, -> erreur.
  ctx = canvas.getContext('2d'); // autre possibilité 'webgl' pour la 3D

  //drawMonstre(0, 0);
  //drawMonstre(120, 30);
  //drawMonstre(240, 130);
  // etc.
  
  //monstre.draw();
  
  // x, y, rayon, couleur, vx, vy
  //b1 = new Balle(100, 100, 50, "pink", 10, 8);
  creerDesBalles(25);
  //e1 = new Ennemi(20, 20, 50, 50, "red", 4, 2);
  
  // On est dans le programme principal, on va écouter les
  // touches avant de démarrer l'animation
  creerLesEcouteurs();
  
  // on demande au browser UNE frame d'animation
  // qui sera dessinée par mainloop()
  requestAnimationFrame(mainLoop);
}

function creerDesBalles(nbBalles) {
  for(let i = 0; i < nbBalles; i++) {
    let x = Math.random() * width; // Math.random() renvoie un nombre entre 0 et 1
    let y = Math.random() * height; 
    let rayon = 2 + Math.random() * 10; // rayon entre 2 et 12
    let R = Math.round(255 *Math.random()); // valeur entre 0 et 255
    let G = Math.round(255 *Math.random());
    let B = Math.round(255 *Math.random());
    let couleur = "rgb(" + R + "," + G + "," + B +")";
    let vx = 1+Math.random() *5; // entre 1 et 5
    let vy = 1+Math.random() *5;
    //console.log(couleur)
    
    let b = new Balle(x, y, rayon, couleur, vx, vy);
  
    // On vérifie que la balle n'est pas sur le joueur
    // Si c'est le cas on la saute et on n'incrémente
    // pas la variable de boucle i
    if(!circRectsOverlap(monstre.x, monstre.y,
                        monstre.width+100, monstre.height+100,
                        b.x, b.y, b.rayon)) {
      // pas de collision
      // // on la rajoute au tableau des balles
      tableauxDesBalles.push(b);
    } else {
      // on décrémente i pour "annuler" ce tour
      // de boucle
      i--;
      console.log('BALLE NON CREE CAR SUR JOUEUR')
    }
  }
}



// On a dessiné le monstre avec une fonction, 
// mais on peut aussi en faire un objet
// Comme ce monstre est unique (on ne va pas)
// en instancier 40 !!!, c'est l'occasion de voir
// la première syntaxe pour faire dez objets en JS
// Cette syntaxe est la même en ES5 qu'en ES6
// ES5 = depuis 2009, marche partout
// ES6 = la dernière version de JavaScript aussi
// appelée ES2015, et avec ses extensions ES2016
// ou ES2016+






// ICI BOUCLE D'animation à 60 images/s
function mainLoop(time) {
  // temps écoulé depuis que la page a été chargée et que
  // cette webapp a démarré
  //console.log("time = " + time);
  
  // compute FPS, called each frame, uses the high resolution time parameter 
  // given by the browser that implements the requestAnimationFrame API
  measureFPS(time);
  
  // 1 - on efface le contenu du canvas
  ctx.clearRect(0, 0, width, height);
  
  // 2 - on dessine le joueur, les ennemis, le score
  // etc.
  monstre.draw(ctx);
  
  //b1.draw(); // la balle !
  //e1.draw(); // un ennemi !
  dessinerEtDeplacerLesBalles();
  
  // 3 - on déplace les objets
  // 60 fois par seconde on fait cela
  // Si monstre.vx vait 0 -> immobile
  // si j'appuie sur une touche, ca passe à 1
  // je déplace 60 fois par seconde vers la droite
  monstre.x += monstre.v;
  //b1.move();
  //e1.move();
  
  // monstre.x et monstre.y = le coin en haut à gauche
  // du rectangle
   testeCollisionMonstreAvecMurs();
   //testeCollisionBalleAvecMurs();
  
  
  testerCollisionJoueurAvecBalles();
  
  // 4 - on redemande une nouvelle frame d'animation
  // on demande au browser UNE frame d'animation
  // qui sera dessinée par mainloop()
  requestAnimationFrame(mainLoop);

}


// Ci-dessous : pas des objets, une version
// "fonctions"
function testerCollisionJoueurAvecBalles() {
    tableauxDesBalles.forEach(function(b, index, tab) {
    
    if(circRectsOverlap(monstre.x, monstre.y,
                       monstre.width, monstre.height,
                       b.x, b.y, b.rayon)) {
      console.log("collision");
      tableauxDesBalles.splice(index, 1);
    }
  });

}

function dessinerEtDeplacerLesBalles() {
  /*
  // autre syntaxe
  for(let i = 0; i < tableauxDesBalles.length;i++) {
    var b = tableauxDesBalles[i];
        b.draw(ctx);
    b.move();
    testeCollisionBalleAvecMurs(b);

  }
  */
  
  // ici avec un itérateur
  tableauxDesBalles.forEach(function(b, index, tab) {
    // b est une balle dans la collection
    b.draw(ctx);
    //b.move();
    testeCollisionBalleAvecMurs(b);
  });
}

function testeCollisionBalleAvecMurs(b) {
  if(((b.x + b.rayon) > width) || ((b.x - b.rayon) < 0)) {
    // on a touché un bord vertical
    // on inverse la vitesse en x
    b.vx = -b.vx;
    
  }
  if(((b.y + b.rayon) > height) || ((b.y - b.rayon) < 0)) {
    // on a touché un bord vertical
    // on inverse la vitesse en x
    b.vy = -b.vy;
  }
}
function testeCollisionMonstreAvecMurs() {
    if((monstre.x+monstre.width) > canvas.width) {
      // BONNE PRATIQUE : toujours se remettre à la position
      // de contact. Si jamais on est allé "trop loin"
      // on va rester en position de collision et rester
      // "collé au mur"
    monstre.x = canvas.width - monstre.width;
    monstre.v = -monstre.v;
  } else if(monstre.x < 0) {
    // idem
    monstre.x = 0;
    monstre.v = -monstre.v;
  }
  
  // A FAIRE : COLLISIONS AVEC MURS HAUT ET BAS !
}

