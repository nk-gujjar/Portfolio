

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaMoon, FaSun, FaBars, FaTimes, FaFileDownload } from 'react-icons/fa';
import styled from 'styled-components';
import resume_path from '../assets/files/Nitesh_kumar_AI_CV.pdf'; // Update with your actual resume path

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 1.5rem 10%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${({ theme }) => theme.navBg};
  backdrop-filter: blur(10px);
  z-index: 1000;
  transition: all 0.3s ease;
  
  @media (max-width: 768px) {
    padding: 1rem 5%;
  }
`;

const Logo = styled(motion.a)`
  font-size: 1.8rem;
  font-weight: 700;
  color: ${({ theme }) => theme.primary};
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  
  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    right: 0;
    width: 70%;
    height: 100vh;
    background: ${({ theme }) => theme.cardBg};
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transform: ${({ isMenuOpen }) => isMenuOpen ? 'translateX(0)' : 'translateX(100%)'};
    transition: transform 0.3s ease;
    z-index: 999;
  }
`;

const NavLink = styled(motion.a)`
  font-weight: 500;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 0;
    height: 2px;
    background: ${({ theme }) => theme.primary};
    transition: width 0.3s ease;
  }
  
  &:hover::after {
    width: 100%;
  }
`;

const NavActions = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

const ActionButton = styled(motion.button)`
  background: none;
  border: none;
  color: ${({ theme }) => theme.text};
  font-size: 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const ResumeButton = styled(motion.a)`
  background: ${({ theme }) => theme.primary};
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  font-size: 0.9rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.secondary};
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const MobileMenuButton = styled(motion.button)`
  background: none;
  border: none;
  color: ${({ theme }) => theme.text};
  font-size: 1.5rem;
  cursor: pointer;
  display: none;
  z-index: 1000;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const DownloadTooltip = styled(motion.div)`
  position: absolute;
  top: 100%;
  right: 0;
  background: ${({ theme }) => theme.cardBg};
  padding: 0.5rem;
  border-radius: 5px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-width: 150px;
  z-index: 1001;
`;

const DownloadOption = styled.a`
  color: ${({ theme }) => theme.text};
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.3rem 0.5rem;
  border-radius: 3px;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.primary};
    color: white;
  }
`;

const navItems = [
  { name: 'Home', href: '#home' },
  { name: 'Skills', href: '#skills' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  { name: 'Profiles', href: '#profiles' },
  { name: 'Contact', href: '#contact' },
];

const Navbar = ({ toggleTheme, theme, isMenuOpen, setIsMenuOpen }) => {
  const [scrolled, setScrolled] = useState(false);
  const [showDownloadOptions, setShowDownloadOptions] = useState(false);
  const resumeUrl = resume_path; // Update this with your actual resume path

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleResumeClick = (e) => {
    e.preventDefault();
    window.open(resumeUrl, '_blank');
  };

  const handleDownloadClick = (e) => {
    e.preventDefault();
    const link = document.createElement('a');
    link.href = resumeUrl;
    link.download = 'Nitesh_Kumar_Resume.pdf'; // Update with your name
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setShowDownloadOptions(false);
  };

  return (
    <Nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        padding: scrolled ? '1rem 10%' : '1.5rem 10%',
        boxShadow: scrolled ? '0 5px 20px rgba(0, 0, 0, 0.1)' : 'none',
      }}
    >
      {/* <Logo href="#home">YourLogo</Logo> */}

      <MobileMenuButton
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        whileTap={{ scale: 0.9 }}
      >
        {isMenuOpen ? <FaTimes /> : <FaBars />}
      </MobileMenuButton>

      <NavLinks isMenuOpen={isMenuOpen}>
        {navItems.map((item, index) => (
          <NavLink
            key={item.name}
            href={item.href}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
            onClick={() => setIsMenuOpen(false)}
          >
            {item.name}
          </NavLink>
        ))}
    
      </NavLinks>

      <NavActions>
        <ResumeButton
          href={resumeUrl}
          onClick={handleResumeClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onMouseEnter={() => setShowDownloadOptions(true)}
          onMouseLeave={() => setShowDownloadOptions(false)}
        >
          Resume
          <AnimatePresence>
            {showDownloadOptions && (
              <DownloadTooltip
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
                onMouseEnter={() => setShowDownloadOptions(true)}
                onMouseLeave={() => setShowDownloadOptions(false)}
              >
                <DownloadOption href={resumeUrl} onClick={handleDownloadClick}>
                  <FaFileDownload /> Download
                </DownloadOption>
              </DownloadTooltip>
            )}
          </AnimatePresence>
        </ResumeButton>

        <ActionButton
          onClick={toggleTheme}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {theme === 'light' ? <FaMoon /> : <FaSun />}
        </ActionButton>
      </NavActions>
    </Nav>
  );
};

export default Navbar;