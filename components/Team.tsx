import React, { useState, useEffect, useRef } from 'react';
import { motion, Variants, useMotionValue, useAnimationFrame } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../App';

// --- CONFIGURATION ---
const CARD_SCALE_RATIO = 0.45;          
const ORBIT_RADIUS_SCREEN_RATIO = 0.60; 
const ORBIT_RADIUS_MIN = 150;           
const ORBIT_RADIUS_MAX = 450;           

const HITBOX_SIZE_RATIO = 2.2; // Size of the hover detection area

const TILT_ANGLE = 20;                  
const CARD_AXIS_OFFSET = -10;           

const NORMAL_SPEED = 0.01;
const HOVER_SPEED = 0.002;
const SPEED_INERTIA = 0.1;
// ---------------------

const teamMembers = [
  { id: 1, imageUrl: '/team/1.png', config: { angle: 0 } },
  { id: 2, imageUrl: '/team/2.png', config: { angle: 51.4 } },
  { id: 3, imageUrl: '/team/3.png', config: { angle: 102.8 } },
  { id: 4, imageUrl: '/team/4.png', config: { angle: 154.2 } },
  { id: 5, imageUrl: '/team/5.png', config: { angle: 205.6 } },
  { id: 6, imageUrl: '/team/6re.png', config: { angle: 257 } },
  { id: 7, imageUrl: '/team/7.png', config: { angle: 308.4 } },
];

const textSlideUp: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.7, ease: 'easeOut' } },
};

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.7, ease: 'easeOut' } },
};

// --- CARD COMPONENT ---
interface TeamMemberCardProps {
  member: typeof teamMembers[0];
  orbitSize: number;
  cardSize: number;
  setHover: (val: boolean) => void;
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ member, orbitSize, cardSize, setHover }) => {
  const navigate = useNavigate();
  
  const angleRad = (member.config.angle * Math.PI) / 180;
  const x = orbitSize * Math.sin(angleRad);
  const z = orbitSize * Math.cos(angleRad);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Stop propagation
    e.preventDefault();  // Prevent default
    navigate('/team', { state: { selectedMemberId: member.id } });
  };

  return (
    <div
      className="absolute cursor-pointer group"
      onClick={handleClick}
      // Keep hover active when on top of a card
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        width: cardSize,
        height: cardSize * 1.2,
        top: '50%',
        left: '50%',
        marginTop: -(cardSize * 1.2) / 2,
        marginLeft: -cardSize / 2,
        transformStyle: 'preserve-3d',
        transform: `
          translateX(${x}px)
          translateY(${z * 0.1}px)
          translateZ(${z}px)
          rotateY(${member.config.angle}deg)
          rotateX(${CARD_AXIS_OFFSET}deg)
        `,
        // CRITICAL: Auto pointer events ensures this card captures clicks
        // even if the parent container is set to none.
        pointerEvents: 'auto',
        zIndex: 50 // High z-index relative to other elements in 3D context
      }}
    >
      {/* WRAPPER */}
      <div 
        className="w-full h-full relative transition-transform duration-300 group-hover:scale-105"
        style={{ transformStyle: 'preserve-3d' }}
      >
          {/* FRONT FACE */}
          <div
            className="absolute inset-0 w-full h-full bg-white rounded-2xl overflow-hidden border border-white/20 shadow-2xl"
            style={{ 
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden', 
                zIndex: 2,
                transform: 'translateZ(1px)' // Fix Z-fighting
            }}
          >
            <img
              src={member.imageUrl}
              alt={`Team member ${member.id}`}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400?text=Image+Missing'; 
              }}
            />
          </div>
          
          {/* BACK FACE */}
          <div 
            className="absolute inset-0 w-full h-full bg-white rounded-2xl overflow-hidden border border-white/20 shadow-2xl"
            style={{ 
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                transform: 'rotateY(180deg) translateZ(1px)', // Fix Z-fighting
                zIndex: 1
            }}
          >
             <img
              src={member.imageUrl}
              alt={`Team member ${member.id} Back`}
              className="w-full h-full object-cover"
              style={{ transform: 'scaleX(-1)' }} 
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400?text=Image+Missing'; 
              }}
            />
            <div className="absolute inset-0 bg-black/5 pointer-events-none" />
          </div>
      </div>
    </div>
  );
};

