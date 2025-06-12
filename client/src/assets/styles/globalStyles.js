import { createGlobalStyle } from 'styled-components';

export const lightTheme = {
  body: '#f5f5f5',
  text: '#121212',
  primary: '#3a86ff',
  secondary: '#8338ec',
  accent: '#ff006e',
  cardBg: '#ffffff',
  navBg: 'rgba(255, 255, 255, 0.9)',
};

export const darkTheme = {
  body: '#121212',
  text: '#f5f5f5',
  primary: '#3a86ff',
  secondary: '#8338ec',
  accent: '#ff006e',
  cardBg: '#1e1e1e',
  navBg: 'rgba(30, 30, 30, 0.9)',
};

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Inter', sans-serif;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    transition: all 0.3s ease;
    overflow-x: hidden;
  }

  section {
    min-height: 100vh;
    padding: 5rem 10%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    
    @media (max-width: 768px) {
      padding: 5rem 5%;
    }
  }

  h1 {
    font-size: 3.5rem;
    margin-bottom: 2rem;
    background: linear-gradient(90deg, ${({ theme }) => theme.primary}, ${({ theme }) => theme.secondary});
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    
    @media (max-width: 768px) {
      font-size: 2.5rem;
    }
  }

  h2 {
    font-size: 2.5rem;
    margin-bottom: 1.5rem;
    
    @media (max-width: 768px) {
      font-size: 2rem;
    }
  }

  p {
    font-size: 1.1rem;
    line-height: 1.6;
    margin-bottom: 1.5rem;
    opacity: 0.9;
  }

  a {
    color: ${({ theme }) => theme.primary};
    text-decoration: none;
    transition: all 0.3s ease;
    
    &:hover {
      color: ${({ theme }) => theme.accent};
    }
  }
`;