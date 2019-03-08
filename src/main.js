import "pixi";
import "p2";
import Phaser from "phaser";

import BootState from "./states/Boot";
import SplashState from "./states/Splash";
import GameState from "./states/Game";

import config from "./config";

class Game extends Phaser.Game {
  constructor() {
    const docElement = document.documentElement;
    const width =
      docElement.clientWidth > config.gameWidth
        ? config.gameWidth
        : docElement.clientWidth;
    const height =
      docElement.clientHeight > config.gameHeight
        ? config.gameHeight
        : docElement.clientHeight;

    super(width, height, Phaser.AUTO, "content", null);

    this.state.add("Boot", BootState, false);
    this.state.add("Splash", SplashState, false);
    this.state.add("Game", GameState, false);

    // With Cordova with need to wait that the device
    // Is ready so we will call the Boot state in another file

    if (!window.cordova) {
      this.state.start("Boot");
    }
  }
}

window.game = new Game();

if (window.cordova) {
  var app = {
    initialize: function() {
      document.addEventListener(
        "deviceready",
        this.onDeviceReady.bind(this),
        false
      );
    },

    onDeviceReady: function() {
      this.receivedEvent("deviceready");
      // When the device is ready, start Phaser Boot state.
      window.game.state.start("Boot");
    },

    receivedEvent: function(id) {
      console.log("Received Event: " + id);
    }
  };

  app.initialize();
}