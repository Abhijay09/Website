import React from 'react';
import { motion, Variants } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../App';
import Button from './ui/Button';
import VideoScrubber from './VideoScrubber';

const FeaturedWorks: React.FC = () => {
    const { textColor, grayColor } = useTheme();
    const navigate = useNavigate();
    
    const textSlideUpVariants: Variants = {
      hidden: { y: '100%' },
      visible: { y: '0%', transition: { duration: 0.8, ease: [0.6, 0.01, -0.05, 0.95] } }
    };

    return (
        <section id="cinematics" className="pb-20 md:pb-32 bg-transparent">
            <div className="container mx-auto px-6 md:px-24 lg:px-44 pt-20 md:pt-32">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ staggerChildren: 0.1 }}
                    className="text-center mb-0"
                >
                    <div className="overflow-hidden">
                        <motion.h2 variants={textSlideUpVariants} className="text-4xl md:text-6xl font-extrabold tracking-tighter" style={{ color: textColor }}>Miraclestar Cinematics</motion.h2>
                    </div>
                    <div className="overflow-hidden">
                        <motion.p variants={textSlideUpVariants} className="text-lg md:text-xl max-w-2xl mx-auto mt-4" style={{ color: grayColor }}>True cinema goes beyond entertainment – it informs, inspires and uplifts society, leaving a lasting impact on people’s lives.</motion.p>
                    </div>
                </motion.div>
            </div>

            {/* The old card stack is replaced with the new cinematic video scrubber. */}
            <VideoScrubber />

            <div className="container mx-auto px-6 md:px-24 lg:px-44">
                <motion.div
                    className="text-center mt-20"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.8 }}
                >
                    <button onClick={() => navigate('/cinematics')}>
                        <Button size="lg" variant="secondary">Explore Our Slate</Button>
                    </button>
                </motion.div>
            </div>
        </section>
    );
};

export default FeaturedWorks;
