import React from 'react';
import { motion, Variants } from 'framer-motion';
import PageLayout from '../components/PageLayout';

const cinematicWorks = [
    { title: 'Love Hackers', category: 'Feature Film', imageUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=800&auto=format&fit=crop' },
    { title: 'Operation Walnut Cracker', category: 'Spy Thriller', imageUrl: 'https://images.unsplash.com/photo-1505686994434-e3cc5abf1330?q=80&w=800&auto=format&fit=crop' },
    { title: 'Mythological Epics', category: 'Animation Series', imageUrl: 'https://images.unsplash.com/photo-1608889476518-738c92f14154?q=80&w=800&auto=format&fit=crop' },
    { title: 'The Sound of Silence', category: 'Music Album', imageUrl: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=800&auto=format&fit=crop' },
    { title: 'Five Minute Wonders', category: 'Micro-Drama', imageUrl: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963e?q=80&w=800&auto=format&fit=crop' },
    { title: 'Metropolis', category: 'Stock Footage', imageUrl: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=800&auto=format&fit=crop' },
];

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } }
};

const CinematicsPage: React.FC = () => {
    return (
        <PageLayout>
            <section className="py-20 md:py-32">
                <div className="container mx-auto px-6 md:px-24 lg:px-44">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-brand-dark">Our Cinematic Slate</h1>
                        <p className="text-lg md:text-xl text-brand-gray max-w-2xl mt-4">A collection of our feature films, animated series, and other projects that inform, inspire, and uplift society.</p>
                    </motion.div>
                    
                    <motion.div 
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {cinematicWorks.map((work, index) => (
                            <motion.div key={index} variants={cardVariants} className="group" style={{ perspective: 1000 }}>
                                <motion.div 
                                    className="relative overflow-hidden rounded-lg shadow-xl h-96"
                                    whileHover={{
                                        y: -15,
                                        rotateX: 10,
                                        rotateY: -5,
                                        boxShadow: '0px 25px 50px -12px rgba(0, 0, 0, 0.25)',
                                    }}
                                    transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                                >
                                    <img src={work.imageUrl} alt={work.title} className="absolute inset-0 w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                                    <div className="absolute bottom-0 left-0 p-6 text-white">
                                        <h3 className="text-2xl font-bold tracking-tight">{work.title}</h3>
                                        <p className="text-zinc-300 uppercase text-sm tracking-wider">{work.category}</p>
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