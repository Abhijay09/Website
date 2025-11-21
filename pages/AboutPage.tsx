import React from 'react';
import { motion } from 'framer-motion';
import { MethodologyStep } from '../types';
import { useTheme } from '../App';
import PageLayout from '../components/PageLayout';

// 1. Update the data to include the images
const steps: (MethodologyStep & { image?: string })[] = [
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
    step: MethodologyStep & { image?: string };
    index: number;
    textColor: any;
    grayColor: any;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ step, index, textColor, grayColor }) => {
    const isEven = index % 2 === 0;

    const cardVariants = {
        hidden: { 
            opacity: 0, 
            x: isEven ? -50 : 50, // Reduced distance for smoother feel
            scale: 0.9
        },
        visible: { 
            opacity: 1, 
            x: 0,
            scale: 1,
            transition: { type: 'spring', stiffness: 50, damping: 20 }
        }
    };

    // Animation for the image appearing from the opposite side
    const imageVariants = {
        hidden: { 
            opacity: 0, 
            x: isEven ? 50 : -50, 
            scale: 0.9 
        },
        visible: { 
            opacity: 1, 
            x: 0, 
            scale: 1,
            transition: { type: 'spring', stiffness: 50, damping: 20, delay: 0.2 }
        }
    };

    return (
        <div className={`flex ${isEven ? 'flex-row-reverse' : 'flex-row'} items-center w-full mb-12 md:mb-20`}>
            
            {/* 1. Content Card (Text) */}
            <motion.div 
                className="w-full md:w-5/12"
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
            >
                <div className="p-6 md:p-8 bg-white/60 backdrop-blur-md rounded-lg shadow-lg border border-zinc-200 hover:shadow-xl transition-shadow duration-300">
                    <p className="text-xl font-semibold mb-2" style={{ color: grayColor }}>{step.id}</p>
                    <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-4" style={{ color: textColor }}>
                        {step.title}
                    </h3>
                    <p className="text-base md:text-lg leading-relaxed" style={{ color: grayColor }}>
                        {step.content}
                    </p>
                </div>
            </motion.div>
            
            {/* 2. Timeline Connector */}
            <div className="hidden md:flex w-2/12 items-center justify-center relative">
                <motion.div 
                    className="w-4 h-4 rounded-full border-2 bg-white z-10" 
                    style={{ borderColor: grayColor }}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ delay: 0.2 }}
                />
            </div>

            {/* 3. Image Section (Replaces the empty spacer) */}
            <div className="hidden md:flex w-5/12 justify-center items-center">
                {step.image && (
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
                            className="w-full h-auto rounded-lg shadow-xl object-cover border border-zinc-100"
                            style={{ maxHeight: '500px' }} 
                        />
                    </motion.div>
                )}
            </div>
        </div>
    );
};

const AboutPageContent: React.FC = () => {
    const { textColor, grayColor } = useTheme();

    return (
        <section className="py-24 md:py-32">
            <div className="container mx-auto px-6 md:px-12 lg:px-24">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-20 max-w-3xl mx-auto"
                >
                    <h2 className="text-5xl md:text-7xl font-extrabold tracking-tighter" style={{ color: textColor }}>
                        The Miraclestar Story
                    </h2>
                    <p className="text-lg md:text-xl mt-4" style={{ color: grayColor }}>
                      Established under the able guidance of visionaries with decades of industry experience, committed to quality and dedication in all productions.
                    </p>
                </motion.div>

                <div className="relative">
                    {/* The Central Timeline Bar */}
                    <motion.div 
                        className="hidden md:block absolute top-0 left-1/2 w-px h-full bg-zinc-300 -translate-x-1/2"
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: 1 }}
                        transition={{ duration: 1.5, ease: 'easeInOut' }}
                        style={{ transformOrigin: 'top' }}
                    />
                    
                    {steps.map((step, index) => (
                        <TimelineItem
                            key={step.id}
                            step={step}
                            index={index}
                            textColor={textColor}
                            grayColor={grayColor}
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