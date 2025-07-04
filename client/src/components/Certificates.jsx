import { motion } from 'framer-motion';
import styled from 'styled-components';
import nvidia_logo from '../assets/images/Nvidia.png'; 
import coursera_logo from '../assets/images/Coursera.png'; 

const CertificatesContainer = styled.section`
  padding: 4rem 2rem;
  background: ${({ theme }) => theme.background};
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionTitle = styled.h2`
  text-align: center;
  margin-bottom: 3rem;
  font-size: 2.5rem;
  color: ${({ theme }) => theme.text};
  position: relative;
  
  &::after {
    content: '';
    display: block;
    width: 80px;
    height: 4px;
    background: ${({ theme }) => theme.primary};
    margin: 0.5rem auto 0;
    border-radius: 2px;
  }
`;

const CertificatesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const CertificateCard = styled(motion.div)`
  background: ${({ theme }) => theme.cardBackground};
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 1px solid ${({ theme }) => theme.cardBorder};
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  }
`;

const ProviderLogo = styled.img`
  width: 80px;
  height: 80px;
  object-fit: contain;
  margin-bottom: 1.5rem;
  filter: grayscale(20%);
  transition: filter 0.3s ease;
  
  ${CertificateCard}:hover & {
    filter: grayscale(0%);
  }
`;

const CertificateTitle = styled.h3`
  font-size: 1.25rem;
  margin-bottom: 0.75rem;
  color: ${({ theme }) => theme.text};
`;

const ProviderName = styled.p`
  color: ${({ theme }) => theme.secondaryText};
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
`;

const DownloadButton = styled.a`
  background: ${({ theme }) => theme.primary};
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  text-decoration: none;
  margin-top: auto;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  font-weight: 500;
  width: fit-content;
  
  &:hover {
    background: ${({ theme }) => theme.primaryDark};
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
`;

const certificates = [
  {
    id: 1,
    title: "Building LLM Applications With Prompt Engineering",
    provider: "Nvidia",
    logo: nvidia_logo, 
    file: "../assets/certificates/LLM-with-prompt-eng.pdf" 
  },
  {
    id: 2,
    title: "Introduction to Transformer-Based Natural Language Processing",
    provider: "Nvidia",
    logo: nvidia_logo, 
    file: "../assets/certificates/Introduction-to-transformer-based-NLP.pdf"
  },
  {
    id: 3,
    title: "Python for Data Science, AI & Development",
    provider: "Coursera",
    logo: coursera_logo, 
    file: "../assets/certificates/python-for-DS-AI.pdf" 
  },
];

const Certificates = () => {
  return (
    <CertificatesContainer id="certificates">
      <SectionTitle>My Certificates</SectionTitle>
      <CertificatesGrid>
        {certificates.map((cert) => (
          <CertificateCard
            key={cert.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.03 }}
          >
            <ProviderLogo src={cert.logo} alt={`${cert.provider} logo`} />
            <CertificateTitle>{cert.title}</CertificateTitle>
            <ProviderName>Issued by: {cert.provider}</ProviderName>
            <DownloadButton 
              href={cert.file} 
              download 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              Download
            </DownloadButton>
          </CertificateCard>
        ))}
      </CertificatesGrid>
    </CertificatesContainer>
  );
};

export default Certificates;