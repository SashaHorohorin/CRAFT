import React from 'react'
import './Marquee.scss'
import { motion } from "framer-motion";

const marqueeVariants = {
    animate: {
      x: [0, -599],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 5,
          ease: "linear",
        },
      },
    },
  };
  
  const Marquee = ({classAdd, text}) => {
    return (
        <div className={`${classAdd} marquee`}>
                  {/* 3. Using framer motion */}
          <motion.div
            className="track"
            variants={marqueeVariants}
            animate="animate"
          >
            <div>
                <span>{text}</span>
                <span>{text}</span>
                <span>{text}</span>
                <span>{text}</span>
                <span>{text}</span>
                <span>{text}</span>
                <span>{text}</span>
                <span>{text}</span>
                <span>{text}</span>
                <span>{text}</span>
                <span>{text}</span>
                <span>{text}</span>
                <span>{text}</span>
                <span>{text}</span>
                <span>{text}</span>
                <span>{text}</span>
                <span>{text}</span>
                <span>{text}</span>
                <span>{text}</span>
                <span>{text}</span>
            </div>
          </motion.div>
        </div>
    );
  };

export default Marquee