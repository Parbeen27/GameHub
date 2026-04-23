import React, { useContext, useEffect, useRef } from 'react'
import * as Phaser from 'phaser';
import { useNavigate, useParams } from 'react-router-dom';
import { GamesContext } from '../../Context/GameContext';
import Platfromrunner from '../../Games/scenes/Platfromrunner';
import SpaceBattle from '../../Games/scenes/SpaceBattle/index'
const isMobile = /Mobi|Android/i.test(navigator.userAgent);
function Game() {
  const {id} = useParams()
  const {games, loading} = useContext(GamesContext)
  const navigate = useNavigate()
  const gameRef = useRef(null)
  
  const gameData = games.find((g) => g._id === id)
  useEffect(()=>{
    if(!gameData)return;

    const goHome=()=>{
      navigate('/')
    }

    window.addEventListener("goHome",goHome)

    let hasCountedPlay = false

    const incrementPlay = async () => {
      if(hasCountedPlay) return;
      hasCountedPlay = true
    
    try {
      await fetch(`/api/games/${gameData.slug}/play`,{
        method: "post",
      })
    } catch (err) {
      console.error("failed to increment play: ", err);
      
    }
  }
    const config = {
                type: Phaser.AUTO,
                width: 800,
                height: 600,
                backgroundColor: '#666c6f',
                scale: {
                    mode: isMobile ? Phaser.Scale.RESIZE : Phaser.Scale.FIT,
                    autoCenter: Phaser.Scale.CENTER_BOTH,
                    parent: gameRef.current,
                },
                resolution: window.devicePixelRatio,
                physics: {
                    default: 'arcade',
                    arcade: {
                        gravity: { y: 500 },
                        debug: false
                    }
                },
                input: {
                    activePointers: 3, // Allow up to 3 simultaneous touch inputs
                },
                scene: gameData.scenekey === "gameScene" ? Platfromrunner : SpaceBattle,

                callbacks: {
                  preBoot: (game) => {
                    game.registry.set("gameId",gameData._id)

                    incrementPlay()
                  }
                }
            };
            const game = new Phaser.Game(config);
            
            return () =>{ game.destroy(true)
              window.removeEventListener("goHome",goHome)
                        }
  },[gameData])
  if(loading) return <div>Loading...</div>;
  if(!gameData) return <div>Game not found</div>;
  return (
    <div className='flex flex-col items-center h-full w-full mt-16'>
      <div ref={gameRef} ></div>
    </div>
  )
}

export default Game