import React from 'react';
import { motion, Variants } from 'framer-motion';
import { useTheme } from '../App';

const FeaturedWorks: React.FC = () => {
    const { textColor, grayColor } = useTheme();
    
    const textSlideUpVariants: Variants = {
      hidden: { y: '100%' },
      visible: { y: '0%', transition: { duration: 0.8, ease: [0.6, 0.01, -0.05, 0.95] } }
    };

    return (
        // Added generous padding (py-32 md:py-44) to ensure smooth scroll transition into Dark Mode
        <section id="cinematics" className="py-32 md:py-44 bg-transparent relative">
            <div className="container mx-auto px-6 md:px-24 lg:px-44 relative z-10">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ staggerChildren: 0.1 }}
                    className="text-center"
                >
                    <div className="overflow-hidden">
                        <motion.h2 
                            variants={textSlideUpVariants} 
                            className="text-4xl md:text-6xl font-extrabold tracking-tighter" 
                            style={{ color: textColor }}
                        >
                            Miraclestar Cinematics
                        </motion.h2>
                    </div>
                    <div className="overflow-hidden mt-6">
                        <motion.p 
                            variants={textSlideUpVariants} 
                            className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed" 
                            style={{ color: grayColor }}
                        >
                            True cinema goes beyond entertainment – it informs, inspires and uplifts society, leaving a lasting impact on people’s lives.
                        </motion.p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default FeaturedWorks;