// --- MAIN COMPONENT ---
const Team: React.FC = () => {
  const { textColor, grayColor } = useTheme();
  const [isClient, setIsClient] = useState(false);
  const [orbitSize, setOrbitSize] = useState(300);
  const [cardSize, setCardSize] = useState(120);
  
  const isHoveringRef = useRef(false);

  useEffect(() => {
    setIsClient(true);
    const checkScreenSize = () => {
      const width = window.innerWidth;
      const newOrbitSize = Math.max(
          ORBIT_RADIUS_MIN, 
          Math.min(width * ORBIT_RADIUS_SCREEN_RATIO, ORBIT_RADIUS_MAX)
      );
      setOrbitSize(newOrbitSize);
      setCardSize(newOrbitSize * CARD_SCALE_RATIO);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // --- PHYSICS ENGINE ---
  const rotation = useMotionValue(0);
  const currentSpeed = useRef(NORMAL_SPEED);

  useAnimationFrame((time, delta) => {
    const targetSpeed = isHoveringRef.current ? HOVER_SPEED : NORMAL_SPEED;
    currentSpeed.current = currentSpeed.current + (targetSpeed - currentSpeed.current) * SPEED_INERTIA;
    rotation.set(rotation.get() - (currentSpeed.current * delta));
  });

  // Helper to set hover from child components
  const setHover = (val: boolean) => {
    isHoveringRef.current = val;
  };

  return (
    <section id="team" className="py-20 md:py-32 overflow-hidden relative min-h-[80vh] flex flex-col items-center justify-center">
      
      {/* Title */}
      <div className="w-full relative text-center z-10 mb-12">
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

      {/* --- 3D SCENE WRAPPER --- */}
      <div className="relative z-0 w-full flex justify-center items-center">
        
        {/* 
            LAYER 1: HOVER SENSOR (Background)
            This captures the hover event for the empty space between cards.
            It has a lower Z-Index so cards always render "on top" of it for clicks.
        */}
        <div
          className="absolute rounded-full"
          style={{
            width: orbitSize * HITBOX_SIZE_RATIO,
            height: orbitSize * HITBOX_SIZE_RATIO,
            zIndex: 0, 
          }}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        />

        {/* 
            LAYER 2: 3D ROTATION CONTAINER
            This contains the cards.
            pointer-events: none -> Allows clicks to pass through empty space to the sensor or background.
            z-index: 10 -> Ensures this layer sits ABOVE the sensor, so cards are always clickable.
        */}
        <div
            className="relative flex items-center justify-center"
            style={{
              width: orbitSize * 2, // Standard sizing, visual only
              height: orbitSize * 2,
              perspective: '1200px',
              transformStyle: 'preserve-3d',
              pointerEvents: 'none', // Crucial: Don't block the Sensor with the huge square container
              zIndex: 10 
            }}
        >
           {isClient && (
            <motion.div
              style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                transformStyle: 'preserve-3d',
                rotateY: rotation, 
                rotateX: TILT_ANGLE, 
              }}
            >
              {teamMembers.map((member) => (
                <TeamMemberCard 
                  key={member.id} 
                  member={member} 
                  orbitSize={orbitSize} 
                  cardSize={cardSize}
                  setHover={setHover}
                />
              ))}
            </motion.div>
          )}
        </div>
      </div>

      {/* Footer Text */}
      <motion.div
        className="w-full relative text-center z-10 mt-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.5 }}
      >
        <motion.p
          variants={fadeIn}
          className="text-center text-lg md:text-xl max-w-3xl mx-auto px-4"
          style={{ color: grayColor }}
        >
          A harmonious blend of rich experience and young technocrats, dedicated to quality and innovation.
        </motion.p>
      </motion.div>

    </section>
  );
};

export default Team;