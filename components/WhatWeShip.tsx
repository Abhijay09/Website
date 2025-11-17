import React from 'react';
import { motion, Variants } from 'framer-motion';

// You can reuse your existing Service type
type Service = {
  id: number;
  title: string;
  description: string;
};

const services: Service[] = [
  { id: 1, title: 'Animatics & VFX', description: 'Planning to come with Animated feature films & TV Series based on Indian Mythology...' },
  { id: 2, title: 'Micro Drama', description: 'Delivering a complete dramatic arc in under 5 minutes, optimized for mobile screens...' },
  { id: 3, title: 'Music', description: 'Into Music acquisition, Creation, Marketing & Promotion in the world\'s second-largest market...' },
  { id: 4, title: 'Film School', description: 'A future-proof curriculum blending storytelling fundamentals with cutting-edge technology...' },
  { id: 5, title: 'Stock Shots Library', description: 'A comprehensive library of stock shots for various production needs.' },
];

// Animation variants for the container to orchestrate the staggered animation
const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1, // A slightly faster stagger for a more fluid feel
      delayChildren: 0.2,
    },
  },
};

// --- MODIFIED & INNOVATIVE ---
// New variants for a "3D Sweep" animation.
const cardVariants: Variants = {
  // The state before the card is visible
  hidden: {
    opacity: 0,
    scale: 0.8,
    y: 50,
    rotateX: -45, // Angled in 3D space
    rotateY: 25,  // Tilted to the side
    transformOrigin: 'top right', // Pivot from a corner for a sweeping motion
  },
  // The state when the card is visible
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    rotateX: 0,
    rotateY: 0,
    transition: {
      type: 'spring',
      stiffness: 120,
      damping: 20,
    },
  },
};

const WhatWeShip: React.FC = () => {
  return (
    <section id="divisions" className="text-white min-h-screen flex flex-col justify-center items-center py-20 md:py-32 overflow-hidden">
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
        
        {/* The 3D perspective container */}
        {/* --- MODIFIED FOR SYMMETRY --- Replaced 'grid' with 'flex' for a balanced layout */}
        <motion.div 
            className="flex flex-wrap justify-center gap-8"
            style={{ perspective: '1200px' }} // This creates the 3D space
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
        >
          {services.map((service, index) => (
            // --- MODIFIED --- Added explicit widths to work with the flex container
            <motion.div 
                key={service.id} 
                className="w-full lg:w-[31%] md:w-[48%] bg-zinc-800 p-8 rounded-2xl border border-zinc-700"
                variants={cardVariants}
                whileHover={{ 
                  y: -10,
                  z: 40,
                  scale: 1.05,
                  boxShadow: '0px 20px 40px rgba(0, 0, 0, 0.4)',
                  transition: { type: 'spring', stiffness: 300, damping: 20 }
                }}
            >
              <div className="text-2xl font-bold mb-4 text-zinc-400">0{index + 1}</div>
              <h3 className="text-2xl font-bold mb-3 text-white">{service.title}</h3>
              <p className="text-zinc-400">{service.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhatWeShip;