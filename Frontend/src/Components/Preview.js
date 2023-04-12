import React from 'react';
import './Preview.css';

export default function Preview({ panelNumber }){
    return (
        <div className="preview">
            <h2 className="preview-title">Titre {panelNumber}</h2>
            <img
                className="preview-image"
                src="https://via.placeholder.com/150"
                alt="Aperçu"
            />
            <p className="preview-date">Date : 05/04/2023</p>
        </div>
    );
};

