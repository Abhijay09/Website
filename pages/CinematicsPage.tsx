import React from 'react';
import { motion, Variants } from 'framer-motion';
import PageLayout from '../components/PageLayout';

// --- UPDATED CINEMATIC DATA ---
const cinematicWorks = [
    { 
        title: 'Love Hackers', 
        category: 'Feature Film (Releasing Soon)', 
        // Updated to local path (public/cinematics/1.png)
        imageUrl: '/cinematics/1.png',
        description: 'Inspired by true incidents, Love Hackers reveals how innocent girls are lured through social media into the Dark Web. Priya, a young ethical hacker, joins Police to uncover the truth and save her cousin—while exposing one of the most dangerous networks in India.'
    },
    { 
        title: 'Operation Walnut Cracker', 
        category: 'Spy Thriller (Under Production)', 
        // Updated to local path (Assuming 2.png exists, otherwise change filename here)
        imageUrl: '/cinematics/2.png',
        description: 'A Spy thriller Hindi Feature Film, based on espionage and counter-espionage. A complete mind game of Move… Ensnare and… Checkmate, based on true story. It was one of the finest operations led by R&AW and Indian Army that led to the glorious victory against the enemies.'
    },
];

// Animation for the main grid container to orchestrate the stagger effect
const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

// A "scale and fade" entrance animation for each card
const cardVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } 
  }
};

const CinematicsPage: React.FC = () => {
    return (
        <PageLayout>
            <section className="py-24 md:py-32">
                <div className="container mx-auto px-6 md:px-12 lg:px-24">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        transition={{ duration: 0.8 }}
                        className="mb-16 max-w-4xl"
                    >
                        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-brand-dark">Our Cinematic Slate</h1>
                        <p className="text-lg md:text-xl text-brand-gray mt-4">
                            True cinema goes beyond entertainment – it informs, inspires and uplifts society, leaving a lasting impact on people’s lives.
                        </p>
                    </motion.div>
                    
                    {/* --- 2-COLUMN LAYOUT --- */}
                    <motion.div 
                        className="grid grid-cols-1 md:grid-cols-2 gap-8"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {cinematicWorks.map((work) => (
                            <motion.div 
                                key={work.title} 
                                variants={cardVariants} 
                                className="group"
                                style={{ perspective: 1000 }}
                            >
                                <motion.div 
                                    className="relative overflow-hidden rounded-lg shadow-2xl h-[32rem] w-full"
                                    whileHover={{
                                        y: -10,
                                        boxShadow: '0px 25px 50px -12px rgba(0, 0, 0, 0.25)',
                                    }}
                                    transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                                >
                                    {/* 
                                      Note: React serves files from the 'public' folder at the root path.
                                      So 'public/cinematics/1.png' becomes '/cinematics/1.png' 
                                    */}
                                    <img src={work.imageUrl} alt={work.title} className="absolute inset-0 w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                                    <div className="absolute bottom-0 left-0 p-8 text-white">
                                        <h3 className="text-3xl font-bold tracking-tight">{work.title}</h3>
                                        <p className="text-zinc-300 uppercase text-sm tracking-wider mt-1">{work.category}</p>
                                        <p className="mt-4 text-base text-zinc-100 max-w-prose">{work.description}</p>
                                    </div>
                                </motion.div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>
        </PageLayout>
    );
};

export default CinematicsPage;