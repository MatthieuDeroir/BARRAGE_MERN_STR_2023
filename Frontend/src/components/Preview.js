import React from 'react';
import './Preview.css';

const Preview = ({ panelNumber }) => (
  <div className="preview">
    <h2 className="preview-title">Panneau {panelNumber}</h2>
    <img className="preview-image" src="https://via.placeholder.com/150" alt="Aperçu"/>
    <p className="preview-date">Date : 04/05/2023</p>
  </div>
);

export default Preview;
