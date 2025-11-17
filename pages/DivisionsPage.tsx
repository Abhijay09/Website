import React, { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import PageLayout from '../components/PageLayout';

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
  { id: 6, title: 'Feature Films', description: 'Creating compelling narratives and high-quality feature films for a global audience.'}
];

// Stagger animation for the grid container
const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

// Card component with the corrected, state-driven 3D flip logic
const DivisionCard: React.FC<{ service: Service; index: number }> = ({ service, index }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    const isLeft = index % 2 === 0;

    const cardVariants: Variants = {
        hidden: { opacity: 0, x: isLeft ? -100 : 100 },
        visible: { 
            opacity: 1, 
            x: 0, 
            transition: { type: 'spring', stiffness: 80, damping: 20 } 
        },
    };

    const flipVariants: Variants = {
        initial: { rotateY: 0 },
        flipped: { rotateY: 180 },
    }

    return (
        <motion.div
            variants={cardVariants}
            className="w-full h-72 cursor-pointer" // Added cursor-pointer
            style={{ perspective: '1200px' }}
            // Use event handlers on the non-moving parent to control state
            onHoverStart={() => setIsFlipped(true)}
            onHoverEnd={() => setIsFlipped(false)}
        >
            <motion.div
                className="relative w-full h-full"
                style={{ transformStyle: 'preserve-3d' }}
                // Animate based on the isFlipped state, not direct hover
                variants={flipVariants}
                animate={isFlipped ? "flipped" : "initial"}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
            >
                {/* --- FRONT FACE (DARK CARD) --- */}
                <div
                    className="absolute w-full h-full p-8 flex flex-col items-center justify-center bg-brand-dark rounded-2xl border border-zinc-700 shadow-lg"
                    style={{ backfaceVisibility: 'hidden' }}
                >
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 0L25.8779 14.1221L40 20L25.8779 25.8779L20 40L14.1221 25.8779L0 20L14.1221 14.1221L20 0Z" fill="#F0EEE9"/>
                    </svg>
                    <p className="text-brand-light mt-4 text-xl font-bold tracking-tight">{service.title}</p>
                </div>

                {/* --- BACK FACE (INFO CARD) --- */}
                <div
                    className="absolute w-full h-full p-8 flex flex-col justify-between bg-white rounded-2xl border border-zinc-200 shadow-lg"
                    style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                >
                    <div>
                        <h3 className="text-2xl font-bold mb-3 text-brand-dark">{service.title}</h3>
                        <p className="text-brand-gray">{service.description}</p>
                    </div>
                    <div className="text-4xl font-extrabold text-zinc-200 self-end">0{index + 1}</div>
                </div>
            </motion.div>
        </motion.div>
    );
};


const DivisionsPage: React.FC = () => {
  return (
    <PageLayout>
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-20"
          >
            <h2 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-brand-dark">Our Divisions</h2>
            <p className="text-lg md:text-xl text-brand-gray max-w-2xl mx-auto mt-4">A 360-degree approach to entertainment, from concept to screen.</p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {services.map((service, index) => (
              <DivisionCard key={service.id} service={service} index={index} />
            ))}
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
};

export default DivisionsPage;