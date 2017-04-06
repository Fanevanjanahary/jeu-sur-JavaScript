// Syntaxe 1 : objet "singleton"
let monstre = {
  // propriétés
  x:100,
  y:650,
  width:100,
  height:10,
  v: 0,
  vx:0, // vitesse en x
  vy: 0, // vitesse en y
  couleurCorps: 'black',
 
  
  // methodes
  deplace: function() {
    this.x += this.v;
  },

  move: function(x, y) {
      this.x = x;
      this.y = y;
  }, // ici une virgule !
  
  draw: function(ctx) {
      ctx.save();
  
      ctx.translate(this.x, this.y);
  
      // Le corps du monstre
      ctx.fillStyle = this.couleurCorps;
      ctx.fillRect(0, 0, this.width, this.height);


      ctx.restore();    
  } // ici pas de virgule !!!
}
