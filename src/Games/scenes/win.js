import * as Phaser from "phaser";

export default class WinScene extends Phaser.Scene {
  constructor() {
    super("winScene");
  }

  init(data) {
    this.score = data.score || 0;
    this.parentScene = data.parentScene;
    this.gameId = data.gameId;
    this.submitted = false;
  }

  create() {
    const { width, height } = this.scale;

    // 🌟 background overlay
    this.add.rectangle(0, 0, width, height, 0x000000, 0.6)
      .setOrigin(0);

    // 🧱 panel
    this.add.rectangle(width / 2, height / 2, 420, 420, 0x1e1e1e, 1);

    // 🎉 title
    this.add.text(width / 2, height / 2 - 160, "🎉 YOU WIN!", {
      fontSize: "42px",
      color: "#00ff00",
      fontStyle: "bold"
    }).setOrigin(0.5);

    // 🏆 score
    this.add.text(width / 2, height / 2 - 90, `Final Score: ${this.score}`, {
      fontSize: "32px",
      color: "#ffffff"
    }).setOrigin(0.5);

    // =========================
    // 📤 SUBMIT SCORE
    // =========================
    const submitScore = async () => {
      if (this.submitted) return;
      this.submitted = true;

      try {
        const token = localStorage.getItem("accessToken");

        await fetch("/api/games/score", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            gameId: this.gameId,
            score: this.score
          })
        });

        submitBtn.setText("✔ Submitted");
      } catch (err) {
        console.error("Score submit error:", err);
        this.submitted = false;
      }
    };

    // =========================
    // 🔘 BUTTON FACTORY
    // =========================
    const makeButton = (y, text, color) => {
      const btn = this.add.text(width / 2, y, text, {
        fontSize: "26px",
        color,
        backgroundColor: "#333",
        padding: { x: 20, y: 10 }
      })
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true });

      btn.on("pointerover", () => btn.setScale(1.1));
      btn.on("pointerout", () => btn.setScale(1));

      return btn;
    };

    // =========================
    // 🔄 PLAY AGAIN
    // =========================
    const restartBtn = makeButton(height / 2 + 20, "🔄 Play Again", "#00ff00");

    restartBtn.on("pointerdown", () => {
      this.scene.stop();
      this.scene.start(this.parentScene);
    });

    // =========================
    // 📤 SUBMIT SCORE
    // =========================
    const submitBtn = makeButton(height / 2 + 90, "📤 Submit Score", "#00ffff");

    submitBtn.on("pointerdown", submitScore);

    // =========================
    // 🚪 HOME
    // =========================
    const homeBtn = makeButton(height / 2 + 160, "🏠 Go Home", "#ff4444");

    homeBtn.on("pointerdown", () => {
      this.scene.stop(this.parentScene);
      this.scene.stop();
      window.dispatchEvent(new Event("goHome"));
    });

    // =========================
    // ⌨ QUICK ACTIONS
    // =========================
    this.input.keyboard.once("keydown-SPACE", () => {
      window.dispatchEvent(new Event("goHome"));
    });

    this.input.once("pointerdown", () => {
      window.dispatchEvent(new Event("goHome"));
    });
  }
}