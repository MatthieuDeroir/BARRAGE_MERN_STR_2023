import React from "react";

function MediasPage({ media }) {
  const renderMedia = () => {
    if (media.type.includes("image")) {
      return (
        <img
          style={{
            width: `${process.env.REACT_APP_WIDTH}px`,
            height: `${process.env.REACT_APP_HEIGHT}px`,
          }}
          src={media.path}
          alt={`Media ${media.id}`}
        />
      );
    } else if (media.type.includes("video")) {
      return (
        <video
          style={{
            width: `${process.env.REACT_APP_WIDTH}px`,
            height: `${process.env.REACT_APP_HEIGHT}px`,
          }}
          autoPlay
          muted
        >
          <source src={media.path} type={media.type} />
        </video>
      );
    } else {
      return null;
    }
  };

  return <>{renderMedia()}</>;
}

export default MediasPage;
