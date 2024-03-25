import React, { useEffect, useState } from "react";

import "./Global.css";
import DataPage from "./pages/DataPage";
import TestPage from "./pages/TestPage";
import { setupWebsocketClient } from "./services/WebsocketService";

function App() {
  const API_URL = process.env.REACT_APP_API_URL;
  const [isVeilleMode, setIsVeilleMode] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [currentSlideshow, setCurrentSlideshow] = useState({});
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [waterData, setWaterData] = useState({});
  const [websocket, setWebsocket] = useState(null);

  const goToNextMedia = () => {
    setCurrentMediaIndex((prevIndex) => (prevIndex + 1) % (currentSlideshow.media?.length || 1));
  };

  useEffect(() => {
    const intervalDuration = currentSlideshow.media && currentSlideshow.media.length > 0
      ? currentSlideshow.media[currentMediaIndex]?.duration * 1000
      : 5000;

    const mediaInterval = setInterval(goToNextMedia, intervalDuration);

    return () => clearInterval(mediaInterval);
  }, [currentSlideshow, currentMediaIndex]);

  useEffect(() => {
    const ws = setupWebsocketClient(handleWebsocketMessage);
    setWebsocket(ws);

    return () => ws?.close();
  }, []);

  const handleWebsocketMessage = (event) => {
    try {
      const result = JSON.parse(event.data);

      switch(result.type) {
        case "slideshows":
          setCurrentSlideshow(result.slideshows?.[0] || {});
          setCurrentMediaIndex(0);
          break;
        case "slideshowStatus":
          setIsTesting(result.slideshowStatus?.[0]?.isTesting || false);
          setIsRunning(result.slideshowStatus?.[0]?.isRunning || false);
          break;
        case "settings":
          setIsVeilleMode(checkIsInVeillePeriod(result.settings?.[0]));
          break;
        case "data":
          setWaterData(result);
          break;
        default:
          break;
      }
    } catch (error) {
      console.error("Error while parsing websocket message", error);
    }
  };

  const checkIsInVeillePeriod = (veilleData) => {
    if (!veilleData?.enable) {
      return true;
    }
    const currentHour = new Date().getHours();
    const [startHour, stopHour] = [veilleData.start, veilleData.stop].map(time => parseInt(time.split(":")[0], 10));
    return currentHour >= startHour && currentHour < stopHour;
  };

  const renderContent = (content, index) => {
    // Generate a unique key that incorporates both the content ID and its type
    const uniqueKey = `${content._id}-${content.type}`;
  
    if (content.type === "panel") {
      return (
        <div key={uniqueKey} style={{ display: index === currentMediaIndex ? "block" : "none" }}>
          <DataPage waterData={waterData} />
        </div>
      );
    } else {
      // For media types, use the uniqueKey with the renderMedia function
      return (
        <div key={uniqueKey} style={{ display: index === currentMediaIndex ? "block" : "none" }}>
          {renderMedia(content)}
        </div>
      );
    }
  };
  
  return (
    <div>
      {!isVeilleMode ? (
        <></>
      ) : isRunning && currentSlideshow.media && currentSlideshow.media.length > 0 ? (
        currentSlideshow.media.map((content, index) => renderContent(content, index))
      ) : isTesting ? (
        <TestPage />
      ) : (
        <DataPage waterData={waterData} />
      )}
    </div>
  );
}
      

export default App;
