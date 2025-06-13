

import { motion } from 'framer-motion';
import { useState } from 'react';
import styled from 'styled-components';
import { FiMail, FiLinkedin, FiInstagram, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';

const ContactContainer = styled.section`
  padding: 5rem 10%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background: ${({ theme }) => theme.body};
`;

const ContactContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 600px;
  margin-top: 3rem;
`;

const ContactForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 1.5rem;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  position: relative;
`;

const Label = styled.label`
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem;
  border: 1px solid ${({ theme, $hasError }) => $hasError ? '#ff3333' : `${theme.text}20`};
  border-radius: 8px;
  background: ${({ theme }) => theme.cardBg};
  color: ${({ theme }) => theme.text};
  font-size: 1rem;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: ${({ theme, $hasError }) => $hasError ? '#ff3333' : theme.primary};
    box-shadow: 0 0 0 3px ${({ theme, $hasError }) => $hasError ? '#ff333320' : `${theme.primary}20`};
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 1rem;
  border: 1px solid ${({ theme, $hasError }) => $hasError ? '#ff3333' : `${theme.text}20`};
  border-radius: 8px;
  background: ${({ theme }) => theme.cardBg};
  color: ${({ theme }) => theme.text};
  font-size: 1rem;
  min-height: 150px;
  resize: vertical;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: ${({ theme, $hasError }) => $hasError ? '#ff3333' : theme.primary};
    box-shadow: 0 0 0 3px ${({ theme, $hasError }) => $hasError ? '#ff333320' : `${theme.primary}20`};
  }
`;

const ErrorMessage = styled(motion.div)`
  color: #ff3333;
  font-size: 0.8rem;
  margin-top: 0.3rem;
  text-align: left;
`;

const SubmitButton = styled(motion.button)`
  padding: 1rem 2rem;
  background: linear-gradient(90deg, ${({ theme }) => theme.primary}, ${({ theme }) => theme.secondary});
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(58, 134, 255, 0.4);
  }
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const StatusMessage = styled(motion.div)`
  padding: 1rem;
  border-radius: 8px;
  background: ${({ $isSuccess }) => $isSuccess ? 'rgba(75, 181, 67, 0.2)' : 'rgba(255, 51, 51, 0.2)'};
  color: ${({ $isSuccess }) => $isSuccess ? '#4BB543' : '#FF3333'};
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const ContactInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  margin-top: 3rem;
`;

const ContactItem = styled(motion.a)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.8rem 1.5rem;
  background: ${({ theme }) => theme.cardBg};
  border-radius: 50px;
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
    color: ${({ theme }) => theme.primary};
    transition: all 0.3s ease;
  }
`;

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState({
    message: '',
    isSuccess: false,
    show: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      name: '',
      email: '',
      message: ''
    };

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      valid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
      valid = false;
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
      valid = false;
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message should be at least 10 characters';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };
const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validateForm()) return;

  setIsSubmitting(true);
  setStatus({ message: '', isSuccess: false, show: false });

  try {
  const res = await fetch(
  'https://portfolio-64dc.onrender.com/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
});


    const contentType = response.headers.get('content-type');

    if (!contentType || !contentType.includes('application/json')) {
      const rawText = await response.text(); // Only read once
      console.error('❌ Expected JSON but got:', rawText);
      throw new Error('Server did not return JSON');
    }

    const data = await response.json();

    if (response.ok) {
      setStatus({
        message: 'Message sent successfully! I will get back to you soon.',
        isSuccess: true,
        show: true
      });
      setFormData({
        name: '',
        email: '',
        message: ''
      });
    } else {
      throw new Error(data.error || 'Failed to send message');
    }

  } catch (error) {
    console.error('Submission error:', error);
    setStatus({
      message: error.message || 'An error occurred. Please try again later.',
      isSuccess: false,
      show: true
    });
  } finally {
    setIsSubmitting(false);
  }
};


  return (
    <ContactContainer id="contact">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        Get In Touch
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        viewport={{ once: true }}
      >
        Have a project in mind or want to collaborate? Feel free to reach out!
      </motion.p>
      
      <ContactContent>
        <ContactForm onSubmit={handleSubmit}>
          <InputGroup>
            <Label htmlFor="name">Name</Label>
            <Input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              $hasError={!!errors.name}
            />
            {errors.name && (
              <ErrorMessage
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {errors.name}
              </ErrorMessage>
            )}
          </InputGroup>
          
          <InputGroup>
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              $hasError={!!errors.email}
            />
            {errors.email && (
              <ErrorMessage
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {errors.email}
              </ErrorMessage>
            )}
          </InputGroup>
          
          <InputGroup>
            <Label htmlFor="message">Message</Label>
            <TextArea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              $hasError={!!errors.message}
            />
            {errors.message && (
              <ErrorMessage
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {errors.message}
              </ErrorMessage>
            )}
          </InputGroup>
          
          <SubmitButton
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </SubmitButton>

          {status.show && (
            <StatusMessage
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              $isSuccess={status.isSuccess}
            >
              {status.isSuccess ? <FiCheckCircle /> : <FiAlertCircle />}
              {status.message}
            </StatusMessage>
          )}
        </ContactForm>
        
        <ContactInfo>
          <ContactItem
            href="mailto:1niteshgurjar3433@gmail.com"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <FiMail />
            <span>1niteshgurjar3433@gmail.com</span>
          </ContactItem>
          
          <ContactItem
            href="https://www.linkedin.com/in/nitesh-kumar-gurjar/"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <FiLinkedin />
            <span>LinkedIn</span>
          </ContactItem>
          
          <ContactItem
            href="https://instagram.com/gujjar_nitesh3433"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <FiInstagram />
            <span>Instagram</span>
          </ContactItem>
        </ContactInfo>
      </ContactContent>
    </ContactContainer>
  );
};

export default Contact;