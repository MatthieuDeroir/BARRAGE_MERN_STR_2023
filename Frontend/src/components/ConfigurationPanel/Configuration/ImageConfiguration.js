import React, { useState } from 'react';
import { Button, Typography } from '@mui/material';

export default function ImageConfiguration({ saveSlide }) {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [duration, setDuration] = useState(0);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleDurationChange = (e) => {
    setDuration(parseInt(e.target.value));
  };

  const handleSave = () => {
    saveSlide({ type: 'Image', content: { preview, imageUrl: image }, duration });
  };

  return (
    <div>
      <Typography variant="h3">Image Configuration</Typography>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      {preview && <img src={preview} alt="Uploaded Preview" style={{ width: '100px', height: '100px' }} />}
      <label>Duration (seconds):</label>
      <input type="number" value={duration} onChange={handleDurationChange} />
      <Button onClick={handleSave}>Save</Button>
    </div>
  );
}
