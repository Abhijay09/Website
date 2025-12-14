import React from 'react';
import { motion, Variants } from 'framer-motion';
import { useTheme } from '../App';

const Hero: React.FC = () => {
  const { textColor, grayColor } = useTheme();
  const line1 = "Miraclestar";
  const line2 = "Entertainments";

  const sentence: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.2 } },
  };

  const lineAnim: Variants = {
    hidden: { y: "100%" },
    visible: { y: "0%", transition: { duration: 0.8, ease: [0.6, 0.01, -0.05, 0.95] } },
  };

  return (
    <section className="flex flex-col justify-center items-center text-center relative px-6 md:px-24 lg:px-44 pt-48 pb-24">
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      
      <div className="relative z-10">
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8 }}
            className="mb-8"
        >
          <motion.span style={{ color: grayColor }} className="uppercase tracking-widest text-sm">A new Era in Audio & Visual Excellence</motion.span>
        </motion.div>
        
        <motion.h1 
          style={{ color: textColor }}
          className="text-5xl md:text-7xl lg:text-9xl font-extrabold tracking-tighter"
          variants={sentence}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
        >
          <div className="overflow-hidden py-2">
            <motion.div variants={lineAnim}>{line1}</motion.div>
          </div>
          <div className="overflow-hidden py-2">
            <motion.div variants={lineAnim}>{line2}</motion.div>
          </div>
        </motion.h1>
        
        <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl max-w-3xl mx-auto mt-8 mb-12"
            style={{ color: grayColor }}
        >
          A production house that encompasses all aspects of the entertainment industry, committed to quality and dedication in all its productions and striving to create a harmonious work environment.
        </motion.p>
      </div>

    </section>
  );
};

export default Hero;