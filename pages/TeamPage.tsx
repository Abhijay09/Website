import React from 'react';
import { motion, Variants } from 'framer-motion';
import PageLayout from '../components/PageLayout';

const teamMembers = [
  { id: 1, name: 'John Doe', role: 'Director', imageUrl: `https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=400&auto=format&fit=crop` },
  { id: 2, name: 'Jane Smith', role: 'Producer', imageUrl: `https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop` },
  { id: 3, name: 'Mike Johnson', role: 'Lead Animator', imageUrl: `https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=400&auto=format&fit=crop` },
  { id: 4, name: 'Emily Davis', role: 'VFX Supervisor', imageUrl: `https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop` },
  { id: 5, name: 'Chris Lee', role: 'Sound Designer', imageUrl: `https://images.unsplash.com/photo-1581382575275-97901c2635b7?q=80&w=400&auto=format&fit=crop` },
  { id: 6, name: 'Sarah Brown', role: 'Screenwriter', imageUrl: `https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop` },
  { id: 7, name: 'David Wilson', role: 'Cinematographer', imageUrl: `https://images.unsplash.com/photo-1583192134026-193c0d76b5b6?q=80&w=400&auto=format&fit=crop` },
  { id: 8, name: 'Laura Taylor', role: 'Editor', imageUrl: `https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=400&auto=format&fit=crop` },
];

const containerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } },
};

const memberVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 150, damping: 20 } },
};

const TeamPage: React.FC = () => {
    return (
        <PageLayout>
            <section className="py-20 md:py-32">
                <div className="container mx-auto px-6 md:px-24 lg:px-44">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-16"
                    >
                        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-brand-dark">
                            Our Creative Team
                        </h1>
                        <p className="text-lg md:text-xl max-w-3xl mx-auto mt-4 text-brand-gray">
                            A harmonious blend of rich experience and young technocrats, dedicated to quality and innovation.
                        </p>
                    </motion.div>
                    
                    <motion.div 
                        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {teamMembers.map(member => (
                            <motion.div key={member.id} variants={memberVariants}>
                                <motion.div 
                                    className="relative group overflow-hidden rounded-lg shadow-lg"
                                    whileHover={{ y: -8, transition: { type: 'spring', stiffness: 300 } }}
                                >
                                    <img src={member.imageUrl} alt={member.name} className="w-full h-80 object-cover" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4">
                                        <h3 className="text-white text-xl font-bold">{member.name}</h3>
                                        <p className="text-zinc-300">{member.role}</p>
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

export default TeamPage;