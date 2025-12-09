import React, { createContext } from 'react';
import { motion, useMotionValue } from 'framer-motion';
import Header from './Header';
import Footer from './Footer';
import { ThemeContext } from '../App';

interface PageLayoutProps {
  children: React.ReactNode;
  theme?: 'light' | 'dark'; // Allows individual pages to be fully Dark or Light
}

const PageLayout: React.FC<PageLayoutProps> = ({ children, theme = 'light' }) => {
  // --- 1. Main Page Theme Logic ---
  const isDark = theme === 'dark';

  // Static Background for the main content area
  const backgroundColor = isDark ? "#18181b" : "#F0EEE9";
  
  // Text colors for the main content (passed to Header and Children)
  const mainTextColor = useMotionValue(isDark ? "#F0EEE9" : "#0F0F0F");
  const mainGrayColor = useMotionValue(isDark ? "#a1a1aa" : "#525252");

  // --- 2. Footer Theme Logic (ALWAYS DARK) ---
  // We force these values for the footer section so it always looks like "Dark Mode"
  const footerTextColor = useMotionValue("#F0EEE9"); // White text
  const footerGrayColor = useMotionValue("#a1a1aa"); // Light Gray text

  return (
    // Provider for the Header and Main Content
    <ThemeContext.Provider value={{ textColor: mainTextColor, grayColor: mainGrayColor }}>
      <motion.div 
        className="overflow-x-hidden min-h-screen flex flex-col" 
        style={{ backgroundColor }}
      >
        <Header />
        
        <main className="flex-grow">
          {children}
        </main>

        {/* 
            FOOTER SECTION 
            Wrapped in a nested ThemeProvider to force Dark Mode styles 
            regardless of the page's main theme.
        */}
        <ThemeContext.Provider value={{ textColor: footerTextColor, grayColor: footerGrayColor }}>
          <div className="bg-[#18181b] w-full">
            <Footer />
          </div>
        </ThemeContext.Provider>

      </motion.div>
    </ThemeContext.Provider>
  );
};

export default PageLayout;