import React from 'react';
import './SourcesPage.css';
import SourcesDetails from './sourcesdetails/SourcesDetails';

const SourcesPage: React.FC = () => {
  return (
    <div className="sources-page">
      <h1>Our Sources</h1>
      <p>Information about the sources of our job listings and data.</p>
      <SourcesDetails />
    </div>
  );
};

export default SourcesPage;
