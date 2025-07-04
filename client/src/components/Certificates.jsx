import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import nvidia_logo from '../assets/images/Nvidia.png';
import coursera_logo from '../assets/images/Coursera.png';

// Styled Components
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
  cursor: pointer;
  
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

const ViewButton = styled.button`
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
  border: none;
  cursor: pointer;
  
  &:hover {
    background: ${({ theme }) => theme.primaryDark};
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
`;

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;



const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: ${({ theme }) => theme.text};
  z-index: 10;
`;

const ModalHeader = styled.div`
  padding-bottom: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.cardBorder};
  margin-bottom: 1rem;
  
  h3 {
    margin: 0 0 0.5rem 0;
    color: ${({ theme }) => theme.text};
  }
  
  p {
    margin: 0;
    color: ${({ theme }) => theme.secondaryText};
  }
`;


const ModalContent = styled(motion.div)`
  background: ${({ theme }) => theme.background};
  border-radius: 12px;
  padding: 2rem;
  width: 95vw;
  height: 90vh;
  max-height: 100vh;
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
`;

const PDFContainer = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PDFViewer = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
  border-radius: 8px;
  background: white;
`;


const PDFFallback = styled.div`
  text-align: center;
  padding: 2rem;
  color: ${({ theme }) => theme.text};
  
  a {
    color: ${({ theme }) => theme.primary};
    text-decoration: underline;
    font-weight: 500;
  }
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  
  .spinner {
    width: 40px;
    height: 40px;
    border: 4px solid ${({ theme }) => theme.cardBorder};
    border-top: 4px solid ${({ theme }) => theme.primary};
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

// Certificate Data
const certificates = [
  {
    id: 1,
    title: "Building LLM Applications With Prompt Engineering",
    provider: "Nvidia",
    logo: nvidia_logo,
    file: "/certificates/LLM-with-prompt-eng.pdf"
  },
  {
    id: 2,
    title: "Introduction to Transformer-Based Natural Language Processing",
    provider: "Nvidia",
    logo: nvidia_logo,
    file: "/certificates/Introduction-to-transformer-based-NLP.pdf"
  },
  {
    id: 3,
    title: "Python for Data Science, AI & Development",
    provider: "Coursera",
    logo: coursera_logo,
    file: "/certificates/python-for-DS-AI.pdf"
  },
];

const Certificates = () => {
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [pdfError, setPdfError] = useState(false);
  const pdfRef = useRef(null);

  const openModal = (cert) => {
    setSelectedCertificate(cert);
    setIsModalOpen(true);
    setIsLoading(true);
    setPdfError(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsLoading(false);
    setPdfError(false);
    setTimeout(() => {
      setSelectedCertificate(null);
    }, 300);
  };

  const handlePdfLoad = () => {
    setIsLoading(false);
  };

  const handlePdfError = () => {
    setIsLoading(false);
    setPdfError(true);
  };

  // Check if PDF exists and is accessible
  const checkPdfExists = async (url) => {
    try {
      const response = await fetch(url, { method: 'HEAD' });
      return response.ok;
    } catch (error) {
      return false;
    }
  };

  useEffect(() => {
    if (selectedCertificate) {
      checkPdfExists(selectedCertificate.file).then(exists => {
        if (!exists) {
          setPdfError(true);
          setIsLoading(false);
        }
      });
    }
  }, [selectedCertificate]);

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
            onClick={() => openModal(cert)}
          >
            <ProviderLogo src={cert.logo} alt={`${cert.provider} logo`} />
            <CertificateTitle>{cert.title}</CertificateTitle>
            <ProviderName>Issued by: {cert.provider}</ProviderName>
            <ViewButton onClick={(e) => {
              e.stopPropagation();
              openModal(cert);
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
              View Certificate
            </ViewButton>
          </CertificateCard>
        ))}
      </CertificatesGrid>

      <AnimatePresence>
        {isModalOpen && selectedCertificate && (
          <ModalOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <ModalContent
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <CloseButton onClick={closeModal}>&times;</CloseButton>
              
              <ModalHeader>
                <h3>{selectedCertificate.title}</h3>
                <p>Issued by: {selectedCertificate.provider}</p>
              </ModalHeader>
              
              <PDFContainer>
                {isLoading && (
                  <LoadingSpinner>
                    <div className="spinner"></div>
                  </LoadingSpinner>
                )}
                
                {pdfError ? (
                  <PDFFallback>
                    <p>Unable to display PDF in browser.</p>
                    <a 
                      href={selectedCertificate.file} 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      Download Certificate
                    </a>
                  </PDFFallback>
                ) : (
                  <PDFViewer
                    ref={pdfRef}
                    src={`${selectedCertificate.file}#view=FitH&toolbar=0&navpanes=0`}
                    title="Certificate PDF"
                    onLoad={handlePdfLoad}
                    onError={handlePdfError}
                    style={{ display: isLoading ? 'none' : 'block' }}
                  />
                )}
              </PDFContainer>
            </ModalContent>
          </ModalOverlay>
        )}
      </AnimatePresence>
    </CertificatesContainer>
  );
};

export default Certificates;