import React, { useState, useEffect } from 'react';
import { motion, Variants } from 'framer-motion';
import PageLayout from '../components/PageLayout';

type Service = {
  id: number;
  title: string;
  description: string;
};

const services: Service[] = [
  { id: 1, title: 'Animatics & VFX', description: 'Planning to launch Animated feature films & TV Series based on Indian Mythology, beginning with our flagship project "Super Hero Hanuman". Our VFX division is poised to become a global leader, leveraging India\'s growing talent and technology.' },
  { id: 2, title: 'Micro Drama', description: 'Delivering a complete dramatic arc in under 5 minutes. Optimized for mobile screens and social media, we are in the process of producing a 2-minute Micro Drama series.' },
  { id: 3, title: 'Music', description: 'Launching Miraclestar Music to handle Music acquisition, Creation, Marketing & Promotion. We aim to capitalize on India being the second-largest music streaming market globally.' },
  { id: 4, title: 'Film School', description: 'A future-proof curriculum blending storytelling fundamentals with cutting-edge technology, new distribution platforms, and business skills to give students a 360-degree skillset.' },
  { id: 5, title: 'Stock Shots Library', description: 'A comprehensive library of high-quality stock shots for various production needs, supporting filmmakers and content creators.' },
  { id: 6, title: 'Feature Films', description: 'Creating compelling narratives and high-quality feature films for a global audience, with projects like "Love Hackers" and "Operation Walnut Cracker".'}
];

// Stagger animation for the grid container
const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

// Card component with conditional logic for Mobile vs Laptop
const DivisionCard: React.FC<{ service: Service; index: number }> = ({ service, index }) => {
    const [isFlipped, setIsFlipped] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // 1. Check if the device is mobile (width < 768px)
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        
        // Check initially
        handleResize();

        // Add listener
        window.addEventListener('resize', handleResize);
        
        // Cleanup
        return () => window.removeEventListener('resize', handleResize);
    }, []);

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
            className="w-full h-72 cursor-pointer"
            style={{ perspective: '1200px' }}
            // 2. Conditional Events:
            // If NOT mobile -> Hover triggers flip
            onHoverStart={() => !isMobile && setIsFlipped(true)}
            onHoverEnd={() => !isMobile && setIsFlipped(false)}
            // If IS mobile -> Click triggers flip toggle
            onClick={() => isMobile && setIsFlipped(!isFlipped)}
        >
            <motion.div
                className="relative w-full h-full"
                style={{ transformStyle: 'preserve-3d' }}
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
                    
                    {/* Small hint only visible on mobile to indicate tapability */}
                    <p className="mt-4 text-xs text-zinc-500 uppercase tracking-widest md:hidden block">
                        Tap to view
                    </p>
                </div>

                {/* --- BACK FACE (INFO CARD) --- */}
                <div
                    className="absolute w-full h-full p-8 flex flex-col justify-between bg-white rounded-2xl border border-zinc-200 shadow-lg"
                    style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                >
                    <div className="overflow-y-auto">
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
            // Layout preserved exactly as requested
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