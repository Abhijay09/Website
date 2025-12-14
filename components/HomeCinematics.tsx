import React from 'react';
import { motion, Variants } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../App';
import Button from './ui/Button';

const films = [
    { 
        id: 1,
        title: 'Love Hackers', 
        genre: 'Crime Thriller',
        imageUrl: '/cinematics/1.png',
        description: 'Inspired by true incidents, Love Hackers reveals how innocent girls are lured through social media into the Dark Web. A young ethical hacker joins the Police to expose one of the most dangerous networks in India.'
    },
    { 
        id: 2,
        title: 'Operation Walnut Cracker', 
        genre: 'Spy Thriller',
        imageUrl: '/cinematics/2.png',
        description: 'Based on a true story, this film chronicles a high-stakes operation led by R&AW and the Indian Army. A complete mind game of Move… Ensnare… and Checkmate against enemy forces.'
    },
];

// --- Optimized Animation Variants ---
// Reduced distance (x: 50) and added a slight delay to let the browser catch up
const slideInLeft: Variants = {
    hidden: { x: -60, opacity: 0 },
    visible: { 
        x: 0, 
        opacity: 1, 
        transition: { 
            duration: 0.8, 
            ease: [0.25, 0.46, 0.45, 0.94] // Smoother cubic-bezier
        } 
    }
};

const slideInRight: Variants = {
    hidden: { x: 60, opacity: 0 },
    visible: { 
        x: 0, 
        opacity: 1, 
        transition: { 
            duration: 0.8, 
            ease: [0.25, 0.46, 0.45, 0.94] 
        } 
    }
};

const HomeCinematics: React.FC = () => {
    const { textColor, grayColor } = useTheme();
    const navigate = useNavigate();

    return (
        <section className="py-24 md:py-32 relative z-10 overflow-hidden">
            <div className="container mx-auto px-6 md:px-24 lg:px-44">
                
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.8 }}
                    className="mb-24 text-center"
                    style={{ willChange: 'opacity, transform' }} // Performance hint
                >
                    <h2 
                        className="text-4xl md:text-6xl font-extrabold tracking-tighter mb-4"
                        style={{ color: textColor } as any}
                    >
                        Feature Films
                    </h2>
                    <p className="text-lg md:text-xl max-w-2xl mx-auto" style={{ color: grayColor } as any}>
                        Stories that challenge reality and define a generation.
                    </p>
                </motion.div>

                <div className="flex flex-col gap-32">
                    {films.map((film, index) => {
                        const isEven = index % 2 === 0;
                        const leftSideVariant = slideInLeft;
                        const rightSideVariant = slideInRight;

                        return (
                            <div 
                                key={film.id}
                                className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12 md:gap-20`}
                            >
                                {/* --- Image Block --- */}
                                <motion.div 
                                    className="w-full md:w-1/2 transform-gpu" // Force GPU acceleration
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: false, amount: 0.25 }}
                                    variants={isEven ? leftSideVariant : rightSideVariant}
                                    style={{ willChange: 'opacity, transform' }}
                                >
                                    <motion.div 
                                        className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl cursor-pointer"
                                        onClick={() => navigate('/cinematics')}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <div className="absolute inset-0 bg-black/10 hover:bg-transparent transition-colors duration-500 z-10" />
                                        <img 
                                            src={film.imageUrl} 
                                            alt={film.title} 
                                            className="w-full h-full object-cover"
                                            loading="eager" // Load these immediately
                                        />
                                    </motion.div>
                                </motion.div>

                                {/* --- Text Block --- */}
                                <motion.div 
                                    className="w-full md:w-1/2 text-center md:text-left transform-gpu" // Force GPU acceleration
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: false, amount: 0.25 }}
                                    variants={isEven ? rightSideVariant : leftSideVariant}
                                    style={{ willChange: 'opacity, transform' }}
                                >
                                    <span 
                                        className="inline-block px-3 py-1 rounded-full border mb-4 text-xs font-bold uppercase tracking-widest"
                                        style={{ borderColor: grayColor, color: grayColor } as any}
                                    >
                                        {film.genre}
                                    </span>
                                    
                                    <h3 
                                        className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 leading-tight"
                                        style={{ color: textColor } as any}
                                    >
                                        {film.title}
                                    </h3>
                                    
                                    <p 
                                        className="text-lg leading-relaxed mb-8"
                                        style={{ color: grayColor } as any}
                                    >
                                        {film.description}
                                    </p>
                                    
                                    <button onClick={() => navigate('/cinematics')} className="group flex items-center gap-2 mx-auto md:mx-0">
                                        <span 
                                            className="text-lg font-bold underline decoration-2 underline-offset-8 transition-all group-hover:underline-offset-4" 
                                            style={{ color: textColor } as any}
                                        >
                                            View Project
                                        </span>
                                        <svg 
                                            xmlns="http://www.w3.org/2000/svg" 
                                            fill="none" 
                                            viewBox="0 0 24 24" 
                                            strokeWidth={2.5} 
                                            stroke="currentColor" 
                                            className="w-5 h-5 transition-transform group-hover:translate-x-1"
                                            style={{ color: textColor } as any}
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                        </svg>
                                    </button>
                                </motion.div>
                            </div>
                        );
                    })}
                </div>

                <motion.div 
                    className="mt-32 text-center transform-gpu"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.8 }}
                    style={{ willChange: 'opacity, transform' }}
                >
                    <button onClick={() => navigate('/cinematics')}>
                        <Button size="lg" variant="secondary">See Our Full Slate</Button>
                    </button>
                </motion.div>

            </div>
        </section>
    );
};

export default HomeCinematics;