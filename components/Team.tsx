import React, { useState, useEffect, useRef } from 'react';
import { motion, Variants, useMotionValue, useAnimationFrame } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../App';

// --- CONFIGURATION ---
const CARD_SCALE_RATIO = 0.45;          
const ORBIT_RADIUS_SCREEN_RATIO = 0.60; 
const ORBIT_RADIUS_MIN = 180;           
const ORBIT_RADIUS_MAX = 450;           

const HITBOX_SIZE_RATIO = 2;            

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
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ member, orbitSize, cardSize }) => {
  const navigate = useNavigate();
  
  // Calculate specific position on the circle
  const angleRad = (member.config.angle * Math.PI) / 180;
  const x = orbitSize * Math.sin(angleRad);
  const z = orbitSize * Math.cos(angleRad);

  // Common Handler
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation(); 
    navigate('/team', { state: { selectedMemberId: member.id } });
  };

  return (
    <div
      className="absolute cursor-pointer group"
      onClick={handleClick}
      style={{
        width: cardSize,
        height: cardSize * 1.2,
        top: '50%',
        left: '50%',
        marginTop: -(cardSize * 1.2) / 2,
        marginLeft: -cardSize / 2,
        
        // 3D POSITIONING
        transformStyle: 'preserve-3d',
        transform: `
          translateX(${x}px)
          translateY(${z * 0.1}px)
          translateZ(${z}px)
          rotateY(${member.config.angle}deg)
          rotateX(${CARD_AXIS_OFFSET}deg)
        `,
        // Important: Ensure this element captures pointer events
        pointerEvents: 'auto' 
      }}
    >
      {/* 
         WRAPPER: Holds the two faces
         We add the hover scale here so both faces scale together.
      */}
      <div 
        className="w-full h-full relative transition-transform duration-300 group-hover:scale-105"
        style={{ transformStyle: 'preserve-3d' }}
      >
          {/* --- FRONT FACE --- */}
          <div
            className="absolute inset-0 w-full h-full bg-white rounded-2xl overflow-hidden border border-white/20 shadow-2xl"
            style={{ 
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden', 
                zIndex: 2,
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
          
          {/* --- BACK FACE (Mirrored) --- */}
          <div 
            className="absolute inset-0 w-full h-full bg-white rounded-2xl overflow-hidden border border-white/20 shadow-2xl"
            style={{ 
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                // Rotate 180 to face backwards
                transform: 'rotateY(180deg)',
                zIndex: 1
            }}
          >
             <img
              src={member.imageUrl}
              alt={`Team member ${member.id} Back`}
              className="w-full h-full object-cover"
              // MIRROR EFFECT: scaleX(-1) makes the image look correct when viewed from behind
              style={{ transform: 'scaleX(-1)' }} 
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400?text=Image+Missing'; 
              }}
            />
            {/* Optional: Slight darkening to indicate "back" side */}
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

  return (
    <section id="team" className="py-20 md:py-32 overflow-hidden relative min-h-[80vh] flex flex-col items-center justify-center">
      
      {/* Title Section */}
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

      {/* --- 3D SCENE --- */}
      <div className="relative z-0 w-full flex justify-center items-center">
        
        {/* Hitbox / Interaction Layer */}
        <div
          className="relative flex items-center justify-center rounded-full"
          style={{
            width: orbitSize * HITBOX_SIZE_RATIO,
            height: orbitSize * HITBOX_SIZE_RATIO,
            perspective: '1200px', 
            transformStyle: 'preserve-3d', // Crucial for click-through
            // We allow pointer events on this container to track hover...
            pointerEvents: 'auto',
          }}
          onMouseEnter={() => { isHoveringRef.current = true; }}
          onMouseLeave={() => { isHoveringRef.current = false; }}
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
                // ...but we ensure the rotation div itself doesn't block clicks
                pointerEvents: 'none'
              }}
            >
              {teamMembers.map((member) => (
                <TeamMemberCard 
                  key={member.id} 
                  member={member} 
                  orbitSize={orbitSize} 
                  cardSize={cardSize} 
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