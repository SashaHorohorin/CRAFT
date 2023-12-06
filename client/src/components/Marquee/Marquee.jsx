import React from "react";
import "./Marquee.scss";
import { motion } from "framer-motion";

const Marquee = ({ classAdd, text, shift, derection}) => {
    const marqueeVariants = {
        animate: {
            x: [0, shift],
            transition: {
                x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: derection,
                    ease: "linear",
                },
            },
        },
    };
    return (
        <div className={`${classAdd} marquee`}>
            {/* 3. Using framer motion */}
            <motion.div
                className="track"
                variants={marqueeVariants}
                animate="animate"
                
            >
                <div>
                    <span className="text">{text}</span>
                    <span className="text">{text}</span>
                    <span className="text">{text}</span>
                    <span className="text">{text}</span>
                    <span className="text">{text}</span>
                    <span className="text">{text}</span>
                    <span className="text">{text}</span>
                    <span className="text">{text}</span>
                    <span className="text">{text}</span>
                    
                </div>
            </motion.div>
        </div>
    );
};

export default Marquee;
