import React, {useState} from 'react';
import FreeTextConfiguration from './FreeTextConfiguration';
import ImageConfiguration from './ImageConfiguration';
import DataConfiguration from './DataConfiguration';
import ModalWrapper from './ModalWrapper';
import './Slide.css'

const Slide = ({ type, content, index, removeSlide }) => {
    const truncateText = (text, maxLength) => {
        if (text.length > maxLength) {
            return text.slice(0, maxLength) + '...';
        }
        return text;
    };

    return (
        <div>
            <h4>{type} Slide</h4>
            <div>
                {content.map((line, idx) => (
                    <p key={idx} style={{ margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {truncateText(line, 10)}
                    </p>
                ))}
            </div>
            <button onClick={() => removeSlide(index)}>Remove</button>
        </div>
    );
};



const savePlaylistToLocalStorage = (slides) => {
    localStorage.setItem('playlistConfig', JSON.stringify(slides));
};

const loadPlaylistFromLocalStorage = () => {
    const storedData = localStorage.getItem('playlistConfig');
    return storedData ? JSON.parse(storedData) : [];
};


const PlaylistConfiguration = () => {
    const [slides, setSlides] = useState(loadPlaylistFromLocalStorage());

    const [modalOpen, setModalOpen] = useState(false);
    const [currentConfigType, setCurrentConfigType] = useState(null);
    const [currentContent, setCurrentContent] = useState(null);

    const addSlide = (type) => {
        setCurrentConfigType(type);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const resetModal = () => {
        setCurrentConfigType(null);
        setCurrentContent(null);
        setModalOpen(false);
    }

    const saveSlide = (content) => {
        const newSlides = [...slides, {type: currentConfigType, content: content}];
        setSlides(newSlides);
        savePlaylistToLocalStorage(newSlides);
        closeModal();
    };


    const removeSlide = (index) => {
        const newSlides = slides.filter((_, i) => i !== index);
        setSlides(newSlides);
        savePlaylistToLocalStorage(newSlides);
    };


    const renderConfigContent = () => {
        switch (currentConfigType) {
            case 'FreeText':
                return <FreeTextConfiguration onSave={saveSlide}/>;
            case 'Image':
                // Replace this line with an updated ImageConfiguration component
                return <ImageConfiguration/>;
            case 'Data':
                // Replace this line with an updated DataConfiguration component
                return <DataConfiguration/>;
            default:
                return null;
        }
    };

    return (
        <div>
            <h3>Playlist Configuration</h3>
            <button onClick={() => addSlide('FreeText')}>Add Free Text</button>
            <button onClick={() => addSlide('Image')}>Add Image</button>
            <button onClick={() => addSlide('Data')}>Add Data</button>
            <div>
                {slides.map((slide, index) => (
                    <Slide
                        key={index}
                        type={slide.type}
                        content={slide.content}
                        index={index}
                        removeSlide={removeSlide}
                    />
                ))}
            </div>
            <ModalWrapper isOpen={modalOpen} onRequestClose={closeModal}>
                {renderConfigContent()}
                <button onClick={resetModal}>Cancel</button>
            </ModalWrapper>
        </div>
    );
};

export default PlaylistConfiguration;
