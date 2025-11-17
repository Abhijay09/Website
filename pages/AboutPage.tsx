import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MethodologyStep } from '../types';
import { ArrowIcon } from '../components/icons/ArrowIcon';
import { useTheme } from '../App';
import PageLayout from '../components/PageLayout';

const steps: MethodologyStep[] = [
    {
        id: '01',
        title: 'Shri Kamal Mukut',
        content: 'With 52 years in Bollywood as a Distributor, Multiplex owner, and Producer of acclaimed hits like Gadar 2, Genius, and Mad. A co-founder of Zee TV, he was solely responsible for its entire filmed content and awarded the "PILLAR OF ZEE". He pioneered concepts like Telefilms and developed India’s first multiplex in a non-metro market, Jaipur. He has recently acquired a chain of multiplexes in North India.'
    },
    {
        id: '02',
        title: 'Hemmant Mukut',
        content: 'Founder of Miraclestar Entertainments, engaged in Production, Acquisition, and Distribution. He believes in meaningful cinema that entertains and imparts important messages to society. His feature film on the Dark Web is complete and awaiting release. His elder brother, Deepak Mukut, is also a renowned film Producer and Distributor.'
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

interface AccordionItemProps {
    step: MethodologyStep;
    isOpen: boolean;
    onToggle: () => void;
    textColor: any;
    grayColor: any;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ step, isOpen, onToggle, textColor, grayColor }) => {
    
    return (
        <motion.div
            className="border-b border-zinc-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
        >
            <button
                className="w-full flex justify-between items-center py-8 text-left"
                onClick={onToggle}
            >
                <div className="flex items-center space-x-6">
                    <span className="text-xl" style={{ color: grayColor }}>{step.id}</span>
                    <h3 className="text-2xl md:text-4xl font-bold tracking-tight" style={{ color: textColor }}>
                        {step.title}
                    </h3>
                </div>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ color: grayColor }}
                >
                    <ArrowIcon />
                </motion.div>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: 'easeInOut' }}
                        className="overflow-hidden"
                    >
                        <p className="pb-8 pl-12 max-w-3xl text-lg" style={{ color: grayColor }}>
                            {step.content}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

const AboutPageContent: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);
    const { textColor, grayColor } = useTheme();

    const handleToggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="py-20 md:py-32">
            <div className="container mx-auto px-6 md:px-24 lg:px-44">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.8 }}
                    className="text-left mb-16 max-w-3xl"
                >
                    <h2 className="text-4xl md:text-6xl font-extrabold tracking-tighter" style={{ color: textColor }}>
                        The People Behind Miraclestar
                    </h2>
                    <p className="text-lg md:text-xl mt-4" style={{ color: grayColor }}>
                      Established under the able guidance of visionaries with decades of industry experience, Miraclestar is committed to quality and dedication in all its productions.
                    </p>
                </motion.div>

                <div className="bg-white/50 p-4 sm:p-8 rounded-lg shadow-md backdrop-blur-sm">
                    {steps.map((step, index) => (
                        <AccordionItem
                            key={step.id}
                            step={step}
                            isOpen={openIndex === index}
                            onToggle={() => handleToggle(index)}
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