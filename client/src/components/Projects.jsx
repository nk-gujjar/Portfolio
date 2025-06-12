import { motion } from 'framer-motion';
import styled from 'styled-components';
import { FiGithub, FiExternalLink } from 'react-icons/fi';
import quickeventimg from '../assets/images/quickevent.png'; 
import cattleimg from '../assets/images/cattleimg.png'; 
import deepfakeimg from '../assets/images/deepfakeimg.png';
import dishimg from '../assets/images/dishimg.png'; 
import chessbotimg from '../assets/images/chessbot.png';
import ngoManagerimg from '../assets/images/ngoManagerimg.png';
import riscimg from '../assets/images/risc-vimg.png';

const ProjectsContainer = styled.section``;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ProjectCard = styled(motion.div)`
  background: ${({ theme }) => theme.cardBg};
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
  }
`;

const ProjectImage = styled.div`
  height: 200px;
  background: ${({ theme }) => theme.primary};
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
    
    &:hover {
      transform: scale(1.05);
    }
  }
`;

const ProjectContent = styled.div`
  padding: 1.5rem;
`;

const ProjectTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ProjectDescription = styled.p`
  margin-bottom: 1.5rem;
  opacity: 0.8;
`;

const ProjectTech = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const TechTag = styled.span`
  background: ${({ theme }) => theme.body === '#121212' ? '#2a2a2a' : '#f0f0f0'};
  padding: 0.3rem 0.8rem;
  border-radius: 50px;
  font-size: 0.8rem;
`;

const ProjectLinks = styled.div`
  display: flex;
  gap: 1rem;
`;

const LinkButton = styled.a`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: ${({ theme }) => theme.primary};
  color: white;
  border-radius: 5px;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${({ theme }) => theme.secondary};
    color: white;
  }
`;

const projectsData = [
 
  {
    title: 'Cattle Muzzle Recognition',
    description: 'Built an EfficientNet-based model to identify and re-identify buffaloes and cows using unique muzzle patterns for livestock tracking and health monitoring.',
    tech: ['Python', 'TensorFlow', 'EfficientNet', 'OpenCV'],
    github: 'https://github.com/nk-gujjar/Buffalo-re-identification',
    live: null,
    image: cattleimg
  },
  
  {
    title: 'QuickEvent – AI Chatbot Scheduler',
    description: 'Created a groq-based chatbot with voice/text input to schedule events via Google Calendar using natural language.',
    tech: ['Python','LLM', 'Voice-to-text', 'Streamlit', 'AI', 'Google Calendar API'],
    github: 'https://github.com/nk-gujjar/Chatbot',
    live: null,
    image: quickeventimg
  },
  {
    title: 'DeepFake Detector',
    description: 'Built a Streamlit web app that detects deepfake photos of human faces with 92% accuracy using CNNs for facial feature extraction and SVM for classification.',
    tech: ['Python', 'CNN', 'Streamlit', 'OpenCV','ML'],
    github: 'https://huggingface.co/Niteshgujjar2612/deepfake-detector',
    live: null,
    image: deepfakeimg
  },

  {
    title: 'Dish Suggester',
    description: 'Built a Streamlit app that suggests recipes using text/image inputs. Used Groq Vision API for ingredient detection, LLaMA for recipe generation, and MongoDB GridFS for tempprary image storage.',
    tech: ['Python', 'LLM', 'Streamlit', 'API','MongoDb'],
    github: 'https://github.com/nk-gujjar/Dish-suggester',
    live: 'https://dish-suggester.streamlit.app/',
    image: dishimg
  },
  {
    title: 'AI Chessbot',
    description: 'Fine-tuned an AlphaZero-based chess model using PyTorch and transfer learning. Processed PGN files into tensors and adapted an LCZero-like architecture for improved move prediction and strategy learning.',
    tech: ['Python', 'Deep Learning'],
    github: 'https://github.com/nk-gujjar/AI-Chessbot',
    live: null,
    image: chessbotimg
  },
  {
    title: 'NGO Manager',
    description: 'Built a platform for NGOs to create and manage websites, assign tasks, and organize events with customizable templates and streamlined workflows.',
    tech: ['React Js', 'Node.js','SQL', 'Express'],
    github: 'https://github.com/MrStelk/T02-CS305',
    live: null,
    image: ngoManagerimg
  },
   {
    title: 'RISC-V Simulator',
    description: 'Developed a C++ RISC-V simulator supporting single-cycle and pipelined execution. Included cache hierarchy, branch prediction, and performance metrics like CPI, hit/miss rate for accurate architecture simulation.',
    tech: ['C++', 'RISC-V', 'Computer Architecture'],
    github: 'https://github.com/bhuriamohit/simulator.git',
    live: null,
    image: riscimg
  }
];

const Projects = () => {
  return (
    <ProjectsContainer id="projects">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        My Projects
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        viewport={{ once: true }}
      >
        Here are some of my recent projects
      </motion.p>
      
      <ProjectsGrid>
        {projectsData.map((project, index) => (
          <ProjectCard
            key={project.title}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <ProjectImage>
  <img 
    src={project.image} 
    alt={project.title} 
    onError={(e) => {
      // Fallback if image fails to load
      e.target.style.objectFit = 'contain';
      e.target.src = 'fallback-image-url';
    }}
  />
</ProjectImage>
            <ProjectContent>
              <ProjectTitle>
                {project.title}
              </ProjectTitle>
              <ProjectDescription>{project.description}</ProjectDescription>
              <ProjectTech>
                {project.tech.map(tech => (
                  <TechTag key={tech}>{tech}</TechTag>
                ))}
              </ProjectTech>
              <ProjectLinks>
                <LinkButton href={project.github} target="_blank" rel="noopener noreferrer">
                  <FiGithub /> Code
                </LinkButton>
                {project.live && (
                  <LinkButton href={project.live} target="_blank" rel="noopener noreferrer">
                    <FiExternalLink /> Live
                  </LinkButton>
                )}
              </ProjectLinks>
            </ProjectContent>
          </ProjectCard>
        ))}
      </ProjectsGrid>
    </ProjectsContainer>
  );
};

export default Projects;