// Syntaxe 1 : objet "singleton"
let mur = {
  // propriétés
  x:0,
  y:650,
  width:650,
  height:10,
  v: 0,
  couleurMur: 'white',
  

  draw: function(ctx) {
      ctx.save();
  
      ctx.translate(this.x, this.y);
  
      // mur
      ctx.fillStyle = this.couleurMur;
      ctx.fillRect(0, 0, this.width, this.height);

      
      ctx.restore();    
  } // ici pas de virgule !!!
}
