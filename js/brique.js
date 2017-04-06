class Brique {
  constructor(x, y, couleur) {
    // appel du constructeur hérité
    super(x, y, couleur);
    this.rayon = rayon;
  }
  
  draw(ctx) {
    // Pour dessiner un cercle, faire comme ceci
    // j'explique après...
    ctx.save(); // bonne pratique
    ctx.translate(this.x, this.y);
    
    // On dessine en 0,0
    ctx.fillStyle = this.couleur;
    ctx.fillRect(0, 0, this.width, this.height);
    
    ctx.restore();
    
    // Appel de la méthode héritée
    super.draw(ctx);
  }
}