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

// Animation Variants
const textStagger: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } }
};

const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
        opacity: 1, 
        y: 0, 
        transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } // Smooth "Apple-like" ease
    }
};

const imageReveal: Variants = {
    hidden: { scale: 0.95, opacity: 0, y: 20 },
    visible: { 
        scale: 1, 
        opacity: 1, 
        y: 0,
        transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } 
    }
};

const HomeCinematics: React.FC = () => {
    const { textColor, grayColor } = useTheme();
    const navigate = useNavigate();

    return (
        <section className="py-24 md:py-32 relative z-10">
            <div className="container mx-auto px-6 md:px-24 lg:px-44">
                
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mb-24 text-center"
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
                        return (
                            <div 
                                key={film.id}
                                className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12 md:gap-20`}
                            >
                                {/* --- Image Side --- */}
                                <motion.div 
                                    className="w-full md:w-1/2 perspective-1000"
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true, amount: 0.3 }}
                                    variants={imageReveal}
                                >
                                    <motion.div 
                                        className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl cursor-pointer"
                                        onClick={() => navigate('/cinematics')}
                                        whileHover={{ scale: 1.02, transition: { duration: 0.4 } }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <div className="absolute inset-0 bg-black/10 hover:bg-transparent transition-colors duration-500 z-10" />
                                        <motion.img 
                                            src={film.imageUrl} 
                                            alt={film.title} 
                                            className="w-full h-full object-cover"
                                            // Slight zoom effect on hover
                                            whileHover={{ scale: 1.08 }}
                                            transition={{ duration: 1.5, ease: "easeOut" }}
                                        />
                                    </motion.div>
                                </motion.div>

                                {/* --- Text Side --- */}
                                <motion.div 
                                    className="w-full md:w-1/2 text-center md:text-left"
                                    variants={textStagger}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true, amount: 0.3 }}
                                >
                                    <motion.span 
                                        variants={fadeInUp}
                                        className="inline-block px-3 py-1 rounded-full border mb-4 text-xs font-bold uppercase tracking-widest"
                                        style={{ borderColor: grayColor, color: grayColor } as any}
                                    >
                                        {film.genre}
                                    </motion.span>
                                    
                                    <motion.h3 
                                        variants={fadeInUp}
                                        className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 leading-tight"
                                        style={{ color: textColor } as any}
                                    >
                                        {film.title}
                                    </motion.h3>
                                    
                                    <motion.p 
                                        variants={fadeInUp}
                                        className="text-lg leading-relaxed mb-8"
                                        style={{ color: grayColor } as any}
                                    >
                                        {film.description}
                                    </motion.p>
                                    
                                    <motion.div variants={fadeInUp}>
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
                                </motion.div>
                            </div>
                        );
                    })}
                </div>

                <motion.div 
                    className="mt-32 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, duration: 0.8 }}
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