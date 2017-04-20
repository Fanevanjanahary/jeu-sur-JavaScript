function creerLesEcouteurs() {
  // Touches, sur window
  window.addEventListener('keydown', toucheEnfoncee);
  window.addEventListener('keyup', toucheRelachee);
  
  // Ecouteurs de souris, on peut mettre sur le canvas
 //jeu.canvas.addEventListener('mouseup', boutonSourisRelache); 
 //jeu.canvas.addEventListener('mousedown', boutonSourisEnfonce); 
 jeu.canvas.addEventListener('mousemove', sourisDeplacee); 
}

function boutonSourisEnfonce(evt) {
  //console.log("bouton enfoncé");
  // Ca depend du sens !!!
  barre.v = barre.v *5;
}
function boutonSourisRelache(evt) {
  //console.log("bouton relache");
  barre.v = Math.sign(barre.v);
}
function sourisDeplacee(evt) {
  // La ligne suivante tient compte des propriétés
  // du canvas (bordure, pos, marges etc.)
  let rect = jeu.canvas.getBoundingClientRect();
  let mx = evt.clientX - rect.left;
  //let my = evt.clientY - rect.top;
  
  //console.log("mouse move x = " + mx + " y = " + my);
  barre.x = mx;
 // barre.y = my;
}
function toucheEnfoncee(evt) {
    //console.log("touche enfoncee key = " + evt.key);
  switch(evt.key) {
    case 'ArrowRight' :
      //console.log("fleche à droite");
      barre.v = 1;  // CA VA LE FAIRE ALLER A DROITE
                      // CAR ON VA TESTER CA 60 fois
                      // PAR SECONDE DANS LA BOUCLE
                      // D'ANIMATION
      break;
    case 'ArrowLeft' :
      //console.log("fleche à gauche");
      barre.v = -1;
      break;
  }
}

function toucheRelachee(evt) {
    //console.log("touche relachee");
  barre.vx = 0;
}
