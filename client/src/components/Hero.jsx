import { motion } from 'framer-motion';
import styled from 'styled-components';
import profileImg from '../assets/images/profile.jpeg'; // Make sure this path is correct

const HeroContainer = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 5rem;
  
  @media (max-width: 1024px) {
    flex-direction: column-reverse;
    text-align: center;
    gap: 3rem;
  }
`;

const HeroContent = styled.div`
  flex: 1;
`;

const HeroImage = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProfileImage = styled(motion.img)`
  width: 300px;
  height: 300px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid ${({ theme }) => theme.primary};
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  
  @media (max-width: 768px) {
    width: 250px;
    height: 250px;
  }
`;

const Title = styled(motion.h1)`
  font-size: 4rem;
  margin-bottom: 1.5rem;
  line-height: 1.2;
  
  span {
    color: ${({ theme }) => theme.primary};
  }
  
  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;

const Subtitle = styled(motion.p)`
  font-size: 1.5rem;
  margin-bottom: 2rem;
  opacity: 0.8;
  color: ${({ theme }) => theme.primary};
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const Bio = styled(motion.p)`
  max-width: 600px;
  margin-bottom: 3rem;
  font-size: 1.1rem;
  line-height: 1.6;
`;

const Button = styled(motion.a)`
  display: inline-block;
  padding: 0.8rem 2rem;
  background: linear-gradient(90deg, ${({ theme }) => theme.primary}, ${({ theme }) => theme.secondary});
  color: white;
  border-radius: 50px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  box-shadow: 0 4px 15px rgba(58, 134, 255, 0.3);
  cursor: pointer;
  border: none;
  outline: none;
  font-size: 0.9rem;
  
  &:hover {
    color: white;
    box-shadow: 0 6px 20px rgba(58, 134, 255, 0.4);
    transform: translateY(-2px);
  }
`;

const Hero = () => {
  return (
    <HeroContainer id="home">
      <HeroContent>
        <Title
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Hi, I'm <span>Nitesh Kumar</span>
        </Title>
        <Subtitle
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Software Developer & AI/ML Enthusiast
        </Subtitle>
        <Bio
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          Passionate about solving real-world problems using intelligent tech and efficient code. With a strong foundation in competitive programming and hands-on experience in AI projects, I build with curiosity and purpose.
        </Bio>
        <Button
          href="#contact"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Get In Touch
        </Button>
      </HeroContent>

      <HeroImage>
        <ProfileImage
          src={profileImg}
          alt="Nitesh Kumar"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ 
            duration: 0.5, 
            delay: 0.4,
            type: "spring",
            stiffness: 100
          }}
          whileHover={{ scale: 1.05 }}
        />
      </HeroImage>
    </HeroContainer>
  );
};

export default Hero;