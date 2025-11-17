import React from 'react';
import { motion } from 'framer-motion';

interface CinematicDetailProps {
    work: {
        title: string;
        category: string;
        imageUrl: string;
        description: string;
    };
    onClose: () => void;
}

const CinematicDetail: React.FC<CinematicDetailProps> = ({ work, onClose }) => {
    return (
        <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <motion.div
                className="fixed inset-0 bg-black/50 backdrop-blur-md"
                onClick={onClose}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            ></motion.div>
            <motion.div 
                className="relative bg-white w-11/12 md:w-2/3 lg:w-1/2 max-w-4xl max-h-[90vh] rounded-lg shadow-2xl overflow-hidden"
                layoutId={`card-container-${work.title}`}
            >
                <div className="relative h-96">
                    <motion.img 
                        src={work.imageUrl} 
                        alt={work.title} 
                        className="w-full h-full object-cover"
                        layoutId={`card-image-${work.title}`}
                    />
                </div>
                <div className="p-8 overflow-y-auto">
                    <motion.h3 className="text-4xl font-extrabold tracking-tight text-brand-dark" layoutId={`card-title-${work.title}`}>{work.title}</motion.h3>
                    <motion.p className="text-zinc-500 uppercase text-sm tracking-wider mt-2" layoutId={`card-category-${work.title}`}>{work.category}</motion.p>
                    <motion.p 
                      className="text-brand-gray mt-6 text-lg"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1, transition: { delay: 0.3 } }}
                      exit={{ opacity: 0 }}
                    >
                        {work.description}
                    </motion.p>
                </div>
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-white bg-black/50 rounded-full p-2 hover:bg-black/75 transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </motion.div>
        </motion.div>
    );
};

export default CinematicDetail;