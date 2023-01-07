import React from 'react';
import { motion } from 'framer-motion';
import { useLocation } from '@remix-run/react';

interface Props {
  children: React.ReactNode;
}

export default function PageTransition({ children }: Props) {
  return (
    <motion.main
      key={useLocation().pathname}
      initial={{ x: '-10%', opacity: 0 }}
      animate={{ x: '0', opacity: 1 }}
      exit={{ y: '-10%', opacity: 0 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
    >
      {children}
    </motion.main>
  );
}
