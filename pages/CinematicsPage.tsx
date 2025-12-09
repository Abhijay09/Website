import React from 'react';
import { motion, Variants } from 'framer-motion';
import PageLayout from '../components/PageLayout';

// --- DATA ---
const cinematicWorks = [
    { 
        id: 1,
        title: 'Love Hackers', 
        status: 'Releasing Soon',
        genre: 'Crime Thriller',
        imageUrl: '/cinematics/1.png',
        description: 'Inspired by true incidents, Love Hackers reveals how innocent girls are lured through social media into the Dark Web. Priya, a young ethical hacker, joins Police to uncover the truth and save her cousin—while exposing one of the most dangerous networks in India.',
        color: 'from-red-600/10 to-purple-600/10' // Subtle glow
    },
    { 
        id: 2,
        title: 'Operation Walnut Cracker', 
        status: 'Under Production',
        genre: 'Spy Thriller',
        imageUrl: '/cinematics/2.png',
        description: 'A complete mind game of Move… Ensnare and… Checkmate. Based on a true story, this film chronicles one of the finest operations led by R&AW and the Indian Army that led to a glorious victory against enemy forces in a high-stakes game of espionage.',
        color: 'from-blue-600/10 to-emerald-600/10' // Subtle glow
    },
];

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { type: 'spring', stiffness: 100, damping: 20 } 
  }
};

const CinematicsPage: React.FC = () => {
    return (
        <PageLayout>
            <section className="py-24 md:py-32 relative overflow-hidden">
                {/* Decorative Background Elements - Toned down for sleekness */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                    <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-purple-200 rounded-full mix-blend-multiply filter blur-[150px] opacity-30"></div>
                    <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-blue-100 rounded-full mix-blend-multiply filter blur-[150px] opacity-40"></div>
                </div>

                <div className="container mx-auto px-6 md:px-12 lg:px-24 relative z-10">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        transition={{ duration: 0.8 }}
                        className="mb-20 max-w-4xl"
                    >
                        <h1 className="text-6xl md:text-8xl font-extrabold tracking-tighter text-brand-dark mb-6">
                            The Slate
                        </h1>
                        {/* Reduced font size: text-lg md:text-xl */}
                        <p className="text-lg md:text-xl text-brand-gray max-w-2xl leading-relaxed">
                            Stories that challenge reality. Visuals that define a generation. 
                            <span className="block mt-2 text-brand-dark font-medium">Experience the new era of Miraclestar.</span>
                        </p>
                    </motion.div>
                    
                    {/* --- CARDS GRID --- */}
                    <motion.div 
                        className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {cinematicWorks.map((work) => (
                            <motion.div 
                                key={work.title} 
                                variants={cardVariants} 
                                className="group relative"
                            >
                                {/* Ambient Glow Behind Card - Tighter and cleaner */}
                                <div className={`absolute -inset-1 bg-gradient-to-br ${work.color} rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`} />

                                <motion.div 
                                    className="relative bg-zinc-950 rounded-xl overflow-hidden shadow-2xl border border-zinc-800/50 flex flex-col h-full"
                                    whileHover={{ y: -5 }}
                                    transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                                >
                                    {/* Image Area */}
                                    <div className="relative w-full aspect-video overflow-hidden bg-black border-b border-zinc-800/50">
                                        <div className="absolute inset-0 bg-zinc-900 animate-pulse" />
                                        <motion.img 
                                            src={work.imageUrl} 
                                            alt={work.title} 
                                            className="relative w-full h-full object-contain z-10 transition-transform duration-700 group-hover:scale-105" 
                                        />
                                        
                                        {/* Seamless fade to black at bottom of image */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent z-20 opacity-80" />
                                    </div>

                                    {/* Content Area */}
                                    <div className="p-8 flex-grow flex flex-col relative z-30">
                                        {/* Badges - Minimalist */}
                                        <div className="flex flex-wrap gap-2 mb-5">
                                            <span className="px-3 py-1 rounded-md border border-zinc-800 bg-zinc-900 text-[10px] font-bold tracking-widest text-zinc-400 uppercase">
                                                {work.genre}
                                            </span>
                                            <span className="px-3 py-1 rounded-md bg-white text-black text-[10px] font-bold tracking-widest uppercase">
                                                {work.status}
                                            </span>
                                        </div>

                                        <h3 className="text-3xl font-bold tracking-tight text-white mb-4 group-hover:text-zinc-200 transition-colors">
                                            {work.title}
                                        </h3>
                                        
                                        <p className="text-zinc-400 text-base leading-relaxed flex-grow">
                                            {work.description}
                                        </p>
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