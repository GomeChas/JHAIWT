import React from 'react';
import './AboutPage.css';
import AboutDetails from './aboutdetails/AboutDetails';

const AboutPage: React.FC = () => {
  return (
    <div className="about-page">
      <h1>About Us</h1>
      <p>Learn more about our company and mission here.</p>
      <AboutDetails />
    </div>
  );
};

export default AboutPage;
