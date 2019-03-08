import Phaser from "phaser";

export default class extends Phaser.Sprite {
  constructor({ game, x, y, height, color }) {
    super(game, x, y, height, color);
  }

  show() {
    this.game.add
      .tween(this)
      .to({ x: 500 }, 600, Phaser.Easing.Cubic.Out, true);
  }
}
