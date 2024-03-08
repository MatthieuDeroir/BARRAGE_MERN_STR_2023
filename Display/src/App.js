import React, { useEffect, useState } from "react";

import MediasPage from "./pages/MediasPage";
import "./Global.css";
import TestPage from "./pages/TestPage";
import DataPage from "./pages/DataPage";
import { setupWebsocketClient } from "./services/WebsocketService";
import Footer from "./components/Footer";
import Header from "./components/Header";

function App() {
  const [isVeilleMode, setIsVeilleMode] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [currentSlideshow, setCurrentSlideshow] = useState({});
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [waterData, setWaterData] = useState({}); //[debit_entrant, debit_sortant, cote_plan_eau]

  const [websocket, setWebsocket] = useState(null);

  useEffect(() => {
    const mediaInterval = setInterval(
      () => {
        setCurrentMediaIndex(
          (prevIndex) => (prevIndex + 1) % (currentSlideshow.media?.length || 1)
        );
      },
      currentSlideshow.media && currentSlideshow.media.length > 0
        ? currentSlideshow.media[currentMediaIndex]?.duration * 1000
        : 5000
    );

    return () => clearInterval(mediaInterval);
  }, [currentSlideshow, currentMediaIndex]);

  const handleWebsocketMessage = (event) => {
    try {
      const result = JSON.parse(event.data);
      console.log(result);
      if (result.type === "slideshows") {
        if (result.slideshows === undefined || result.slideshows.length === 0) {
          setCurrentSlideshow({});
          setCurrentMediaIndex(0);
        } else {
          setCurrentSlideshow(result.slideshows[0]);
        }
      } else if (result.type === "slideshowStatus") {
        setIsTesting(result.slideshowStatus[0].isTesting);
        setIsRunning(result.slideshowStatus[0].isRunning);
      } else if (result.type === "settings") {
        setIsVeilleMode(checkIsInVeillePeriod(result.settings[0]));
      } else if (result.type === "data") {
        setWaterData(result);
      }
    } catch (error) {
      console.error("Error while parsing websocket message", error);
    }
  };

  useEffect(() => {
    const ws = setupWebsocketClient(handleWebsocketMessage);
    setWebsocket(ws);

    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, []);

  const checkIsInVeillePeriod = (veilleData) => {
    if (!veilleData.enable) {
      return true;
    }
    const currentHour = new Date().getHours();
    const startHour = parseInt(veilleData.start.split(":")[0], 10);
    const stopHour = parseInt(veilleData.stop.split(":")[0], 10);
    return currentHour >= startHour && currentHour < stopHour;
  };

  return (
    /*  <div>
      {!isVeilleMode ? (
        <></> //veille
      ) : isRunning &&
        currentSlideshow.media &&
        currentSlideshow.media.length > 0 ? (
        currentSlideshow.media.map((media, index) => (
          <div
            key={media._id}
            style={{
              display: index === currentMediaIndex ? "block" : "none",
            }}
          >
            {media.type === "panel" ? (
              <DataPage waterData={waterData} />
            ) : (
              <MediasPage media={media} />
            )}
          </div>
        ))
      ) : isTesting ? (
        <TestPage />
      ) : (
        <DataPage waterData={waterData} />
      )}
    </div> */
    <DataPage />
  );
}

export default App;
