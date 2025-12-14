import React from 'react';
import { motion } from 'framer-motion';
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

const HomeCinematics: React.FC = () => {
    const { textColor, grayColor } = useTheme();
    const navigate = useNavigate();

    return (
        <section className="py-24 md:py-32 relative z-10">
            <div className="container mx-auto px-6 md:px-24 lg:px-44">
                
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-20 text-center"
                >
                    <motion.h2 
                        className="text-4xl md:text-6xl font-extrabold tracking-tighter mb-4"
                        style={{ color: textColor }}
                    >
                        Feature Films
                    </motion.h2>
                </motion.div>

                <div className="flex flex-col gap-24 md:gap-32">
                    {films.map((film, index) => {
                        const isEven = index % 2 === 0;
                        return (
                            <motion.div 
                                key={film.id}
                                className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12 md:gap-20`}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{ duration: 0.8 }}
                            >
                                {/* Image Side */}
                                <div className="w-full md:w-1/2">
                                    <div className="relative aspect-video rounded-xl overflow-hidden shadow-2xl group cursor-pointer" onClick={() => navigate('/cinematics')}>
                                        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                                        <img 
                                            src={film.imageUrl} 
                                            alt={film.title} 
                                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                                        />
                                    </div>
                                </div>

                                {/* Text Side */}
                                <div className="w-full md:w-1/2 text-center md:text-left">
                                    <motion.span 
                                        className="uppercase tracking-widest text-xs font-bold mb-3 block"
                                        style={{ color: grayColor }}
                                    >
                                        {film.genre}
                                    </motion.span>
                                    <motion.h3 
                                        className="text-3xl md:text-5xl font-bold tracking-tight mb-6"
                                        style={{ color: textColor }}
                                    >
                                        {film.title}
                                    </motion.h3>
                                    <motion.p 
                                        className="text-lg leading-relaxed mb-8"
                                        style={{ color: grayColor }}
                                    >
                                        {film.description}
                                    </motion.p>
                                    <button onClick={() => navigate('/cinematics')}>
                                        <span className="text-lg font-semibold underline decoration-2 underline-offset-4 hover:opacity-70 transition-opacity" style={{ color: textColor }}>
                                            View Project
                                        </span>
                                    </button>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                <motion.div 
                    className="mt-24 text-center"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
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