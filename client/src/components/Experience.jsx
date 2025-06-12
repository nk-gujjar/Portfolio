import { motion } from 'framer-motion';
import styled from 'styled-components';

const ExperienceContainer = styled.section`
  padding: 5rem 10%;
  background: ${({ theme }) => theme.body};
`;

const ExperienceTitle = styled(motion.h2)`
  font-size: 2.5rem;
  margin-bottom: 3rem;
  text-align: center;
  color: ${({ theme }) => theme.primary};
`;

const ExperienceItem = styled(motion.div)`
  background: ${({ theme }) => theme.cardBg};
  border-radius: 15px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
`;

const CompanyName = styled.h3`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.primary};
  margin-bottom: 0.5rem;
`;

const RoleAndDuration = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  font-weight: 500;
  opacity: 0.8;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.5rem;
  }
`;

const Description = styled.ul`
  margin-top: 1rem;
  padding-left: 1.5rem;
`;

const DescriptionItem = styled.li`
  margin-bottom: 0.5rem;
  line-height: 1.6;
`;

const experienceData = [
  {
    company: "Easecruit",
    role: "Software Developer Intern",
    duration: "May 2024 - July 2024",
    description: [
      "Created a resume parser with Node.js and React, converting resumes into structured JSON for improved data management.",
      "Utilized LLMs to extract essential details such as links, repositories, and GitHub stats, optimizing parsing accuracy.",
      "Enhanced backend efficiency, processing over 100 resumes in under 15 seconds, improving cost-effectiveness and search accuracy."
    ]
  },
  // Add more experiences as needed
];

const Experience = () => {
  return (
    <ExperienceContainer id="experience">
      <ExperienceTitle
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        Experience
      </ExperienceTitle>

      {experienceData.map((exp, index) => (
        <ExperienceItem
          key={index}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
        >
          <CompanyName>{exp.company}</CompanyName>
          <RoleAndDuration>
            <span>{exp.role}</span>
            <span>{exp.duration}</span>
          </RoleAndDuration>
          <Description>
            {exp.description.map((item, i) => (
              <DescriptionItem key={i}>{item}</DescriptionItem>
            ))}
          </Description>
        </ExperienceItem>
      ))}
    </ExperienceContainer>
  );
};

export default Experience;