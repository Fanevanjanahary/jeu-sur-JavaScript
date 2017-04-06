window.onload = init;
let jeu;

function init() {
	let canvas = document.querySelector("#myCanvas");

    jeu = new MoteurJeu(canvas);
	jeu.start();
}

function MoteurJeu() {
	let canvas, ctx, width, height;
	let tableauxDesBalles = [];

	function creerDesBalles(nbBalles) {
	  for(let i = 0; i < nbBalles; i++) {
	    let x = Math.random() * width; // Math.random() renvoie un nombre entre 0 et 1
	    let y = Math.random() * mur.y; 
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

	// ICI BOUCLE D'animation à 60 images/s
	function mainLoop(time) {
  		measureFPS(time);
  
		// 1 - on efface le contenu du canvas
  		ctx.clearRect(0, 0, width, height);
  
  		// 2 - on dessine le joueur, les ennemis, le score
  		// etc.
  		mur.draw(ctx);
  		monstre.draw(ctx);
  		dessinerEtDeplacerLesBalles();
  		
  		// 3 - on deplace, on teste les collisions
	  	monstre.deplace();
   		testeCollisionMonstreAvecMurs();  
  		testerCollisionJoueurAvecBalles();
  
  		// 4 - on redemande une nouvelle frame d'animation
  		// on demande au browser UNE frame d'animation
  		// qui sera dessinée par mainloop()
  		requestAnimationFrame(mainLoop);
	}

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
	    b.move();
	    testeCollisionBalleAvecMurs(b);
	  });
	}

	function testeCollisionBalleAvecMurs(b) {
	  if(((b.x + b.rayon) > width) || ((b.x - b.rayon) < 0)) {
	    // on a touché un bord vertical
	    // on inverse la vitesse en x
	    b.vx = -b.vx;
	    
	  }
	  if(((b.y + b.rayon) > mur.y) || ((b.y - b.rayon) < 0)) {
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

	// PROGRAMME PRINCIPAL
	function start() {
		// ici le programme principal
		initFPS();

		// pour éviter this partout dans le code
		canvas = document.querySelector("#myCanvas");

		// propriété
		this.canvas = document.querySelector("#myCanvas");

  		width = canvas.width;
  		height = canvas.height; 

  		ctx = canvas.getContext('2d');

  		// Note : le monstre existe déjà
  		// puisque défini dans un fichier
  		// monstre.js déjà lu (on exécute)
  		// le présent code que quand la
  		// page a été chargée, donc tous
  		// les fichiers js lus)
  		creerDesBalles(3);

  		creerLesEcouteurs();

  		// On démarre l'animation que quand
  		// tout est prêt (on verra tout à
  		// l'heure qu'il faut par ex avoir
  		// chargé/lu toutes les images, sons
  		// etc.)
  		requestAnimationFrame(mainLoop);
	}

	// API du moteur de jeu
	return {
		start:start,
		canvas:canvas // celui-là c'est le this.canvas
	}
}