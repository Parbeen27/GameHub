import React from 'react'
import { motion } from "motion/react"
function TopBar(props) {
  return (
      <motion.div 
      whileHover={{ scale: 1.08 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 15
      }}
      className="w-full h-64 rounded-2xl overflow-hidden relative bg-center bg-cover shadow-lg cursor-pointer active:scale-95"
           style={{ backgroundImage: `url(${props.img})` }}>
      
        <div className="absolute inset-0 bg-linear-to-t from-black/70 to-black/20"></div>
      
        {/* Content */}
        <div className="absolute bottom-0 p-4 text-white">
          <h1 className="font-bold text-lg">{props.game}</h1>
          <p className="text-sm opacity-90 line-clamp-2">{props.desc}</p>
        </div>
      </motion.div>
        )
}

export default TopBar