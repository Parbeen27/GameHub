import * as Phaser from "phaser"
import api from "../../services/api"
export default class PauseScene extends Phaser.Scene{
    constructor(){
        super("PauseScene")
    }
    init(data){
        this.parentScene = data.parentScene
        this.score  = data.score
        this.gameId = data.gameId
    }
    create(){
        const {width,height} = this.scale;
        //overlay
        this.add.rectangle(0,0,width,height,0x000000,0.6).setOrigin(0)

        const panel = this.add.rectangle(width/2, height/2,400,400, 0x1e1e1e,1)
        //score
        this.add.text(width/2, height/2-140,`score: ${this.score}`,{
            fontSize:'32px',
            color:'#ffffff'
        }).setOrigin(0.5)

        this.isMuted = localStorage.getItem("muted") === "true";
        this.soundText = this.add.text(width / 2, height / 2 - 40,
        this.isMuted ? "🔇 Sound: OFF" : "🔊 Sound: ON",
        {
          fontSize: "24px",
          color: "#fff",
        }).setOrigin(0.5).setInteractive();

        this.soundText.on("pointerdown", () => {
          this.isMuted = !this.isMuted;
        
          localStorage.setItem("muted", this.isMuted);
        
          this.sound.mute = this.isMuted;
        
          this.soundText.setText(
            this.isMuted ? "🔇 Sound: OFF" : "🔊 Sound: ON"
          );
        });
        //resume
        this.add.text(width/2,height/2 + 20,"Resume",{
            fontSize: '28px',
            color: "#00ff00"
        }).setOrigin(0.5).setInteractive().on("pointerdown",()=>{
            this.scene.stop();
            this.scene.resume(this.parentScene)
        })

        const submitScore = async () => {
            if (this.scoreSubmitted) return;
            this.scoreSubmitted = true;
          
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
          
              this.submitText.setText("✔ Submitted");
            } catch (err) {
              console.error(err);
              this.scoreSubmitted = false;
            }
        };


        this.submitText = this.add.text(width / 2, height / 2 + 80, "Submit Score", {
            fontSize: "24px",
            color: "#00ffff"
            })
            .setOrigin(0.5)
            .setInteractive()
            .on("pointerdown", submitScore);

        //exit
        this.add.text(width / 2, height / 2 + 140, "Exit", {
             fontSize: "28px",
             color: "#ff4444"
           })
           .setOrigin(0.5)
           .setInteractive()
           .on("pointerdown", () => {
             this.scene.stop(this.parentScene);
             this.scene.stop();
             window.dispatchEvent(new Event("goHome"));
           });
    }
    
    
}
