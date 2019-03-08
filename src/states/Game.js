import Phaser from "phaser";
import { Story } from "inkjs";
import { ListView } from "phaser-list-view";

import MessageBox from "../sprites/MessageBox";
import WaitingMessageBox from "../sprites/WaitingMessageBox";
import BitmapSprite from "../sprites/BitmapSprite";

export default class extends Phaser.State {
  init() {}

  preload() {}

  create() {
    this.story = new Story(this.cache.getJSON("story"));

    const parent = this.world;
    const bounds = new Phaser.Rectangle(0, 96, 640, 768);
    const options = {
      direction: "y",
      overflow: 100,
      padding: 6,
      searchForClicks: true
    };

    this.color = "";
    this.colorbox = "";
    this.sprite_anchor = 0;
    this.colorClock = "";
    this.x = 0;
    this.y = 0;
    this.tag_state = "";

    this.state = {
      messageColor: "",
      messageTextColor: "",
      messageAnchor: "",
      messageTimeColor: "",
      messageX: 0,
      messageY: 0,
      messageTag: ""
    };

    this.listView = new ListView(this, parent, bounds, options);

    //Empezamos la historia
    this.continueStory();

    //add header
    this.add.sprite(0, 0, "header");
    this.choicesGroup = this.add.group();
    let bottom = this.add.sprite(640 / 2, 0, "header");
    bottom.y = 960 - bottom.height / 2;
    bottom.angle = 180;
    bottom.anchor.set(0.5);
  }

  spawnElements(elements) {
    var last = elements.texts[elements.texts.length - 1].delay;

    elements.texts.forEach((e, i) => {
      this.time.events.add(e.delay, this.addTextToView, this, {
        text: e.text,
        delay: e.delay,
        tags: e.tags
      });
    }, this);

    console.log();

    this.time.events.add(last + 1000, this.spawnChoices, this, elements);
  }

  spawnChoices(elements) {
    var items = elements.choices.length * 64;
    var posY = 864 - items;

    elements.choices.forEach((e, i) => {
      let choiceBtn = this.add.sprite(0, posY + i * 64, "choiceBtn");
      choiceBtn.inputEnabled = true;

      let txt2 = this.game.add.text(
        Math.floor(choiceBtn.x + choiceBtn.width / 2),
        64 / 2,
        e.text,
        {
          font: "26px Roboto",
          fill: "#fff",
          align: "center",
          textAlign: "center",
          wordWrap: true,
          wordWrapWidth: 640
        }
      );
      txt2.anchor.set(0.5);

      choiceBtn.addChild(txt2);

      choiceBtn.events.onInputDown.add(() => {
        this.story.ChooseChoiceIndex(e.index);
        this.choicesGroup.removeAll();
        this.continueStory();
        this.add
          .tween(groupView.position)
          .to(
            { y: groupView.position.y + items },
            1000,
            Phaser.Easing.Cubic.InOut,
            true
          );
      }, this);

      this.choicesGroup.add(choiceBtn);
    }, this);

    this.add
      .tween(this.choicesGroup)
      .from({ y: 400 }, 1000, Phaser.Easing.Cubic.InOut, true);

    let groupView = this.listView.grp;
    this.add
      .tween(groupView.position)
      .to(
        { y: groupView.position.y - items },
        1000,
        Phaser.Easing.Cubic.InOut,
        true
      );

    // ->
  }

  addTextToViewCharger(delay) {
    let box = new WaitingMessageBox({ game: this.game, x: 0, y: 0 });
    box.name = "waiting";
    //wating == name -> delete -> delete
    this.listView.add(box);
    this.game.time.events.add(delay, this.remove, this);
  }

  addTextToView(data) {
    if (data.tags != undefined) {
      switch (data.tags[0]) {
        case "rigth":
          this.color = "#fcfcfc";
          this.colorbox = "#111111";
          this.colorClock = "#999";
          this.sprite_anchor = 1;
          this.tag_state = "rigth";
          this.x = 640;
          break;
        case "left":
          this.color = "#000";
          this.colorbox = "#fcfcfc";
          this.colorClock = "#df78ef";
          this.sprite_anchor = 0;
          this.tag_state = "left";
          this.x = 10;
          break;
      }
    }

    this.left_style = {
      font: "26px Open Sans",
      fill: this.color,
      align: "left",
      wordWrap: true,
      wordWrapWidth: 470
    };

    this.left_style2 = {
      font: "16px Roboto",
      fill: "#f0f0f0",
      align: "left",
      wordWrap: true,
      wordWrapWidth: 470
    };

    let text_span = 0;
    let time_span = 32;
    let txt = this.game.add.text(text_span, 0, data.text, this.left_style);

    let bmd = this.bmdTexture(txt.height + time_span, data.text, {
      time: "20:23",
      posy: txt.height - time_span,
      state: this.tag_state
    });

    let messageBox = new BitmapSprite({
      game: this.game,
      x: this.x,
      y: 0,
      asset: bmd
    });

    messageBox.anchor.x = this.sprite_anchor;
    messageBox.scale.y = 0;
    messageBox.scale.x = 0;

    this.add
      .tween(messageBox.scale)
      .to({ y: 1, x: 1 }, 300, Phaser.Easing.Cubic.InOut, true);

    this.listView.add(messageBox);
    this.moveToLast(txt.height + time_span);

    txt.destroy();
  }

