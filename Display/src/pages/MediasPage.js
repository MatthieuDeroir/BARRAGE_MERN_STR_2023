import React, { useEffect } from "react";
const API_URL = process.env.REACT_APP_API_URL;

function MediasPage({ media }) {
  const renderMedia = () => {
    if (media.type.includes("image")) {
      return (
        <img
          style={{ width: "288px", height: "216px" }}
          src={API_URL + media.path}
          alt={`Media ${media.id}`}
        />
      );
    } else if (media.type.includes("video")) {
      return (
        <video
          preload={"auto"}
          style={{ width: "288px", height: "216px" }}
          autoPlay
          muted
          loop
        >
          <source src={API_URL + media.path} type={media.type} />
        </video>
      );
    } else {
      return null;
    }
  };

  return <>{renderMedia()}</>;
}

export default MediasPage;
