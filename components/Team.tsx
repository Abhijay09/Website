import React, { useState, useEffect } from 'react';
import { motion, Variants, useTime, useTransform } from 'framer-motion';
import { useTheme } from '../App';

// --- Team Members ---
const teamMembers = [
  { id: 1, imageUrl: `https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=400&auto=format&fit=crop`, config: { angle: 0 } },
  { id: 2, imageUrl: `https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop`, config: { angle: 36 } },
  { id: 3, imageUrl: `https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=400&auto=format&fit=crop`, config: { angle: 72 } },
  { id: 4, imageUrl: `https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop`, config: { angle: 108 } },
  { id: 5, imageUrl: `https://images.unsplash.com/photo-1581382575275-97901c2635b7?q=80&w=400&auto=format&fit=crop`, config: { angle: 144 } },
  { id: 6, imageUrl: `https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop`, config: { angle: 180 } },
  { id: 7, imageUrl: `https://images.unsplash.com/photo-1583192134026-193c0d76b5b6?q=80&w=400&auto=format&fit=crop`, config: { angle: 216 } },
  { id: 8, imageUrl: `https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=400&auto=format&fit=crop`, config: { angle: 252 } },
  { id: 9, imageUrl: `https://images.unsplash.com/photo-1544723795-3fb6469f5b39?q=80&w=400&auto=format&fit=crop`, config: { angle: 288 } },
  { id: 10, imageUrl: `https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=400&auto=format&fit=crop`, config: { angle: 324 } },
];

// --- Animations ---
const textSlideUp: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.7, ease: 'easeOut' } },
};
const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.7, ease: 'easeOut' } },
};

// --- Card Component ---
type TeamMember = typeof teamMembers[0];

interface TeamMemberCardProps {
  member: TeamMember;
  orbitSize: number;
  cardSize: number;
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ member, orbitSize, cardSize }) => {
  const angleRad = (member.config.angle * Math.PI) / 180;
  const x = orbitSize * Math.sin(angleRad);
  const z = orbitSize * Math.cos(angleRad);

  return (
    <motion.div
      className="absolute top-1/2 left-1/2"
      style={{
        width: cardSize,
        height: cardSize * 1.2,
        transformStyle: 'preserve-3d',
        transform: `
          translateX(${x}px)
          translateY(${z * 0.1}px)
          translateZ(${z}px)
          translate(-50%, -50%)
          rotateY(${member.config.angle}deg)
          rotateX(-10deg)
        `,
      }}
    >
      <div
        className="relative w-full h-full rounded-2xl shadow-xl overflow-hidden"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front Face */}
        <div className="absolute w-full h-full" style={{ backfaceVisibility: 'hidden' }}>
          <img
            src={member.imageUrl}
            alt={`Team member ${member.id}`}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Back Face */}
        <div
          className="absolute w-full h-full bg-zinc-200"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        ></div>
      </div>
    </motion.div>
  );
};

// --- Main Team Component ---
const Team: React.FC = () => {
  const { textColor, grayColor, brandGray } = useTheme();
  const [isClient, setIsClient] = useState(false);
  const [orbitSize, setOrbitSize] = useState(300);
  const [cardSize, setCardSize] = useState(120);

  useEffect(() => {
    setIsClient(true);
    const checkScreenSize = () => {
      const width = window.innerWidth;
      const newOrbitSize = Math.max(180, Math.min(width * 0.28, 450));
      setOrbitSize(newOrbitSize);
      const newCardSize = newOrbitSize * 0.4;
      setCardSize(newCardSize);
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const time = useTime();
  const rotation = useTransform(time, [0, 30000], [0, -360], { clamp: false });

  return (
    <section
      id="team"
      className="py-12 md:py-20 px-4 md:px-16 lg:px-24 overflow-hidden relative"
    >
      {/* Decorative Side Elements */}
      <div
        className="absolute top-1/4 left-0 -translate-x-1/2 w-64 h-64 rounded-full opacity-10 blur-2xl pointer-events-none"
        style={{ backgroundColor: brandGray }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-1/4 right-0 translate-x-1/2 w-72 h-72 rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ backgroundColor: brandGray }}
        aria-hidden="true"
      />

      <div className="container mx-auto flex flex-col items-center justify-center min-h-[50vh] md:min-h-[70vh] relative">
        {/* Headline */}
        <div className="w-full relative text-center z-10">
          <motion.h2
            variants={textSlideUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter"
            style={{ color: textColor }}
          >
            Our Creative Team
          </motion.h2>
        </div>

        {/* --- ORBIT AREA --- */}
        <div className="relative z-0 flex items-center justify-center mt-8 md:mt-4">
          <div
            className="relative flex items-center justify-center"
            style={{
              width: orbitSize * 2.5,
              height: orbitSize * 2.5,
              perspective: '1200px',
              perspectiveOrigin: 'center center',
              overflow: 'hidden',
            }}
          >
            {isClient && (
              <motion.div
                className="relative w-full h-full"
                style={{
                  transformStyle: 'preserve-3d',
                  rotateY: rotation,
                  rotateX: 15,
                  translateY: 40,
                  transformOrigin: 'center center',
                }}
              >
                {teamMembers.map((member) => (
                  <TeamMemberCard key={member.id} member={member} orbitSize={orbitSize} cardSize={cardSize} />
                ))}
              </motion.div>
            )}
          </div>
        </div>
        {/* --- END ORBIT AREA --- */}

        {/* Bottom Text */}
        <motion.div
          className="w-full relative text-center z-10 mt-auto pt-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.5 }}
        >
          <motion.p
            variants={fadeIn}
            className="text-center text-lg md:text-xl max-w-3xl mx-auto"
            style={{ color: grayColor }}
          >
            A harmonious blend of rich experience and young technocrats, dedicated to quality and innovation.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default Team;