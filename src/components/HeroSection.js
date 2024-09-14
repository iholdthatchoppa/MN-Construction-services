import styled from 'styled-components';
import { motion } from 'framer-motion';

const Hero = styled.section`
  background-image: url('/assets/hero-bg.jpg');
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: white;
`;

const HeroSection = () => {
  return (
    <Hero>
      <motion.h1 
        initial={{ opacity: 0, y: -50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 1 }}>
        Welcome to MN Construction Services
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 1, delay: 0.5 }}>
        Luxury Designs, Professional Execution
      </motion.p>
    </Hero>
  );
};

export default HeroSection;
