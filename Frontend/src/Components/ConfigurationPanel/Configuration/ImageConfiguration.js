import React, { useState } from 'react';

const ImageConfiguration = () => {
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    return (
        <div>
            <h3>Image Configuration</h3>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            {preview && <img src={preview} alt="Uploaded Preview" />}
        </div>
    );
};

export default ImageConfiguration;
