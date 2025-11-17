import React from 'react';
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
];

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9, y: 30 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 120, damping: 20 } },
};

const DivisionsPage: React.FC = () => {
  return (
    <PageLayout>
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-brand-dark">Our Divisions</h2>
            <p className="text-lg md:text-xl text-brand-gray max-w-2xl mx-auto mt-4">A 360-degree approach to entertainment, from concept to screen.</p>
          </motion.div>
          
          <motion.div 
            className="flex flex-wrap justify-center gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {services.map((service, index) => (
              <motion.div 
                key={service.id} 
                className="w-full lg:w-[31%] md:w-[48%] bg-white p-8 rounded-2xl border border-zinc-200 shadow-md text-left"
                variants={cardVariants}
                whileHover={{ 
                  y: -10,
                  boxShadow: '0px 20px 40px rgba(0, 0, 0, 0.1)',
                  transition: { type: 'spring', stiffness: 300, damping: 20 }
                }}
              >
                <div className="text-2xl font-bold mb-4 text-brand-gray">0{index + 1}</div>
                <h3 className="text-2xl font-bold mb-3 text-brand-dark">{service.title}</h3>
                <p className="text-brand-gray">{service.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
};

export default DivisionsPage;