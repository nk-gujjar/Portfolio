import { motion } from 'framer-motion';
import styled from 'styled-components';
import { FaCode, FaRobot, FaLaptopCode, FaTools } from 'react-icons/fa';

const SkillsContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
  width: 100%;
  margin-top: 3rem;
`;

const SkillCard = styled(motion.div)`
  background: ${({ theme }) => theme.cardBg};
  border-radius: 15px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
  }
`;

const SkillHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
  
  svg {
    font-size: 2rem;
    margin-right: 1rem;
    color: ${({ theme }) => theme.primary};
  }
  
  h3 {
    font-size: 1.5rem;
  }
`;

const SkillList = styled.ul`
  list-style: none;
`;

const SkillItem = styled.li`
  margin-bottom: 0.8rem;
  display: flex;
  align-items: center;
  
  &::before {
    content: '▹';
    color: ${({ theme }) => theme.primary};
    margin-right: 0.8rem;
    font-size: 1.2rem;
  }
`;

const skillsData = [
  {
    title: 'Languages',
    icon: <FaCode />,
    skills: ['C','C++', 'Python', 'JavaScript', 'SQL']
  },
  {
    title: 'AI/ML',
    icon: <FaRobot />,
    skills: ['TensorFlow', 'Keras', 'Scikit-learn', 'OpenCV', 'NLP', 'PyTorch']
  },
  {
    title: 'Web Dev',
    icon: <FaLaptopCode />,
    skills: ['React.js', 'Node.js', 'Express', 'MongoDB', 'Firebase']
  },
  {
    title: 'Tools',
    icon: <FaTools />,
    skills: ['Git', 'GitHub',  'Jupyter', 'VS Code', 'Linux']
  }
];

const Skills = () => {
  return (
    <SkillsContainer id="skills">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        My Skills
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        viewport={{ once: true }}
      >
        Here are the technologies I've worked with
      </motion.p>
      
      <SkillsGrid>
        {skillsData.map((skillCategory, index) => (
          <SkillCard
            key={skillCategory.title}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <SkillHeader>
              {skillCategory.icon}
              <h3>{skillCategory.title}</h3>
            </SkillHeader>
            <SkillList>
              {skillCategory.skills.map((skill) => (
                <SkillItem key={skill}>{skill}</SkillItem>
              ))}
            </SkillList>
          </SkillCard>
        ))}
      </SkillsGrid>
    </SkillsContainer>
  );
};

export default Skills;