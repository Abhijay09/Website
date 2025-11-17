import React from 'react';
import { motion } from 'framer-motion';
import { TeamMember } from '../types'; // We'll update this type definition

interface TeamMemberDetailProps {
  member: TeamMember;
  onClose: () => void;
}

const TeamMemberDetail: React.FC<TeamMemberDetailProps> = ({ member, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <motion.div
        layoutId={`card-container-${member.id}`}
        onClick={(e) => e.stopPropagation()}
        className="relative bg-brand-light rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col md:flex-row overflow-hidden"
      >
        {/* Left Column: Image and Basic Info */}
        <div className="w-full md:w-1/3 flex-shrink-0">
          <motion.img
            layoutId={`card-image-${member.id}`}
            src={member.imageUrl}
            alt={member.name}
            className="w-full h-64 md:h-full object-cover"
          />
        </div>

        {/* Right Column: Detailed Info */}
        <div className="w-full md:w-2/3 p-8 md:p-10 overflow-y-auto">
          <motion.h2
            layoutId={`card-name-${member.id}`}
            className="text-3xl md:text-4xl font-extrabold tracking-tight text-brand-dark"
          >
            {member.name}
          </motion.h2>
          <motion.p
             layoutId={`card-role-${member.id}`}
            className="text-lg text-brand-gray font-semibold mt-1"
          >
            {member.role}
          </motion.p>
          
          <div className="w-12 h-1 bg-brand-dark my-6 rounded-full"></div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <h3 className="text-xl font-bold text-brand-dark mb-3">About</h3>
            <p className="text-brand-gray whitespace-pre-wrap leading-relaxed">{member.bio}</p>

            {member.projects && member.projects.length > 0 && (
              <>
                <h3 className="text-xl font-bold text-brand-dark mt-6 mb-3">Notable Projects</h3>
                <ul className="list-disc list-inside text-brand-gray space-y-1">
                  {member.projects.map((project, index) => <li key={index}>{project}</li>)}
                </ul>
              </>
            )}

            {member.skills && member.skills.length > 0 && (
              <>
                <h3 className="text-xl font-bold text-brand-dark mt-6 mb-3">Skills & Tools</h3>
                <div className="flex flex-wrap gap-2">
                    {member.skills.map((skill, index) => (
                        <span key={index} className="bg-zinc-200 text-brand-dark text-sm font-semibold px-3 py-1 rounded-full">{skill}</span>
                    ))}
                </div>
              </>
            )}
          </motion.div>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-brand-dark bg-white/50 rounded-full p-2 hover:bg-white/80 transition-colors"
        >
          <svg xmlns="http://www.w.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </motion.div>
    </motion.div>
  );
};

export default TeamMemberDetail;