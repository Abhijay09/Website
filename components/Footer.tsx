import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../App';

const Footer: React.FC = () => {
    const { textColor, grayColor } = useTheme();
    const navigate = useNavigate();

    return (
        <footer
            className="py-20 px-6 md:px-24 lg:px-44 bg-transparent"
        >
            <div className="container mx-auto">
                <div className="text-center mb-16">
                     <div className="overflow-hidden">
                        <motion.h2 
                            className="text-4xl md:text-7xl font-extrabold tracking-tighter mb-4"
                            style={{ color: textColor }}
                            initial={{ y: "100%" }}
                            whileInView={{ y: "0%" }}
                            viewport={{ once: false }}
                            transition={{ duration: 0.8, ease: [0.6, 0.01, -0.05, 0.95] }}
                        >
                            Have a project?
                        </motion.h2>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <div className="overflow-hidden">
                            <motion.button 
                                onClick={() => navigate('/contact')}
                                className="text-2xl md:text-4xl font-extrabold tracking-tighter transition-colors duration-300 underline"
                                style={{ color: grayColor, '--hover-color': textColor } as any}
                                whileHover={{ color: 'var(--hover-color)' }}
                                initial={{ y: "100%" }}
                                whileInView={{ y: "0%" }}
                                viewport={{ once: false }}
                                transition={{ duration: 0.8, ease: [0.6, 0.01, -0.05, 0.95], delay: 0.1 }}
                            >
                                Contact Us
                            </motion.button>
                        </div>
                        <div className="overflow-hidden">
                            <motion.a 
                                href="mailto:contact@miraclestar.com" 
                                className="text-2xl md:text-4xl font-extrabold tracking-tighter transition-colors duration-300 underline inline-block"
                                style={{ color: grayColor, '--hover-color': textColor } as any}
                                whileHover={{ color: 'var(--hover-color)' }}
                                initial={{ y: "100%" }}
                                whileInView={{ y: "0%" }}
                                viewport={{ once: false }}
                                transition={{ duration: 0.8, ease: [0.6, 0.01, -0.05, 0.95], delay: 0.2 }}
                            >
                                Let's talk
                            </motion.a>
                        </div>
                    </div>
                </div>

                <motion.div 
                    className="flex flex-col md:flex-row justify-between items-center text-center md:text-left border-t border-zinc-300 pt-10"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: false, amount: 0.5 }}
                    transition={{ duration: 1.0 }}
                >
                    <div className="mb-6 md:mb-0">
                        <motion.p className="text-lg font-bold" style={{ color: textColor }}>Miraclestar Entertainments</motion.p>
                        <motion.p style={{ color: grayColor }}>&copy; {new Date().getFullYear()}. All Rights Reserved</motion.p>
                    </div>
                    <div className="flex space-x-6">
                        {/* FIX: Cast style object to 'any' for all social links to allow for the '--hover-color' custom CSS property. */}
                        <motion.a href="#" style={{ color: grayColor, '--hover-color': textColor } as any} whileHover={{ color: 'var(--hover-color)' }} className="transition-colors">Twitter</motion.a>
                        <motion.a href="#" style={{ color: grayColor, '--hover-color': textColor } as any} whileHover={{ color: 'var(--hover-color)' }} className="transition-colors">Instagram</motion.a>
                        <motion.a href="#" style={{ color: grayColor, '--hover-color': textColor } as any} whileHover={{ color: 'var(--hover-color)' }} className="transition-colors">LinkedIn</motion.a>
                        <motion.a href="#" style={{ color: grayColor, '--hover-color': textColor } as any} whileHover={{ color: 'var(--hover-color)' }} className="transition-colors">Dribbble</motion.a>
                    </div>
                </motion.div>
            </div>
        </footer>
    );
};

export default Footer;