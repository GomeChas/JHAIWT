import React from 'react';
import './FeaturesPage.css';
import FeaturesDetails from './featuresdetails/FeaturesDetails';

const FeaturesPage: React.FC = () => {
  return (
    <div className="features-page">
      <h1>Features</h1>
      <p>This page will describe the features of our job listing application.</p>
      <FeaturesDetails />
    </div>
  );
};

export default FeaturesPage;
