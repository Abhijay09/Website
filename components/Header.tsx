import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import Button from './ui/Button';
import { MenuIcon } from './icons/MenuIcon';
import { useTheme } from '../App';

// --- CONFIGURATION ---
const LOGO_SIZE = 70; // Size in pixels
// ---------------------

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { textColor, grayColor } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
//trigger
  const navLinks = [
    { name: 'Cinematics', href: '/cinematics' },
    { name: 'Divisions', href: '/divisions' },
    { name: 'About', href: '/about' },
    { name: 'Team', href: '/team' },
  ];

  const handleNavClick = (href: string) => {
    navigate(href);
    setIsMenuOpen(false);
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'backdrop-blur-lg shadow-lg' : 'bg-transparent'}`}
      >
        <div className="container mx-auto px-6 md:px-24 lg:px-44 py-4 flex justify-between items-center">
          {/* Logo Section */}
          <motion.button 
            onClick={() => navigate('/')} 
            className="flex items-center space-x-2" 
            style={{ color: textColor }}
          >
            <img 
              src="/logos/logo.png" 
              alt="Miraclestar Logo" 
              style={{ width: LOGO_SIZE, height: LOGO_SIZE }}
              className="object-contain" 
            />
            <span className="text-xl font-bold tracking-tighter">miraclestar</span>
          </motion.button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map(link => (
              <motion.button 
                key={link.name} 
                onClick={() => handleNavClick(link.href)}
                className="transition-colors"
                // Cast style object to 'any' to allow for CSS custom properties for hover effects
                style={{ color: grayColor, '--hover-color': textColor } as any}
                whileHover={{ color: 'var(--hover-color)' }}
              >
                {link.name}
              </motion.button>
            ))}
          </nav>

          <div className="hidden md:block">
            <button onClick={() => navigate('/contact')}><Button>Contact Us</Button></button>
          </div>

          {/* Mobile Menu Toggle */}
          <motion.div className="md:hidden" style={{ color: textColor }}>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <MenuIcon />
            </button>
          </motion.div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-brand-light z-40 pt-24 px-6 md:hidden"
          >
            <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="flex flex-col space-y-6 text-2xl text-center"
            >
                {navLinks.map(link => (
                    <button key={link.name} onClick={() => handleNavClick(link.href)} className="hover:text-brand-dark transition-colors">{link.name}</button>
                ))}
                <div className="pt-4">
                  <button onClick={() => handleNavClick('/contact')}><Button>Contact Us</Button></button>
                </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;