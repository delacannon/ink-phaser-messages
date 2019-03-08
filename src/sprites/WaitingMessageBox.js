import Phaser from "phaser";

export default class extends Phaser.Graphics {
	constructor({ game, x, y, height, color }) {
		super(game, x, y);

		this.beginFill(0x000000, 1);
		this.drawRect(x, y, 40, 40);
	}
}
