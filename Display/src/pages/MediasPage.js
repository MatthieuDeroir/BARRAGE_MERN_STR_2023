import React from "react";
const API_URL = process.env.REACT_APP_API_URL;

function MediasPage({ media, onMediaEnd }) {
  const renderMedia = () => {
    if (media.type.includes("image")) {
      return (
        <img
          style={{ width: "288px", height: "216px" }}
          src={API_URL + media.path}
          alt={`Unsupported media`}
        />
      );
    } else if (media.type.includes("video")) {
      return (
        <video
          //preload="auto"
          style={{ width: "288px", height: "216px" }}
          autoPlay
          muted
          onEnded={() => onMediaEnd()}
          alt={`Unsupported media`}
        >
          <source src={API_URL + media.path} type={media.type} />
        </video>
      );
    } else {
      return <p>Unsupported media type</p>;
    }
  };

  return <>{renderMedia()}</>;
}



export default MediasPage;