import React from 'react';
import Modal from 'react-modal';

const ModalWrapper = ({ isOpen, onRequestClose, children }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Configuration Modal"
            style={{
                content: {
                    width: '50%',
                    height: 'auto',
                    margin: 'auto',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    padding: '20px',
                },
            }}
        >
            {children}
        </Modal>
    );
};

export default ModalWrapper;
