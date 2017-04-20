class Brique extends ObjetGraphique{
  
  constructor(x, y, width,height,couleur,life) {
     super(x, y, couleur, 0, 0);
     this.life=life;
    
    
  }

  draw(ctx) {
      ctx.save();
  
      ctx.translate(this.x, this.y);
  
      // Le corps du barre
      ctx.fillStyle = this.couleur;
      this.width=50; this.height=20;
      ctx.fillRect(0, 0, this.width, this.height);


      ctx.restore();    
  } // ici pas de virgule !!!

  
}
