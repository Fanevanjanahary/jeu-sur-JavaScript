
class Ennemi extends ObjetGraphique {
  constructor(x, y, width, height, couleur, vx, vy) {
    // appel du constructeur hérité
    super(x, y, couleur, vx, vy);
    this.width = width;
    this.height = height;
  }
  
  draw(ctx) {
    // Pour dessiner un cercle, faire comme ceci
    // j'explique après...
    ctx.save(); // bonne pratique
    ctx.translate(this.x, this.y);
    
    // On dessine en 0,0
    ctx.fillRect(0, 0, 2*this.width, this.height);
    
    ctx.restore();
    
    // Appel de la méthode héritée
    super.draw(ctx);
  }
}
