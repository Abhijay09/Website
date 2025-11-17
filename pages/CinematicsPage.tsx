import React, { useState } from 'react';
import { motion, Variants, AnimatePresence } from 'framer-motion';
import PageLayout from '../components/PageLayout';
import CinematicDetail from '../components/CinematicDetail';

const cinematicWorks = [
    { 
        title: 'Love Hackers', 
        category: 'Feature Film', 
        imageUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=800&auto-format&fit=crop',
        description: 'In a world where love can be coded, two hackers blur the lines between virtual and reality, risking it all for a connection that could change everything.'
    },
    { 
        title: 'Operation Walnut Cracker', 
        category: 'Spy Thriller', 
        imageUrl: 'https://images.unsplash.com/photo-1505686994434-e3cc5abf1330?q=80&w=800&auto-format&fit=crop',
        description: 'A retired spy is pulled back into the game for one last mission: to crack a seemingly unbreakable code and stop a global catastrophe.'
    },
    { 
        title: 'Mythological Epics', 
        category: 'Animation Series', 
        imageUrl: 'https://images.unsplash.com/photo-1608889476518-738c92f14154?q=80&w=800&auto-format&fit=crop',
        description: 'A visually stunning animated series that brings to life the ancient myths and legends that have shaped cultures around the world.'
    },
    { 
        title: 'The Sound of Silence', 
        category: 'Music Album', 
        imageUrl: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=800&auto-format&fit=crop',
        description: 'A groundbreaking music album that explores the power of silence and the nuances of sound in our increasingly noisy world.'
    },
    { 
        title: 'Five Minute Wonders', 
        category: 'Micro-Drama', 
        imageUrl: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963e?q=80&w=800&auto-format&fit=crop',
        description: 'A collection of poignant and powerful micro-dramas, each telling a complete story in just five minutes.'
    },
    { 
        title: 'Metropolis', 
        category: 'Stock Footage', 
        imageUrl: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=800&auto-format&fit=crop',
        description: 'High-quality stock footage capturing the vibrant energy and stunning architecture of the world\'s greatest cities.'
    },
];

// 1. Container Variants: Staggers the animation of each card
const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } },
};

// 2. Card Wrapper Variants: Handles the slide-up and opacity of the card container
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 100 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: 'spring', stiffness: 90, damping: 20, duration: 0.8 } 
  }
};

// 3. Image Variants: Creates a subtle zoom-out effect for the image
const imageVariants: Variants = {
    hidden: { scale: 1.15, opacity: 0 },
    visible: { 
        scale: 1, 
        opacity: 1,
        transition: { duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.1 } // A slow, smooth ease
    }
}

// 4. Text Container Variants: Delays and staggers the text animation
const textContainerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.4 } }
}

// 5. Individual Text Variants: Slides in the title and category
const textVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
}

const CinematicsPage: React.FC = () => {
    const [selectedWork, setSelectedWork] = useState<(typeof cinematicWorks)[0] | null>(null);

    return (
        <PageLayout>
            <section className="py-20 md:py-32">
                <div className="container mx-auto px-6 md:px-24 lg:px-44">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-brand-dark">Our Cinematic Slate</h1>
                        <p className="text-lg md:text-xl text-brand-gray max-w-2xl mt-4">A collection of our feature films, animated series, and other projects that inform, inspire, and uplift society.</p>
                    </motion.div>
                    
                    <motion.div 
                        className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {cinematicWorks.map((work) => (
                            <motion.div key={work.title} variants={cardVariants} className="group" style={{ perspective: 1000 }}>
                                <motion.div 
                                    className="relative overflow-hidden rounded-lg shadow-xl h-96 cursor-pointer"
                                    whileHover={{
                                        y: -15,
                                        boxShadow: '0px 25px 50px -12px rgba(0, 0, 0, 0.25)',
                                    }}
                                    transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                                    onClick={() => setSelectedWork(work)}
                                    layoutId={`card-container-${work.title}`}
                                >
                                    {/* Image with zoom-out effect */}
                                    <motion.img 
                                      src={work.imageUrl} 
                                      alt={work.title} 
                                      className="absolute inset-0 w-full h-full object-cover" 
                                      variants={imageVariants}
                                      layoutId={`card-image-${work.title}`}
                                    />
                                    {/* Gradient overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                                    
                                    {/* Text container for staggered reveal */}
                                    <motion.div 
                                        className="absolute bottom-0 left-0 p-6 text-white"
                                        variants={textContainerVariants}
                                    >
                                        <motion.h3 className="text-2xl font-bold tracking-tight" variants={textVariants} layoutId={`card-title-${work.title}`}>{work.title}</motion.h3>
                                        <motion.p className="text-zinc-300 uppercase text-sm tracking-wider" variants={textVariants} layoutId={`card-category-${work.title}`}>{work.category}</motion.p>
                                    </motion.div>
                                </motion.div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>
            <AnimatePresence>
                {selectedWork && (
                    <CinematicDetail work={selectedWork} onClose={() => setSelectedWork(null)} />
                )}
            </AnimatePresence>
        </PageLayout>
    );
};

export default CinematicsPage;