import React from 'react';
import { motion, HTMLMotionProps, useTransform } from 'framer-motion';
import { useTheme } from '../../App';

interface ButtonProps extends HTMLMotionProps<'button'> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  size?: 'md' | 'lg';
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', size = 'md', ...props }) => {
  const { textColor } = useTheme();

  const baseClasses = 'font-semibold rounded-full transition-all duration-300 transform focus:outline-none focus:ring-4';
  
  const sizeClasses = {
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const variantClasses = {
    primary: 'bg-brand-dark text-brand-light hover:bg-zinc-800 focus:ring-zinc-300',
    secondary: 'bg-transparent border-2 hover:bg-brand-dark hover:text-brand-light focus:ring-zinc-500',
  };

  // FIX: The useTransform hook with input ranges only accepts a MotionValue<number>.
  // The original code incorrectly used it with a MotionValue<string>.
  // Here, we use the function signature of useTransform to map the color values.
  const secondaryBorder = useTransform(
    textColor,
    (latest) => (latest === '#F0EEE9' ? '#a1a1aa' : '#525252') // Maps light text color to light gray border, and dark text color to dark gray border.
  );

  // FIX: secondaryColor was an identity transform of textColor, so we can use textColor directly.
  const motionStyle = variant === 'secondary' ? {
    color: textColor,
    borderColor: secondaryBorder,
  } : {};
  
  return (
    <motion.button
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      style={motionStyle}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;
