import React, { useState } from 'react';
import { motion, Variants, AnimatePresence } from 'framer-motion';

type Service = {
  id: number;
  title: string;
  description: string;
  fullDescription?: string; 
};

const services: Service[] = [
  { 
    id: 1, 
    title: 'Animatics & VFX', 
    description: 'Coming soon with Animated feature films & TV Series based on Indian Mythology.',
    fullDescription: 'Coming soon with Animated feature films & TV Series based on Indian Mythology, beginning with our flagship project "Super Hero Hanuman". Our VFX division is poised to become a global leader, leveraging India\'s growing talent and technology.'
  },
  { 
    id: 2, 
    title: 'Micro Drama', 
    description: 'Delivering a complete dramatic arc in under 5 minutes, optimized for mobile screens.',
    fullDescription: 'Delivering a complete dramatic arc in under 5 minutes, optimized for mobile screens and social media. We are in the process of producing a 2-minute Micro Drama series that captures attention in the fast-paced digital world.'
  },
  { 
    id: 3, 
    title: 'Music', 
    description: 'Into Music acquisition, Creation, Marketing & Promotion in the world\'s second-largest market.',
    fullDescription: 'Launching Miraclestar Music to handle Music acquisition, Creation, Marketing & Promotion. We aim to capitalize on India being the second-largest music streaming market globally, creating chart-topping hits and discovering new artists.'
  },
  { 
    id: 4, 
    title: 'Film School', 
    description: 'A future-proof curriculum blending storytelling fundamentals with cutting-edge technology.',
    fullDescription: 'A future-proof curriculum blending storytelling fundamentals with cutting-edge technology, new distribution platforms, and business skills. We aim to give students a 360-degree skillset to survive and thrive in the modern entertainment landscape.'
  },
  { 
    id: 5, 
    title: 'Stock Shots Library', 
    description: 'A comprehensive library of stock shots for various production needs.',
    fullDescription: 'A comprehensive library of high-quality stock shots for various production needs. From aerial cinematography to specific cultural nuances, we support filmmakers and content creators with premium assets.'
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    y: 50,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 120,
      damping: 20,
    },
  },
};

const WhatWeShip: React.FC = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  return (
    <section id="divisions" className="text-white min-h-screen flex flex-col justify-center items-center py-20 md:py-32 relative z-10">
      <div className="container mx-auto px-6 md:px-12 text-center">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.8 }}
            className="mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tighter">Our Divisions</h2>
          <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mt-4">A 360-degree approach to entertainment, from concept to screen.</p>
        </motion.div>
        
        {/* GRID VIEW */}
        <motion.div 
            className="flex flex-wrap justify-center gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
        >
          {services.map((service, index) => (
            <motion.div 
                layoutId={`card-container-${service.id}`}
                key={service.id} 
                onClick={() => setSelectedId(service.id)}
                className="w-full lg:w-[31%] md:w-[48%] bg-zinc-800 rounded-2xl border border-zinc-700 cursor-pointer overflow-hidden group"
                variants={cardVariants}
                whileHover={{ 
                  y: -10,
                  transition: { type: 'spring', stiffness: 300, damping: 20 }
                }}
            >
              <div className="p-8 h-full flex flex-col items-start text-left">
                {/* Consistent Layout IDs for smooth transition */}
                <motion.div layoutId={`card-number-${service.id}`} className="text-2xl font-bold mb-4 text-zinc-500">
                    0{index + 1}
                </motion.div>
                <motion.h3 layoutId={`card-title-${service.id}`} className="text-2xl font-bold mb-3 text-white">
                    {service.title}
                </motion.h3>
                <motion.div layoutId={`card-desc-${service.id}`} className="text-zinc-400 text-sm md:text-base line-clamp-3">
                    {service.description}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* EXPANDED POP-UP VIEW */}
      <AnimatePresence>
        {selectedId && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
             {/* Backdrop - Click here to close */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedId(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-default"
            />
            
            {/* Expanded Card */}
            {services.filter(s => s.id === selectedId).map((service) => {
              // FIX: Find the original index from the main 'services' array
              const originalIndex = services.findIndex(s => s.id === service.id);
              
              return (
                <motion.div
                  layoutId={`card-container-${service.id}`}
                  key={service.id}
                  className="w-full max-w-lg bg-zinc-800 rounded-3xl border border-zinc-600 shadow-2xl overflow-hidden relative z-10"
                  // Prevent click propagation so clicking the card doesn't close it
                  onClick={(e) => e.stopPropagation()} 
                >
                  <div className="p-10 text-left">
                      {/* Use originalIndex to keep numbering correct */}
                      <motion.div layoutId={`card-number-${service.id}`} className="text-3xl font-bold mb-6 text-zinc-500">
                          0{originalIndex + 1}
                      </motion.div>
                      
                      <motion.h3 layoutId={`card-title-${service.id}`} className="text-3xl md:text-4xl font-extrabold mb-6 text-white tracking-tight">
                          {service.title}
                      </motion.h3>
                      
                      <motion.div layoutId={`card-desc-${service.id}`} className="text-zinc-300 text-lg leading-relaxed">
                          {/* Using Full Description here */}
                          {service.fullDescription || service.description}
                      </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default WhatWeShip;