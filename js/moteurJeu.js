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
	let lesBriques = new Array();
	let x=7;let y=60;
	let width_b=55;
  let height_b=25;
	let nbCol=8;
	let nbLigne=7;
	let couleurBrique = ["#ff0000","#ff6699","#993399","#3366ff","#33ccff","#99ff99","#33cc33"];
	let score=0;
	let nbrBombe=0;
	

	function creerDesBalles(nbBalles) {
	  for(let i = 0; i < nbBalles; i++) {
	    let x = Math.random() * 420; 
	    let y = 300; 
	    let rayon = 10; 
	
	    let couleur = "white";
	    let vx = 6; 
	    let vy = 6;
	    
	     let b= new Balle(x, y, rayon, couleur, vx, vy);
	    if(!circRectsOverlap(barre.x, barre.y,
	                        barre.width+100, barre.height+100,
	                        b.x, b.y, b.rayon)) {
		  	tableauxDesBalles.push(b);
	      
	    } else 
	      i--;
	    balleTimeout = setTimeout(function() {
						creerDesBalles(nbBalles);
				}, 4000); 
			if(lesBriques<3){ 
					window.clearTimeout(balleTimeout); 
			}
	  }
		 
	}
  function creerChaineBalles(nbr){
			creerDesBalles(2*nbr);
	}
	function createLesBrique()
	{
		
		 for(let i = 0; i < nbCol; i++) {
			for(let j = 0; j < nbLigne; j++) {
						
						let briq= new Brique(x+(width_b*i),y+(height_b*j),0, 0,couleurBrique[j],2);
						lesBriques.push(briq);
					
				}

		 }
		 
	}

//Affichage score
		function showScore() {
      ctx.fillStyle = "white";                
      ctx.font = "bold 16px Arial";
      ctx.fillText("Score: "+score, 25, 40);
			
  }

//Affichage nombre bombe
function showNbrBombe() {
      ctx.fillStyle = "white";                
      ctx.font = "bold 16px Arial";
      ctx.fillText("Nombre Bombe: "+nbrBombe, 270, 40);
			
  }

	// ICI BOUCLE D'animation à 60 images/s
	function mainLoop(time) {
			
		
  		measureFPS(time);
  
		// 1 - on efface le contenu du canvas
  		ctx.clearRect(0, 0, width, height);
  
  		// 2 - on dessine le joueur, les ennemis, le score
  		// etc.
	  	showScore();
			showNbrBombe()
  		mur.draw(ctx);
  		barre.draw(ctx);
 			dessinerLesBriques(lesBriques);
  		dessinerEtDeplacerLesBalles();
			
  		
  		// 3 - on deplace, on teste les collisions
	  	barre.deplace();
   		testeCollisionbarreAvecMurs();  
  		testerCollisionAttrapAvecBalles();
			
		 
			
  
  		// 4 - on redemande une nouvelle frame d'animation
  		// on demande au browser UNE frame d'animation
  		// qui sera dessinée par mainloop()
  		requestAnimationFrame(mainLoop);
	}

	function testerCollisionAttrapAvecBalles() {
    	tableauxDesBalles.forEach(function(b, index, tab) {
				
	    if(circRectsOverlap(barre.x, barre.y,
	                       barre.width, barre.height,
	                       b.x, b.y, b.rayon)) {

	      tableauxDesBalles.splice(index, 1);
				score+=100;

	    }
	  }
			);
	}

	function testerCollisionBriqueAvecBalles(brq,i) {
		
			tableauxDesBalles.forEach(function(b, index, tab) {
				if (brq.x >= b.x+b.rayon + 1 || brq.x + brq.width <= b.x-b.rayon - 1 || brq.y >= b.y+ b.rayon + 1 || brq.y +brq.height <= b.y- b.rayon - 1 )
            return false;
				if (!i) {
            if (!(brq.x < b.x1 -b.rayon - 15 && brq.x + brq.width > b.x +b.rayon + 15))
                b.vx *= -1;
								b.vy *= -1;
        }
				else {

            if (b.x < b.x && b.y + b.r > brq.y && b.y - b.r < brq.y + brq.height
			    || b.x > brq.x + brq.width && b.y + b.r > brq.y && b.y - b.r < brq.y + brq.height )
                b.vx *= -1;
            else{
                b.vy *= -1;	
						}	
						
						if (lesBriques[i].life == 1){
               delete lesBriques[i];
							 }
            else{
               lesBriques[i].life--;
							 lesBriques[i].couleur="white";
						}
				}
				return true;			
				
				});
			
	}

	function dessinerEtDeplacerLesBalles() {
	  
	  tableauxDesBalles.forEach(function(b, index, tab) {
	    // b est une balle dans la collection
	    b.draw(ctx);
	    b.move();
	    testeCollisionBalleAvecMurs(b);
	  });
		
	}
	
 function dessinerLesBriques(lesBriques){
	 	
	 ctx.beginPath();
        for (var i = 0; i < lesBriques.length; i++) {
            if (lesBriques[i]) {
                lesBriques[i].draw(ctx);
                testerCollisionBriqueAvecBalles(lesBriques[i],i);
            }
        }
 }
	function testeCollisionBalleAvecMurs(b) {
	  if(((b.x + b.rayon) >= width) || ((b.x - b.rayon) <= 0)) {
	    // on a touché un bord vertical
	    // on inverse la vitesse en x
	    b.vx *= -1;
	    
	  }
		
	  if(((b.y + b.rayon) >= mur.y) || ((b.x - b.rayon) <= 0 ))  {
	    // on a touché un bord vertical
	    // on inverse la vitesse en x
	    b.vy *= -1;
			if(b.couleur.localeCompare("white")==0)
			{
				b.couleur="#ffdd99";
			}
			else {b.couleur="#ff0000";}
	  
		}
	 }

	
	function testeCollisionbarreAvecMurs() {
	    if((barre.x+barre.width) > canvas.width) {
	      
	    barre.x = canvas.width - barre.width;
	    barre.v = -barre.v;
	  } else if(barre.x < 0) {
	    // idem
	    barre.x = 0;
	    barre.v = -barre.v;
	  }
	  // A FAIRE : COLLISIONS AVEC MURS HAUT ET BAS !
	}

  //Affichage score



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

			createLesBrique();
	    creerDesBalles(3);
			//creerChaineBalles(8);
  		creerLesEcouteurs();

  		
  		requestAnimationFrame(mainLoop);
	}

	// API du moteur de jeu
	return {
		start:start,
		canvas:canvas // celui-là c'est le this.canvas
	}
}