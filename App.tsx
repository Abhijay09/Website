import React, { useRef, createContext, useContext } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import WhatWeShip from './components/WhatWeShip';
import FeaturedWorks from './components/FeaturedWorks';
import Methodology from './components/Methodology';
import Team from './components/Team';
import Footer from './components/Footer';
import AboutPage from './pages/AboutPage';
import CinematicsPage from './pages/CinematicsPage';
import DivisionsPage from './pages/DivisionsPage';
import TeamPage from './pages/TeamPage';

// 1. Create and export the Theme Context and a custom hook to use it
interface ThemeContextType {
  textColor: MotionValue<string>;
  grayColor: MotionValue<string>;
}

export const ThemeContext = createContext<ThemeContextType | null>(null);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// 2. Create a self-contained HomePage component with all animation logic
const HomePage: React.FC = () => {
  const whatWeShipRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  // Scroll progress for the sections that trigger the theme change
  const { scrollYProgress: scrollYProgressWhatWeShip } = useScroll({
    target: whatWeShipRef,
    offset: ["start end", "end start"]
  });

  const { scrollYProgress: scrollYProgressFooter } = useScroll({
    target: footerRef,
    offset: ["start end", "end start"]
  });

  const transitionRange: [number, number, number, number] = [0, 0.25, 0.75, 1];

  // Map each section's scroll progress to a "darkness" value (0 for light, 1 for dark)
  const whatWeShipDarkness = useTransform(scrollYProgressWhatWeShip, transitionRange, [0, 1, 1, 0]);
  const footerDarkness = useTransform(scrollYProgressFooter, transitionRange, [0, 1, 1, 0]);

  // Combine darkness values, taking the maximum to ensure the theme is dark if either section is in view.
  const combinedDarkness = useTransform(
    [whatWeShipDarkness, footerDarkness],
    ([latestWhatWeShip, latestFooter]) => Math.max(latestWhatWeShip, latestFooter)
  );
  
  // Create final animated color values by mapping the combined darkness
  const backgroundColor = useTransform(combinedDarkness, [0, 1], ["#F0EEE9", "#18181b"]); // brand-light -> zinc-900
  const textColor = useTransform(combinedDarkness, [0, 1], ["#0F0F0F", "#F0EEE9"]); // brand-dark -> brand-light
  const grayColor = useTransform(combinedDarkness, [0, 1], ["#525252", "#a1a1aa"]); // brand-gray -> zinc-400

  return (
    // Provide the animated text/gray colors to children via context
    <ThemeContext.Provider value={{ textColor, grayColor }}>
      <motion.div className="overflow-x-hidden" style={{ backgroundColor }}>
        <Header />
        <main>
          <Hero />
          <FeaturedWorks />
          <div ref={whatWeShipRef}>
            <WhatWeShip />
          </div>
          <Methodology />
          <Team />
        </main>
        <div ref={footerRef}>
          <Footer />
        </div>
      </motion.div>
    </ThemeContext.Provider>
  );
};

// 3. The App component is now just a clean router
const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/cinematics" element={<CinematicsPage />} />
      <Route path="/divisions" element={<DivisionsPage />} />
      <Route path="/team" element={<TeamPage />} />
    </Routes>
  );
};

export default App;