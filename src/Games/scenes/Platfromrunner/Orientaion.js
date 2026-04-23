import * as Phaser from "phaser";
export default class OrientationScene extends Phaser.Scene {
  constructor() {
    super({ key: 'OrientationScene' });
  }

  create() {
        const { width, height } = this.scale;

        // Background (optional, for better visibility)
        this.add.rectangle(width / 2, height / 2, width, height, 0x000000, 0.8);

        // Rotation message
        this.rotationMessage = this.add.text(width / 2, height / 2 - 100, 'Please rotate your device\nto landscape mode for the best experience', {
            fontSize: '32px',
            fill: '#fff',
            align: 'center',
            fontStyle: 'bold'
        }).setOrigin(0.5).setWordWrapWidth(width * 0.8);

        // Start Game Button
        this.startButton = this.add.text(width / 2, height / 2 + 100, 'Start Game', {
            fontSize: '48px',
            fill: '#0f0',
            backgroundColor: '#000',
            padding: { x: 20, y: 10 },
            fontStyle: 'bold'
        }).setOrigin(0.5).setInteractive();

        this.startButton.on('pointerdown', () => {
            this.scene.start('gameScene');
        });

        // Listen to resize to reposition elements
        this.scale.on('resize', this.resize, this);
    }

    resize(gameSize) {
        const w = gameSize.width;
        const h = gameSize.height;

        // Reposition elements on resize
        this.rotationMessage.setPosition(w / 2, h / 2 - 100).setWordWrapWidth(w * 0.8);
        this.startButton.setPosition(w / 2, h / 2 + 100);
    }}