  wrapText(ctx, txt, x, y, maxWidth, lineHeight) {
    var words = txt.split(" ");
    var line = "";

    for (var n = 0; n < words.length; n++) {
      var testLine = line + words[n] + " ";
      var metrics = ctx.measureText(testLine);
      var testWidth = metrics.width;
      if (testWidth > maxWidth && n > 0) {
        ctx.fillText(line, x, y);
        line = words[n] + " ";
        y += lineHeight;
      } else {
        line = testLine;
      }
    }

    ctx.fillText(line, x, y);
    console.log(y);
  }

  bmdTexture(height, text, clock) {
    let rectX = 20;
    let rectY = 0;
    let rectWidth = 500;
    let rectHeight = height;
    let cornerRadius = 20;
    let span = 5;
    let shadow_span = 10;

    let bmd = this.add.bitmapData(500 + shadow_span + 20, height + shadow_span);

    bmd.ctx.lineJoin = "round";
    bmd.ctx.lineWidth = cornerRadius;

    //Blur para crear un efecto de sombreado
    bmd.ctx.fillStyle = this.color;
    bmd.ctx.strokeStyle = this.color;
    bmd.ctx.save();
    bmd.ctx.shadowColor = "#888888";
    bmd.ctx.shadowOffsetY = 2;
    bmd.ctx.shadowBlur = 8;
    if (this.tag_state === "left") {
      bmd.ctx.moveTo(rectX - 20, rectY + 20);
      bmd.ctx.lineTo(105, -25);
      bmd.ctx.lineTo(25, 36);
    }
    bmd.ctx.strokeRect(
      rectX + cornerRadius / 2,
      rectY + cornerRadius / 2,
      rectWidth - cornerRadius,
      rectHeight - cornerRadius
    );
    bmd.ctx.restore();

    bmd.ctx.rect(
      rectX + cornerRadius / 2,
      rectY + cornerRadius / 2,
      rectWidth - cornerRadius,
      rectHeight - cornerRadius
    );
    bmd.ctx.fill();

    bmd.ctx.font = "26px Open Sans";
    bmd.ctx.fillStyle = this.colorbox;

    this.wrapText(
      bmd.ctx,
      text,
      rectX + 32,
      rectY + 26 + 16,
      470,
      26 * 1.42857
    );

    //Time Omagatoki
    bmd.ctx.font = "16px Roboto";
    bmd.ctx.fillStyle = this.colorClock;

    let clockPos = this.tag_state === "rigth" ? rectWidth - 100 : rectX + 32;
    let addText = this.tag_state === "left" ? "" : "✓✓";

    this.wrapText(
      bmd.ctx,
      addText,
      clockPos - 26,
      clock.posy + 32,
      470,
      26 * 1.42857
    );
    this.wrapText(
      bmd.ctx,
      clock.time,
      clockPos,
      clock.posy + 32,
      470,
      26 * 1.42857
    );

    return bmd;
  }

  moveToLast(height) {
    let span = 0;
    let start = this.listView.position;
    let dist = this.listView.length - 768 - start;

    if (dist < 0) {
      dist = 0;
    } else {
      span += height + 32;
    }

    this.listView.tweenToPosition(-(start + dist) - span, 0.3);
  }

  continueStory() {
    let elements = {
      texts: [],
      choices: [],
      tags: []
    };

    let i = 1;

    while (this.story.canContinue) {
      let text = this.story.Continue();

      elements.texts.push({
        text: text,
        delay: i * 1000 + text.length * 4,
        tags: this.story.currentTags
      });

      if (!this.story.canContinue) {
        elements.choices = this.story.currentChoices;
        this.spawnElements(elements);
      }

      i++;
    }
  }
}
