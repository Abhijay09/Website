import React from 'react';
import { motion } from 'framer-motion';
import PageLayout from '../components/PageLayout';

// 1. Defined types locally to prevent import errors during debugging
interface MethodologyStep {
  id: string;
  title: string;
  content: string;
  image?: string;
}

// 2. Data with Images
const steps: MethodologyStep[] = [
  {
    id: '01',
    title: 'Shri Kamal Mukut',
    content: 'With 52 years in Bollywood as a Distributor, Multiplex owner, and Producer of acclaimed hits like Gadar 2, Genius, and Mad. A co-founder of Zee TV, he was solely responsible for its entire filmed content and awarded the "PILLAR OF ZEE". He pioneered concepts like Telefilms and developed India’s first multiplex in a non-metro market, Jaipur. He has recently acquired a chain of multiplexes in North India.',
    image: '/team/8.png'
  },
  {
    id: '02',
    title: 'Hemmant Mukut',
    content: 'Founder of Miraclestar Entertainments, engaged in Production, Acquisition, and Distribution. He believes in meaningful cinema that entertains and imparts important messages to society. His feature film on the Dark Web is complete and awaiting release. His elder brother, Deepak Mukut, is also a renowned film Producer and Distributor.',
    image: '/team/9.png'
  },
  {
    id: '03',
    title: 'Our Philosophy',
    content: 'True cinema goes beyond entertainment – it informs, inspires and uplifts society, leaving a lasting impact on people’s lives. Miraclestar Entertainments is a production house that encompasses all aspects of the entertainment industry, including Feature Films, Animation, Visual Effects, Micro-Drama, Music, a Stock Shots Library, and a film school to train young talent.'
  },
  {
    id: '04',
    title: 'Cinematics & VFX',
    content: 'We are currently producing "Love Hackers", a film inspired by true incidents of the dark web, and "Operation Walnut Cracker", a spy thriller based on a true story. Our VFX division is poised to take visual effects to new heights with a team of experienced and young technocrats, leveraging the significant growth in the Indian VFX industry.'
  },
  {
    id: '05',
    title: 'The Core Team',
    content: 'Our team consists of seasoned professionals like Mayank Prakash Srivastava (Writer-Editor-Director), Brijesh Srivastava (Creative & Executive Producer), and a host of talented individuals in finance, animation, and VFX who bring a wealth of experience and innovation to our projects.'
  }
];

interface TimelineItemProps {
  step: MethodologyStep;
  index: number;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ step, index }) => {
  const isEven = index % 2 === 0;
  
  // Define colors locally or via Tailwind classes to avoid Context crashes
  const textColor = "#18181b"; // zinc-900
  const grayColor = "#71717a"; // zinc-500

  const cardVariants = {
    hidden: { opacity: 0, x: isEven ? -50 : 50, y: 20 },
    visible: { 
      opacity: 1, 
      x: 0, 
      y: 0,
      transition: { type: 'spring', stiffness: 50, damping: 20, duration: 0.8 }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, x: isEven ? 50 : -50, scale: 0.9 },
    visible: { 
      opacity: 1, 
      x: 0, 
      scale: 1,
      transition: { type: 'spring', stiffness: 50, damping: 20, delay: 0.2 }
    }
  };

  return (
    <div className={`flex flex-col md:flex-row ${isEven ? 'md:flex-row-reverse' : ''} items-center w-full mb-16 md:mb-24`}>
      
      {/* 1. Content Card */}
      <motion.div 
        className="w-full md:w-5/12 z-10"
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="p-6 md:p-8 bg-white/80 backdrop-blur-md rounded-xl shadow-lg border border-zinc-200/60">
          <span className="text-4xl font-bold opacity-10 block mb-2" style={{ color: textColor }}>
            {step.id}
          </span>
          <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-4" style={{ color: textColor }}>
            {step.title}
          </h3>
          <p className="text-base md:text-lg leading-relaxed" style={{ color: grayColor }}>
            {step.content}
          </p>
        </div>
      </motion.div>
      
      {/* 2. Timeline Connector (Hidden on Mobile) */}
      <div className="hidden md:flex w-2/12 justify-center relative">
        {/* Dot on the line */}
        <motion.div 
          className="w-4 h-4 rounded-full border-4 bg-white z-10" 
          style={{ borderColor: textColor }}
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, type: "spring" }}
        />
      </div>

      {/* 3. Image Section */}
      <div className="w-full md:w-5/12 flex justify-center items-center mt-8 md:mt-0">
        {step.image ? (
          <motion.div
            variants={imageVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="w-full max-w-sm"
          >
            <img 
              src={step.image} 
              alt={step.title} 
              className="w-full h-auto rounded-xl shadow-xl object-cover border border-zinc-100 aspect-[4/3]"
            />
          </motion.div>
        ) : (
          // Placeholder div to maintain spacing if no image exists
          <div className="hidden md:block w-full max-w-sm" />
        )}
      </div>
    </div>
  );
};

const AboutPageContent: React.FC = () => {
  // Hardcoded to prevent crashes. If you have a ThemeContext, import it separately, 
  // NOT from App.tsx.
  const textColor = "#18181b"; 
  const grayColor = "#71717a";

  return (
    <section className="py-24 md:py-32 bg-zinc-50/50 min-h-screen overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24 max-w-3xl mx-auto"
        >
          <h2 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-6" style={{ color: textColor }}>
            The Miraclestar Story
          </h2>
          <p className="text-lg md:text-xl leading-relaxed" style={{ color: grayColor }}>
            Established under the able guidance of visionaries with decades of industry experience, committed to quality and dedication in all productions.
          </p>
        </motion.div>

        <div className="relative">
          {/* The Central Timeline Bar */}
          <motion.div 
            className="hidden md:block absolute top-0 left-1/2 w-0.5 h-full -translate-x-1/2 bg-zinc-200"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
            style={{ transformOrigin: 'top' }}
          />
          
          {steps.map((step, index) => (
            <TimelineItem
              key={step.id}
              step={step}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const AboutPage: React.FC = () => {
  return (
    <PageLayout>
      <AboutPageContent />
    </PageLayout>
  );
};

export default AboutPage;