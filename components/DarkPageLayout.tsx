// components/DarkPageLayout.tsx
import React, { createContext } from 'react';
import { motion, useMotionValue } from 'framer-motion';
import Header from './Header';
import Footer from './Footer';
import { ThemeContext } from '../App';

const DarkPageLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Force dark theme values
  const textColor = useMotionValue('#F0EEE9'); // Light text
  const grayColor = useMotionValue('#000000ff'); // Light gray
  
  return (
    <ThemeContext.Provider value={{ textColor, grayColor }}>
      <motion.div className="overflow-x-hidden bg-brand-dark min-h-screen text-brand-light">
        <Header />
        <main>{children}</main>
        <Footer />
      </motion.div>
    </ThemeContext.Provider>
  );
};

export default DarkPageLayout;