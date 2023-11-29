
import React, { useState } from 'react';
import './ConfigurationPanel.css';

const ConfigurationPanel = () => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    return (
      <>
          <button onClick={toggleVisibility} className="toggle-button">
              {isVisible ? 'Hide' : 'Show'} Configuration
          </button>
          <div className={`configuration-panel ${isVisible ? 'active' : ''}`}>
          </div>
      </>
    );
};

export default ConfigurationPanel;

