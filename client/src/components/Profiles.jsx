import { motion } from 'framer-motion';
import styled from 'styled-components';
import { FaGithub } from 'react-icons/fa';
import { SiLeetcode, SiCodeforces, SiGeeksforgeeks } from 'react-icons/si';

const ProfilesContainer = styled.section`
  text-align: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const ProfilesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 150px));
  justify-content: center;
  gap: 2rem;
  margin-top: 3rem;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(120px, 120px));
  }
`;

const ProfileCard = styled(motion.a)`
  background: ${({ theme }) => theme.cardBg};
  border-radius: 10px;
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  text-decoration: none;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    background: ${({ theme }) => theme.primary};
    color: white;
    
    svg {
      color: white;
    }
  }
  
  svg {
    font-size: 2.5rem;
    color: ${({ theme }) => theme.primary};
    transition: all 0.3s ease;
  }
  
  span {
    font-weight: 600;
  }
`;

const profilesData = [
  {
    name: 'GitHub',
    icon: <FaGithub />,
    url: 'https://github.com/nk-gujjar'
  },
  {
    name: 'Codeforces',
    icon: <SiCodeforces />,
    url: 'https://codeforces.com/profile/Mr.BruceWayne'
  },
  {
    name: 'LeetCode',
    icon: <SiLeetcode />,
    url: 'https://leetcode.com/u/nitesh_kumar26'
  },
  {
    name: 'GeeksForGeeks',
    icon: <SiGeeksforgeeks />,
    url: 'https://www.geeksforgeeks.org/user/nitesh_kumar26/'
  },
];

const Profiles = () => {
  return (
    <ProfilesContainer id="profiles">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        My Profiles
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        viewport={{ once: true }}
      >
        Connect with me on these platforms
      </motion.p>
      
      <ProfilesGrid>
        {profilesData.map((profile, index) => (
          <ProfileCard
            key={profile.name}
            href={profile.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            {profile.icon}
            <span>{profile.name}</span>
          </ProfileCard>
        ))}
      </ProfilesGrid>
    </ProfilesContainer>
  );
};

export default Profiles;