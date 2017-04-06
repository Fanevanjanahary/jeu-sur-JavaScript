function drawMonstre(x, y) {
  // Ici on va dessiner un monstre !
  
  // BONNE PRATIQUE No 1: sauvegarder tout le contexte
  // au debut de chaque fonction qui change une propriété
  // Ca ne coûte rien, tout est fait dans le GPU, 
  // dans des registres spécialisés
  ctx.save();
  
  // BONNE PRATIQUE No 2: on dessine en 0, 0, mais
  // on translate tout le repère qui est normalement
  // situé en haut à gauche du canvas (x vers la droite
  // y vers le bas)
  ctx.translate(x, y);
  
  // Le corps du monstre
  ctx.fillStyle = "brown";
  ctx.fillRect(0, 0, 100, 100);

  // Les yeux
  ctx.fillStyle = "yellow";
  ctx.fillRect(20, 15, 10, 10);
  ctx.fillRect(68, 15, 10, 10);
  
  // Le nez
  ctx.fillStyle = "red";
  ctx.fillRect(45, 30, 10, 30);
  
  // etc....
  
  
  // BONNE PRATIQUE 1: restaurer le contexte à la fin
  ctx.restore();
}

function testGraphics() {
    
  ctx.fillStyle = 'blue';
  ctx.fillRect(10, 10, 100, 100);
  // contour jaune
  ctx.lineWidth = 10;
  ctx.strokeStyle = 'yellow';
  ctx.strokeRect(10, 10, 100, 100);
  
  // stroke au lieu de fill = en fil de fer !
  ctx.strokeStyle = 'red';
  ctx.lineWidth=5;
  ctx.strokeRect(200, 200, 50, 50);
  
    // texte
    let fontSize = 40;
    ctx.font = fontSize + 'px Courier';
    ctx.testAlign='center';
    ctx.fillText("Hello!", 150, 40);
    ctx.strokeStyle = "pink;"
   ctx.lineWidth = 2;
   ctx.strokeText("Hello!", 150, 40);
}