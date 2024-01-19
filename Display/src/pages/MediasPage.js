import React, { useEffect } from 'react'

function MediasPage({ media, onVideoEnd }) {

  
  const renderMedia = () => {
    if (media.type.includes('image')) {
      return <img style={{width:"228px", height:"216px"}} src={process.env.REACT_APP_MEDIA_DISPLAY_PATH + media.path} alt={`Media ${media.id}`} />;
    }
    else if (media.type.includes('video')) {
      return (
        <video style={{width:"228px", height:"216px"}} autoPlay muted onEnded={onVideoEnd}>
          <source src={process.env.REACT_APP_MEDIA_DISPLAY_PATH + media.path} type={media.type} />
        </video>
      );
    }
    else {
      return null;
    }
  }

  return (
    <>
      {renderMedia()}
    </>
  );
}

export default MediasPage;