import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../App';

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
  const { textColor, grayColor } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white dark:bg-zinc-900 rounded-xl shadow-2xl max-w-2xl w-full overflow-hidden"
      >
        <motion.img
          layoutId={`card-image-${work.title}`}
          src={work.imageUrl}
          alt={work.title}
          className="w-full h-96 object-cover"
        />
        
        <div className="p-8">
          <motion.h2
            layoutId={`card-title-${work.title}`}
            className="text-3xl md:text-4xl font-extrabold tracking-tight"
            style={{ color: textColor }}
          >
            {work.title}
          </motion.h2>
          
          <motion.p
            layoutId={`card-category-${work.title}`}
            className="text-sm uppercase tracking-wider font-semibold mt-2"
            style={{ color: grayColor }}
          >
            {work.category}
          </motion.p>
          
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-lg leading-relaxed"
            style={{ color: grayColor }}
          >
            {work.description}
          </motion.p>
          
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            onClick={onClose}
            className="mt-8 px-6 py-3 bg-black text-white rounded-lg font-semibold hover:bg-zinc-800 transition-colors"
          >
            Close
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CinematicDetail;
