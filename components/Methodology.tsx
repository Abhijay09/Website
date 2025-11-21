import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MethodologyStep } from '../types';
import { useTheme } from '../App';

const steps: MethodologyStep[] = [
    {
        id: '01',
        title: 'Shri Kamal Mukut',
        content: 'With 53 years in Bollywood as a Distributor, Multiplex owner, and Producer of acclaimed hits like Gadar 2, Genius, and Mad.'
    },
    {
        id: '02',
        title: 'Hemmant Mukut',
        content: 'Founder of Miraclestar Entertainments, engaged in Production, Acquisition, and Distribution.'
    },
    {
        id: '03',
        title: 'Our Philosophy',
        content: 'True cinema goes beyond entertainment. It informs, inspires and uplifts society.'
    },
    {
        id: '04',
        title: 'Cinematics & VFX',
        content: 'We are currently producing Love Hackers and Operation Walnut Cracker.'
    },
    {
        id: '05',
        title: 'The Core Team',
        content: 'Our team consists of seasoned professionals and talented individuals in Direction, Vizualisation, Animation, VFX, Sound, Editing & Finance.'
    }
];

interface StepCardProps {
    step: MethodologyStep;
    index: number;
    textColor: any;
    grayColor: any;
}

const StepCard: React.FC<StepCardProps> = ({ step, index, textColor, grayColor }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: cardRef,
        offset: ['start end', 'center center']
    });

    const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 1]);
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 1]);
    const y = useTransform(scrollYProgress, [0, 0.5, 1], [100, 0, 0]);
    const isEven = index % 2 === 0;

    return (
        <motion.div
            ref={cardRef}
            className={`flex items-center gap-8 mb-12 ${isEven ? 'flex-row' : 'flex-row-reverse'}`}
            style={{ opacity, scale, y }}
        >
            <div className="flex flex-col items-center w-24 flex-shrink-0">
                <motion.div
                    className="w-16 h-16 rounded-full border-4 flex items-center justify-center font-bold text-lg relative z-10"
                    style={{
                        borderColor: textColor,
                        color: textColor
                    }}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
                >
                    {step.id}
                </motion.div>
                <motion.div
                    className="w-1 flex-grow mt-4"
                    style={{ backgroundColor: grayColor }}
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                />
            </div>

            <motion.div
                className="flex-1 p-8 rounded-2xl backdrop-blur-sm border relative overflow-hidden group"
                style={{
                    borderColor: grayColor,
                    backgroundColor: 'rgba(255, 255, 255, 0.05)'
                }}
                initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                viewport={{ once: false, amount: 0.3 }}
                whileHover={{ y: -5 }}
            >
                <div className="relative z-10">
                    <motion.h3
                        className="text-2xl md:text-3xl font-bold mb-4 tracking-tight"
                        style={{ color: textColor }}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        {step.title}
                    </motion.h3>
                    
                    <motion.p
                        className="text-base md:text-lg leading-relaxed"
                        style={{ color: grayColor }}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        {step.content}
                    </motion.p>
                </div>

                <motion.div
                    className="absolute top-0 right-0 w-1 h-12 rounded-full"
                    style={{ backgroundColor: textColor }}
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                />
            </motion.div>
        </motion.div>
    );
};

const Methodology: React.FC = () => {
    const { textColor, grayColor } = useTheme();
    const sectionRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end center']
    });

    const h2Y = useTransform(scrollYProgress, [0, 1], [0, 50]);
    const pY = useTransform(scrollYProgress, [0, 1], [0, 70]);

    return (
        <section ref={sectionRef} id="about" className="py-20 md:py-32">
            <div className="container mx-auto px-6 md:px-24 lg:px-44">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.5 }}
                    transition={{ staggerChildren: 0.1 }}
                    className="text-left mb-20 max-w-3xl"
                >
                    <div className="overflow-hidden">
                        <motion.h2
                            className="text-4xl md:text-6xl font-extrabold tracking-tighter"
                            style={{ color: textColor, y: h2Y }}
                            variants={{ hidden: { y: '100%' }, visible: { y: '0%' } }}
                            transition={{ duration: 0.8, ease: [0.6, 0.01, -0.05, 0.95] }}
                        >
                            The People Behind Miraclestar
                        </motion.h2>
                    </div>
                    <div className="overflow-hidden">
                        <motion.p
                            className="text-lg md:text-xl mt-4"
                            style={{ color: grayColor, y: pY }}
                            variants={{ hidden: { y: '100%' }, visible: { y: '0%' } }}
                            transition={{ duration: 0.8, ease: [0.6, 0.01, -0.05, 0.95] }}
                        >
                            Established under the able guidance of visionaries with decades of industry experience.
                        </motion.p>
                    </div>
                </motion.div>

                <div className="relative">
                    <motion.div
                        className="absolute left-12 top-0 bottom-0 w-1"
                        style={{ backgroundColor: grayColor, opacity: 0.2 }}
                    />

                    <div className="space-y-8">
                        {steps.map((step, index) => (
                            <StepCard
                                key={step.id}
                                step={step}
                                index={index}
                                textColor={textColor}
                                grayColor={grayColor}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Methodology;
