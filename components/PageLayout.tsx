import React, { useRef, createContext, useContext } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import Header from './Header';
import Footer from './Footer';
import { ThemeContext } from '../App';

interface PageLayoutProps {
  children: React.ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  const footerRef = useRef<HTMLDivElement>(null);

  // Create scroll progress for footer
  const { scrollYProgress: scrollYProgressFooter } = useScroll({
    target: footerRef,
    offset: ["start end", "end start"]
  });

  const transitionRange: [number, number, number, number] = [0, 0.25, 0.75, 1];

  const footerDarkness = useTransform(
    scrollYProgressFooter,
    transitionRange,
    [0, 1, 1, 0]
  );

  const backgroundColor = useTransform(
    footerDarkness,
    [0, 1],
    ["#F0EEE9", "#18181b"]
  );

  const textColor = useTransform(
    footerDarkness,
    [0, 1],
    ["#0F0F0F", "#F0EEE9"]
  );

  const grayColor = useTransform(
    footerDarkness,
    [0, 1],
    ["#525252", "#a1a1aa"]
  );

  return (
    <ThemeContext.Provider value={{ textColor, grayColor }}>
      <motion.div className="overflow-x-hidden" style={{ backgroundColor }}>
        <Header />
        <main>
          {children}
        </main>
        <div ref={footerRef}>
          <Footer />
        </div>
      </motion.div>
    </ThemeContext.Provider>
  );
};

export default PageLayout;
