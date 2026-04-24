import * as Phaser from "phaser";
import api from "../../services/api"
export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super("gameOverScene");
  }

  init(data) {
    this.parentScene = data.parentScene;
    this.score = data.score || 0;
    this.gameId = data.gameId;
    this.submitted = false;
  }

  create() {
    const { width, height } = this.scale;

    // 🔳 background overlay
    this.add.rectangle(0, 0, width, height, 0x000000, 0.7)
      .setOrigin(0);

    // 🧱 panel
    this.add.rectangle(width / 2, height / 2, 420, 420, 0x1e1e1e, 1);

    // 💀 title
    this.add.text(width / 2, height / 2 - 160, "GAME OVER", {
      fontSize: "42px",
      color: "#ff4444",
      fontStyle: "bold"
    }).setOrigin(0.5);

    // 🎯 score
    this.add.text(width / 2, height / 2 - 90, `Score: ${this.score}`, {
      fontSize: "32px",
      color: "#ffffff"
    }).setOrigin(0.5);

    // ==============================
    // 🔥 SUBMIT SCORE
    // ==============================
    const submitScore = async () => {
      if (this.submitted) return;
      this.submitted = true;

      try {
        const token = localStorage.getItem("accessToken");

        await api.post("/api/games/score", {
  gameId: this.gameId,
  score: this.score
}, {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`
  }
        
});

        submitBtn.setText("✔ Submitted");
      } catch (err) {
        console.error("Score submit error:", err);
        this.submitted = false;
      }
    };

    // ==============================
    // 🔘 BUTTON STYLE HELPERS
    // ==============================
    const makeButton = (y, text, color) => {
      const btn = this.add.text(width / 2, y, text, {
        fontSize: "26px",
        color,
        backgroundColor: "#333",
        padding: { x: 20, y: 10 }
      })
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true });

      // hover effect
      btn.on("pointerover", () => btn.setScale(1.1));
      btn.on("pointerout", () => btn.setScale(1));

      return btn;
    };

    // ==============================
    // 🔄 RESTART BUTTON
    // ==============================
    const restartBtn = makeButton(height / 2 + 20, "🔄 Restart", "#00ff00");

    restartBtn.on("pointerdown", () => {
      this.scene.stop();
      this.scene.start(this.parentScene);
    });

    // ==============================
    // 📤 SUBMIT BUTTON
    // ==============================
    const submitBtn = makeButton(height / 2 + 90, "📤 Submit Score", "#00ffff");

    submitBtn.on("pointerdown", submitScore);

    // ==============================
    // 🚪 EXIT BUTTON
    // ==============================
    const exitBtn = makeButton(height / 2 + 160, "🚪 Exit", "#ff4444");

    exitBtn.on("pointerdown", () => {
      this.scene.stop(this.parentScene);
      this.scene.stop();
      window.dispatchEvent(new Event("goHome"));
    });

    // ==============================
    // ⌨ QUICK RESTART
    // ==============================
    this.input.keyboard.on("keydown-SPACE", () => {
      this.scene.start(this.parentScene);
    });

    this.input.on("pointerdown", () => {
      this.scene.start(this.parentScene);
    });
  }
}
